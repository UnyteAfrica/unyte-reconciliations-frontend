import axios from "axios"

const URL = "https://unyte-reconciliation-backend-dev-ynoamqpukq-uc.a.run.app/"

export const axiosInstance = axios.create({ 
    baseURL: URL,
    headers: {
        "Authorization": localStorage.getItem("accessToken") ? `Bearer ${localStorage.getItem("accessToken")}` : ""
    }
})

export const companySignup = () :  => {

}