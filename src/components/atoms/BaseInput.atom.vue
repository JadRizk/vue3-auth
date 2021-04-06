<template>
  <input
    :type="type"
    :id="id"
    :name="name"
    :placeholder="placeholder"
    class="default-input"
    :class="inputWrapperClass"
    @blur="handleOnBlur"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
import { computed, SetupContext } from 'vue'

interface Props {
  id: string
  name: string
  modelValue?: string
  type?: string
  errorMode?: boolean
  placeholder?: string
}
export default {
  name: 'BaseInput',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      required: false,
    },
    errorMode: {
      type: Boolean,
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const handleOnBlur = () => {
      emit('on-blur')
    }

    const inputWrapperClass = computed(() => {
      return {
        'border-red-500': props.errorMode,
        'custom-checkbox': props.type === 'checkbox',
      }
    })

    return {
      handleOnBlur,
      inputWrapperClass,
      emit,
    }
  },
  model: {
    prop: 'value',
  },
  emits: ['update:modelValue', 'on-blur'],
}
</script>

<style scoped></style>
