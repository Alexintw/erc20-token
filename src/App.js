import React, { useEffect, useState } from "react";
import { initBiconomy } from "./services/biconomy";
import MyTokenABI from "./abis/MyToken.json";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function setup() {
      // replace with your deployed addresses
      const forwarderAddr  = "0xYourForwarderAddress";
      const myTokenAddr    = "0xYourMyTokenAddress";

      const { provider, signer, myToken } = await initBiconomy(
        forwarderAddr,
        myTokenAddr,
        MyTokenABI
      );

      setToken(myToken);
      // now you can call token.transfer(...) gas-lessly
    }

    setup();
  }, []);

  // ... your UI (buttons that call token.transfer, token.permit, etc.)
  return <div>{token ? "Ready to send gasless txs!" : "Loading..."}</div>;
}

export default App;
