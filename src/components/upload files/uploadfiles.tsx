import { useState } from 'react';
import axios from 'axios';

const MultiFileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event: any) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL}/places/file`, formData);
      console.log('Archivos subidos:', response.data);
      // Puedes manejar la respuesta del servidor aquí
    } catch (error) {
      console.error('Error al subir los archivos:', error);
      // Puedes manejar los errores aquí
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    
      <input type="file" multiple onChange={handleFileChange} />
      
    //   {/* <button type="submit">Subir archivos</button> */}
    // </form>
  );
}

export default MultiFileUpload;