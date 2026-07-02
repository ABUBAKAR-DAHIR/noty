import webpush from 'web-push';

webpush.setVapidDetails(
    "mailto:abu112abu112abu112@gmail.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.PRIVATE_KEY!
)

export default webpush