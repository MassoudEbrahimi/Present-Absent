import http from '../Services/HttpServices'
import config from "../config.json"



export function getData(data) {
    return http.post(config.data_Users, data)
}
export function InsertWork(data) {
    return http.post(config.data_UsersPost, data)
}