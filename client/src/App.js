import React, { useEffect, useState } from "react";
import Game from "./contracts/Game.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

const App = () => {
  const [gameState, setGameState] = useState({ player_one: "", web3: null, player_two: "", contract: null });

  const initGame = async () => {
    console.log('hi')
    try {
      // Get network provider and web3 instance.
      const web3 = getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Game.networks[networkId];
      const instance = new web3.eth.Contract(
        Game.abi,
        deployedNetwork.address
      );

        console.log(instance)
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setGameState({ web3,  contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }
  useEffect(() => {
    initGame()
  }, []);

    return (
      !gameState.web3 ? <div>Loading Web3, accounts, and contract...</div> :
       <div className="App">
        <h1>Good to Go!</h1>
      </div>
    );
}

export default App;
