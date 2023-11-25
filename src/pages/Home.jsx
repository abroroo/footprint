import React, { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { getDistance } from "geolib";
import {
  DirectionsService,
  GoogleMap,
  LoadScript,
} from "react-google-maps-api";

const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("");
  const [distance, setDistance] = useState("");
  const [xFrom, setXFrom] = useState("");
  const [yFrom, setYFrom] = useState("");
  const [xTo, setXTo] = useState("");
  const [yTo, setYTo] = useState("");

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleTransportChange = (e) => {
    setSelectedTransport(e.target.value);
  };

  useEffect(() => {
    // Dynamically load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCtQzD_8wZ1e0Ghi9ESi48sAvKvqwy2iZw&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = () => { }; // Define a dummy callback function for the API script
    document.head.appendChild(script);
  }, []);

  const fetchDirections = async () => {
    if (!window.google) {
      alert("Google Maps JavaScript API library is not loaded!");
      return;
    }

    const directionsService = await new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: window.google.maps.TravelMode.TRANSIT, // or 'WALKING', 'BICYCLING', 'TRANSIT'
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log(result);
          console.log(result.routes[0].legs[0].distance.text);
        } else {
          //alert("Failed to fetch directions");
          console.log(status);
        }
      }
    );
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://065c-116-127-186-66.ngrok-free.app/emission/api/motorcycle/23"
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

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDirections();
    fetchData();
  };

  return (
    <div className="mx-auto mt-8 w-screen">
      <Hero />
      <div className="flex justify-between mb-4 w-full container mx-auto px-5 h-screen mt-10">
        {/* Transport Type Dropdown */}
        <div className="bg-white flex items-center justify-between w-full h-[100px] px-10 py-5 rounded-full">
          <div className="flex items-center gap-5">

            <div className="flex items-center relative text-left">
              <select
                className="h-12 w-[140px] text-white text-xl font-semibold bg-button-green px-5 rounded-xl appearance-none"
                value={selectedTransport}
                onChange={handleTransportChange}
              >
                <option value="">Car</option>
                <option>Model1</option>
                <option>Model2</option>
                <option>Model3</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" /> </svg>
              </div>
            </div>
            <div className="flex items-center relative text-left">
              <select
                className="h-12 w-[140px] text-white text-xl font-semibold bg-button-green px-5 rounded-xl appearance-none"
                value={selectedTransport}
                onChange={handleTransportChange}
              >
                <option value="">Ship</option>
                <option>Model1</option>
                <option>Model2</option>
                <option>Model3</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" /> </svg>
              </div>
            </div>
          </div>


          {/* Search Inputs and Submit Button */}
          <div className="flex w-[50%] p-10 items-center justify-center">
            <div className="flex items-center justify-center m-5">
              <label className="block text-sm font-medium text-gray-700 mr-2">
                From:
              </label>
              <input
                type="text"
                className="border-2 p-2 border-button-green px-5 rounded-xl"
                value={from}
                placeholder="Enter an address.."
                onChange={handleFromChange}
              />
            </div>



            <div className="flex items-center justify-center m-5">
              <label className="block text-sm font-medium text-gray-700 mr-2">
                To:
              </label>
              <input
                type="text"
                className="border-2 p-2 border-button-green px-5 rounded-xl"
                value={to}
                placeholder="Enter an address.."
                onChange={handleToChange}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="text-lg bg-button-green font-semibold rounded-md text-white border-transparent inline-block min-w-[130px] py-1 border-4 box-border hover:opacity-75 "
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
