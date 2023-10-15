import "./commentnew.scss";
import { useState } from "react";
import axios from "axios";

const Commentnew = () => {
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    image: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/users', formData)
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
          <h1>New User</h1>
          <form className="form" method="post" encType="multipart/form-data" autoComplete="off" onSubmit={handleSubmit}>
            <div className="alert alert-error"></div>
            <input 
            id="text"
            type="text" 
            placeholder="User Name"
            name="firstname" 
            autoComplete="firstname" 
            required
            value={formData.firstname}
            onChange={handleInputChange}
            />
            <input 
            type="text" 
            placeholder="User Lastname" 
            name="lastname" 
            autoComplete="lastname" 
            required 
            value={formData.lastname}
            onChange={handleInputChange}
            />
            <input 
            type="email" 
            placeholder="Email" 
            name="email" 
            autoComplete="email" 
            required
            value={formData.email}
            onChange={handleInputChange}
            />
            <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            autoComplete="password" 
            required
            value={formData.password}
            onChange={handleInputChange}
            />
            {/* <input 
            type="password" 
            placeholder="Confirm Password"
            name="confirmpassword" 
            autoComplete="new-password" 
            required /> */}
            <input 
            type="text" 
            placeholder="Image URL" 
            name="image"
            value={formData.image}
            onChange={handleInputChange}
/>
            
            {/* <div className="avatar"><label>Select your avatar: </label><input type="file" name="avatar" accept="image/*" required /></div> */}
            <input type="submit" value="Register" name="register" className="btn btn-block btn-primary cursor"/>
          </form>
        </div>
      </div>
    );
};

export default Commentnew;
