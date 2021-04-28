import { mount } from '@vue/test-utils'
import BaseText from '@/components/atoms/BaseText.atom.vue'

describe('BaseInput', () => {
  const tag = 'h1'
  const content = 'I am a title'
  it('should emit a value', async () => {
    const wrapper = mount(BaseText, {
      props: { tag, content },
    })

    expect(wrapper.html().includes(content)).toBe(true)
    expect(wrapper.html().includes(tag)).toBe(true)
  })
})
