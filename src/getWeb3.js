import Web3 from "web3";


const getWeb3 = async () => {
  // const [contract, setContract] = useState();
  let web3;
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
    console.log(web3)
    console.log(accounts)

  } else {
    alert(
      "No wallet detected....  Please install metamasak or any other Wallet!"
    );
  }
  return web3;
};
export default getWeb3;
  
