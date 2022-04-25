export function hexToASCII(hex: string) {
  const parts: string[] = []
  for (let i = 0; i < hex.length; i += 2) {
    const char = String.fromCharCode(parseInt(hex.slice(i, i + 2), 16))
    char.charCodeAt(0) > 31 && char.charCodeAt(0) < 127 ? parts.push(char) : null
  }
  return parts.join('').trim()
}
console.log(hexToASCII('0x313ce567ad'))
