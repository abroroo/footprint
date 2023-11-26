// utils/fetchData.js

export const fetchCars = async () => {
    const url = "http://3.208.21.90:5000/api/v1/car/list";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to let the calling code handle it
    }
};


export const fetchModels = async (model) => {
    const url = `http://3.208.21.90:5000/api/v1/car?model=${model}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error to let the calling code handle it
    }
};




export const fetchCarbonEmission = async (car, model, distance) => {
    try {
        const response = await fetch(
            `http://3.208.21.90:5000/api/v1/car/emission?car=${car}&version=${model}&distance=${distance}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};



export const fetchCarbonEmissionForTransports = async (transport, distance) => {
    try {
        const response = await fetch(
            `http://3.208.21.90:5000/api/v1/emission?transport=${transport}&distance=${distance}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

