<template>
  <div class="spinner" v-if="showSpinner">
    <div class="lds-hourglass"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
/* import { Spinner } from 'composables/Spinner' */
/* Only importing this so the test will work for the time being */
import { Spinner } from '@/composables/Spinner'

export default defineComponent({
  setup() {
    const { showSpinner } = Spinner()
    return { showSpinner }
  },
})
</script>

<style>
.spinner {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

/*
* Source:
* https://loading.io/css/
*/

.lds-hourglass {
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.lds-hourglass:after {
  content: ' ';
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #fff;
  border-color: #0694da transparent #0694da transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
