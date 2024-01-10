import React, { useRef } from "react";
import { useQuery } from "react-query";
import { catogeryItemsListApi } from "../../query/nft-items/nft-Items.mutation";
import NftItemList from "../../shared/components/nftItemList/NftItemList";
import ice_cream_cup from "../../assets/images/ice-cream-cup.png";
import "../../assets/styles/styles.css";
import { useState } from "react";
import { bottomReached } from "../../shared/utils";
import Helmet from "react-helmet"


export default function ShopPage() {
  const isReached = useRef(false);
  const totalData = useRef(0)
  const [nftArr, setNftArr] = useState([]);
  const [tickets, setTickets] = useState([])
  const [payload, setPayload] = useState({
    limit: 0,
  });

  useQuery(["byCategory", payload], () => catogeryItemsListApi(payload), {
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      totalData.current = data?.data?.result?.count?.totalData
      if (data?.data?.result) {
        setNftArr([...nftArr, ...data.data.result.nfts]);
        setTickets(data.data.aTickets)
      }
      isReached.current = false;
    },
  });
  function handleScroll(e) {
    if (
      bottomReached(e) &&
      !isReached.current &&
      totalData.current >= nftArr?.length
    ) {
      setPayload({ ...payload, limit: payload.limit + 1 });
      isReached.current = true;
    }
  }

  return (
    <>
    <Helmet title="Everyday Goddesses Boba Shop" />
      <section className="shop-page common-container" onScroll={handleScroll}>
        <div className="outer-content-box">
          <div className="inner-box">
            <div className="row">
              <div className="col-lg-8 col-space">
                <div className="your-goddess-box">
                  <div className="title-box pink-bg big-pink">
                    <h4>Boba Shop</h4>
                  </div>
                  <div className="mCustomScrollbar">
                    <div
                      className="csb goddess-product-list-box"
                      onScroll={handleScroll}
                    >
                      {nftArr?.map((nfts, _id) => (
                        <NftItemList tickets={tickets} key={_id} nft={nfts} id={_id} />
                      ))}
                      {/* {isLoading && (
                        <div className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 ">
                <div className="ice-img-box">
                  <img src={ice_cream_cup} alt="ice-cream-cup" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
