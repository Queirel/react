/** @format */

import { useParams } from "react-router-dom";
// import Single from "../../components/single/Single";
// import { singleUser } from "../../data";
import "./user.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const User = () => {
  const { id } = useParams();

  console.log(id);
  //Fetch data and send to Single Component

  const [users, setUsers]:any = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/users/${id}`
      )
      .then((response) => {
        const data = response.data;
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error al obtenerlo:", error);
      });
  }, []);

  return (
    <div className="user">
      <div className="card-container">
        {/* <span className="pro">PRO</span> */}
        <img
          className="round"
          src={users.image}
          alt="user"
        />
        <h3>ID: {users.id}</h3>
        <h3>Name: {users.firstname}</h3>
        <h3>Lastname: {users.lastname}</h3>
        <h3>Email: {users.email}</h3>
        {/* <h4></h4>
        <p>
          User interface designer and <br /> front-end developer
        </p> */}
        <div className="buttons">
          <p><button className="primary">Edit</button></p>
          <br />
          <p><button className="primary ghost">Delete</button></p>
        </div>
        <div className="skills">
          <h6>Accessibilities</h6>
          <ul>
            <li>Etc</li>
            <li>Etc</li>
            <li>Etc</li>
            <li>Etc</li>
            <li>Etc</li>
            <li>Etc</li>
            <li>Etc</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
