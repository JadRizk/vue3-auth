<template>
  <form class="sign-up-form" novalidate @submit.prevent="handleOnSubmit">
    <base-text tag="h2" content="Register with us" class="title" />
    <input-field
      id="register-email"
      name="email"
      label="Email Address"
      iconName="envelope"
      placeholder="johndoe@stix.com"
      isRequired
      v-model="userEmail"
      :validationStatus="v.userEmail"
      @on-blur="handleBlur('userEmail')"
    />
    <input-field
      id="register-username"
      name="username"
      iconName="user"
      label="Username"
      placeholder="john_doe"
      isRequired
      v-model="userName"
      :validationStatus="v.userName"
      @on-blur="handleBlur('userName')"
    />
    <input-field
      id="register-password"
      name="password"
      iconName="lock"
      label="Password"
      type="password"
      placeholder="********"
      isRequired
      validateFor="EmailValidator"
      v-model="userPassword"
      :validationStatus="v.userPassword"
      @on-blur="handleBlur('userPassword')"
    />

    <base-button type="primary-contained">Register</base-button>

    <p class="social-text">Or Register in with social platforms</p>
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
import { RegisterUserInfo } from "store/auth.module";

/* eslint-disable @typescript-eslint/camelcase */
import { BaseButton, BaseText } from "components/atoms";
import { InputField } from "components/molecules";
import { useRegisterForm } from "composables/useRegisterForm";
import { useEmitter } from "hooks/useEmitter";

interface Events {
  "on-register-submit": RegisterUserInfo;
}

export default {
  name: "RegisterForm",
  components: { BaseButton, BaseText, InputField },
  setup() {
    // Import everything we need from the registration composable
    const {
      userEmail,
      userName,
      userPassword,
      v,
      handleBlur,
    } = useRegisterForm();

    const emitter = useEmitter<Events>();

    const handleOnSubmit = () => {
      // Validate the inputs
      v.value.$touch();

      // Make sure that all the inputs are valide before procceding
      if (!v.value.$invalid) {
        // Emit and event with the registration user obj
        emitter("on-register-submit", {
          email: userEmail.value,
          username: userName.value,
          password: userPassword.value,
        });
        return;
      }
      // Todo: call a toaster
      console.log("Rejected");
    };

    return {
      userEmail,
      userName,
      userPassword,
      v,
      handleBlur,
      handleOnSubmit,
    };
  },
  emits: ["on-register-submit"],
};
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

form.sign-up-form {
  opacity: 0;
  z-index: 1;
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
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}
</style>
