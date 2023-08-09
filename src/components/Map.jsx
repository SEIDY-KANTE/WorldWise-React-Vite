import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map() {
  const { cities } = useCities();
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [lat, lng] = [searchParams.get("lat"), searchParams.get("lng")];
  const [mapPosition, setMapPosition] = useState([10.38, -9.3]);
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
