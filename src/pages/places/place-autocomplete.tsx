import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
const PlaceAutocomplete = ({ id, placeid }: any) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [showMap, setShow] = useState(false);
  const [values, setValues]: any = useState();


  const changeValue = async (value: any) => {
    setValues(value);
    geocodeByPlaceId(value.value.place_id).then((response) => {
      const latitude = response[0].geometry.location.lat();
      const longitude = response[0].geometry.location.lng();
      setLat(latitude);
      setLng(longitude);
      setShow(true);
      id(response[0].place_id);
    });
  };


  return (
    <>
      <div>
        <GooglePlacesAutocomplete
          apiKey="AIzaSyARzhJXy7VYFW_MJ16-J55rS8REHWwc7c0"
          selectProps={{
            openMenuOnClick: false,
            required: true,
            defaultInputValue: placeid,
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
                fontFamily: "revert"
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
      </div>{showMap && 
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
          <Map defaultZoom={15} center={{ lat, lng }} mapId="19418ea9bcdd3404">
            <AdvancedMarker position={{ lat, lng }}></AdvancedMarker>
          </Map>
        </div>
      </APIProvider>}
    </>
  );
};
export default PlaceAutocomplete;
