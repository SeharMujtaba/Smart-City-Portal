import axios from "axios";

export const getWeather = async () => {

  const response = await axios.get(
    "https://api.open-meteo.com/v1/forecast?latitude=34.0837&longitude=74.7973&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
  );

  return response.data;
};