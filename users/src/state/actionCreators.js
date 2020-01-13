import * as types from "./actionTypes";
import axios from "axios";

// Step 7: Design action creator functions
export const getUsers = () => dispatch => {
	axios
		.get("http://localhost:3000/api/users")
		.then(response => {
			dispatch({
				type: types.GET_USERS,
				payload: {
					users: response.data
				}
			});
		})
		.catch(error => {
			console.log(error);

			console.log("error!!!");
		});
};

// Step 7: Design action creator functions
export const deleteUser = id => dispatch => {
	axios
		.delete("http://localhost:3000/api/users/" + id)
		.then(response => {
			dispatch({
				type: types.DELETE_USER,
				payload: {
					data: response.data
				}
			});
		})
		.catch(error => {
			console.log(error);

			console.log("error!!!");
		});
};
