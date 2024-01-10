import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import NFTBox from "../nft-box";
import { toast } from "react-toastify";
import { INFINITY_NUMBER, TOAST_OPTIONS } from "../../constants";
import { GlobalEventsContext } from "../../context/global-event";
import { buyRaffleNFTApi } from "../../../query/nft/nft.mutation";
import { useMutation } from "react-query";
import { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';

function RaffleNFT({ nft, handleBuy, tickets = [] }) {
  const [quantity, setQuantity] = useState(1);
  const [bought, setBought] = useState(0);
  const [ticketAmount, setTicketAmount] = useState(nft?.nPricePerTicket);
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }
  const { dispatch } = useContext(GlobalEventsContext);
  const {
    state: { user },
  } = useContext(GlobalEventsContext);

  const { mutate } = useMutation(buyRaffleNFTApi, {
    onSuccess: ({ data }) => {
      dispatch({
        type: "USER_PROFILE",
        payload: { ...user, balance: user?.balance - ticketAmount },
      });
      // dispatch({
      //   type: "CLIENT_PROFILE",
      //   payload: { ...client, balance: client?.balance - ticketAmount },
      // });
      //console.log(bought, quantity, bought + quantity)
      setBought(bought + quantity)
      setQuantity(1);
      setTicketAmount(nft?.nPricePerTicket);
      toast.success(data?.message, TOAST_OPTIONS);
      handleClose()
    },
  });

  useEffect(() => {
    tickets.forEach((e) => {
      if (e?._id === nft?._id) setBought(e?.nTicketBought || 0)
    })
  }, [tickets])

  function handleClick(id) {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        toast.error("Please Login", TOAST_OPTIONS);
      } else {
        if (user && user.balance >= ticketAmount) {
          onBuy();
          handleBuy(id, quantity, ticketAmount)
        } else {
          toast.error(
            "Your Token Balance is less than Base Price",
            TOAST_OPTIONS
          );
        }
      }
    } catch (error) {
      toast.error(error, TOAST_OPTIONS);
    }
  }

  const handleDecrement = () => {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
      setTicketAmount(ticketAmount);
    }
  };

  const handleIncrement = () => {
    if (quantity <= nft?.nTicketsPerUser) {
      setQuantity(quantity + 1);
      setTicketAmount(ticketAmount);
    }
  };

  function onBuy() {
    mutate({ id: nft?._id, nQuantity: quantity });
    handleBuy && handleBuy(nft?._id, quantity, ticketAmount);
  }

  return (
    <>
      <NFTBox nft={nft}>
        <div className="raffle-nft">
          {/* <h6>{nft?.eSaleType === "raffle" && "Raffle"}</h6> */}
          <h6 style={{ display: "flex", justifyContent: "space-around" }}>
            {quantity > nft?.nTicketsPerUser ? (
              <>{ticketAmount * nft?.nTicketsPerUser} $BOBA</>
            ) : (
              <>{ticketAmount * quantity} $BOBA</>
            )}
            <div>
              {bought}/{nft?.nTicketsPerUser === INFINITY_NUMBER ? '∞' : nft?.nTicketsPerUser} bought
              {/* {quantity === "" && "0"}
              {quantity >= nft?.nTicketsPerUser ? (
                <>
                  {nft?.nTicketsPerUser}/{nft?.nTicketsPerUser} bought
                </>
              ) : (
                <>
                  {quantity}/{nft?.nTicketsPerUser} bought{" "}
                </>
              )} */}
            </div>
          </h6>
          <div className="inc-dec-box">
            <div className="min-plus-btn">
              <button
                className="dec-btn"
                type="button"
                onClick={handleDecrement}
                disabled={quantity === 0}
              >
                -
              </button>
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  required
                  name="quantity"
                  value={quantity}
                  type="number"
                  className="inc-number-box"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </form>
              <button
                className="inc-btn"
                type="button"
                onClick={handleIncrement}
                disabled={quantity === nft?.nTicketsPerUser}
              >
                +
              </button>
            </div>
            <div className={`active-btn-box mt-0 ${user && 
                        bought !== nft?.nTicketsPerUser && 
                        nft?.nCountOfTickets !== 0 ? '' : 'disabled'}`}>
              <button
                className="active-btn shopbtn"
                type="button"
                onClick={handleShow}
                disabled={quantity === 0}
              >
                Buy Tickets
              </button>
            </div>
          </div>
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
              <h4>Purchase {nft?.sTitle} for  {quantity > nft?.nTicketsPerUser ? (
              <>{ticketAmount * nft?.nTicketsPerUser}</>
            ) : (
              <>{ticketAmount * quantity}</>
            )} $BOBA?</h4>
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
RaffleNFT.propTypes = {
  nft: PropTypes.object,
  handleBuy: PropTypes.func,
  tickets: PropTypes.array,
};
export default RaffleNFT;
