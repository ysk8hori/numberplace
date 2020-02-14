<template>
  <v-container class="pa-1">
    <div style="background-color:white; color:black;">
      <v-row v-for="rowOfGroupGrid in groupGrid" :key="JSON.stringify(rowOfGroupGrid)">
        <v-col v-for="group in rowOfGroupGrid" :key="group.groupId.idString" class="groupcol">
          <square-group :group="group" :gameId="gameId" />
        </v-col>
      </v-row>
    </div>
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
    <v-overlay :value="oops">
      <strong class="oops">Oops!</strong>
    </v-overlay>
    <v-overlay :value="cleared">
      <strong class="clearMessage">Clear!</strong>
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
