import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    const fetchCities = async function () {
      try {
        setIsLoading((isLoading) => (isLoading = true));
        const resp = await fetch(`${BASE_URL}/cities`);
        const data = await resp.json();
        setCities(() => data);
      } catch (error) {
        alert("Something went wrong with fetching!🔥");
      } finally {
        setIsLoading((isLoading) => (isLoading = false));
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading((isLoading) => (isLoading = true));
      const resp = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await resp.json();
      setCurrentCity(() => data);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading((isLoading) => (isLoading = false));
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading((isLoading) => (isLoading = true));
      const resp = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      alert("There was an error creating city...");
    } finally {
      setIsLoading((isLoading) => (isLoading = false));
    }
  }
  async function deleteCity(id) {
    try {
      setIsLoading((isLoading) => (isLoading = true));
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert("There was an error deleting city...");
    } finally {
      setIsLoading((isLoading) => (isLoading = false));
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
