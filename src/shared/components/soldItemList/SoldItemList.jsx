import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../../assets/styles/styles.css";

export default function NftBuyItemList({ item }) {
  const ref = useRef(null);
  const [width, setWidth] = useState();

  console.log(width)

  useEffect(() => {
    function updateSize() {
      setWidth(ref.current.offsetWidth);
		}
		window.addEventListener("resize", updateSize)
		updateSize()
		return () => window.removeEventListener("resize", updateSize)

  },[]);

  return (
    <li>
      <div className="img-box shop_img_box" ref={ref} style={{ height: width }} >
        <img src={item.image_preview_url} alt="Images" />
      </div>
      <div className="info-box">
        <h5>{item?.name}</h5>
        {/* <h6>
          {item.eSaleType === "fixed" ? (
            <div>{item.nBasePrice}</div>
          ) : item.eSaleType === "auction" ? (
            <div>{item.nMinBidAmount}</div>
          ) : (
            <div>{item.nPricePerTicket}</div>
          )}
        </h6> */}
      </div>
    </li>
  );
}

NftBuyItemList.propTypes = {
  item: PropTypes.object,
};
