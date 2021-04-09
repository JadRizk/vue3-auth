import { required, minLength, email, helpers } from '@vuelidate/validators'

const userPasswordMin = 8
const userNameMin = 4

const rules = {
  userEmail: {
    email: helpers.withMessage(`Please enter a valid email address`, email),
    required,
  },
  userPassword: {
    minLength: helpers.withMessage(
      `Please enter at least ${userPasswordMin} characters`,
      minLength(userPasswordMin),
    ),
    required,
  },
  userName: {
    minLength: helpers.withMessage(
      `Please enter at least ${userNameMin} characters`,
      minLength(userNameMin),
    ),
    required,
  },
}

export default rules
