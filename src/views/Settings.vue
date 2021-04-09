<template>
  <div class="settings">
    <BaseText tag="h1" content="Settings" />
    <BaseText
      tag="p"
      content="A place to showcase all of the apps components"
    />

    <div class="card">
      <BaseText tag="h2" content="Buttons" />
      <div class="card-content">
        <BaseButton
          v-for="(button, i) in buttons"
          :type="button.type"
          :key="i"
          :variantColor="button.variantColor"
          :size="button.size"
          :isDisabled="button.isDisabled"
          @click="buttonClicked"
          >{{ button.type }}-{{ button.size }}</BaseButton
        >
      </div>
    </div>
    <div class="card">
      <BaseText tag="h2" content="Inputs" />
    </div>
    <div class="card">
      <BaseText tag="h2" content="Icons" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BaseText, BaseButton } from 'components/atoms'

export default defineComponent({
  name: 'Settings',
  components: { BaseText, BaseButton },
  setup() {
    const buttons = [
      { type: 'primary-outlined', size: 'sm' },
      { type: 'primary-outlined', size: 'md' },
      { type: 'primary-outlined', size: 'lg' },
      { type: 'primary-outlined', variantColor: 'secondary', size: 'sm' },
      { type: 'primary-outlined', variantColor: 'secondary', size: 'md' },
      { type: 'primary-outlined', variantColor: 'secondary', size: 'lg' },
      { type: 'primary-contained', isDisabled: true },
      { type: 'transparent' },
    ]

    const buttonClicked = () => {
      alert('Button Clicked')
    }

    return { buttons, buttonClicked }
  },
})
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.card {
  border: solid 1px grey;
  margin: 1rem 0;
  padding: 1rem;
}

.card-content {
  display: grid;
  grid-auto-flow: row;
  grid-gap: 1rem;
}
</style>
