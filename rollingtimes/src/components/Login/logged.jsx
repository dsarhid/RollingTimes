import axios from 'axios'

const baseUrl = "https://rollingtimes-backend.herokuapp.com/api/login/"

const loginS = async credentials => {
    const { data } = await axios.post(baseUrl, credentials)
    return data
}

const serviceLog = {loginS}

export default serviceLog ;