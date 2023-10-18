import { Link, useParams } from "react-router-dom";
import "./accessibility.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const Accessibilityedit = () => {
  const { id } = useParams();

  console.log(id);
    const [formData, setFormData] = useState({
      icon: '',
      name: '',
      description: ''
    });
  

    
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e:any) => {
      e.preventDefault();

      axios.put(`http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/accessibility/${id}`, formData)
        .then((response) => {
          console.log('Usuario actualizado con éxito:', response.data);
        })
        .catch((error) => {
          console.error('Error al actualizar usuario:', error);
        });
    };

  useEffect(() => {
    axios
      .get(
        `http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/accessibility/${id}`
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
        <h1>Edit Accessibility</h1>
        <hr />  
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
          
          <input
            type="submit"
            value="Accept"
            name="edit"
            className="btn btn-block btn-primary cursor"
          />
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

export default Accessibilityedit;