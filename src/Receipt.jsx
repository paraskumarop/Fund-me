import { React, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import bgImage from "./utils/bg.svg"

function Receipt(props) {
  const location = useLocation();
  const [donation, setDonation] = useState(null)
  const [date, setDate] = useState(null)

  useEffect(() => {
    if (location.state) {
      const { donation } = location.state;
      const { date } = location.state;
      const dte = new Date(parseInt(date))
      setDate(dte.toString());
      setDonation(donation);
    }

  }, [date])

  // console.log(donation);
  // const [fundName, setFundName] = useState(null)



  return (

    <div style={{backgroundImage: `URL(${bgImage})`,  backgroundRepeat: 'no-repeat',backgroundSize:"contain", }}>
      <div className='flex-col justify-center align-middle p-10 m-10'  >
        <h1 className='text-4xl font-bold font-serif text-center'>Thanks for Donation</h1>
        <p className='mt-2 text-lg'>  Amount: ${donation} </p>
        <p className='mt-2 text-lg'>  Date: {date} </p>
      </div>
      <div className='p-10 m-10'>
      <Link to="/" className='text-white bg-blue-700 rounded p-1 m-1'> Back</Link>
      </div>
    </div>
  )
}

export default Receipt