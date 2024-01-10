import Axios from "../../api/BaseUrl";


export async function loginApi(sWalletAddress) {
    return await Axios.post('auth/login', {
        sWalletAddress
    })
}
