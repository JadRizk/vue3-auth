<template>
  <textarea
    :id="id"
    :name="name"
    :cols="cols"
    :placeholder="placeholder"
    :rows="rows"
    @blur="handleOnBlur"
    class="default-textarea"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    :disabled="isDisabled"
    :required="isRequired"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'

interface Props {
  id?: string
  name: string
  cols?: string
  rows?: string
  modelValue?: string
  errorMode?: boolean
  placeholder?: string
  isDisabled: boolean
  isRequired: boolean
}

export default defineComponent({
  name: 'BaseTextInput',
  props: {
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    cols: {
      type: String,
      required: false,
      default: '50',
    },
    rows: {
      type: String,
      required: false,
      default: '10',
    },
    modelValue: {
      type: String,
      required: true,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    isRequired: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props: Props, { emit }: SetupContext) {
    const handleOnBlur = () => {
      emit('on-blur')
    }

    return { handleOnBlur, emit }
  },
  emits: ['update:modelValue', 'on-blur'],
})
</script>

<style>
textarea {
  max-width: 380px;
  background: none;
  border: solid 2px #000000;
  border-radius: 20px;
  padding: 10px !important;
}
</style>
