import Axios from "../../api/BaseUrl";


export async function bidNFTApi({ id, nAmount }) {
  return await Axios.post(`nft/bid/${id}`, {
    nAmount
  });
}

export async function buyFixedNFTApi({id , nQuantity}) {
  console.log("nQuantity",nQuantity)
  return await Axios.post(`nft/buy/${id}`,{
    nQuantity
  });
}

export async function buyRaffleNFTApi({ id, nQuantity }) {
  return await Axios.post(`nft/buy/ticket/${id}`, {
    nQuantity
  });
}