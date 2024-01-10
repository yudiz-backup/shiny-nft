import React, { useRef, useState } from "react";
import TransactionList from "../../shared/components/transactionList/TransactionList";
import TransactionListMoblie from "../../shared/components/transactionList/TransactionListMoblie";
import prop_computer from "../../assets/images/prop_computer.png";
import "../../assets/styles/styles.css";
import { useQuery } from "react-query";
import { transactionListApi } from "../../query/nft-items/nft-Items.mutation";
//import { GlobalEventsContext } from '../../shared/context/global-event';
import { bottomReached } from "../../shared/utils";
import Helmet from "react-helmet"


export default function Transaction() {
  const isReached = useRef(false);
  const total = useRef(0)
  const [nftArr, setNftArr] = useState([]);
  const [payload, setPayload] = useState({
    limit: 0,
  });

  useQuery(["myNft", payload], () => transactionListApi(payload), {
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      const t = data?.data
      if (t) {
        setNftArr([...nftArr, ...t.transactions]);
        total.current = t?.count?.totalData
        isReached.current = false;
      }
    },
  });


  function handleScroll(e) {
    if (
      bottomReached(e) &&
      !isReached.current &&
      total.current >= nftArr?.length
    ) {
      setPayload({ ...payload, limit: payload.limit + 1 });
      isReached.current = true;
    }
  }

  //console.log(data?.pages);
  return (
    <section className="transaction-page common-container">
      <Helmet title=" Your Transactions" />
        <div className="outer-content-box">
          <div className="inner-box">
            <div className="title-box blue-bg d-lg-none d-block">
              <h4>Transactions</h4>
            </div>
            <div className="row m-0">
              <div className="col-lg-3 col-space d-lg-block d-none">
                <div className="transaction-box">
                  <div className="title-box blue-bg">
                    <h4>Transactions</h4>
                  </div>
                  <div className="imgg-box">
                    <img src={prop_computer} alt="prop_computer" />
                  </div>
                </div>
              </div>
              <div className="col-lg-9 p-0">
                <div className="mCustomScrollbar" data-mcs-theme="dark">
                  <div className="transaction-table csb d-lg-block d-none">
                    <div className="table-responsivee">
                      <table width="100%">
                        <thead>
                          <tr>
                            <th className="date">Date</th>
                            <th className="time">Time</th>
                            <th className="type">Type</th>
                            <th className="item">Item</th>
                            <th className="item">Status</th>
                            <th className="price">Price</th>
                          </tr>
                        </thead>
                        <tbody className="csb" onScroll={handleScroll}>
                          {nftArr?.map((transaction, _id) => (
                            <TransactionList
                              key={_id}
                              transaction={transaction}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="transaction-data-box d-lg-none d-block"
                  onScroll={handleScroll}
                >
                  <ul>
                    {nftArr?.map((transaction, _id) => (
                      <TransactionListMoblie
                        key={_id}
                        transaction={transaction}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
