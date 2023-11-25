import React, { useState } from "react";

const Home = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("");

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleTransportChange = (e) => {
    setSelectedTransport(e.target.value);
  };

  const handleSubmit = () => {
    // Add your logic for handling the form submission here
    console.log("From:", from);
    console.log("To:", to);
    console.log("Selected Transport:", selectedTransport);
  };
  return (
    <div className="container mx-auto mt-8 w-screen h-screen">
      <div className="flex justify-between items-center mb-4 w-full h-full">
        {/* Transport Type Dropdown */}
        <div className="flex w-[50%]  mt-10">
          <select
            className="w-full m-2  border p-2 rounded"
            value={selectedTransport}
            onChange={handleTransportChange}
          >
            <option value="">Car</option>
            <option>Model1</option>
            <option>Model2</option>
            <option>Model3</option>
          </select>

          <select
            className="w-full m-2  border p-2 rounded"
            value={selectedTransport}
            onChange={handleTransportChange}
          >
            <option value="">Ship</option>
            <option>Model1</option>
            <option>Model2</option>
            <option>Model3</option>
          </select>

          <select
            className="w-full m-2  border p-2 rounded"
            value={selectedTransport}
            onChange={handleTransportChange}
          >
            <option value="">Air</option>
            <option>Model1</option>
            <option>Model2</option>
            <option>Model3</option>
          </select>

          <select
            className="w-full  m-2 border p-2 rounded"
            value={selectedTransport}
            onChange={handleTransportChange}
          >
            <option value="">Bus</option>
            <option>Model1</option>
            <option>Model2</option>
            <option>Model3</option>
          </select>

          <select
            className="w-full  m-2 border p-2 rounded"
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
