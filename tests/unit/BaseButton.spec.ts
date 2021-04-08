import { mount } from '@vue/test-utils'
import BaseButton from '@/components/atoms/BaseButton.atom.vue'

describe('BaseInput', () => {
  it('should emit a on-click event', async () => {
    const wrapper = mount(BaseButton)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted('on-click')).toBeTruthy()
  })
})
