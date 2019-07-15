import React, { useEffect, useState, useCallback } from "react";
import SimpleCounter from "./contracts/SimpleCounter.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

const App = () => {
  const [counterState, setCounterState] = useState({
    count: 0,
    web3: null,
    contract: null,
    account: ""
  });

  const getCount = useCallback(async () => {
    const count = await counterState.contract.methods.count().call();
    setCounterState({ ...counterState, count: count.toNumber() });
  }, [counterState]);

  const initCounter = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleCounter.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleCounter.abi,
        deployedNetwork.address
      );

      let count = await instance.methods.count().call();
      const account = instance.givenProvider.selectedAddress;
          
      count = count ? count.toNumber() : 0;

      setCounterState({
        web3,
        contract: instance,
        count,
        account
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const addCount = async e => {
    e.preventDefault();
    console.log(counterState.account)
    await counterState.contract.methods
      .addCount()
      .send({ from: counterState.account });
  };

  useEffect(() => {
    initCounter();
  }, []);

  useEffect(() => { // Gets a new count on AddCount event
    if (counterState.contract)
      counterState.contract.events
        .AddCount({
          fromBlock: "latest"
        })
        .on("data", event => {
          getCount();
        });
  }, [counterState.contract, getCount]);

  return !counterState.web3 ? (
    <div>Loading Web3, accounts, and contract...</div>
  ) : (
    <div className="App">
      <h1>Happy Hacking!</h1>
      <h3>Count: {counterState.count}</h3>
      <button onClick={e => addCount(e)}>Count++</button>
    </div>
  );
};

export default App;
