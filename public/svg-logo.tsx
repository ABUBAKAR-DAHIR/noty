function SvgLogo({
    width,
    height
}: {width?: number, height?: number}) {
  return (
    <svg width={width ? width: "680"} height={height ? height :"240"} viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" role="img" className="relative">
        <title>Notifins logo</title>
        <desc>A logo for Notifins, featuring a rounded square icon with a bell and notification dot, alongside a wordmark in the brand blue color.</desc>
        <div className="absolute inset-0 bg-amber-600 h-full w-full"></div>
        <g transform="translate(170,60)">
        <rect x="0" y="0" width="120" height="120" rx="28" fill="#0a609b"/>
        <path d="M60 28 C46 28 35 39 35 53 L35 70 L28 82 L92 82 L85 70 L85 53 C85 39 74 28 60 28 Z" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M50 88 a10 10 0 0 0 20 0" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="86" cy="34" r="11" fill="#ffffff"/>
        <circle cx="86" cy="34" r="11" fill="none" stroke="#0a609b" strokeWidth="2.5"/>
        </g>

        <text x="310" y="138" fontFamily="Arial, sans-serif" fontSize="64" fontWeight="700" fill="#0a609b">notifins</text>

    </svg>
  )
}

export default SvgLogo