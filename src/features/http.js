import axios from "axios";

const http = axios.create({
    baseURL: "https://nexuscrm-bot-8jmi7.ondigitalocean.app/api/v1",
});

export default http;