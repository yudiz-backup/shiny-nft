import Axios, { ClientAxios } from "../../api/BaseUrl";

export async function getClientUserProfile(address) {
  return await ClientAxios.get(`accounts/${address}?inclA=true&inclT=true`)
}

export async function getTokenUser() {
  return await Axios.get('profile')
}