import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const Test = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleFromChange = useCallback((place) => {
    console.log(place);
    //setFrom(place.formatted_address);
  }, []);

  const handleToChange = useCallback((place) => {
    // setTo(place.formatted_address);
  }, []);

  const [map, setMap] = React.useState(null);
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  console.log(from);
  return (
    <LoadScript
      libraries={["places"]}
      googleMapsApiKey="AIzaSyCtQzD_8wZ1e0Ghi9ESi48sAvKvqwy2iZw"
    >
      <Autocomplete
        onLoad={(autocomplete) =>
          console.log("Autocomplete loaded:", autocomplete)
        }
        onPlaceChanged={(place) => handleFromChange(place)}
      >
        <input
          type="text"
          placeholder="Enter origin address"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </Autocomplete>

      <Autocomplete
        onLoad={(autocomplete) =>
          console.log("Autocomplete loaded:", autocomplete)
        }
        onPlaceChanged={(place) => handleToChange(place)}
      >
        <input
          type="text"
          placeholder="Enter destination address"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </Autocomplete>

      <div>
        {/* Display the suggestions as JSX */}
        <p>Origin: {from}</p>
        <p>Destination: {to}</p>
      </div>

      <div>
        <GoogleMap
          mapContainerStyle={{
            width: "400px",
            height: "400px",
          }}
          center={{
            lat: -3.745,
            lng: -38.523,
          }}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Test;
