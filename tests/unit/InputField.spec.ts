import { shallowMount } from '@vue/test-utils'
import { InputField } from 'components/molecules'

describe('TextField', () => {
  const id = 'greatestId'
  const name = 'GenghisKhan'
  const label = 'TextField-Label'
  const iconName = 'IconName'
  const modelValue = 'modelValue'

  it('should emit a value', async () => {
    const wrapper = shallowMount(InputField, {
      props: { id, name, label, iconName, modelValue },
    })
    wrapper.vm.$emit('update:modelValue', '123')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['123'])
  })

  it('emits on-blur when on blur', async () => {
    const wrapper = shallowMount(InputField, {
      props: { id, name },
    })

    wrapper.find('input').trigger('blur')

    expect(wrapper.emitted('on-blur')).toBeTruthy()
  })
})
