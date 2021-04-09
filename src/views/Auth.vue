<template>
  <div class="container" :class="containerClassName">
    <router-link to="/settings">Settings</router-link>
    <div class="forms-container">
      <div class="signin-signup">
        <register-form @on-register-submit="handleOnRegister" />
        <login-form @on-login-submit="handleOnLogin" />
      </div>
    </div>
    <panels @on-redirect="onRedirect" />
  </div>
</template>

<script lang="ts">
import { RegisterForm } from 'components/organisms'
import { LoginForm } from 'components/organisms'
import { Panels } from 'components/molecules'
import { RegisterUserInfo } from 'store/auth.module'
import { ActionTypes, useStore } from 'store'

import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  components: { RegisterForm, LoginForm, Panels },
  setup() {
    const signUpMode = ref(false)
    const store = useStore()
    const toast = useToast()
    const { push } = useRouter()

    const onRedirect = () => (signUpMode.value = !signUpMode.value)

    const handleOnRegister = async (userDetails: RegisterUserInfo) => {
      // console.log("registered", userDetails);
      await store
        .dispatch(ActionTypes.REGISTER, userDetails)
        .then((data: { email: string } | string) => {
          if (typeof data !== 'string') {
            // Redirect user to Login view
            onRedirect()
          }
        })
        .catch((errorMsg: string) => {
          toast.error(errorMsg)
        })
    }

    const handleOnLogin = async (userDetail: {
      username: string
      password: string
    }) => {
      const { username, password } = userDetail

      await store
        .dispatch(ActionTypes.LOGIN, { username, password })
        .then((data: { email: string } | string) => {
          if (typeof data !== 'string') {
            // Redirect user to Dashboard page
            push({ name: 'Home' })
          }
        })
        .catch((errorMsg: string) => {
          toast.error(errorMsg)
        })
    }

    const containerClassName = computed(() => {
      return {
        'sign-up-mode': signUpMode.value,
      }
    })

    return {
      onRedirect,
      containerClassName,
      handleOnRegister,
      handleOnLogin,
    }
  },
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  max-width: 100% !important;
  min-height: 100vh;
  overflow: hidden;
  @apply bg-light-500;
  @apply text-dark-900;
}

.container:before {
  content: '';
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;

  background: rgb(0, 210, 255);
  background: -moz-linear-gradient(
    103deg,
    rgba(0, 210, 255, 1) 0%,
    rgba(146, 141, 171, 1) 100%
  );
  background: -webkit-linear-gradient(
    103deg,
    rgba(0, 210, 255, 1) 0%,
    rgba(146, 141, 171, 1) 100%
  );
  background: linear-gradient(
    103deg,
    rgba(0, 210, 255, 1) 0%,
    rgba(146, 141, 171, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00d2ff",endColorstr="#928dab",GradientType=1);
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

@media (max-width: 870px) {
  .container {
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}
</style>
