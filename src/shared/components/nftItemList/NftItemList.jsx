import PropTypes from "prop-types";
import "../../../assets/styles/styles.css";
import CatogeryItems from "./CatogeryItems";

export default function NftItemList({ nft, tickets }) {
  //console.log("nfttttt", nft);

  return (
    <>
      <>
        {nft?.Nfts?.length === 0 ? "" : (
          <>
            <div className="heading">
              <h3>{nft?.sCategoryName}</h3>
            </div>
            <ul className="goddess-product-list">
              {nft?._id && (
                <>
                  {nft?.Nfts?.map((nfts, _id) => (
                    <CatogeryItems tickets={tickets} nft={nfts} key={_id} />
                  ))}
                </>
              )}
            </ul>
          </>
        )}
      </>
    </>
  );
}

NftItemList.propTypes = {
  nft: PropTypes.object,
  tickets: PropTypes.array,
};
