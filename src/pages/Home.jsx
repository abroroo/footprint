import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Autocomplete,
  DirectionsService,
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Hero from "../components/Hero/Hero";
import carbonBg from "../assets/leavesbg.png";
import earthImg from "../assets/Save-Earth-Free-PNG-Image 1.svg";
import CountUp from "react-countup";

import {
  fetchCars,
  fetchModels,
  fetchCarbonEmission,
  fetchCarbonEmissionForTransports,
} from "../utils/fetchData";

const libraries = ["places"];

const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance, setDistance] = useState(0);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cars, setCars] = useState([]);
  const [models, setModels] = useState([]);
  const [emission, setEmission] = useState(0);
  const [selectedTransport, setSelectedTransport] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [shouldFetchModels, setShouldFetchModels] = useState(true);

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const handleFromChange = (e) => {
    if (originRef.current) {
      const place = originRef.current.getPlace();
      setFrom(place.formatted_address);
    }
  };

  const handleToChange = (e) => {
    if (destinationRef.current) {
      const place = destinationRef.current.getPlace();
      setTo(place.formatted_address);
    }
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

  // Memoize Autocomplete components
  const originAutocomplete = useMemo(() => {
    return (
      <Autocomplete
        onLoad={(autocomplete) => (originRef.current = autocomplete)}
        onPlaceChanged={handleFromChange}
      >
        <input
          id="origin-input"
          type="text"
          className="py-3 px-4 w-[250px] rounded-md drop-shadow-md"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Departure from"
        />
      </Autocomplete>
    );
  }, [from]);

  const destinationAutocomplete = useMemo(() => {
    return (
      <Autocomplete
        onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
        onPlaceChanged={handleToChange}
      >
        <input
          id="destination-input"
          type="text"
          className="py-3 px-4 w-[250px] rounded-md drop-shadow-md"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Arrive at"
        />
      </Autocomplete>
    );
  }, [to]);

  const handleTransportChange = (e) => {
    setSelectedTransport(e.target.value);
  };

  // get all cars
  const fetchCarsNow = async () => {
    const data = await fetchCars();
    setCars(data.response);
    //console.log("Data from the server:", data);
    // Handle the data as needed
  };

  // get models
  const fetchModelsNow = async (selectedModel) => {
    const data = await fetchModels(selectedModel);

    const model = data.response.map((ele) => ele[ele.length - 1]);
    setModels(model);

    //console.log("Models data: ", model);
    setShouldFetchModels(false);
    //console.log("Data from the server:", data);
    // Handle the data as needed
  };

  //get Emmission
  const fetchCarbonEmmissionNow = async (
    selectedTransport,
    selectedModel,
    distance
  ) => {
    const data = await fetchCarbonEmission(
      selectedTransport,
      selectedModel,
      distance
    );
    setEmission(data.response);
    console.log("Emission data: ", data.response);
    setShouldFetchModels(false);
    // console.log("Data from the server:", data);
    // Handle the data as needed
  };

  const fetchCarbonEmissionForTransport = async (
    slectedTransport,
    distance
  ) => {
    const data = await fetchCarbonEmissionForTransports(
      slectedTransport,
      distance
    );
    setEmission(data.response);
    console.log("Emission data: ", data.response);
  };

  useEffect(() => {
    fetchCarsNow();
    if (shouldFetchModels) {
      fetchModelsNow(selectedTransport);
    }
  }, [shouldFetchModels, selectedTransport]);

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
      // console.log(
      //   "selectedTransport in the handle Submit: ",
      //   selectedTransport
      // );
      if (
        selectedTransport === "bus" ||
        selectedTransport === "subway" ||
        selectedTransport === "train" ||
        selectedTransport === "motorcycle" ||
        selectedTransport === "plane"
      ) {
        fetchCarbonEmissionForTransport(selectedTransport, distance);
      } else {
        fetchCarbonEmmissionNow(selectedTransport, selectedModel, distance);
        // await fetchCarbonEmission (distance);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const directionsRequest = useMemo(handleSubmit, [from, to, isSubmitting]);

  return (
    <div className="mx-auto w-screen">
      <Hero />
      <section
        id="mapsection"
        className="min-h-screen flex justify-center items-center"
        style={{
          backgroundImage: `url(${carbonBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="flex flex-col justify-between mb-4 w-full container mx-auto px-2 md:px-5 h-[850px] rounded-xl shadow-inner drop-shadow-md bg-slate-600/30 backdrop-blur-md">
          <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            {/* Transport Type Dropdown */}
            <div className=" flex items-center justify-between w-full h-[100px] px-10 py-4">
              <div className="flex items-center gap-5">
                <div className="flex flex-col gap-3 text-left">
                  <div className="relative">
                    <select
                      className="h-12 w-[200px] text-black text-xl font-semibold bg-white rounded-xl drop-shadow-md flex items-center justify-between px-5 appearance-none"
                      value={selectedTransport}
                      onChange={(e) => {
                        setSelectedTransport(e.target.value);
                        setShouldFetchModels(true);
                      }}
                    >
                      {cars.map((car, index) => (
                        <option key={index} value={car}>
                          {car}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fillRule="currentColor"
                        className="bi bi-arrow-down-short"
                        viewBox="0 0 16 16"
                      >
                        {" "}
                        <path
                          fillRule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                        />{" "}
                      </svg>
                    </div>
                  </div>
                  {selectedTransport && (
                    <div className="relative">
                      <select
                        value={selectedModel}
                        className="h-12 w-[200px] text-black text-xl font-semibold bg-white rounded-xl drop-shadow-md flex items-center justify-between px-5 appearance-none"
                        onChange={(e) => {
                          setSelectedModel(e.target.value);
                        }}
                      >
                        {models.map((model, index) => (
                          <option key={index} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fillRule="currentColor"
                          className="bi bi-arrow-down-short"
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path
                            fillRule="evenodd"
                            d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                          />{" "}
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 relative text-left">
                  <div className="h-12 w-[200px] text-black text-xl font-semibold bg-white rounded-xl drop-shadow-md flex items-center justify-between px-5 appearance-none">
                    {" "}
                    Train
                    <input
                      value="train"
                      type="radio"
                      name="transportation"
                      onChange={(e) => {
                        setSelectedTransport(e.target.value);
                      }}
                    />
                  </div>
                  <div className="h-12 w-[200px] text-black text-xl font-semibold bg-white rounded-xl drop-shadow-md flex items-center justify-between px-5 appearance-none">
                    Plane
                    <input
                      value="plane"
                      type="radio"
                      name="transportation"
                      onChange={(e) => {
                        setSelectedTransport(e.target.value);
                      }}
                    />
                  </div>
                  <div className="h-12 w-[200px] text-black text-xl font-semibold bg-white rounded-xl drop-shadow-md flex items-center justify-between px-5 appearance-none">
                    Subway
                    <input
                      value="subway"
                      type="radio"
                      name="transportation"
                      onChange={(e) => {
                        setSelectedTransport(e.target.value);
                      }}
                    />
                  </div>
                  <div className="h-12 w-[200px] text-black text-xl font-semibold bg-white rounded-xl drop-shadow-md flex items-center justify-between px-5 appearance-none">
                    Bus
                    <input
                      type="radio"
                      name="transportation"
                      value="bus"
                      onChange={(e) => {
                        setSelectedTransport(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Search Inputs and Submit Button */}
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center">
                    <label className="block text-lg font-bold mr-2">
                      From:
                    </label>

                    {originAutocomplete}
                  </div>
                  <div className="flex items-center">
                    <label className="block text-lg font-bold mr-2">To:</label>
                    {destinationAutocomplete}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className="bg-dark-green text-white py-[40px] px-6 rounded-xl hover:opacity-75 w-[150px] text-xl font-bold uppercase hover:scale-105 transition-all duration-150"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 rounded-md flex items-end justify-between w-full px-10">
              <GoogleMap
                mapContainerStyle={{
                  width: "800px",
                  height: "600px",
                  borderRadius: "30px",
                  marginBottom: "50px",
                }}
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
              <div className="h-full flex-col items-center justify-center text-[90px] font-bold opacity-80">
                {emission !== 0 && (
                  <div
                    className={
                      emission > 4
                        ? `text-[#FF0000]`
                        : emission < 2
                        ? `  text-[#54B435]`
                        : `text-[#F4CE14]`
                    }
                  >
                    <CountUp start={0} end={emission} duration={2} />
                    kg
                  </div>
                )}
                <div className="">
                  <img className="w-[550px]" src={earthImg} alt="plant" />
                </div>
              </div>
            </div>
          </LoadScript>
        </div>
      </section>
    </div>
  );
};

export default Home;
