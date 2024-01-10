export default (state = {}, action) => {
	switch (action.type) {
		case 'USER_PROFILE':
			return {
				...state,
				user: action.payload,
			};
		// case 'CLIENT_PROFILE':
		// 	return {
		// 		...state,
		// 		client: action.payload,
		// 	};
		default:
			return state;
	}
};
