import axios from 'axios'

export default {
    registerUser(payload) {
        console.log("Heyyy you are going to hit the API", payload)
        return axios.post('/register', payload)
    }
}