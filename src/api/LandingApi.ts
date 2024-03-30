import axios from "axios";

export const LandingGeneratorApi = axios.create({
    baseURL: 'http://localhost:3001/api/landing',
})