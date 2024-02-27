// import React, { useState } from 'react';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const MapContainer: React.FC = () => {
//   const [selectedPlace, setSelectedPlace] = useState<string>('');
//   const [placeId, setPlaceId] = useState<string>('');

//   const handleSelect = async (address: string) => {
//     try {
//       const results = await geocodeByAddress(address);
//       const latLng = await getLatLng(results[0]);
//       setSelectedPlace(address);
//       setPlaceId(results[0].place_id);
//     } catch (error) {
//       console.error('Error selecting place:', error);
//     }
//   };

//   return (
//     <LoadScript googleMapsApiKey="TU_CLAVE_DE_API">
//       <PlacesAutocomplete
//         value={selectedPlace}
//         onChange={(address) => setSelectedPlace(address)}
//         onSelect={handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input {...getInputProps({ placeholder: 'Enter address' })} />
//             <div>
//               {loading && <div>Loading...</div>}
//               {suggestions.map((suggestion) => (
//                 <div 
//                 // key={suggestion.placeId} 
//                 {...getSuggestionItemProps(suggestion)}>
//                   <span>{suggestion.description}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//       <GoogleMap
//         center={{ lat: 0, lng: 0 }}
//         zoom={1}
//         mapContainerStyle={{ height: '400px', width: '100%' }}
//       >
//         {selectedPlace && (
//           <Marker position={{ lat: 0, lng: 0 }} />
//         )}
//       </GoogleMap>
//       {placeId && <div>Place ID: {placeId}</div>}
//     </LoadScript>
//   );
// };

// export default MapContainer;
