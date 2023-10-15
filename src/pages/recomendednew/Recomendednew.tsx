import "./recomendednew.scss";
import { useState } from "react";
import axios from "axios";

const Recommendednew = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    place: '',
    image: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/recommended', formData)
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
            {/* <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            autoComplete="password" 
            required
            value={formData.password}
            onChange={handleInputChange}
            /> */}
            {/* <input 
            type="password" 
            placeholder="Confirm Password"
            name="confirmpassword" 
            autoComplete="new-password" 
            required /> */}
            {/* <input 
            type="text" 
            placeholder="Image URL" 
            name="image"
            value={formData.image}
            onChange={handleInputChange}
/> */}
            
            {/* <div className="avatar"><label>Select your avatar: </label><input type="file" name="avatar" accept="image/*" required /></div> */}
            <input type="submit" value="Add New" name="new" className="btn btn-block btn-primary cursor"/>
          </form>
        </div>
      </div>
    );
};

export default Recommendednew;
