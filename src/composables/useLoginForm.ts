import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import rules from '../services/vuelidateRules'

export const useLoginForm = () => {
  const userEmail = ref('')
  const userPassword = ref('')

  const v = useVuelidate(rules, { userEmail, userPassword })

  const handleBlur = (key: 'userEmail' | 'userPassword') => {
    v.value[key].$touch()
  }

  function validateOnSubmit() {
    v.value.$touch()
  }

  return {
    userEmail,
    userPassword,
    handleBlur,
    validateOnSubmit,
    v,
  }
}
