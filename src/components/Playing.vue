<template>
  <v-container
    class="pa-0 playingContainer mx-auto"
    :style="playingContainerStyles"
    v-on:touchstart="touchstart"
    v-on:touchmove="touchmove"
    v-on:touchend="stop"
    v-on:touchcancel="stop"
  >
    <game-board :groupGrid="groupGrid" :gameId="gameId" />
    <number-place-controller :gameId="gameId" :gameSize="gameSize" />
    <v-overlay :value="oops" @click="toTop">
      <v-row>
        <strong class="oops">Oops!</strong>
      </v-row>
      <v-row justify="center">
        <v-btn @click="toTop" text>TOP</v-btn>
      </v-row>
    </v-overlay>
    <v-overlay :value="cleared" @click="toTop">
      <v-row>
        <strong class="clearMessage">Clear!</strong>
      </v-row>
      <v-row justify="center">
        <v-btn @click="toTop" text>TOP</v-btn>
      </v-row>
    </v-overlay>
  </v-container>
</template>
<script src="./playing.vm.ts" />
<style>
.playingContainer {
  height: 100%;
}
.oops {
  font-size: 5em;
  color: red;
}
.clearMessage {
  font-size: 5em;
}
</style>
