import {
  createStore,
  MutationTree,
  ActionContext,
  ActionTree,
  GetterTree,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger
} from "vuex";

import { AuthState, initialState, AuthMutations, AuthActionTypes, AuthMutation, AuthActions, authGetter, AuthGetters, authActions } from './auth.module';

interface User {
  id: number;
  email: string;
  name: string;
}

export type State = { auth: AuthState }

const state: State = { auth: initialState };


export enum MutationTypes {
  AuthMutationType
}

export const ActionTypes = { ...AuthActionTypes };
export type ActionTypesT = typeof ActionTypes;


export type Mutations<S = State> = AuthMutation


const mutations: MutationTree<State> & Mutations = AuthMutations

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export type Actions = AuthActions

export const actions: ActionTree<State, State> & Actions = {
  ...authActions
};

export type Getters = AuthGetters

export const getters: GetterTree<State, State> & Getters = {
  ...authGetter
};

export type Store = Omit<
  VuexStore<State>,
  "commit" | "getters" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  plugins: [createLogger({
    logActions: true, // Log Actions
    logMutations: true, // Log mutations
  })]
});

export function useStore() {
  return store as Store;
}
