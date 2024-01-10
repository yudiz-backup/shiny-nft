import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'

function NFTBox({ nft, children, quantity, remainingQuantity}) {
  const ref = useRef(null);
  const [width, setWidth] = useState();
  
  //console.log(width)

  useEffect(() => {
    function updateSize() {
      setWidth(ref.current.offsetWidth);
		}
		window.addEventListener("resize", updateSize)
		updateSize()
	return () => window.removeEventListener("resize", updateSize)

  },[]);
  
  return (
    <>
      <div className='img-box shop_img_box position-relative hover-desc-box' ref={ref} style={{ height: width }}>
        <img src={nft?.sImage} alt='sneakpeek_avatar' />
        <div className="hover-descinfo team-info text-center">
          <p>{nft?.sDescription}</p>
        </div>
      </div>
      <div className='info-box'>
        <h5 className="nft-title-box">{nft.sTitle}</h5>
        {nft?.eSaleType === "fixed" &&
          <h6 className="nft-fixedsale-wrapper">
            <span className="color-primary">{"Fixed Sale"}</span>
            <span>{remainingQuantity}/{nft?.nQuantity} in stock</span>
          </h6>   
        }
        {nft?.eSaleType === "fixed" && <h6 className="nft-fixedsale-wrapper">
          <span>{nft.nBasePrice} {"$BOBA"}</span>
          <span> {quantity} /
                {nft?.nQuantityPerUser} bought</span>
        </h6>}
        {children}
      </div>
    </>
  );
}
NFTBox.propTypes = {
  nft: PropTypes.object,
  quantity:PropTypes.number,
  remainingQuantity:PropTypes.number,
  children: PropTypes.node.isRequired,
}
export default NFTBox