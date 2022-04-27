// doesn't work yet
export async function sendTokens({ address, network }: { address: string; network: 'mumbai' | 'rinkeby' }) {
  const url = `https://faucetli-backend-production.up.railway.app/api/v1/token?address=${address}&network=${network}`
  const response = await fetch(url)
  const json = await response.json()
  return json
}

sendTokens({ address: '0xb3224026E2AE0A8F9215cecAA4b522eF1bFb474A', network: 'mumbai' }).then(console.log)
