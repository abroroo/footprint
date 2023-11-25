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
    window.initMap = () => {}; // Define a dummy callback function for the API script
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
        } else {
          //alert("Failed to fetch directions");
          console.log(status);
        }
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDirections();
  };

  return (
    <div className="mx-auto mt-8 w-screen">
      <Hero />
      <div className="flex justify-between items-center mb-4 w-full h-full container mx-auto px-5 py-5">
        {/* Transport Type Dropdown */}
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
        </div>

        {/* Search Inputs and Submit Button */}
        <div className="flex-col w-[50%] p-10 items-center justify-center">
          <div className="flex items-center justify-center m-5">
            <label className="block text-sm font-medium text-gray-700 mr-2">
              From:
            </label>
            <input
              type="text"
              className="border p-2 rounded"
              value={from}
              onChange={handleFromChange}
            />
          </div>

          <div className="flex items-center justify-center m-5">
            <label className="block text-sm font-medium text-gray-700 mr-2">
              To:
            </label>
            <input
              type="text"
              className="border p-2 rounded"
              value={to}
              onChange={handleToChange}
            />
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
  );
};

export default Home;
