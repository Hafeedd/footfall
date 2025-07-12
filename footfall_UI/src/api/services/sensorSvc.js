import createAxiosInstance from "../config/axiosConfig";
import { API_BASE_URL, ENDPOINTS } from "../config/endPoints";

const publicApi = createAxiosInstance(API_BASE_URL);

const summary = () => publicApi.get(ENDPOINTS.SENSOR.GETSUMMARY);
const realTime = () =>
  publicApi.get(ENDPOINTS.SENSOR.REALTIMEFOOTFALL);
const sensorList = () => publicApi.get(ENDPOINTS.SENSOR.SENSORLIST);
// const mapView = () => publicApi.get(ENDPOINTS.SENSOR.MAPVIEWSENSORS);

export { summary, realTime, sensorList };
