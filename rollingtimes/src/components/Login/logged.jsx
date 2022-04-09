import axios from 'axios'

const baseUrl = "http://localhost:4001/api/login/"

const loginS = async credentials => {
    const { data } = await axios.post(baseUrl, credentials)
    return data
}

const serviceLog = {loginS}

export default serviceLog ;