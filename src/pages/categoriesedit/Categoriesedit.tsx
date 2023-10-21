/** @format */

import { Link, useParams } from "react-router-dom";
import "./categories.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const Categoriesedit = () => {
  const { id } = useParams();

  const [status, setStatus] = useState(0);

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .put(
        `http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/categories/${id}`,
        formData
      )
      .then((response) => {
        // console.log("Usuario actualizado con éxito:", response.data);
        const status = response.status;
        setStatus(status);
      })
      .catch((error) => {
        // console.error("Error al actualizar usuario:", error);
        setStatus(400);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/categories/${id}`
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
    <div className="body-contente">
      <div className="module">
        <h1>Edit Category</h1>
        <hr />
        <br />
        <div className="module2">
          <img src={formData.image} alt="image" />
        </div>
        <div className="module3">
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
              placeholder="Category"
              name="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Icon URL"
              name="image"
              autoComplete="image"
              required
              value={formData.image}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              autoComplete="description"
              required
              value={formData.description}
              onChange={handleInputChange}
            />
            {/* <div className="avatar"><label>Select your avatar: </label><input type="file" name="avatar" accept="image/*" required /></div> */}

            <input
              type="submit"
              value="Accept"
              name="edit"
              className="btn btn-block btn-primary cursor"
            />
            <Link to={"/Categories"}>
              <input
                type="button"
                value="Back"
                name="edit"
                className="btn btn-block btn-danger cursor"
              />
            </Link>
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
    </div>
  );
};

export default Categoriesedit