import dotenv from 'dotenv'
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import input from "input"


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

// export async function setupClient() {
//   console.log("Loading interactive example...");
//   const client = new TelegramClient(stringSession, apiId, apiHash, {
//     connectionRetries: 5,
//   });
//   await client.start({
//     phoneNumber: async () => await input.text("Please enter your number: "),
//     password: async () => await input.text("Please enter your password: "),
//     phoneCode: async () =>
//       await input.text("Please enter the code you received: "),
//     onError: (err) => console.log(err),
//   });
//   console.log("You should now be connected.");
//   console.log(client.session.save()); // Save this string to avoid logging in again
//   await client.sendMessage("me", { message: "Hello!" });
// }