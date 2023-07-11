import "./App.css";
import { createContext, useEffect, useState } from "react";
import getWeb3 from "./getWeb3";
import { ABI, Address } from "./utils/ABI";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Root from "./utils/Root";
import NewFundraiser from "./utils/NewFundraiser";
import Receipt from "./utils/Receipt";
import Home from "./utils/Home";
import ErrorPage from "./ErrorPage";


export const web3Context=createContext();
function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState();
  const [accounts, setAccounts] = useState();
  const [web3loading, setWeb3Loading] = useState(false)
  useEffect(() => {
    try {
      
      (async () => {
        setWeb3Loading(true);
        const Web3 = await getWeb3();
        setWeb3(Web3);
        const accounts = await Web3.eth.getAccounts();
        setAccounts(accounts[0]);
        setWeb3Loading(false);
        const contract = new Web3.eth.Contract(ABI, Address);
        setContract(contract);
      })();
    } catch (error) {
        console.log(error)
    }

    // eslint-disable-next-line
  }, []);

  const router=createBrowserRouter([
    {
      path:'/',
      element:<Root accounts={accounts} web3loading={web3loading}/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          index:true,
          path:'/',
          element:<Home web3loading={web3loading} web3={web3}/>
        },
        {
          path:'new',
          element:<NewFundraiser contract={contract} web3={web3} accounts={accounts}/>
        }
      ]
    },
         {
          path:'/receipt',
          element:<Receipt/>
        }
    
  ])

  return (
      <web3Context.Provider value={web3}>
            <RouterProvider router={router} />
      </web3Context.Provider>
  );
}

export default App;
