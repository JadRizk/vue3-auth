import { mount } from '@vue/test-utils'
import SpinnerComponent from '@/components/atoms/Spinner.atom.vue'
import { Spinner } from '../../src/composables/Spinner'

describe('Spinner', () => {
  it('should not render anything if ref is false', async () => {
    const wrapper = mount(SpinnerComponent)
    expect(wrapper.find('.spinner').exists()).toBe(false)
  })

  it('should render spinner if ref is true', async () => {
    const { toggleSpinner } = Spinner()
    const wrapper = mount(SpinnerComponent)
    toggleSpinner()
    await wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.spinner').exists()).toBe(true)
    })
  })
})
