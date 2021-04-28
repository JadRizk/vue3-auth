import { mount } from '@vue/test-utils'
import BaseButton from '@/components/atoms/BaseButton.atom.vue'

describe('BaseInput', () => {
  it('should emit a on-click event', async () => {
    const wrapper = mount(BaseButton)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted('on-click')).toBeTruthy()
  })

  it('should have class btn-sm if size sm passed', async () => {
    const wrapper = mount(BaseButton, {
      props: { size: 'sm', isDisabled: false },
    })
    const button = wrapper.find('button')
    expect(button.classes()).toContain('btn-sm')
    expect(button.attributes('disabled')).toBe(undefined)
  })

  it('button should be disabled if prop is true', async () => {
    const wrapper = mount(BaseButton, { props: { isDisabled: true } })
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted('on-click')).toBeFalsy()
    expect(button.attributes('disabled')).toBe('')
  })
})
