import React from 'react'

function Modal(props) {
  const isVisible = props.isVisible;
  const setShowModal = props.setShowModal;
  const {children} =props;
  if (!isVisible) { return null; }
  const handleClose=(e)=>{
    if(e.target.id === "wrapper")
    setShowModal(false);
  }
  return (
    <div className='fixed left-0 right-0 w-full inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center m-1 ' id='wrapper' onClick={handleClose}>
      <div className="md:w-[500px] flex flex-col ">
        <button className='text-white text-xl place-self-end pr-2 '
          onClick={() => setShowModal(false)}>X</button>
        <div className=' bg-white  p-2 rounded-lg'>
          {children}

        </div>
      </div>
    </div>
  )
}

export default Modal