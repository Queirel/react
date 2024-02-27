/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const logout = () => {
    // localStorage.removeItem('token');
    localStorage.clear();
    window.location.reload();
  };

  const id = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    // password: "",
    image: "",
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/users/${id}`).then((response) => {
      const data = response.data;
      setFormData(data);
    });
  }, []);
  return (
    <div>
      <div className="module">
      <h2>User: {id}</h2>

        <br />
        <hr />
        <br />
        <div className="module2">
          <img src={formData.image} alt="image" />
        </div>
        <div className="module3">
          <br />
          <br />
          <div className="alert alert-error"></div>
          <h2>Name:  {formData.firstname}</h2>
          <br />

          <h2>Lastname:  {formData.lastname}</h2>
          <br />

          <h2>Email:  {formData.email}</h2>        <br />        <br />


        </div>
      </div>
      {/* Otros componentes y contenido de tu aplicación */}
      <div className="form">
        <Link to={`/users/${id}`}>
          <button className="custom-button btn btn-block btn-primary cursor">
            Edit profile
          </button>
        </Link>
        <br />

        <Link to="/">
          <button
            className="custom-button btn btn-block btn-danger cursor"
            onClick={logout}
          >
            Log out
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
