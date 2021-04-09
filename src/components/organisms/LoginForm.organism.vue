<template>
  <form class="sign-in-form" novalidate @submit.prevent="handleOnSubmit">
    <base-text class="title" tag="h2" content="Sign In" />
    <base-input
      id="name"
      name="username"
      iconName="user"
      label="Insert your name"
      placeholder="username"
      v-model="userEmail"
      :validationStatus="v.userEmail"
      isRequired
      showRequiredWarning
      @on-blur="handleBlur('userEmail')"
    />

    <base-input
      id="password"
      name="password"
      iconName="lock"
      label="Password"
      type="password"
      placeholder="********"
      v-model="userPassword"
      :validationStatus="v.userPassword"
      isRequired
      @on-blur="handleBlur('userPassword')"
    />

    <base-button type="primary-contained">Login</base-button>
    <p class="social-text">Or Sign in with social platforms</p>
    <div class="social-media">
      <a href="#" class="social-icon">
        <font-awesome-icon :icon="['fab', 'facebook']" />
      </a>
      <a href="#" class="social-icon">
        <font-awesome-icon :icon="['fab', 'twitter']" />
      </a>
      <a href="#" class="social-icon">
        <font-awesome-icon :icon="['fab', 'google']" />
      </a>
      <a href="#" class="social-icon">
        <font-awesome-icon :icon="['fab', 'linkedin']" />
      </a>
    </div>
  </form>
</template>

<script lang="ts">
import { SetupContext } from 'vue'

import { BaseButton, BaseText } from 'components/atoms'
import { BaseInput } from 'components/atoms'

import { useLoginForm } from 'composables/useLoginForm'

export default {
  name: 'LoginForm',
  components: { BaseButton, BaseInput, BaseText },
  setup(props: {}, { emit }: SetupContext) {
    const { userEmail, userPassword, v, handleBlur } = useLoginForm()

    const handleOnSubmit = () => {
      v.value.$touch()

      if (!v.value.userEmail.$error && !v.value.userPassword.$error) {
        emit('on-login-submit', {
          username: userEmail.value,
          password: userPassword.value,
        })
        return
      }
      console.log('Rejected')
    }

    return {
      userEmail,
      userPassword,
      v,
      handleBlur,
      handleOnSubmit,
    }
  },
  emits: ['on-login-submit'],
}
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 4rem;
  margin-bottom: 10px;
  text-align: center;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
  outline: 0;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}
</style>
