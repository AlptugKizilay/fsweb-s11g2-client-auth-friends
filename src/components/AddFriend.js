import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const AddFriend = () => {
  const { loggedInToken, isLoggedIn } = useContext(AuthContext);
  const [newFriend, setnewFriend] = useState({});
  const history = useHistory();
  const handleChange = (e) => {
    setnewFriend({
      ...newFriend,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log(newFriend);
  }, [newFriend]);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log(isLoggedIn);
      history.push("/login");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    adding();
  };
  const adding = () => {
    let guy = {
      id: Date.now(),
      name: newFriend.name,
      age: newFriend.age,
      email: newFriend.email,
    };
    const config = {
        method: "post",
        url: "http://localhost:9000/api/friends",
        headers: {
            Authorization: loggedInToken,
        },
        data: guy /* JSON.stringify(guy), */
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
        history.push("/friends-list");
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label name="name">NAME</label>
        <input
          type="text"
          name="name"
          value={newFriend.name}
          onChange={handleChange}
        />
        <label name="age">AGE</label>
        <input
          type="number"
          name="age"
          value={newFriend.age}
          onChange={handleChange}
        />
        <label name="email">EMAIL</label>
        <input
          type="email"
          name="email"
          value={newFriend.email}
          onChange={handleChange}
        />
        <button>SUBMIT</button>
      </form>
    </div>
  );
};
export default AddFriend;
