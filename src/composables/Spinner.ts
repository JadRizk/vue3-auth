import { ref } from 'vue'

const showSpinner = ref<boolean>(false)

export const Spinner = () => {
  const toggleSpinner = () => {
    showSpinner.value = !showSpinner.value
  }
  return { showSpinner, toggleSpinner }
}
