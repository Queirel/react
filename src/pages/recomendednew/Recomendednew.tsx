import "./recomendednew.scss";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recommendednew = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    image: ''
  });
  
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()

    axios.post(`${import.meta.env.VITE_URL}/recommended`, formData)
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
          <h1>New Recommended</h1>
          <form className="form" method="post" encType="multipart/form-data" autoComplete="off" onSubmit={handleSubmit}>
            <div className="alert alert-error"></div>
            <input 
            id="text"
            type="text" 
            placeholder="Recommended"
            name="name" 
            autoComplete="name" 
            required
            value={formData.name}
            onChange={handleInputChange}
            />
            <input 
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
            />
            <input type="submit" value="Add New" name="new" className="btn btn-block btn-primary cursor"/>
            <Link to={"/Recommended"}>
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

export default Recommendednew;
