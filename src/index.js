import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Biconomy } from '@biconomy/mexa';
import { ethers } from 'ethers';
import MyTokenABI from './abis/MyToken.json';

function App() {
  const [myToken, setMyToken] = useState(null);

  useEffect(() => {
    async function init() {
      // 1. Request user wallet access
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // 2. Wrap MetaMask provider with Biconomy
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const biconomy = new Biconomy(provider.provider, {
        apiKey: '<YOUR_BICONOMY_API_KEY>',
        debug: true,
        contractAddresses: ['0xYourMyTokenAddress'],
        forwarder: '0xYourForwarderAddress'
      });
      await biconomy.init();

      // 3. Get a signer that uses the relayer under the hood
      const signer = biconomy.ethersProvider.getSigner();

      // 4. Instantiate your token contract
      const token = new ethers.Contract(
        '0xYourMyTokenAddress',
        MyTokenABI,
        signer
      );

      setMyToken(token);
    }
    init();
  }, []);

  const handleGaslessTransfer = async () => {
    if (!myToken) return;
    const recipient = prompt('Enter recipient address:');
    const rawAmt   = prompt('Enter amount to send:');
    const amount   = ethers.utils.parseUnits(rawAmt || '0', 18);

    try {
      const tx = await myToken.transfer(recipient, amount);
      console.log('Relayed tx hash →', tx.hash);
      alert(`Transaction submitted: ${tx.hash}`);
    } catch (err) {
      console.error(err);
      alert('Transfer failed: ' + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {myToken ? (
        <button onClick={handleGaslessTransfer}>
          Send Gasless MTK Transfer
        </button>
      ) : (
        <p>Initializing Biconomy…</p>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
