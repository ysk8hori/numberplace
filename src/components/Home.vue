<template >
  <v-container class="container">
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
    <div style="height:50px;"></div>
    <v-row justify="center" align="center" style="height:100%;">
      <v-card elevation="10">
        <v-card-title color="primary">Game settings</v-card-title>
        <v-card-text>
          <v-row justify="center" align="center">
            <v-col>
              <v-label>base-height</v-label>
              <v-chip-group column active-class="primary--text" v-model="baseHeightValue">
                <v-chip v-for="num in baseHeightItems" :key="num" :value="num">{{ num }}</v-chip>
              </v-chip-group>
            </v-col>
            <v-col>
              <v-label>base-width</v-label>
              <v-chip-group column active-class="primary--text" v-model="baseWidthValue">
                <v-chip v-for="num in baseWidthItems" :key="num" :value="num">{{ num }}</v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col>
              <v-label>game-size</v-label>
              <v-text-field readonly v-model="gameSize"></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col>
              <v-btn @click="randomCreate" block :disabled="!startBtnEnabled">START</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script src="./home.vm.ts" />
<style>
.container {
  max-width: 100%;
  width: 100%;
  height: 100%;
  background-image: url(/img/11-g-90.8676b648.png);
  background-repeat: repeat;
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: lighten;
}
</style>
