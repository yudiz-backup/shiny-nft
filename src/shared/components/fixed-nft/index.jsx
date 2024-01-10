import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import NFTBox from "../nft-box";
import { toast } from "react-toastify";
import { GlobalEventsContext } from "../../context/global-event";
import { TOAST_OPTIONS } from "../../constants";
import { useMutation } from "react-query";
import { buyFixedNFTApi } from "../../../query/nft/nft.mutation";
import { useNavigate } from "react-router";
import Modal from 'react-bootstrap/Modal';

function FixedNFT({ nft, handleBuy, tickets = [] }) {
  const { dispatch } = useContext(GlobalEventsContext)
  const { state: { user } } = useContext(GlobalEventsContext)
  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  const [quantity,setQuantity] = useState(0)
  const [remainingQuantity,setRemainingQuantity] = useState(nft?.nRemainingQuantity)
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }

  useEffect(() => {
    tickets.forEach((e) => {
      if (e?._id === nft?._id) {
        setQuantity(e?.nQuantity || 0) 
        setRemainingQuantity(nft?.nRemainingQuantity || 0)
      } 
    })
  }, [tickets])

  const { mutate } = useMutation(buyFixedNFTApi, {
    onSuccess: ({ data }) => {
      dispatch({ type: 'USER_PROFILE', payload: { ...user, balance: user?.balance - nft?.nBasePrice } })
      // dispatch({
      //   type: 'CLIENT_PROFILE',
      //   payload: { ...client, balance: client?.balance - nft?.nBasePrice },
      // });
      toast.success(data?.message, TOAST_OPTIONS);
      if(nft?.nQuantity - nft?.nRemainingQuantity === nft?.nQuantityPerUser)
      {
        navigate("/your-transactions");
      }else{
        handleClose()
        //window.location.reload()
      }
    }
  })

  function handleClick(id,nQuantity) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login", TOAST_OPTIONS);
    } else {
      if (user && user.balance >= nft?.nBasePrice) {
        onBuy(id,nQuantity);
        setQuantity(quantity + 1)
        setRemainingQuantity(remainingQuantity - 1)
      } else {
        toast.error(
          "Your Token Balance is less than Base Price",
          TOAST_OPTIONS
        );
      }
    }
  }

  function onBuy() {
    mutate({id : nft?._id,nQuantity : 1} )
    handleBuy && handleBuy(nft?._id,nft?.nQuantity);
  }

  return (
    <>
      <NFTBox nft={nft} quantity={quantity} remainingQuantity={remainingQuantity}>
        <div className={`active-btn-box large-btn shop-button ff 
                        ${user && 
                        quantity !== nft?.nQuantityPerUser && 
                        nft?.nRemainingQuantity !== 0 ? '' : 
                        'disabled'}`}>
          <button
            className="active-btn"
            type="button"
            onClick={handleShow}
          >
            Buy Now
          </button>
        </div>
      </NFTBox>
      <Modal show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
          <Modal.Body>
            <div className="title-box">
              <h5>Confirm Purchase </h5>
              <h4>Purchase {nft?.sTitle} for {nft?.nBasePrice} $BOBA?</h4>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <button type="button" onClick={handleClose} className='active-btn outline-btn'>
                Cancel
            </button>
            <div className={`active-btn-box  ff`}>
              <button
                className="active-btn"
                type="button"
                onClick={handleClick}
              >
                Confirm
              </button>
            </div>
          </Modal.Footer>
      </Modal>
    </>
  )
}
FixedNFT.propTypes = {
  nft: PropTypes.object,
  tickets : PropTypes.array,
  handleBuy: PropTypes.func
}
export default FixedNFT