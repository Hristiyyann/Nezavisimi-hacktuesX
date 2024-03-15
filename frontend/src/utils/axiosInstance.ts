import axios from "axios";

const instance = axios.create({ baseURL: 'localhost:1000', withCredentials: true });

export default instance;
