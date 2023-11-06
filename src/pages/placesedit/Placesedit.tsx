import { Link, useParams } from "react-router-dom";
import "./places.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const Placesedit = () => {
  const { id } = useParams();

  const [status, setStatus] = useState(0);

    const [formData, setFormData] = useState({
      name: '',
      description: '',
      address: '',
      latitude: '',
      longitude: ''
    });
  
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e:any) => {
      e.preventDefault();

      axios.put(`${import.meta.env.VITE_URL}/places/${id}`, formData)
        .then((response) => {
        // console.log("Usuario actualizado con éxito:", response.data);
        const status = response.status;
        setStatus(status);        })
        .catch(() => {
        // console.error("Error al actualizar usuario:", error);
        setStatus(400);        });
    };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_URL}/places/${id}`
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
        <h1>Edit Place</h1>
        <div className="module3">

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
            placeholder="Address" 
            name="address" 
            autoComplete="address" 
            required 
            value={formData.address}
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
            placeholder="Latitude" 
            name="latitude" 
            autoComplete="latitude" 
            required
            value={formData.latitude}
            onChange={handleInputChange}
            />
            <input 
            type="text" 
            placeholder="Longitude" 
            name="longitude" 
            autoComplete="longitude" 
            required
            value={formData.longitude}
            onChange={handleInputChange}
            />
          {/* <div className="avatar"><label>Select your avatar: </label><input type="file" name="avatar" accept="image/*" required /></div> */}
          
          <input
            type="submit"
            value="Accept"
            name="edit"
            className="btn btn-block btn-primary cursor"
          />
          <Link to={"/Places"}>
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

export default Placesedit;