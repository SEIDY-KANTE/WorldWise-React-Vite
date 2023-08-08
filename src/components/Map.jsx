import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("lat"));
  // console.log(searchParams.get("lng"));
  const [lat, lng] = [searchParams.get("lat"), searchParams.get("lng")];
  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position:: {lat},{lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 20, lng: 43 })}>
        Change URL
      </button>
    </div>
  );
}

export default Map;
