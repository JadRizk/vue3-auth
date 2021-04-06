import { AxiosRequestConfig, AxiosResponse } from 'axios'

import API from './api'
import { RegisterUserInfo, User } from 'store/auth.module'

interface LoginAPIResponse {
  authToken: string
  player: User
}

interface RegisterAPISuccess {
  player: {
    email: string
    playerID: string
  }
}

/**
 * @description Used for development puropses ONLY!
 * @params time - timeout time in s
 *
 * @example simulateApi(300)
 */
export function simulateApi(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

/**
 * @description Add Bearer Token to axios instance
 *
 * @param token
 *
 * @returns void
 */
export function addAuthHeader(token: string) {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

/**
 * @description Login API
 * @param {string} email - The email address of the buyer.
 * @param {string} password - The password of the buyer.
 *
 * @returns {Promise<AxiosResponse<LoginAPIResponse>>} userToken
 * @example loginService('example`@gmail.com', '1234password')
 */
export async function loginService(
  username: string,
  password: string,
): Promise<AxiosResponse<LoginAPIResponse>> {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/player',
    data: {
      userName: username,
      password,
    },
  }

  return await API.request<LoginAPIResponse>(config)
}

/**
 * @description Registration aPI
 * @params {User} - new user object
 *
 * @returns {Promise<AxiosResponse<RegisterAPISuccess>>} - user object
 *
 * @example registerUser(user)
 */
export function registerService(
  user: RegisterUserInfo,
): Promise<AxiosResponse<RegisterAPISuccess>> {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/player/register',
    data: {
      userName: user.username,
      email: user.email,
      password: user.password,
    },
  }

  return API.request<RegisterAPISuccess>(config)
}

/**
 * @description Logout API
 *
 * @returns void
 *
 * @example logoutService()
 */
export function logoutService() {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/api/logout',
  }

  return API.request(config)
}
