import * as types from "./actionTypes";

// STEP 1: Decide state slices
const initialState = {
	users: []
};

// STEP 3: create reducers
export function usersReducer(users = initialState.users, action) {
	switch (action.type) {
		case types.GET_USERS:
			return action.payload.users;
		case types.DELETE_USER:
			//action.payload.data
			return users.filter(user => user.id !== action.payload.data.id);
		default:
			return users;
	}
}
