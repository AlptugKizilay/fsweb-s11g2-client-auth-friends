import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const FriendList = () => {
    /* const friendCharList = useContext(AuthContext);
    console.log(friendCharList.friendsList); */
    const [friends,setFrieds] = useState([]);
    const {loggedInToken,isLoggedIn} = useContext(AuthContext);
    const history = useHistory();
    useEffect(()=>{
        if(!isLoggedIn) {
          console.log(isLoggedIn);
          return history.push("/login")  
        }else {
            axios
                .get("http://localhost:9000/api/friends",{
                    headers: {
                        Authorization: loggedInToken,
                    },
                })
                .then((res)=>{
                    setFrieds(res.data);
                })
        }
      },[])
    
    return (
        <div>
            <h1>FRIENDS LİST</h1>
            {friends.map((friend,key) => (
            <div key={key}> 
                -{friend.name}-{friend.email}
            </div>
            ))}
        </div>
    )
};
export default FriendList;