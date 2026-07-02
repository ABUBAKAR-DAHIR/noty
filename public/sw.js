self.addEventListener("push", (event) => {
    let data = {
        title: "Default title",
        body: "Default body"
    }

    if(event.data){
        try {
            data = event.data.json()
        } catch (error) {
            console.log("failed to extract data (WORKER ERROR): ", error.message)
        }
    }

    const options = {
        body: data.body,
        icon: "/fav-big.png",
        badge: "/fav-mid.png",
        vibrate: [100, 50, 100],
        data: {
            url: "/"
        }
    }

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
})


self.addEventListener("notificationclick", (event) => {
    event.notification.close()
    console.log("notification: ", event.notification)

    const url = event.notification.data?.url ?? "/";

    event.waitUntil(
        clients.matchAll({type: "window", includeUncontrolled: true}).then((clientList) => {
            for(const client of clientList){
                if(client.url === url && "focus" in client){
                    return client.focus()
                }
            }

            if(clients.openWindow){
                return clients.openWindow(url)
            }
        }).catch((e) => {
            console.log("Error in service worker: ", e)
        })
    )
})
