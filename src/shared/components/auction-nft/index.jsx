import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import NFTBox from "../nft-box";
import { toast } from "react-toastify";
import CountDown from "../auction-bid-timer/index";
import { TOAST_OPTIONS } from "../../constants";
import { useMutation } from "react-query";
import { bidNFTApi } from "../../../query/nft/nft.mutation";
import { GlobalEventsContext } from "../../context/global-event";
import Modal from 'react-bootstrap/Modal';

function AuctionNFT({ nft, handleBuy }) {
  const [topBid, setTopBid] = useState(nft?.nMinBidAmount);
  const [show, setShow] = useState(false)
  const [captureClick,setCaptureClick] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }
  const inputRef = useRef(null);
  const { dispatch } = useContext(GlobalEventsContext);
  const {
    state: { user },
  } = useContext(GlobalEventsContext);

  const { mutate } = useMutation(bidNFTApi, {
    onSuccess: ({ data }) => {
      const amount = Number(inputRef.current.value);
      setTopBid(inputRef.current.value);
      setCaptureClick(true);
      dispatch({
        type: "USER_PROFILE",
        payload: { ...user, balance: user?.balance - amount },
      });
      // dispatch({
      //   type: "CLIENT_PROFILE",
      //   payload: { ...client, balance: client?.balance - amount },
      // });
      inputRef.current.value = "";
      toast.success(data?.message, TOAST_OPTIONS);
      handleClose()
    },
  });

  function handleClick(id) {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        toast.error("Please Login", TOAST_OPTIONS);
      } else {
        if (topBid < inputRef.current.value) {
          if (user && user?.balance >= inputRef.current.value) {
            onBuy();
            handleBuy(id, inputRef.current.value);
          } else {
            toast.error(
              "Your Token Balance is less than Base Price",
              TOAST_OPTIONS
            );
          }
        } else {
          toast.error(`Minimum bid price is: ${topBid}`, TOAST_OPTIONS);
        }
      }
    } catch (error) {
      toast.error(error, TOAST_OPTIONS);
    }
  }

  function onBuy() {
    mutate({ id: nft._id, nAmount: inputRef.current.value });
    onBuy && handleBuy(nft._id, inputRef.current.value);
  }
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  return (
    <>
      <NFTBox NFTBox nft={nft}>
        {/* <h6>{nft?.eSaleType === "auction" && "Auction"}</h6> */}
        <h6 style={{ display: "flex", justifyContent: "space-between" }}>
          Min Bid : {Number(topBid) + 1}
          <div>
            <CountDown nft={nft} captureClick={captureClick}/>
          </div>
        </h6>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-box">
            <input
              ref={inputRef}
              required
              name="bidAmount"
              type="number"
              className="form-control-box"
              placeholder="Bid Amount..."
              onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
            />
            <div className={`active-btn-box ${user ? '' : 'disabled'}`}>
              <button onClick={handleShow} className="active-btn" type="submit">
                Bid
              </button>
            </div>
          </div>
        </form>
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
              <h4>Place a { inputRef?.current?.value } $BOBA bid on Everyday Goddesses {nft?.sTitle}?</h4>
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
  );
}
AuctionNFT.propTypes = {
  nft: PropTypes.object,
  handleBuy: PropTypes.func,
};
export default AuctionNFT;
