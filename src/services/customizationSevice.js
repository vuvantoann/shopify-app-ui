// services/customizationService.js
import { get, put } from '../utils/request'

// Lấy customization hiện tại
export const getCustomization = async () => {
  return await get('customization')
}

// Lưu/cập nhật customization
export const saveCustomization = async (formData) => {
  return await put('customization', formData)
}
