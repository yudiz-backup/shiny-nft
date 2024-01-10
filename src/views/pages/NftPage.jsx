import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../assets/styles/styles.css";
import MyNFTs from "../../shared/components/myNFTs";
import StackingYield from "../../shared/components/stacking-yield";
import Helmet from "react-helmet"

export default function MyNftPage() {
  const [nft, setNft] = useState([]);

  return (
    <section className={`common-container no-scrollbar my-nft-page ${nft?.length === 0 && "emptynftpage"}`}>
      <Helmet title="Your Everyday Goddesses"/>
        <div
          // className={`outer-content-box  ${nft?.length === 0 ? "empty-nft-page" : ""}}
          className={`outer-content-box`}
        >
          <div className="inner-box h-100">
            <div className="row flex-md-row flex-column-reverse h-100">
              <div className="col-lg-7 col-space">
                <MyNFTs nft={nft} setNft={setNft} />
              </div>
              <div className="col-lg-5 col-space no-scrollbar d-none d-md-block">
                <StackingYield />
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}

MyNftPage.propTypes = {
  user: PropTypes.object,
};
