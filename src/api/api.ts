import axios from "axios"
import { MovieInterface } from "../type"

export const baseURL = "https://shy-red-xerus-tam.cyclic.app"

export const getBillBoardMovie = (token: string) =>
    axios.get<MovieInterface>(`${baseURL}/movies/random`, { headers : { Authorization: `bearer ${token}`}})