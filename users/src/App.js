import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";
import { getUsers, deleteUser } from "./state/actionCreators";

function App({ users, getUsers, deleteUser }) {
	React.useEffect(() => {
		getUsers();
	}, []);

	return (
		<div className="App">
			Total Users: {users.length}
			<br />
			<br />
			{users.map(user => {
				return (
					<div className="user">
						{user.name} - {user.bio} -{" "}
						<div
							onClick={e => {
								deleteUser(user.id);
							}}
						>
							🗑️
						</div>
						<br />
					</div>
				);
			})}
		</div>
	);
}

// Step 8: Use "connect" to plug the component to redux
// Step 9: Plug the action creators into the component
export default connect(state => state, {
	getUsers,
	deleteUser
})(App);

// export default App;
