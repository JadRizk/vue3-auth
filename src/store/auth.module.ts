import { ActionTree, GetterTree, MutationTree } from 'vuex'

import {
  addAuthHeader,
  loginService,
  logoutService,
  registerService,
} from 'api/auth.services'
import { AugmentedActionContext, State } from 'store'

export interface User {
  firstName: string
  lastName: string
  email: string
  username: string
  phoneNumber: number
  dateOfBirthTimeStamp: number
}

export interface RegisterUserInfo {
  email: string
  username: string
  password: string
}

export type storeErrorT = {
  type: 'error' | 'warning'
  message: string
}

// Declare the state
export type AuthState = {
  user?: User
  registeredEmail?: string | undefined
  isLoggedIn: boolean
  userToken?: string
  error: storeErrorT
}

// Make sure user is being set correctly
const user = JSON.parse(localStorage.getItem('user') || 'null') || undefined
const token = localStorage.getItem('authToken') || undefined

export const initialState: AuthState = {
  user: user,
  isLoggedIn: user ? true : false,
  userToken: token,
  error: {} as storeErrorT,
}

export enum AuthMutationType {
  LOGIN_SUCCESSFUL = 'loginSuccess',
  AUTH_FAILURE = 'authFailure',
  SET_TOKEN = 'setToken',
  REGISTER_SUCCESSFUL = 'registerSuccessful',
  LOGOUT = 'logout',
}

export enum AuthActionTypes {
  LOGIN = 'login',
  REGISTER = 'register',
  LOGOUT = 'logout',
}

export type AuthMutation<S = State> = {
  [AuthMutationType.LOGIN_SUCCESSFUL](state: S, payload: { user: User }): void
  [AuthMutationType.AUTH_FAILURE](
    state: S,
    payload: { error: storeErrorT },
  ): void
  [AuthMutationType.SET_TOKEN](state: S, payload: { token: string }): void
  [AuthMutationType.REGISTER_SUCCESSFUL](
    state: S,
    payload: { email: string },
  ): void
  [AuthMutationType.LOGOUT](state: S, payload: {}): void
}

export const AuthMutations: MutationTree<State> & AuthMutation = {
  [AuthMutationType.LOGIN_SUCCESSFUL](
    { auth }: State,
    payload: { user: User; token: string },
  ) {
    auth.isLoggedIn = true
    auth.user = payload.user
  },
  [AuthMutationType.AUTH_FAILURE](
    { auth }: State,
    payload: { error: storeErrorT },
  ) {
    auth.isLoggedIn = false
    auth.user = undefined
    auth.error = payload.error
  },
  [AuthMutationType.SET_TOKEN]({ auth }: State, payload: { token: string }) {
    auth.userToken = payload.token
  },
  [AuthMutationType.REGISTER_SUCCESSFUL](
    { auth }: State,
    payload: { email: string },
  ) {
    auth.registeredEmail = payload.email
  },
  [AuthMutationType.LOGOUT]({ auth }: State) {
    auth.isLoggedIn = false
    auth.user = undefined
  },
}

export type AuthActions = {
  [AuthActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    userDetails: { username: string; password: string },
  ): Promise<User | string>
  [AuthActionTypes.REGISTER](
    { commit }: AugmentedActionContext,
    userDetails: RegisterUserInfo,
  ): Promise<{ email: string } | string>
  [AuthActionTypes.LOGOUT]({ commit }: AugmentedActionContext): void
}

export const authActions: ActionTree<State, State> & AuthActions = {
  async [AuthActionTypes.LOGIN](
    { commit },
    userDetails: { username: string; password: string },
  ) {
    // Deconstruct the payload 🪚
    const { username, password } = userDetails

    // Authenticate the user
    return await loginService(username, password)
      .then((response) => {
        const token = response.data.authToken
        // Save the user token to store
        commit(AuthMutationType.SET_TOKEN, { token: response.data.authToken })

        addAuthHeader(token)

        // Add to LocalStorage
        localStorage.setItem('user', JSON.stringify(response.data.player))
        localStorage.setItem(
          'authToken',
          JSON.stringify(response.data.authToken),
        )

        // Pass the token
        return response.data.player
      })
      .then((player: User) => {
        // Save user to store
        commit(AuthMutationType.LOGIN_SUCCESSFUL, { user: player })

        // Return user info
        return player
      })
      .catch((error) => {
        if (error.response.status === 422) {
          const errorMessage = 'Invalid Crededentials'
          // Commit error message
          commit(AuthMutationType.AUTH_FAILURE, {
            error: { message: errorMessage, type: 'error' },
          })

          // Return error message for the toaster
          throw errorMessage
        }

        throw 'An error occured, try again!'
      })
  },
  async [AuthActionTypes.REGISTER]({ commit }, userDetails: RegisterUserInfo) {
    // Register the user
    return await registerService(userDetails)
      .then((response) => {
        // Deconstruct the payload 🪚
        const {
          data: {
            player: { email },
          },
        } = response

        // Redirect the user with saved email ✨
        commit(AuthMutationType.REGISTER_SUCCESSFUL, { email: email })

        // Pass down the user
        return { email }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          const errorMessage = 'Something went wrong!'
          // Commit error message
          commit(AuthMutationType.AUTH_FAILURE, {
            error: { message: errorMessage, type: 'error' },
          })
          // Return the error message
          throw errorMessage
        }

        throw 'An error occured, try again!'
      })
  },
  async [AuthActionTypes.LOGOUT]({ commit }) {
    return await logoutService()
      .then(() => {
        // Reset the store user
        commit(AuthMutationType.LOGOUT, {})
      })
      .catch(() => {
        throw 'An error occured, try again!'
      })
  },
}

export type AuthGetters = {
  isUserLoggedIn({ auth }: State): boolean
  userPresetEmail({ auth }: State): string
}

export const authGetter: GetterTree<State, State> & AuthGetters = {
  isUserLoggedIn: ({ auth }: State) => {
    return auth.isLoggedIn
  },
  userPresetEmail: ({ auth }: State) => {
    return auth.registeredEmail || ''
  },
}
