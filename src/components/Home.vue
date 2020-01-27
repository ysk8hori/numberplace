<template >
  <v-container>
    <div style="height:50px;"></div>
    <v-row justify="center" align="center">
      <v-card elevation="10" light>
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
              <v-btn @click="gameStart" block :disabled="!startBtnEnabled">START</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script src="./home.vm.ts" />
<style>
.row {
  margin: 0px;
  padding: 0px;
}
</style>
