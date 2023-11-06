import "./accessibilitynew.scss";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Accessibilitynew = () => {
  
  const [formData, setFormData] = useState({
    icon: '',
    name: '',
    description: ''
  });
  
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()

    axios.post(`${import.meta.env.VITE_URL}/accessibility`, formData)
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
          <h1>New Accessibility</h1>
          <form className="form" method="post" encType="multipart/form-data" autoComplete="off" onSubmit={handleSubmit}>
            <div className="alert alert-error"></div>
            <input 
            id="text"
            type="text" 
            placeholder="Accessibility"
            name="name" 
            autoComplete="name" 
            required
            value={formData.name}
            onChange={handleInputChange}
            />
            <input 
            type="text" 
            placeholder="Icon URL" 
            name="icon" 
            autoComplete="icon" 
            required 
            value={formData.icon}
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
            <input type="submit" value="Add New" name="new" className="btn btn-block btn-primary cursor"/>
            <Link to={"/Accessibility"}>
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

export default Accessibilitynew;
