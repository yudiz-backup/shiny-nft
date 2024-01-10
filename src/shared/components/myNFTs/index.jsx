import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { useQuery } from "react-query";
import { getMyNFTS } from "../../../query/nft-items/nft-Items.mutation";
import { GlobalEventsContext } from "../../context/global-event";
import { bottomReached } from "../../utils";
import NftBuyItemList from "../soldItemList/SoldItemList";
import looksrare_seeklogo from "../../../assets/images/looksrare-seeklogo.svg";
import subtract_blue from "../../../assets/images/Subtract-blue.svg";

function MyNFTs({nft,setNft}) {
  const isReached = useRef(false);

  const {
    state: { user },
  } = useContext(GlobalEventsContext);
  const [payload, setPayload] = useState({
    limit: 10,
    address: user?.sWalletAddress || localStorage.getItem("wallet"),
  });

  useEffect(() => {
    if (user?.sWalletAddress) {
      setPayload({ ...payload, address: user?.sWalletAddress });
    }
  }, [user]);

  useQuery(["myNFT", payload], () => getMyNFTS(payload), {
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      setNft(data.assets);
      isReached.current = false;
    },
  });
  function handleScroll(e) {
    if (
      bottomReached(e) &&
      !isReached.current &&
      nft?.length === payload?.limit
    ) {
      setPayload({ ...payload, limit: payload.limit + 10 });
      isReached.current = true;
    }
  }
  return (
    <>
      <div
        className={`your-goddess-box h-100 ${
          nft?.length === 0 ? "empty-nft-page" : ""
        }`}
      >
        <div className="title-box blue-bg">
          <h4>Your Goddesses</h4>
        </div>
        <div
          className="csb goddess-product-list-box remove-csb"
          onScroll={handleScroll}
        >
          <ul className="goddess-product-list">
            {nft?.map((item, index) => (
              <NftBuyItemList key={index} item={item} />
            ))}
          </ul>
        </div>
        {nft?.length === 0 && (
          <div className="empty-nft">
            <h1>Buy a Goddess to start earning $BOBA</h1>
            <div className="imgbox">
              <a href="https://looksrare.org/collections/0x9176E11a412b6Ef5E8DDB045909a14112f7782b2" target="_blank" rel="noreferrer noopener">
                <img src={looksrare_seeklogo} alt="looksrare-seeklogo" />
              </a>
              <a href="https://opensea.io/collection/everyday-goddesses" target="_blank" rel="noreferrer noopener">
                <img src={subtract_blue} alt="Subtract" />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

MyNFTs.propTypes={
  nft:PropTypes.array,setNft:PropTypes.func
}
export default MyNFTs;
