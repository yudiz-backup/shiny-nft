import Axios, { OpenseaAxios } from "../../api/BaseUrl";

export async function catogeryItemsListApi({ limit }) {
  return await Axios.post("nft/list/byCategory", {
    search: "",
    start: limit,
    length: 10,
    sort: '',
    orderBy: "",
  });
}

export async function transactionListApi({ limit }) {
  return await Axios.post("nft/view/transaction", {
    search: "",
    start: limit,
    length: 10,
    sort: '',
    orderBy: "",
  });
}

export async function getMyNFTS({ address, limit }) {
  return await OpenseaAxios.get(
    `assets?owner=${address}&collection_slug=everyday-goddesses&order_direction=desc&limit=${limit}&include_orders=false`
  );
}
