<template>
  <v-container class="pa-1">
    <game-board :groupGrid="groupGrid" :gameId="gameId" />
    <number-place-controller :gameId="gameId" />
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
.oops {
  font-size: 5em;
  color: red;
}
.clearMessage {
  font-size: 5em;
}
</style>
