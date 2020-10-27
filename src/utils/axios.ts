import Axios, { AxiosInstance } from 'axios'
require('dotenv').config()

const instance: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:3010',
})

export default instance