import dotenv from 'dotenv'
import { setupClient } from './tg.js'
import { getLatest } from './dex.js'
import { format } from './message.js'

dotenv.config()
const env = process.env

const client = await setupClient()
client.setParseMode("html")

setInterval(async () => {
  const latest = await getLatest()
  const message = format(latest)
  await client.sendMessage(env.CHANNEL_NAME, { message })
  console.log('Message sent.')
}, env.INTERVAL)