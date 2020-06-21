import http from '../services/httpsService'
import config from "../config.json"

//****************************************************************
//************************* From-Creator *******************************
export function CreateForm(data) {
    return http.post(config.api_CreateModal, data)
}

//****************************************************************
//************************* CreateWork *******************************
export function deleteNewJob(data) {
    return http.post(config.api_DeleteNewJob, data)
}
export function CreateNewJob(data) {
    return http.post(config.api_CreateNewJob, data)
}
export function UpdateNewJob(data) {
    return http.post(config.api_UpdateNewJob, data)
}
