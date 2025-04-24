export function hexToUint8Array(hexString: string): Uint8Array {
    return Uint8Array.from(
        hexString
            .replace(/^\\x/, "") // '\\x'を削除
            .match(/.{1,2}/g)! // 2文字ごとの配列に分割
            .map((byte) => parseInt(byte, 16)) // 各2文字を16進数として変換
    );
}

export function Uint8ArrayToHex(uint8array: Uint8Array): string {
    return (
        "\\x" +
        Array.from(uint8array)
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("")
    );
}
