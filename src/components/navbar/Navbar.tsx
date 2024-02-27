// import { useContext, useState } from "react";
// import { userContext } from "../../pages/login/Login";
import "./navbar.scss";
import { Link } from "react-router-dom";
// import { ReactComponent as Logo } from '../../../public/logoacc.png';


const Navbar = () => {
  // const user = useContext(userContext)
// console.log(user)
const image =localStorage.getItem("image")
const name = localStorage.getItem("name")

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/logoacc.png"  width="30" height="40" alt="" />
        <span>Accesapp</span>
      </div>
      <div className="icons">
        {/* <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div> */}
        <div className="user">
          <Link to={`/profile`}>
          <img
src={image}            // src="https://lh3.googleusercontent.com/a/ACg8ocJF-wkPV6nMNYNrb41G0Pu-j8QHap6__XcJICFDaHH1WW8=s288-c-no"
            alt=""
          />  
          </Link>
          
          <span>{name}</span>
        </div>
        {/* <img src="/settings.svg" alt="" className="icon" /> */}
      </div>
    </div>
  );
};

export default Navbar;
