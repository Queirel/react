import "./categorynew.scss";
import { useState } from "react";
import axios from "axios";

const Categorynew = () => {
  
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    description: ''
  });
  
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()

    axios.post('http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/categories', formData)
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
          <h1>New Category</h1>
          <form className="form" method="post" encType="multipart/form-data" autoComplete="off" onSubmit={handleSubmit}>
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
            <input type="submit" value="Add New" name="new" className="btn btn-block btn-primary cursor"/>
          </form>
        </div>
      </div>
    );
};

export default Categorynew;
