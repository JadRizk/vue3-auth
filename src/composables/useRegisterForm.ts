import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import rules from '../helpers/validation/rules'

type inputNames = 'userEmail' | 'userName' | 'userPassword'

export const useRegisterForm = () => {
  const userEmail = ref('')
  const userName = ref('')
  const userPassword = ref('')

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
