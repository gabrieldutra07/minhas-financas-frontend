import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})

class ApiService {

    constructor (apiUrl) {
        this.apiUrl = apiUrl
    }

    post(url, obj) {
        return httpClient.post(url, obj)
    }

    put(url, obj) {
        return httpClient.put(url, obj)
    }

    get(url) {
        return httpClient.get(url)
    }

    delete(url) {
        return httpClient.delete(url)
    }

}

export default ApiService