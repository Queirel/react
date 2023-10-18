import "./placesnew.scss";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Placesnew = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    latitude: '',
    longitude: ''
  });
  
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()

    axios.post('http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/places', formData)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch((error) => {
        console.error('Error al enviar datos al servidor:', error);
      });

      console.log(formData)
}

    return (
      <div className="body-contente">
        <div className="module">
          <h1>New Place</h1>
          <form className="form" method="post" encType="multipart/form-data" autoComplete="off" onSubmit={handleSubmit}>
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
            <input type="submit" value="Add New" name="new" className="btn btn-block btn-primary cursor"/>
            <Link to={"/Places"}>
          <input
            type="button"
            value="Back"
            name="edit"
            className="btn btn-block btn-danger cursor"
          />
          </Link>
          </form>
        </div>
      </div>
    );
};

export default Placesnew;
