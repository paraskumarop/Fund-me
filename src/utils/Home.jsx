import { React, useEffect, useState } from 'react'
import FundraiserCard from './FundraiserCard';
import { ABI, Address } from './ABI';
// import Web3 from 'web3'
function Home(props) {
  const web3=props.web3;
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal,setShowModal] =useState(false);
  useEffect(() => {
    (async () => {
      try {
          if(web3){
            const contract = new web3.eth.Contract(ABI, Address);
            const funds = await contract.methods.fundraisers(10, 0).call();
            setLoading(true);
            setFunds(funds);
            setLoading(false);
          }
          
       
      } catch (error) {
        console.error('There is an error in Home' + error);
      }
    })();

  }, [])


  const displayFunction = () => {
    try {
      return funds.map((fundreraises) => {
        return (
          <FundraiserCard fundraisers={fundreraises} key={fundreraises} />
        )
      });
    } catch (error) {
      return (<div>{error}</div>)
    }
  }

  return (
    <>
      <div className='homeForm text-center  flex flex-wrap m-3 '>
        {(!loading && (funds)) && displayFunction()}
      </div>
    </>
  )
}

export default Home