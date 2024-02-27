/** @format */

import { Link, useParams } from "react-router-dom";
import "./user.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const User = () => {
  const { id } = useParams();

  const [status, setStatus] = useState(0);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    // password: "",
    image: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const backClick = () =>{
    window.history.back();
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_URL}/users/${id}`,
        formData
      )
      .then((response) => {
        // console.log("Usuario actualizado con éxito:", response.data);
        const status = response.status;
        setStatus(status);
      })
      .catch(() => {
        // console.error("Error al actualizar usuario:", error);
        setStatus(400);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_URL}/users/${id}`
      )
      .then((response) => {
        const data = response.data;
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error al obtenerlo:", error);
      });
  }, []);
  return (
    <div className="module">
      <br />
      <h1>Edit User</h1>
      <hr />
      <br />
      <div className="module2">
        <img src={formData.image} alt="image" />
      </div>
      <div className="module3">
        <br />
        <h2>User: {id}</h2>
        <br />
        <form
          className="form"
          method="post"
          encType="multipart/form-data"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="alert alert-error"></div>
          <input
            id="text"
            type="text"
            placeholder="User Name"
            name="firstname"
            autoComplete="firstname"
            required
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="User Lastname"
            name="lastname"
            autoComplete="lastname"
            required
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          {/* <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="password"
            required
            value={formData.password}
            onChange={handleInputChange}
          /> */}
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />

          {/* <div className="avatar"><label>Select your avatar: </label><input type="file" name="avatar" accept="image/*" required /></div> */}

          <input
            type="submit"
            value="Accept"
            name="edit"
            className="btn btn-block btn-primary cursor"
          />
          {/* <input
            type="button"
            value="Back"
            name="edit"
            className="btn btn-block btn-danger cursor"
          />       */}
          {/* <Link className="btn-block" to={"/Users"}> */}
            <input
              type="button"
              value="Back"
              name="edit"
              className="btn btn-danger cursor"
              onClick={backClick}
            />
          {/* </Link> */}
          <br />
          {status == 200 ? (
            <p style={{ color: "greenyellow" }}>Updated</p>
          ) : (
            ""
          )}
          {status == 400 ? <p style={{ color: "orange" }}>Some Error</p> : ""}
        </form>
      </div>
    </div>
  );
};

export default User;
