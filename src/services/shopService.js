import { post, get } from '../utils/request'

export const loginShop = async (formData) => {
  return await post('shop/login', formData)
}

export const createShop = async (formData) => {
  return await post('shop/create', formData)
}
