import { Link, useParams } from "react-router-dom";
import "./user.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const User = () => {
  const { id } = useParams();

  console.log(id);

    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      // password: "",
      image: "",
    });
  
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e:any) => {
      e.preventDefault();
      axios.put(`http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/users/${id}`, formData)
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
        `http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/users/${id}`
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
        <h1>Edit User</h1>
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
          {/* <input
            type="password"
            placeholder="Password"
            name="password"
            autoComplete="password"
            required
            value={formData.password}
            onChange={handleInputChange}
          /> */}
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />

          {/* <div className="avatar"><label>Select your avatar: </label><input type="file" name="avatar" accept="image/*" required /></div> */}
          
          <input
            type="submit"
            value="Accept"
            name="edit"
            className="btn btn-block btn-primary cursor"
          />
          <Link to={"/Users"}>
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

export default User;
