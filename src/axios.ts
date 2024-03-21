import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
});