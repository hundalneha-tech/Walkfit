import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

class APIClientClass {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete this.client.defaults.headers.common['Authorization']
    }
  }

  async get(endpoint, config = {}) {
    return this.client.get(endpoint, config)
  }

  async post(endpoint, data = {}, config = {}) {
    return this.client.post(endpoint, data, config)
  }

  async put(endpoint, data = {}, config = {}) {
    return this.client.put(endpoint, data, config)
  }

  async delete(endpoint, config = {}) {
    return this.client.delete(endpoint, config)
  }
}

export const APIClient = new APIClientClass()
