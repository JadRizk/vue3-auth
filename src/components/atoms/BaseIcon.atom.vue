<template>
  <font-awesome-icon :icon="iconName" />
</template>

<script>
export default {
  name: "BaseIcon",
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
};
</script>