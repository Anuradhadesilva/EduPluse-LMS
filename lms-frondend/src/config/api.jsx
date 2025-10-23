import axios from "axios";

export const API_URL = "http://3.108.53.42:5454"

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})