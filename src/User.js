import React from "react";
import store, { selectUser, resetSelect, deleteUser, getUsers } from "./store";
import UserUpdate from "./UserUpdate";
import axios from "axios";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
    this.onClick = this.onClick.bind(this);
  }

  findUser(id) {
    return this.state.users.filter(user => user.id * 1 === id * 1)[0];
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    this.state.users.length === 0
      ? store
          .dispatch(getUsers())
          .then(() =>
            store.dispatch(
              selectUser(this.findUser(location.hash.split("/")[2]))
            )
          )
      : store.dispatch(selectUser(this.findUser(location.hash.split("/")[2])));
  }
  componentWillUnmount() {
    this.unsubscribe();
    store.dispatch(resetSelect());
  }

  onClick(ev) {
    const { selectedUser } = this.state;
    axios.delete(`/api/users/${selectedUser.id}`).then(() => {
      store.dispatch(deleteUser(selectedUser.id));
      document.location.hash = "/";
    });
  }

  render() {
    const { selectedUser } = this.state;
    const { onClick } = this;
    const { location } = this.props;
    return (
      <div>
        <UserUpdate location={location} user={selectedUser} />
        <button onClick={onClick}> DELETE </button>
      </div>
    );
  }
}
