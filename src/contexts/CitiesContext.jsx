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
        console.error("Something went wrong with fetching!🔥");
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
      console.error("Something went wrong with fetching!🔥");
    } finally {
      setIsLoading((isLoading) => (isLoading = false));
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
