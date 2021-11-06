import dotenv from 'dotenv'
import { ethers } from 'ethers'
import erc20abi from './abi/erc20.json'
import routerAbi from './abi/router.json'

dotenv.config()
const env = process.env

const provider = new ethers.providers.WebSocketProvider(env.SOCKET)
// const provider = new ethers.providers.JsonRpcProvider(env.NODE_URL)
const router = new ethers.Contract(env.ROUTER, routerAbi, provider)

const address_list = env.ADDRESS_LIST.split(',')

async function query(addr) {

  const contract = new ethers.Contract(addr, erc20abi, provider)
  const name = await contract.name()
  const symbol = await contract.symbol()
  
  const totalSupply = await contract.totalSupply()
  const formatTotalSupply = ethers.utils.formatEther(totalSupply)
  
  const decimals = await contract.decimals()
  
  const amountsWBNB = await router.getAmountsOut(ethers.utils.parseUnits('1', decimals), [addr, env.WBNB]);
  const amountsBUSD = await router.getAmountsOut(amountsWBNB[1], [env.WBNB, env.BUSD]);
  const price = amountsBUSD[1]
  const formatPrice = ethers.utils.formatUnits(price, 18);
  
  const marketCap = totalSupply.mul(price)
  const formatMarketCap = ethers.utils.formatUnits(marketCap, 18 + 18);
  
  return {
    name,
    symbol,
    totalSupply: formatTotalSupply,
    price: formatPrice,
    marketCap: formatMarketCap
  }

}

export async function getLatest() {
  const latest = await Promise.all(address_list.map(async (addr) => query(addr)))
  return latest
}

