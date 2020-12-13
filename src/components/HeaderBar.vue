<template>
  <nav
    id="header"
    class="w-full z-30 top-10 bg-white shadow-lg border-b border-gray-400"
  >
    <div class="w-full flex items-center justify-between mt-0 px-6 py-2">
      <label for="menu-toggle" class="cursor-pointer md:hidden block">
        <svg
          class="fill-current text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>burger menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input class="hidden" type="checkbox" id="menu-toggle" />

      <div
        class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
        id="menu"
      >
        <nav>
          <ul
            class="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0"
          >
            <li v-for="item in navItems" :key="item.name">
              <router-link
                class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                :to="item.path"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
        id="nav-content"
      >
        <div
          class="auth flex items-center w-full md:w-full"
          v-show="!isLoggedIn"
        >
          <base-button
            variantType="outlined"
            class="mr-4"
            @on-click="handleOnRegister"
            >Register</base-button
          >
          <base-button variantType="contained" @on-click="handleOnLogin"
            >Login</base-button
          >
        </div>

        <base-button
          variantType="outlined"
          @on-click="handleOnLogout"
          v-if="isLoggedIn"
          >Logout</base-button
        >
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
// Todo [+]: Add a css class
// Todo [+]: Map the nav entries from the route file

import { computed } from "vue";
import { useRouter, RouteRecordRaw } from "vue-router";

import BaseButton from "components/atoms/BaseButton.atom.vue";
import { routes } from "../router";
import { useStore, ActionTypes } from "store";

export default {
  components: {
    BaseButton,
  },
  setup() {
    const store = useStore();
    const { push } = useRouter();

    const isLoggedIn = computed(() => store.getters.isUserLoggedIn);

    const handleOnRegister = () => push("/auth/register");

    const handleOnLogin = () => push("/auth/login");

    const handleOnLogout = async () => {
      await store.dispatch(ActionTypes.LOGOUT, undefined);
    };

    const navItems = routes.filter((route: RouteRecordRaw) => {
      const { name, component } = route;
      return name && component;
    });

    return {
      handleOnLogin,
      handleOnRegister,
      handleOnLogout,
      navItems,
      isLoggedIn,
    };
  },
};
</script>

<style scoped></style>
