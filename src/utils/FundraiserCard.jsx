import React, { useContext, useEffect, useState } from "react";
import { web3Context } from "../App";
import { FundraiserABI } from "./ABI";
import Modal from "./Modal.jsx";
import cc from 'cryptocompare'
import { Link } from "react-router-dom";
function FundraiserCard(props) {

  const web3 = useContext(web3Context);
  const { fundraisers } = props;
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [beneficiary, setBeneficiary] = useState();
  const [description, setDescription] = useState();
  const [contract, setContract] = useState();
  const [accounts, setAccounts] = useState();
  const [amount, setAmount] = useState();
  const [totalDonations, setTotalDonations] = useState(0);
  const [totaldonationCount, setTotaldonationCount] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [mydonations, setmyDonations] = useState();
  const [mydonationsCount, setMyDonationsCount] = useState();
  const [showModal, setShowModal] = useState(false)
  const [exchangeRate, setExchangeRate] = useState();
  const [ethvalue, setEthvalue] = useState(0);
  const [isOWner, setIsOWner] = useState(false)

  useEffect(() => {
    if (fundraisers) {
      init();
    }
  }, [fundraisers]);
  const init = async () => {
    try {
      const fundraiser = fundraisers;
      if (fundraiser) {

        const Fundraiser = new web3.eth.Contract(FundraiserABI, fundraiser);
        const accounts = await web3.eth.getAccounts();
        const name = await Fundraiser.methods.name().call();
        const url = await Fundraiser.methods.url().call();
        const imageUrl = await Fundraiser.methods.imageUrl().call();
        const description = await Fundraiser.methods.description().call();
        const beneficiary = await Fundraiser.methods.beneficiary().call();
        const mydontaionsCount = await Fundraiser.methods.mydonationsCount().call({ from: accounts[0] });
        const totaldonations = await Fundraiser.methods.totalDonations().call();
        const isOwner = await Fundraiser.methods.owner().call();
        if (isOwner === accounts[0]) {
          setIsOWner(true);
        }
        setMyDonationsCount(mydontaionsCount);
        const mydontaions = await Fundraiser.methods.mydonations().call({ from: accounts[0] });
        setmyDonations(mydontaions);
        const totaldonEth = web3.utils.fromWei(totaldonations, "ether");
        const ExchangeRate = await cc.price('ETH', ['USD'])
        setExchangeRate(ExchangeRate.USD);
        const dollarTotalAmount = ExchangeRate.USD * totaldonEth;
        setTotalDonations(dollarTotalAmount);
        const totaldonationCount = await Fundraiser.methods
          .totaldonationCount()
          .call();
        setTotaldonationCount(web3.utils.toNumber(totaldonationCount));
        setContract(Fundraiser);
        setAccounts(accounts);
        setName(name);
        setUrl(url);
        setImageUrl(imageUrl);
        setDescription(description);
        setBeneficiary(beneficiary);
      }
    } catch (error) {
      console.log(error);
    }
  };
  window.ethereum.on("accountsChanged", () => {
    window.location.reload();
  });

  const handleDonate = async () => {
    try {
      const ethRate = exchangeRate;
      const ethTotal = amount / ethRate;
      const Ethtotalinwei = web3.utils.toWei(ethTotal, 'ether');
      console.log(Ethtotalinwei);
      const donationDone = await contract.methods
        .donate()
        .send({ from: accounts[0], value: Ethtotalinwei });
      alert("Donation is done", donationDone);
    } catch (error) {
      console.log(error);
    }
  };

  const renderDonationsList = () => {
    let donations = mydonations;
    if (donations === null) {
      return null;
    }
    let donationList = [];
    for (let i = 0; i < donations.dates.length; i++) {
      const amountinWei = donations[0][i];
      const amount = web3.utils.fromWei(amountinWei, "ether");
      const AmountUsd = exchangeRate * amount;
      const date = donations.dates[i];
      console.log(AmountUsd)
      donationList.push({ donationAmount: Number(AmountUsd).toFixed(3), date: date });
    }

    if (donationList.length == 0) {
      return (
        <div className="text-black font-mono"> 0 USD </div>
      );
    }
    return donationList.map((donation, id) => {
      return (
        <div className="m-2">
          <div className="donationList md:flex  justify-between">
            <div className="child1 mx-4 mt-1">
              <span >  {id + 1}:</span>
              <span > ${donation.donationAmount}  </span>
            </div>
            <div className="child2 mx-4 mt-1 flex">
              <button className="bg-blue-500 hover:bg-blue-700 rounded text-white px-1" >
                <Link
                  to={"receipt"}
                  state={{ donation: donation.donationAmount, date: donation.date }}
                >
                  Receipt
                </Link>
              </button>
            </div>
          </div>
        </div>
      )
    })
  };

  const handleWithdraw = async () => {
    console.log(beneficiary);
    await contract.methods.withdraw().send({ from: accounts[0] })
    alert("Funds has been withdrawned")
  }
  return (
    <>
      <div
        className="FundraiserCard transition duration-300 transform rounded shadow-lg hover:shadow-gray-800 hover:shadow-lg m-4  "
        id={fundraisers}
      >
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className=" w-auto"
            src={
              !imageError
                ? imageUrl
                : "https://animalia-life.com/data_images/monkey/monkey5.jpg"
            }
            width={"100px"}
            onError={() => {
              setImageError(true);
            }}
            alt={imageUrl}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{name}</div>
            <p className="text-gray-700 text-base">{description}</p>
          </div>


          <div className="md:w-full">
            <button
              className="button bg-pink-500 rounded text-white font-serif text-m px-2 py-1 m-2 "
              onClick={() => setShowModal(true)}
            >
              Show more
            </button>
          </div>


          <a href={url} className="text-blue-400 " target="_blank">
            <u>{url}</u>{" "}
          </a>
          <div className="m-1 font-serif text-center flex-column 
          justify-center">
            <div className="px-2 py-1 ">
              Total Donations:{" "}
              <b className=" px-1 font-mono">${totalDonations}</b>
            </div>
            <div className="px-2 py-1">
              Donation Count: <b className="px-1 font-mono">{totaldonationCount}</b>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 z-50">
        <Modal isVisible={showModal} setShowModal={setShowModal} >
          <div className="p-6">
            <img
              className="w-full w-74"
              src={
                !imageError
                  ? imageUrl
                  : "https://animalia-life.com/data_images/monkey/monkey5.jpg"
              }
              onError={() => {
                setImageError(true);
              }}
              alt={imageUrl}
            />
            <h1 className='text-xl font-semibold'>{name}</h1>
            <p>{description}</p>

            <div className="md:flex  mt-6 items-center ">
              <div className="md:w-1/4">
                <label className="block  text-gray-500 font-bold md:text-right mb-1 md:mb-0 mr-2">
                  Amount
                </label>
              </div>
              <div className="md:w-2/4">
                <input
                  className="border-b-2 border-gray-400 focus:outline-none"
                  id="inline-full-name"
                  type="text"
                  placeholder="$Donation(USD)"
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setEthvalue((e.target.value) / exchangeRate);
                  }}
                />

              </div>
              <div className="md:w-1/4">

                <button className='btn bg-blue-500 hover:bg-blue-700 focus:outline-none rounded p-1 text-white  font-serif ' onClick={handleDonate}>Donate</button>
              </div>
              <div className="w-1/4 p-1 font-mono font-medium">

                <p>ETH:{Number(ethvalue).toFixed(2)} </p>
              </div>
            </div>
          </div>
          <div className={`p-2  mx-7 flex justify-between`}>
            <label className=" text-gray-500 font-bold md:mb-0 mr-2 text-left">
              Yourdonations:
            </label>
            <div className="renderdonationList md:w-full text-gray-500 font-serif ">
              {showModal && renderDonationsList()}
            </div>
          </div>
          <div className="OnlyOwner-Withdraw  text-center">
            {isOWner && <button className="button bg-red-400 rounded p-1 m-1 text-white" onClick={handleWithdraw}>Withdraw</button>}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default FundraiserCard;
