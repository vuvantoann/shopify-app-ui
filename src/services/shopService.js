import { post, get } from '../utils/request'

export const getShopInfo = async () => {
  return await get('shop/detail')
}

export const loginShop = async (formData) => {
  return await post('shop/login', formData)
}

export const createShop = async (formData) => {
  return await post('shop/create', formData)
}
