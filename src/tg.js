import dotenv from 'dotenv'
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";

dotenv.config()
const env = process.env

const apiId = parseInt(env.TELEGRAM_API_ID);
const apiHash = env.TELEGRAM_API_HASH;
const stringSession = new StringSession("")
const botAuthToken = env.TELEGRAM_BOT_TOKEN; // put your bot token here

export async function setupClient() {
  const client = new TelegramClient(
    stringSession,
    apiId,
    apiHash,
    { connectionRetries: 5 }
  );
  await client.start({ botAuthToken });
  console.log(client.session.save());
  client.sendMessage(env.CHANNEL_NAME, { message: 'We are live!'})
  return client
}