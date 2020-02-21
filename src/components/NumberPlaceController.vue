<template>
  <v-container class="pa-0 inputContainer">
    <svg
      class="svg"
      width="200"
      height="200"
      viewBox="-100 -100 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <template v-for="numberPlate in numberPlates">
        <path
          :key="numberPlate.answer"
          :d="numberPlate.d"
          :fill="numberPlate.fill"
          :stroke="numberPlate.stroke"
          @click="fill(numberPlate.answer)"
        />
      </template>
      <template v-for="numberPlate in numberPlates">
        <text
          :x="numberPlate.charaPositionX"
          :y="numberPlate.charaPositionY"
          :key="numberPlate.answer"
        >{{ numberPlate.answer }}</text>
      </template>
    </svg>
  </v-container>
</template>
<script src="./numberPlaceController.vm.ts" />
<style>
.inputContainer {
  position: fixed;
  bottom: 0;
  z-index: 99;
}
.input-btn {
  text-align: center;
}
.svg {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
