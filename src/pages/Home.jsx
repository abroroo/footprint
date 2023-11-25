import React, { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { getDistance } from "geolib";

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

  const [loading, error] = useKakaoLoader({
    appkey: "88fa5e46979c83c2b9f77cf0c4da1025",
    libraries: ["clusterer", "drawing", "services"],
  });

  const getDataForTo = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // No need to extract only address names, keep the entire data
      console.log("This is to address result: ", data[0].x, data[0].y);
      setXTo(data[0].x);
      setYTo(data[0].y);
    }
  };

  const getDataForFrom = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // No need to extract only address names, keep the entire data
      console.log("This is from address result: ", data[0].x, data[0].y);
      setXFrom(data[0].x);
      setYFrom(data[0].y);
    }
  };

  const handleSubmit = async () => {
    const ps1 = new window.kakao.maps.services.Geocoder();
    const ps2 = new window.kakao.maps.services.Geocoder();
    ps1.addressSearch(from, getDataForFrom);
    ps2.addressSearch(to, getDataForTo);

    const distanceI = await getDistance(
      { latitude: xFrom, longitude: yFrom },
      { latitude: xTo, longitude: yTo }
    );
    setDistance(distanceI);
    console.log("Distance is : ", distanceI + " meters");
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
