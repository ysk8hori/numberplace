<template>
  <div
    justify="center"
    align="center"
    class="nCell"
    v-bind:class="{ selected: isSelected, unchangeable: !changeable }"
    :style="cellStyle"
    @click="onClick"
  >
    <!--// eslint-disable-next-line prettier/prettier-->
    {{ answer }}
  </div>
</template>
<script src="./nCell.vm.ts" />
<style scoped>
.nCell {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.selected {
  -webkit-animation: blink 0.5s infinite alternate;
  -moz-animation: blink 0.5s infinite alternate;
  animation: blink 0.5s infinite alternate;
}
@-webkit-keyframes blink {
  100% {
    background-color: pink;
  }
  0% {
    background-color: white;
  }
}
@-moz-keyframes blink {
  100% {
    background-color: pink;
  }
  0% {
    background-color: white;
  }
}
@keyframes blink {
  100% {
    background-color: pink;
  }
  0% {
    background-color: white;
  }
}
.unchangeable {
  font-weight: bold;
}
</style>
