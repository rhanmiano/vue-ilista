<template>
  <div class="container-fluid">
    <AppWrapper/>
  </div>
</template>

<script>
import AppWrapper from "./components/AppWrapper";

export default {
  name: "app",
  components: {
    AppWrapper
  }
};
</script>

<style lang="scss">

body {
  font-size: 0.8em;
  background-color: $layout-white;
}

// Helpers
.is-clickable {
  cursor: pointer;

  &:hover {
    background-color: gainsboro;
  }
}

// XS screens
@media only screen and (min-width: 0px) and (max-width: 320px) {
  .table {
    display: block;
    overflow-x: scroll;
  }
}

// Medium sized screen
@media only screen and (min-width: 601px) {
  body {
    overflow: none;
    font-size: 0.9em;
  }

  .app-wrapper {
    .row > section:nth-child(1) {
      padding: 40px 30px;
    }

    .row > section:nth-child(2) {
      padding: 40px 15px;
    }

    .row > section {
      &.app-list {
        .row > .customer-header {
          margin-bottom: 30px;
        }
      }

      &.app-actions {
        height: 100vh;
      }
    }
  }
}

// Desktop sized screen
@media only screen and (min-width: 993px) {
  body {
    font-size: 1em;
  }

  .app-wrapper {
    .row > section {
      padding: 50px 50px !important;

      &.app-list {
        .row > .customer-header {
          margin-bottom: 50px;
        }
      }

      &.app-actions {
        .btn {
          font-size: 1em;
        }
      }
    }
  }
}

// Loader
@keyframes scale {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    opacity: 0.7;
  }
}
.ball-pulse {
  text-align: center;
  margin: 30px 0;

  > div {
    background-color: $layout-base;
    border-radius: 100%;
    margin: 2px;
    display: inline-block;
    width: 15px;
    height: 15px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  > div:nth-child(1) {
    -webkit-animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }
  > div:nth-child(2) {
    -webkit-animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }
  > div:nth-child(3) {
    -webkit-animation: scale 0.75s 0s infinite
      cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
  }
}
</style>