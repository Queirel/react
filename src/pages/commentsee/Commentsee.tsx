import { Link, useParams } from "react-router-dom";
import "./comments.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const Commentsee = () => {
  const { id } = useParams();

  console.log(id);
    const [formData, setFormData] = useState({
      comment: '',
      rate: '',
      user_id: '',
      place_id: ''
    });
  
    // const handleInputChange = (e: any) => {
    //   const { name, value } = e.target;
    //   setFormData({ ...formData, [name]: value });
    // };
  
    // const handleSubmit = (e:any) => {
    //   e.preventDefault();

    //   axios.put(`http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/categories/${id}`, formData)
    //     .then((response) => {
    //       console.log('Usuario actualizado con éxito:', response.data);
    //     })
    //     .catch((error) => {
    //       console.error('Error al actualizar usuario:', error);
    //     });
    // };

  useEffect(() => {
    axios
      .get(
        `http://ec2-3-141-0-71.us-east-2.compute.amazonaws.com:3000/comments/${id}`
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
        <h1>See Comment</h1>
        <hr />  
        <br />
        {/* <form
          className="form"
          method="post"
          encType="multipart/form-data"
          autoComplete="off"
          onSubmit={handleSubmit}
        > */}
          <div className="alert alert-error"></div>
          <h4> User: </h4>
          <h2> {formData.user_id} </h2>
          <br />
          <h4> Place: </h4>
          <h2> {formData.place_id} </h2>
          <br />
          <h4> Comment: </h4>
          <h2> {formData.comment} </h2>
          <br />
          <h4> Rate: </h4>
          <h2> {formData.rate} </h2>
          <br />

          {/* <div className="avatar"><label>Select your avatar: </label><input type="file" name="avatar" accept="image/*" required /></div> */}
          
          {/* <input
            type="submit"
            value="Accept"
            name="edit"
            className="btn btn-block btn-primary cursor"
          /> */}
          <Link to={"/Categories"}>
          <input
            type="button"
            value="Back"
            name="edit"
            className="btn btn-block btn-danger cursor"
          />
          </Link>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Commentsee;