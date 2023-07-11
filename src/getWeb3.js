import Web3 from "web3";


const getWeb3 = async () => {
  // const [contract, setContract] = useState();
  let web3;
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    console.log(web3)
  } else {
    alert(
      "No wallet detected....  Please install metamasak or any other Wallet!"
    );
  }
  return web3;
};
export default getWeb3;
  
