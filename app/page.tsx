"use client"
import { createSubscriptionAction } from "@/actions/subscription.action";
import Themer from "@/components/Themer";
import { Button } from "@/components/ui/button";
import UserLoading from "@/components/UserLoading";
import SvgLogo from "@/public/svg-logo";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios"
import { bufferToBase64 } from "@/lib/conversions";

export default function Home() {
  const {getUser, user, isLoading, isAuthenticated, error} = useKindeBrowserClient()
  const router = useRouter()
  const TOAST_ID = "push-subscription";
  const SEND_NOTIFICATION_ID = "send-notification";
  const [endpoint, setEndpoint] = useState<string>()
  
  useEffect(()=>{
    if(!isAuthenticated && !isLoading) router.push("/login")

  }, [isAuthenticated, isLoading])

//   console.log(user)

  const saveSubscriptionMutation = useMutation({
        mutationKey: ["saveSubscription"],
        mutationFn: async (subscription: PushSubscription) => { 
        
            const res = await createSubscriptionAction({
                endpoint: subscription.endpoint,
                p256dh: bufferToBase64(subscription.getKey("p256dh")),
                auth: bufferToBase64(subscription.getKey("auth"))
            })

            return res.subscription
        },
        onMutate: () => {
            toast.loading("saving subscription...", {id: TOAST_ID});
        },
        onError: () => {
            toast.error("failed to save subscription!", {id: TOAST_ID});
        },
        onSuccess: () => {
            toast.success("subscription saved successfully!", {id: TOAST_ID});
        }
    })

  
  async function registerServiceWorker () {
      if(!("serviceWorker" in navigator)){
          console.log("Service workers not supported by this browser");
          return
        }
        
        try {
            const registration = await navigator.serviceWorker.register("/sw.js")
            await subscribeToPush(registration); 
            
        } catch (error: any) {
            console.log("Error in registering service worker: ", error.message)
        }
    }

    
    const subscribeToPush = async(registration: ServiceWorkerRegistration) => {

        const existingSubscription = await registration.pushManager.getSubscription();
        
        if(existingSubscription){
            console.log("subscription found: ", existingSubscription);
    
            await saveSubscriptionMutation.mutateAsync(existingSubscription)
            setEndpoint(existingSubscription.endpoint)
            console.log({
                endpoint: existingSubscription.endpoint,
                p256dh: existingSubscription.getKey("p256dh"),
                auth: existingSubscription.getKey("auth")
              });
            return
        }

        toast.loading("getting permission...", {id: TOAST_ID})
        const permission = await Notification.requestPermission()
        console.log("Permission: ", permission)
        if(permission !== "granted"){
            toast.error("permission rejected", {id: TOAST_ID})
            return
        }
        toast.success("permission granted", {id: TOAST_ID})

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        })

        console.log("subscription: ", subscription);
        setEndpoint(subscription.endpoint)

        await saveSubscriptionMutation.mutateAsync(subscription)

    }
    const sendNotificationMutation = useMutation({
        mutationKey: ["sendNotification"],
        mutationFn: async (endpoint: string) => { 
        
            const res = await axios.post("/api/notification/send", {
                title: "Salaan",
                body: "Assalaamu calaykum waraxmatullaahi wabarakaatuh, seetahay saaxiib?",
                url: "/",
                endpoint: endpoint
            })

            return res
        },
        onMutate: () => {
            toast.loading("sending notification...", {id: SEND_NOTIFICATION_ID});
        },
        onError: () => {
            toast.error("failed to send notification!", {id: SEND_NOTIFICATION_ID});
        },
        onSuccess: () => {
            toast.success("notification sent successfully!", {id: SEND_NOTIFICATION_ID});
        }
    })


    const handleSendNotification = () => {
        if(!endpoint){
            toast.error("failed to send notification!", {id: SEND_NOTIFICATION_ID});
            return
        }
        
    
        sendNotificationMutation.mutate(endpoint)
    }
    
    // useEffect(() => {
    //     if(isLoading) return
    //     registerServiceWorker()
    // }, [isLoading])
   

    if(!user && isLoading) return <UserLoading />
    if(!user && !isLoading) return <p className="w-full text-center text-red-500">{error}</p>


    return (
        <div className="max-w-7xl mx-auto flex flex-col h-full gap-40">
            <h2 className="capitalize font-semibold text-center">Welcome to notifins</h2>
            
            <div className="flex flex-col items-center justify-center gap-3">
                <p className="text-center">You can receive notifications at any time!</p>
                {
                    endpoint ? 
                    <Button onClick={handleSendNotification} className="p-5 capitalize cursor-pointer text-white">Recieve notification</Button>
                    :
                    <Button onClick={registerServiceWorker} disabled={saveSubscriptionMutation.isPending} className="p-5 capitalize cursor-pointer text-white">{saveSubscriptionMutation.isPending ? "Saving subscription" : "Allow notifications"}</Button>
                }
            </div>
        </div>
    )
}