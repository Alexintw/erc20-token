import { Biconomy } from "@biconomy/mexa";
import { ethers } from "ethers";

let biconomy, provider, signer, myToken;

export async function initBiconomy(forwarderAddress, myTokenAddress, myTokenABI) {
  // 1. set up your base provider (e.g. MetaMask’s window.ethereum)
  provider = new ethers.providers.Web3Provider(window.ethereum);

  // 2. wrap it with Biconomy
  biconomy = new Biconomy(provider.provider, {
    apiKey: "<YOUR_BICONOMY_API_KEY>",
    debug: true,
    contractAddresses: [ myTokenAddress ],
    forwarder: forwarderAddress
  });

  await biconomy.init();

  // 3. grab the relayer-aware signer
  signer = biconomy.ethersProvider.getSigner();

  // 4. instantiate your token contract
  myToken = new ethers.Contract(myTokenAddress, myTokenABI, signer);

  return { provider: biconomy.ethersProvider, signer, myToken };
}
