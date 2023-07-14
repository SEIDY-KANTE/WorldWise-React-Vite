import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
