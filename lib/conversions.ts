export const bufferToBase64 = (buffer: ArrayBuffer | null) => {
    if(!buffer) return ""

    const bytes = new Uint8Array(buffer)
    let binary = "";

    for(const byte of bytes){
        binary += String.fromCharCode(byte)
    }

    return btoa(binary)
}

export function hexToBuffer (hex: string): ArrayBuffer {
    let bytes = new Uint8Array(hex.length / 2);

    for(let i = 0; i < hex.length; i++){
        bytes[i] = parseInt(hex.slice(i*2, i*2+2), 16)
    }

    return bytes.buffer
}