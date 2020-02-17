<template>
  <v-container class="pa-1">
    <game-board :groupGrid="groupGrid" :gameId="gameId" />
    <template v-for="rownum in [0, 5]">
      <v-row justify="center" :key="rownum">
        <template v-for="num in [1, 2, 3, 4, 5]">
          <v-col class="input-btn" :key="num">
            <v-btn text icon color="pink" large @click="fill(num + rownum)">
              <v-icon>{{ `mdi-numeric-${num + rownum}-box-outline` }}</v-icon>
            </v-btn>
          </v-col>
        </template>
      </v-row>
    </template>
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
.groupcol {
  margin: 0px;
  padding: 0px;
}
.input-btn {
  text-align: center;
  /* max-width: 40px; */
}
.oops {
  font-size: 5em;
  color: red;
}
.clearMessage {
  font-size: 5em;
}
</style>
