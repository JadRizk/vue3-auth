import { mount } from '@vue/test-utils'
import BaseInput from '@/components/atoms/BaseInput.atom.vue'

describe('BaseInput', () => {
  const id = 'greatestId'
  const name = 'GhenghisKhan'

  it('should emit a value', async () => {
    const wrapper = mount(BaseInput, {
      props: { id, name },
    })
    wrapper.vm.$emit('update:modelValue', '123')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['123'])
  })

  it('emits on-blur when on blur', async () => {
    const wrapper = mount(BaseInput, {
      props: { id, name },
    })

    wrapper.find('input').trigger('blur')

    expect(wrapper.emitted('on-blur')).toBeTruthy()
  })
})
