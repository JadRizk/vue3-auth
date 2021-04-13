import { mount } from '@vue/test-utils'
import BaseTextArea from '@/components/atoms/BaseTextArea.atom.vue'

describe('BaseTextArea', () => {
  const id = 'greatestId'
  const name = 'GhenghisKhan'

  it('should emit value', async () => {
    const wrapper = mount(BaseTextArea, {
      props: { id, name },
    })
    wrapper.vm.$emit('update:modelValue', '123')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['123'])
  })

  it('emits on-blur when on blur', async () => {
    const wrapper = mount(BaseTextArea, {
      props: { id, name },
    })

    wrapper.find('textarea').trigger('blur')

    expect(wrapper.emitted('on-blur')).toBeTruthy()
  })
})
