import { required, minLength, email, helpers } from '@vuelidate/validators'

const rules = {
  userEmail: {
    email: helpers.withMessage(`Please enter a valid email address`, email),
    required,
  },
  userPassword: {
    minLength: helpers.withMessage(
      (v: any) => `Please enter at least ${v.$params.min} characters`,
      minLength(8),
    ),
    required,
  },
  userName: {
    minLength: helpers.withMessage(
      (v: any) => `Please enter at least ${v.$params.min} characters`,
      minLength(4),
    ),
    required,
  },
}

export default rules
