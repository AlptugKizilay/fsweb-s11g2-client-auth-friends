/* import { BrowserRouter as Routes, Route } from "react-router-dom"; */
import { Route, Switch, Redirect } from "react-router";
import "./App.css";
import Login from "./components/Login";
import { Link } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import FriendList from "./components/FriendList";
import { getAll } from "./mocks/data";
import Header from "./components/Header";
import AddFriend from "./components/AddFriend";

function App() {
  const localStorageKey = "S11G2";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInToken, setLoggedInToken] = useState(null);
  /* const [friendsList, setFriendsList] = useState(getAll()); */
  useEffect(()=>{
    setLoggedInToken(localStorage.getItem(localStorageKey));
    console.log(isLoggedIn);
  },[])
  useEffect(()=>{
    
    setIsLoggedIn(loggedInToken ? true : false);
  },[loggedInToken])
  useEffect(()=>{
    console.log("console.log(isLoggedIn);",isLoggedIn);

  },[isLoggedIn])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInToken,
        setLoggedInToken,
        setIsLoggedIn,
        localStorageKey,
        /* friendsList */
      }}
    >
      <div className="App">
        <Header />
        {/* <h1>Client Auth Projesi: Friends</h1>

        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/friends-list">friends-list</Link>
            </li>
            <li>
              <Link to="/">Users</Link>
            </li>
          </ul>
        </nav> */}
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route path="/login">
            {" "}
            <Login />{" "}
          </Route>
          {/* <Route
            render={()=>{
              if(isLoggedIn == true) {
                <FriendList />
              }else{
                <Redirect to= {{pathname: "/login"}} />
              }             
            }}
            path={"/friends-list"} /> */}
          <Route path="/friends-list">
          {()=>{
              if(isLoggedIn == true) {
                return <FriendList />
              }else{
                return <Redirect to= {{pathname: "/login"}} />
              }             
            }}
          </Route>
          <Route path="/add-friend">
          {()=>{
              if(isLoggedIn == true) {
                return <AddFriend />
              }else{
                return <Redirect to= {{pathname: "/login"}} />
              }             
            }}
          </Route>
          {/* <Route path="/friends-list">
            {" "}
            <FriendList />{" "}
          </Route> */}
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
