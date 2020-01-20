<template>
  <v-container>
    <v-app-bar app dark hide-on-scroll>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Number Place Infinity</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row justify="center" align="center" style="height:100%;">
      <v-card elevation="10">
        <v-card-text>{{ gameString }}</v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script src="./playing.vm.ts" />
<style>
.container {
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-image: url(images/11-g-90.png);
  background-repeat: repeat;
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: lighten;
}
</style>

