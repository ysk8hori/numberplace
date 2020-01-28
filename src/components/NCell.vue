<template>
  <v-row
    justify="center"
    align="center"
    class="nCell"
    v-bind:class="{ selected: isSelected }"
    @click="onClick"
  >
    <!--// eslint-disable-next-line prettier/prettier-->
    {{ userCell.answer ? userCell.answer.value : '' }}
  </v-row>
</template>
<script src="./nCell.vm.ts" />
<style scoped>
.nCell {
  width: 50px;
  height: 50px;
  font-size: 1.5em;
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
  0% {
    background-color: white;
  }
  100% {
    background-color: pink;
  }
}
@-moz-keyframes blink {
  0% {
    background-color: white;
  }
  100% {
    background-color: pink;
  }
}
@keyframes blink {
  0% {
    background-color: white;
  }
  100% {
    background-color: pink;
  }
}
</style>
