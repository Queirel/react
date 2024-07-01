
import { Link, useParams } from "react-router-dom";
import "./places.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import FileUpload from '../../components/upload files/uploadfiles';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

const Placesedit = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(0);
  const [addressName, setAddressName] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [values, setValues]: any = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    placemapid: "",
    categoryid: "",
    lastUserUpdate: ""
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiless, setSelectedFiless] = useState([]);
  const [previewUrls, setPreviewUrls]: any = useState([]);

  const handleFileChanges = (event: any): any => {
    const files = event.target.files;
    const filesArray: any = Array.from(files);

    setSelectedFiless(filesArray);

    const urls: any = [];
    for (let i = 0; i < filesArray.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        urls.push(reader.result);
        if (urls.length === filesArray.length) {
          setPreviewUrls(urls);
        }
      };
      reader.readAsDataURL(filesArray[i]);
    }
  };





  const handleFileChange = (event: any) => {
    setSelectedFiles(Array.from(event.target.files));
  };
  // const MultiFileUpload = () => {
  //   const [selectedFiles, setSelectedFiles] = useState([]);
  
  //   const handleFileChange = (event: any) => {
  //     setSelectedFiles(Array.from(event.target.files));
  //   };
  
  //   const handleSubmit = async (event: any) => {
  //     event.preventDefault();
  
  //     const formData = new FormData();
  //     selectedFiles.forEach((file, index) => {
  //       formData.append(`file${index}`, file);
  //     });
      
  //     try {
  //       const response = await axios.post(`${import.meta.env.VITE_URL}/places/file`, formData);
  //       console.log('Archivos subidos:', response.data);
  //       // Puedes manejar la respuesta del servidor aquí
  //     } catch (error) {
  //       console.error('Error al subir los archivos:', error);
  //       // Puedes manejar los errores aquí
  //     }
  //   };
  
  //   return (
  //     // <form onSubmit={handleSubmit}>
      
  //       <input type="file" multiple onChange={handleFileChange} />
        
  //     //   {/* <button type="submit">Subir archivos</button> */}
  //     // </form>
  //   );
  // }


  const Maps = () => {
    return (
      <>
        <div>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyARzhJXy7VYFW_MJ16-J55rS8REHWwc7c0"
            selectProps={{
              openMenuOnClick: false,
              // required: true,
              defaultInputValue: addressName,
              value: values,
              onChange: changeValue,
              placeholder: "Address",
              styles: {
                input: (provided) => ({
                  ...provided,
                  color: "#dedcdc",
                  fontSize: 14,
                  fontFamily: "revert",
                }),
                option: (provided) => ({
                  ...provided,
                  color: "#222222",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "#dedcdc",
                  fontSize: 14,
                  fontFamily: "revert",
                }),
                control: (provided) => ({
                  ...provided,
                  borderRadius: 10,
                  borderColor: "GrayText",
                  backgroundColor: "#11181f",
                  width: "100%",
                  height: 10,
                  alignContent: "center",
                }),
                container: (provided) => ({
                  ...provided,
                }),
                dropdownIndicator: (provided: any) => ({
                  ...provided,
                  visibility: "hidden",
                }),
                indicatorSeparator: (provided: any) => ({
                  ...provided,
                  visibility: "hidden",
                }),
              },
            }}
          />
        </div>
        {/* <FileUpload/> */}
       <APIProvider apiKey="AIzaSyARzhJXy7VYFW_MJ16-J55rS8REHWwc7c0">
          <br />
          <div
            className="maps"
            style={{
              border: 1,
              borderRadius: 20,
              height: "50vh",
              width: "100%",
            }}
          >
            
            <Map
              defaultZoom={15}
              center={{ lat, lng }}
              mapId="19418ea9bcdd3404"
            >
              <AdvancedMarker position={{ lat, lng }}></AdvancedMarker>
            </Map>
          </div>
        </APIProvider> 
      </>
    );
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/places/${id}`)
      .then((response) => {
        const data = response.data;
        setFormData(data);
        setPlaceId(data.placemapid);
        return data.placemapid;
      })
      .then((response) => {
        axios
          .post(`${import.meta.env.VITE_URL}/places/placebyid`, {
            placeid: response,
          })
          .then((response) => {
            console.log(placeId);
            setAddressName(response.data.name);
            setLat(response.data.lat);
            setLng(response.data.long);
          })
          .catch((error) => {
            console.error("Error al enviar datos al servidor:", error);
          });
      })
      .catch((error) => {
        console.error("Error al obtenerlo:", error);
      });
  }, []);

  const changeValue = async (value: any) => {
    setValues(value);
    geocodeByPlaceId(value.value.place_id).then((response) => {
      const latitude = response[0].geometry.location.lat();
      const longitude = response[0].geometry.location.lng();
      setLat(latitude);
      setLng(longitude);
        (response[0].formatted_address);
      setFormData({ ...formData, placemapid: response[0].place_id });
      console.log(response[0].place_id);
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_URL}/places/${id}`, formData)
      .then((response) => {
        const status = response.status;
        setStatus(status);
      })
      .catch(() => {
        setStatus(400);
      });

      const formDatas = new FormData();
      selectedFiless.forEach((file, index) => {
        formDatas.append(`file${index}`, file);
      });
      
      try {
        console.log('Archivos subidos:', selectedFiless);  
        const response = await axios.post(`${import.meta.env.VITE_URL}/places/file`, selectedFiless);
        console.log('Archivos subidos:', response.data);
        // Puedes manejar la respuesta del servidor aquí
      } catch (error) {
        console.error('Error al subir los archivos:', error);
        // Puedes manejar los errores aquí
      }
  };


  const handlesSubmit = async (e: any) => {
    e.preventDefault();

      const formDatas = new FormData();
      selectedFiles.forEach((file, index) => {
        formDatas.append(`file${index}`, file);      });
      
      try {
        console.log('Archivos subidos:', formDatas);  
        const response = await axios.post(`${import.meta.env.VITE_URL}/places/file`, formDatas);
        console.log('Archivos subidos:', response.data);
        // Puedes manejar la respuesta del servidor aquí
      } catch (error) {
        console.error('Error al subir los archivos:', error);
        // Puedes manejar los errores aquí
      }
  };


  return (

    <div className="module">
          <form onSubmit={handlesSubmit}>
                <input style={{ display: 'none' }} type="file" multiple onChange={handleFileChanges} />
<input type="submit"/>
    </form>

      <h1>Edit Place</h1>
      <div className="modulse3">
        <form
          className="form"
          method="post"
          encType="multipart/form-data"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="alert alert-error"></div>
          

          <div>
      {/* <input type="file" multiple onChange={handleFileChange} /> */}

      {previewUrls.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {previewUrls.map((url:any, index:any) => (
          <div key={index} style={{ maxWidth: '200px', maxHeight: '120px', overflow: 'hidden' }}>
            <img src={url} alt={`Imagen ${index}`} style={{ border:10 , borderColor: "black", borderRadius: 10, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      )}
    </div>

    
          <br />
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
            placeholder="Category Id"
            name="categoryid"
            autoComplete="categoryid"
            // required
            value={formData.categoryid}
            onChange={handleInputChange}
          />
          <Maps />
          <br />

          <input
            type="submit"
            value="Accept"
            name="edit"
            className="btn btn-block btn-primary cursor"
          />
          <Link to={"/Places"}>
            <input
              type="button"
              value="Back"
              name="edit"
              className="btn btn-block btn-danger cursor"
            />
          </Link>
          <br />
          {status == 200 ? <p style={{ color: "greenyellow" }}>Updated</p> : ""}
          {status == 400 ? <p style={{ color: "orange" }}>Some Error</p> : ""}
        </form>
      </div>
    </div>
  );
};

export default Placesedit;
