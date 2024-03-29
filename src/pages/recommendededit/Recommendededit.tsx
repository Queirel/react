/** @format */

import { Link, useParams } from "react-router-dom";
import "./recommended.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const Recommendededit = () => {
  const { id } = useParams();

  const [status, setStatus] = useState(0);

  const [formData, setFormData] = useState({
    placeid: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axios
      .put(
        `${import.meta.env.VITE_URL}/recommended/${id}`,
        formData
      )
      .then((response) => {
        // console.log('Usuario actualizado con éxito:', response.data);
        const status = response.status;
        setStatus(status);
      })
      .catch(() => {
        // console.error('Error al actualizar usuario:', error);
        setStatus(400);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_URL}/recommended/${id}`
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
        <h1>Edit Recommended</h1>
        <hr />
        <br />
        <div className="module22">
          {/* <img src={formData.image} alt="image" /> */}
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
              placeholder="Place Id"
              name="placeid"
              autoComplete="placeid"
              required
              value={formData.placeid}
              onChange={handleInputChange}
            />
            {/* <input
              type="text"
              placeholder="Map Place"
              name="place"
              autoComplete="place"
              required
              value={formData.place}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Image"
              name="image"
              autoComplete="image"
              required
              value={formData.image}
              onChange={handleInputChange}
            /> */}
            {/* <div className="avatar"><label>Select your avatar: </label><input type="file" name="avatar" accept="image/*" required /></div> */}

            <input
              type="submit"
              value="Accept"
              name="edit"
              className="btn btn-block btn-primary cursor"
            />
            <Link to={"/Recommended"}>
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
 export default Recommendededit