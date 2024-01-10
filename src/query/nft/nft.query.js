import Axios from "../../api/BaseUrl";

export async function tokenBalanceApi() {
	return await Axios.get("profile", {
		search: '',
		start: 0,
		length: 10,
		sort: '',
		orderBy: '',
	});
}
