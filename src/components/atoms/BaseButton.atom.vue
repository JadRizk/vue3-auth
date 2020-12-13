<template>
  <button
    @click="onClick"
    :type="type"
    :class="`btn-${size} btn-${variantColor}`"
  >
    <slot>Default Button</slot>
  </button>
</template>

<script lang="ts">
// Imports
import { SetupContext } from "vue";

// Types
interface Props {
  type?: TBtnType;
  variantColor?: TvariantColor;
  isDisabled?: boolean;
  value?: string;
  size?: TbtnSize;
}

type TBtnType = "primary-outlined" | "primary-contained" | "transparent";

type TvariantColor = "primary" | "secondary";
type TbtnSize = "sm" | "md" | "lg";

// @component
export default {
  name: "BaseButton",
  props: {
    type: {
      type: String as () => TBtnType,
      default: "button",
    },
    variantColor: {
      type: String as () => TvariantColor,
      default: "primary",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as () => TbtnSize,
      default: "md",
    },
  },

  setup(props: Props, { emit }: SetupContext) {
    const onClick = () => {
      emit("on-click");
    };

    return { onClick };
  },
  emits: ["on-click"],
};
</script>
<style scoped>
button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  color: #333;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  @apply font-semibold;
  cursor: pointer;
  outline: 0;
}

button[type|="primary"] {
  @apply rounded-lg;
  @apply text-white;
  @apply uppercase;
}

button[type="primary-outlined"] {
  @apply border-2;
  @apply border-primary-500;
  @apply text-primary-500;
  @apply text-primary-500;
  background-color: transparent;
}

button[type="primary-contained"] {
  @apply text-white;
  @apply bg-primary-500;
}

button[type="primary-transparent"] {
  @apply text-dark-900;
  @apply border-2;
  @apply border-dark-900;
  background-color: transparent;
}

.btn-sm {
  padding: 4px 10px;
  font-size: 0.8125rem;
}

.btn-lg {
  padding: 8px 22px;
  font-size: 0.9375rem;
}
</style>
