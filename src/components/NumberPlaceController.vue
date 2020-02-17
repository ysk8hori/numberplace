<template>
  <v-container
    class="pa-0 inputContainer"
    v-on:touchstart="touchstart"
    v-on:touchmove="touchmove"
    v-on:touchend="stop"
    v-on:touchcancel="stop"
  >
    <v-row justify="end" v-for="rownum in [0, 5]" :key="rownum">
      <template v-for="num in [1, 2, 3, 4, 5]">
        <v-col class="input-btn" :key="num">
          <v-btn text icon color="pink" large @click="fill(num + rownum)">
            <v-icon>{{ `mdi-numeric-${num + rownum}-box-outline` }}</v-icon>
          </v-btn>
        </v-col>
      </template>
    </v-row>
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
</style>
