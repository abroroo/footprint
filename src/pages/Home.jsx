import React, { useState, useMemo } from "react";
import {
  Autocomplete,
  DirectionsService,
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";

const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("");
  const [distance, setDistance] = useState(0);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const handleTransportChange = (e) => {
    setSelectedTransport(e.target.value);
  };

  const handleFromChange = (place) => {
    setFrom(place.formatted_address);
  };

  const handleToChange = (place) => {
    setTo(place.formatted_address);
  };

  const onDirectionsServiceChange = (result, status) => {
    if (status === "OK") {
      console.log(result);
      setDirectionResponse(result);
      setDistance(result.routes[0].legs[0].distance.value);
      console.log(result.routes[0].legs[0].distance.text);
      console.log(result.routes[0].legs[0].distance.value);
    } else {
      console.log(status);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://065c-116-127-186-66.ngrok-free.app/emission/api/motorcycle/${distance}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("CO2 emission: ", result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    // Call the Directions API only when both from and to locations are set
    if (from && to) {
      // You can make other API calls or actions here before the Directions API call if needed
      setIsSubmitting(true);
      // Call Directions API
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: from,
          destination: to,
          travelMode: window.google.maps.TravelMode.TRANSIT,
        },
        onDirectionsServiceChange
      );

      await fetchData();
    }
  };

  const directionsRequest = useMemo(handleSubmit, [from, to, isSubmitting]);

  // Memoize Autocomplete components
  const originAutocomplete = useMemo(() => {
    return (
      <Autocomplete
        onLoad={(autocomplete) => {}}
        //onPlaceChanged={(place) => handleFromChange(place)}
      >
        <input
          id="origin-input"
          type="text"
          className="border p-2 rounded"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </Autocomplete>
    );
  }, [from]);

  const destinationAutocomplete = useMemo(() => {
    return (
      <Autocomplete
        onLoad={(autocomplete) => {}}
        //onPlaceChanged={(place) => handleToChange(place)}
      >
        <input
          id="destination-input"
          type="text"
          className="border p-2 rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </Autocomplete>
    );
  }, [to]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
      <div className="mx-auto mt-8 w-screen">
        <div className="flex justify-between items-center mb-4 w-full h-full container mx-auto px-5 py-5">
          {/* ... Other parts of your code remain unchanged ... */}
          <div className="flex flex-wrap w-[50%]  mt-10">
            <select
              className="w-30 h-20 m-2  border p-2 rounded"
              value={selectedTransport}
              onChange={handleTransportChange}
            >
              <option value="">Car</option>
              <option>Model1</option>
              <option>Model2</option>
              <option>Model3</option>
            </select>

            <select
              className="w-30 h-20 m-2  border p-2 rounded"
              value={selectedTransport}
              onChange={handleTransportChange}
            >
              <option value="">Ship</option>
              <option>Model1</option>
              <option>Model2</option>
              <option>Model3</option>
            </select>

            <select
              className="w-30 h-20 m-2  border p-2 rounded"
              value={selectedTransport}
              onChange={handleTransportChange}
            >
              <option value="">Air</option>
              <option>Model1</option>
              <option>Model2</option>
              <option>Model3</option>
            </select>

            <select
              className="w-30 h-20  m-2 border p-2 rounded"
              value={selectedTransport}
              onChange={handleTransportChange}
            >
              <option value="">Bus</option>
              <option>Model1</option>
              <option>Model2</option>
              <option>Model3</option>
            </select>

            <select
              className="w-30 h-20  m-2 border p-2 rounded"
              value={selectedTransport}
              onChange={handleTransportChange}
            >
              <option value="">Subway</option>
              <option>Model1</option>
              <option>Model2</option>
              <option>Model3</option>
            </select>

            <GoogleMap
              mapContainerStyle={{ width: "800px", height: "400px" }}
              center={{ lat: 37.4979, lng: 127.0276 }}
              zoom={15}
            >
              {!directionResponse && isSubmitting && (
                <DirectionsService
                  options={directionsRequest}
                  callback={onDirectionsServiceChange}
                />
              )}
              {directionResponse && (
                <DirectionsRenderer
                  options={{ directions: directionResponse }}
                />
              )}
            </GoogleMap>
          </div>
          {/* Search Inputs and Submit Button */}
          <div className="flex-col w-[50%] p-10 items-center justify-center">
            <div className="flex items-center justify-center m-5">
              <label className="block text-sm font-medium text-gray-700 mr-2">
                From:
              </label>
              {originAutocomplete}
            </div>

            <div className="flex items-center justify-center m-5">
              <label className="block text-sm font-medium text-gray-700 mr-2">
                To:
              </label>
              {destinationAutocomplete}
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 border p-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default Home;
