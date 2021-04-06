import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

type inputNames = 'userEmail' | 'userName' | 'userPassword'

export const useRegisterForm = () => {
  const userEmail = ref('')
  const userName = ref('')
  const userPassword = ref('')

  // Validation Logics
  const rules = {
    userEmail: { required, email },
    userName: { required, minLength: minLength(4) },
    userPassword: { required, minLength: minLength(8) },
  }

  // For testing
  // const rules = {
  //     userEmail: {},
  //     userName: {},
  //     userPassword: {},
  // };

  const v = useVuelidate(rules, { userEmail, userName, userPassword })

  const handleBlur = (key: inputNames) => {
    v.value[key].$touch()
  }

  function validateOnSubmit() {
    v.value.$touch()
  }

  return {
    userEmail,
    userName,
    userPassword,
    handleBlur,
    validateOnSubmit,
    v,
  }
}
