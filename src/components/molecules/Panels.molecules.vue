<template>
  <div class="panels-container">
    <div class="panel left-panel">
      <div class="content">
        <base-text tag="h3" content="New Here ?" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex
          ratione. Aliquid!
        </p>
        <base-button @click="handleOnRedirect" type="primary-transparent"
          >Sign Up
        </base-button>
      </div>
      <img src="" class="image" alt="" />
    </div>
    <div class="panel right-panel">
      <div class="content">
        <base-text tag="h3" content="One of us ?" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          laboriosam ad deleniti.
        </p>
        <base-button @click="handleOnRedirect" type="primary-transparent"
          >Sign in
        </base-button>
      </div>
      <img src="" class="image" alt="" />
    </div>
  </div>
</template>

<script lang='ts'>
import { SetupContext } from "vue";
import { BaseButton, BaseText } from "components/atoms";

export default {
  components: { BaseButton, BaseText },
  setup(props: {}, { emit }: SetupContext) {
    const handleOnRedirect = () => {
      emit("on-redirect");
    };
    return { handleOnRedirect };
  },
  emits: ["on-redirect"],
};
</script>

<style scoped>
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
  @apply text-dark-900;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  line-height: 1;
  font-size: 2rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }
}

@media (max-width: 570px) {
  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
}
</style>