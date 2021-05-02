import axios from "axios";
import {RegisterErrorAuthIDAlreadyRegister, RegisterErrorDuplicated} from "../../domain/register/model/register-error";
import {UnknownError} from "../../domain/error/model/error";

export default function applyHttpInterceptors() {
    axios.interceptors.request.use(
        config => {
            console.log(`API request:${config.url}|${config.params}|${JSON.stringify(config.data)}`)
            return config
        }
    )
    axios.interceptors.response.use(
        resp => {
            console.log(`API response:${JSON.stringify(resp)}`)
            return resp
        },
        err => {
            console.log(`API response:${JSON.stringify(err)}`)
            switch (err.status) {
                case 409:
                    return Promise.reject(new RegisterErrorDuplicated())
                case 403:
                    return Promise.reject(new RegisterErrorAuthIDAlreadyRegister())
                default:
                    return Promise.reject(new UnknownError())
            }
        }
    )
}
