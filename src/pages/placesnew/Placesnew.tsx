import "./placesnew.scss";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Placesnew = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    placemapid: '',
    categoryid: ''
  });
  
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()

    axios.post(`${import.meta.env.VITE_URL}/places`, formData)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch((error) => {
        console.error('Error al enviar datos al servidor:', error);
      });

      console.log(formData)
}

// const [categories, setCategories] = useState([]);

// useEffect(() => {
//   axios
//     .get(`${import.meta.env.VITE_URL}/categories`)
//     .then((response) => {
//       const data = response.data;
//       const category = data.map(({ name, id }: any) => ({
//         name,
//         id,
//       }));
//       setCategories(category);
//     })
//     .catch((error) => {
//       console.error("Error al obtenerlo:", error);
//     });
// }, []);

    return (
      <div className="body-contente">
        <div className="module">
          <h1>New Place</h1>
          <form className="form" method="post" encType="multipart/form-data" autoComplete="off" onSubmit={handleSubmit}>
            <div className="alert alert-error"></div>
            <script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBXaZS5h_A38wKa7vmtdvzJ5xfgqz9xZHk&libraries=places&callback=initMap">
</script>
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
            placeholder="Description" 
            name="description" 
            autoComplete="description" 
            required
            value={formData.description}
            onChange={handleInputChange}
            />
            <input 
            type="text" 
            placeholder="Place Id" 
            name="placemapid" 
            autoComplete="placemapid" 
            required
            value={formData.placemapid}
            onChange={handleInputChange}
            />
            <input 
            type="text" 
            placeholder="Category Id" 
            name="category_id" 
            autoComplete="category_id" 
            // required
            value={formData.categoryid}
            onChange={handleInputChange}
            />
            <select name="" id="">
            value={formData.categoryid}
            </select>
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
