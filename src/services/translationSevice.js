// services/translationSevice.js
import { del, get, post } from '../utils/request'

// Lấy customization hiện tại
export const getTranslations = async () => {
  return await get('translation')
}

// thêm translation mới
export const createTranslation = async (formData) => {
  return await post('translation', formData)
}

// thêm translation mới
export const updateTranslation = async (formData) => {
  return await post('translation/update', formData)
}

// thêm translation mới
export const deleteTranslation = async (locale) => {
  return await del(`translation/${locale}`)
}
