import { React, useState } from 'react'
function NewFundraiser(props) {
  const contract=props.contract;
  const accounts=props.accounts;
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  const handleCreateCard = async () => {
    try {
      if(contract){
        const createnewFundraiser= await contract.methods.createFundraiser(
          name,
          url,
          imageUrl,
          description,
          beneficiary
        ).send({from:accounts[0]})
        alert('Successfully created fundraiser')
      }
    } catch (error) {
        console.log(error);
    }

  }
  return (
    <div className='text-center mt-10 '>
      <form className="w-full max-w-sm border  m-auto p-4 h-full  bg-purple-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  border-gray-100">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3 ">
            <label className="block text-gray-500 font-bold md:text-left   mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="  border-b-2 border-gray-500 bg-inherit w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none  " id="inline-full-name" type="text"
              placeholder='Adam james'
              onChange={(e) => { setName(e.target.value) }} />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-left   mb-1 md:mb-0 pr-4" htmlFor="inline-url">
              Url
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-inherit appearance-none border-b-2 border-gray-500  w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none " id="inline-url" type="text" placeholder="yournamexyz.com"
              onChange={(e) => { setUrl(e.target.value) }} />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-left   mb-1 md:mb-0 pr-4" htmlFor="inline-image-Url">
              ImageUrl
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-inherit appearance-none border-b-2 border-gray-500  w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none " id="inline-image-url" type="link" placeholder="yourpic.png"
              onChange={(e) => { setImageUrl(e.target.value) }} />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-left   mb-1 md:mb-0 pr-4" htmlFor="inline-description">
              Description
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-inherit appearance-none border-b-2 border-gray-500  w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none " id="inline-description" type="text" placeholder="your bio....."
              onChange={(e) => { setDescription(e.target.value) }} />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-left   mb-1 md:mb-0 pr-4" htmlFor="inline-address">
              Address
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="border-b-2 border-gray-500  bg-inherit w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none " id="inline-address" type="address" placeholder="Beneficiary address(0x2....)"
              onChange={(e) => { setBeneficiary(e.target.value) }} />
          </div>
        </div>

        
        <div className="flex createcardbutton justify-center ">
          <div className="justify-self-center ">
            <button className="shadow bg-violet-500 hover:bg-violet-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={handleCreateCard}>
              Create Card
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewFundraiser