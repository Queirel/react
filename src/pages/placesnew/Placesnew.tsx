/** @format */

import "./placesnew.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import PlaceAutocomplete from "../places/place-autocomplete";

const Placesnew = () => {
  console.log(useLocation().pathname);
  const [dataFromChild, setDataFromChild] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    placemapid: dataFromChild,
    categoryid: "",
  });

  useEffect(() => {
    formData.placemapid = dataFromChild;
  }, [dataFromChild]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_URL}/places`, formData)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
      })
      .catch((error) => {
        console.error("Error al enviar datos al servidor:", error);
      });
  };

  const handleDataFromChild = (id: any) => {
    setDataFromChild(id);
  };

  return (
    <div className="body-content">
      <div className="module">
        <h1>New Place</h1>
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
            placeholder="Place Name"
            name="name"
            autoComplete="name"
            required
            value={formData.name}
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
          <input
            type="text"
            placeholder="Category Id"
            name="categoryid"
            autoComplete="categoryid"
            // required
            value={formData.categoryid}
            onChange={handleInputChange}
          />
          <PlaceAutocomplete id={handleDataFromChild} />
          <br />
          <div className="butti">
            <input
              type="submit"
              value="Add New"
              name="new"
              className="btn btn-block btn-primary cursor"
            />
            <Link to={"/Places"}>
              <input
                type="button"
                value="Back"
                name="edit"
                className="btn btn-block btn-success   cursor"
              />
            </Link>
          </div>
          <div className="form"></div>
        </form>
      </div>
    </div>
  );
};

export default Placesnew;
