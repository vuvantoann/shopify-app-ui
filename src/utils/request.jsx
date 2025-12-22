import { getCookie } from '../helpers/cookie'

const API_DOMAIN = 'http://localhost:3000/'

// Hàm lấy headers chung
const getAuthHeaders = () => {
  const token = getCookie('token')

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export const get = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: 'GET',
    headers: getAuthHeaders(),
  })

  const result = await response.json()
  return result
}

export const post = async (path, data) => {
  const response = await fetch(API_DOMAIN + path, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  const result = await response.json()
  return result
}

export const patch = async (path, data) => {
  const response = await fetch(API_DOMAIN + path, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  const result = await response.json()
  return result
}

export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  const result = await response.json()
  return result
}
