import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";
import { colors } from "@mui/material";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "8be1a2d2483f348a3bc7311660a89f6c";

  let getWeatherInfo = async () => {
    try {
      let weatherInfo = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonWeather = await weatherInfo.json();

      let result = {
        city: city,
        temp: jsonWeather.main.temp,
        tempMin: jsonWeather.main.temp_min,
        tempMax: jsonWeather.main.temp_max,
        humidity: jsonWeather.main.humidity,
        weather: jsonWeather.weather[0].description,
        feelsLike: jsonWeather.main.feels_like,
      };
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleInputChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setCity("");
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="searchContainer">
      <h2>Weather App</h2>

      <form action="" onSubmit={handleSubmit}>
        {/* //Search Box */}
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleInputChange}
        />
        {/* //Button */}
        <Button
          className="btn"
          type="submit"
          variant="contained"
          endIcon={<SearchIcon />}
          size="small"
        >
          Search
        </Button>
      </form>
      {error && <p style={{ color: "red" }}>Please Select a Valid City</p>}
    </div>
  );
}
