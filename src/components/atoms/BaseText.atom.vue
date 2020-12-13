<template>
  <component :is="tag" :for="forProp" :class="textClasses">
    {{ content }}
  </component>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue";

interface Props {
  tag: tagTypes;
  content: string;
  for?: string;
}

type tagTypes =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label";

const _tagTypes = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "label"];

export default defineComponent({
  name: "BaseText",
  props: {
    tag: {
      type: String,
      required: true,
      default: "span",
      validator: (value: string) => _tagTypes.includes(value),
    },
    content: {
      type: String,
      required: true,
    },
    for: {
      type: String,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const forProp = computed(() => (props.tag === "label" ? props.for : null));
    const textClasses = computed(() => {
      return {
        "mb-2 font-bold text-lg text-grey-darkest": props.tag === "label",
      };
    });
    return {
      forProp,
      textClasses,
    };
  },
});
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  display: block;
  position: relative;
  color: #191919;
  margin-bottom: 0px;
  text-transform: uppercase;
  font-family: "Monofett", sans-serif;
}

h1 {
  font-size: 46px;
  line-height: 60px;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding-bottom: 17px;
}

h2 {
  font-size: 34px;
  line-height: 44px;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding-bottom: 23px;
}

h3 {
  font-size: 30px;
  line-height: 40px;
  font-weight: 500;
  padding-bottom: 23px;
}

h4 {
  font-size: 24px;
  line-height: 34px;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding-bottom: 24px;
}
h5 {
  font-size: 20px;
  line-height: 30px;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding-bottom: 15px;
}

h6 {
  font-size: 16px;
  line-height: 26px;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding-bottom: 15px;
}

p {
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
}

label {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 4px;
  letter-spacing: 0.02em;
}
</style>