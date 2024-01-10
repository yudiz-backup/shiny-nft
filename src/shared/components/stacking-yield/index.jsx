import React, { useContext } from "react"
import ice_cream from "../../../assets/images/ice-cream.png";
import { GlobalEventsContext } from "../../context/global-event";

function StackingYield() {
  const { state: { user } } = useContext(GlobalEventsContext); //client

  const TAG = [
    { key: 'tag1', price: 10 },
    { key: 'tag2', price: 25 },
    { key: 'tag3', price: 50 },
    { key: 'tag4', price: 75 },
    { key: 'tag5', price: 50 },
    { key: 'tag6', price: 100 },
    { key: 'tag7', price: 150 },
  ]

  function sortYield(data = []) {
    const yields = {}
    data.forEach((e) => {
      const key = TAG[Number(e.tag) - 1].key
      if (yields[key]) yields[key].push(e)
      else yields[key] = [e]
    })
    return yields
  }

  function getTotal(data) {
    let t = 0;
    TAG.forEach((e) => {
      const k = data[e.key] ? (data[e.key]?.length * e?.price) : 0
      t += k
    })
    return t
  }

  const data = sortYield(user?.Assets)
  const total = getTotal(data)
  return (
    <div className="stacking-yield">
      <div className="title-box blue-bg">
        <h4>Staking Yield</h4>
      </div>
      <div className="stacking-inner csb remove-csb">
        <ul className="stacking-yield-item">
          {data?.tag7 && (
            <li>
              <label htmlFor="">Tier 1 - Staked over 60 days</label>
              <div className="ice-box">
                <ul>
                  {data?.tag7?.map(e => (
                    <li key={e?.token_id}>
                      <img src={ice_cream} alt="ice-cream" />
                    </li>
                  ))}
                </ul>
                <h5 className="price-box">+{TAG[6].price * data?.tag7?.length}</h5>
              </div>
            </li>
          )}
          {data?.tag6 && (
            <li>
              <label htmlFor="">Tier 2 - Staked over 30 days</label>
              <div className="ice-box">
                <ul>
                  {data?.tag6?.map(e => (
                    <li key={e?.token_id}>
                      <img src={ice_cream} alt="ice-cream" />
                    </li>
                  ))}
                </ul>
                <h5 className="price-box">+{TAG[5].price * data?.tag6?.length}</h5>
              </div>
            </li>
          )}
          {data?.tag5 && (
            <li>
              <label htmlFor="">Tier 3 - Staked under 30 days</label>
              <div className="ice-box">
                <ul>
                  {data?.tag5?.map(e => (
                    <li key={e?.token_id}>
                      <img src={ice_cream} alt="ice-cream" />
                    </li>
                  ))}
                </ul>
                <h5 className="price-box">+{TAG[4].price * data?.tag5?.length}</h5>
              </div>
            </li>
          )}
        </ul>
        {(data?.tag7 || data?.tag6 || data?.tag5) && (
          <div className="title-box  pink-bg d-flex align-items-center justify-content-between">
            <h4>Staked Goddesses</h4>
            <h4>+{(data?.tag7 ? data?.tag7?.length * TAG[6].price : 0) + (data?.tag6 ? data?.tag6?.length * TAG[5].price : 0) + (data?.tag5 ? data?.tag5?.length * TAG[4].price : 0)}</h4>
          </div>
        )}

        <ul className="stacking-yield-item">
          {data?.tag4 && (
            <li>
              <label htmlFor="">Tier 1 - Listed high over 60 days</label>
              <div className="ice-box">
                <ul>
                  {data?.tag4?.map(e => (
                    <li key={e?.token_id}>
                      <img src={ice_cream} alt="ice-cream" />
                    </li>
                  ))}
                </ul>
                <h5 className="price-box">+{TAG[3].price * data?.tag4?.length}</h5>
              </div>
            </li>
          )}
          {data?.tag3 && (
            <li>
              <label htmlFor="">Tier 2 - Listed high over 30 days</label>
              <div className="ice-box">
                <ul>
                  {data?.tag3?.map(e => (
                    <li key={e?.token_id}>
                      <img src={ice_cream} alt="ice-cream" />
                    </li>
                  ))}
                </ul>
                <h5 className="price-box">+{TAG[2].price * data?.tag3?.length}</h5>
              </div>
            </li>
          )}
          {data?.tag2 && (
            <li>
              <label htmlFor="">Tier 3 - Listed high under 30 days</label>
              <div className="ice-box">
                <ul>
                  {data?.tag2?.map(e => (
                    <li key={e?.token_id}>
                      <img src={ice_cream} alt="ice-cream" />
                    </li>
                  ))}
                </ul>
                <h5 className="price-box">+{TAG[1].price * data?.tag2?.length}</h5>
              </div>
            </li>
          )}
        </ul>
        {(data?.tag4 || data?.tag3 || data?.tag2) && (
          <div className="title-box  pink-bg d-flex align-items-center justify-content-between">
            <h4>Semi-Staked Goddesses</h4>
            <h4>+{(data?.tag4 ? data?.tag4?.length * TAG[3].price : 0) + (data?.tag3 ? data?.tag3?.length * TAG[2].price : 0) + (data?.tag2 ? data?.tag2?.length * TAG[1].price : 0)}</h4>
          </div>
        )}

        <ul className="stacking-yield-item">
          {data?.tag1 && (
            <li>
              <label htmlFor="">Tier 1 - Listed low</label>
              <div className="ice-box">
                <ul>
                  {data?.tag1?.map(e => (
                    <li key={e?.token_id}>
                      <img src={ice_cream} alt="ice-cream" />
                    </li>
                  ))}
                </ul>
                <h5 className="price-box">+{TAG[0].price * data?.tag1?.length}</h5>
              </div>
            </li>
          )}
        </ul>
        {data?.tag1 && (
          <div className="title-box  pink-bg d-flex align-items-center justify-content-between">
            <h4>Unstaked Goddesses</h4>
            <h4>+{data?.tag1 ? data?.tag1?.length * TAG[0].price : 0}</h4>
          </div>
        )}
        <div className="title-box  blue-bg d-flex align-items-center justify-content-between">
          <h4>Total</h4>
          <h4>
            +{total}
          </h4>
        </div>
      </div>
    </div>
  )
}
export default StackingYield
