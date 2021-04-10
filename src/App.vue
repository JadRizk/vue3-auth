<template>
  <router-view />
  <Spinner />
</template>

<script lang="ts">
import { Spinner } from 'components/atoms'

export default {
  components: { Spinner },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Monofett&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

input,
textarea,
button,
select,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
