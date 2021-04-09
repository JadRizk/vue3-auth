<template>
  <div class="input-field">
    <base-icon :iconName="iconName" class="pre-input-icon" />
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
  </div>

  <div v-if="validationStatus" class="text-red-500 mb-4">
    <p v-for="$error in validationStatus.$errors" :key="$error.$property">
      {{ $error.$message }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, SetupContext } from 'vue'

import BaseIcon from './BaseIcon.atom.vue'

export default defineComponent({
  name: 'InputField',
  components: { BaseIcon },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    iconName: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    showRequiredWarning: {
      type: Boolean,
      default: false,
    },
    validationStatus: {
      type: Object,
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
  setup(props, { emit }: SetupContext) {
    const handleOnBlur = () => emit('on-blur')

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
  emits: ['on-blur', 'update:modelValue'],
})
</script>

<style scoped>
.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 1rem;
  position: relative;
  justify-content: center;
  align-content: center;
  @apply border-2;
  @apply border-dark-900;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.pre-input-icon {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.3rem;
  justify-self: center;
}
</style>
