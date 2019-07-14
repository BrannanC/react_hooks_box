import Web3 from "web3";

const getWeb3 = () => {
  if (window.web3) { // MetaMask - set to false to force localhost
    // Use Mist/MetaMask's provider.
    const web3 = new Web3(window.web3.currentProvider);
    console.log("Injected web3 detected.");
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3.");
    return web3;
  }
};
export default getWeb3;
