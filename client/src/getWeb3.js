import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3.");
    resolve(web3);
  });

export default getWeb3;
