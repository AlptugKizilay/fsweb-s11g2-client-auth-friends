import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const Header = () => {
  const {
    loggedInToken,
    isLoggedIn,
    setIsLoggedIn,
    setLoggedInToken,
    localStorageKey,
  } = useContext(AuthContext);
  const history = useHistory();
  const logOut = () => {
    setIsLoggedIn(false);
    setLoggedInToken(null);
    localStorage.removeItem(localStorageKey);
    history.push("/");
  };
  return (
    <div>
      <h1>Client Auth Projesi: Friends</h1>
      <div>
        {!isLoggedIn && (
          <button
            onClick={() => {
              history.push("/login");
            }}
          >
            LOGIN
          </button>
        )}
        {isLoggedIn && (
          <>
            <button
              onClick={() => {
                history.push("/friends-list");
              }}
            >
              FRIENDS LIST
            </button>
            <button
              onClick={() => {
                history.push("/add-friend");
              }}
            >
              FRIEND ADD
            </button>

            <button onClick={logOut}>LOG OUT</button>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
