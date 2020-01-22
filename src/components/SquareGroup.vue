<template>
  <v-container v-if="!!cellGrid" class="groupcol">
    <v-row v-for="row in cellGrid" :key="JSON.stringify(row)" class="grouprow">
      <v-col class="numbercell" v-for="cell in row" :key="cell.position.toString()">
        <n-cell :userCell="cell" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./squareGroup.vm.ts"></script>
<style scoped>
.numbercell {
  width: 40px;
  height: 40px;
  margin: 0px;
  padding: 0px;
  text-align: center;
  border: gray 1px dotted;
}
.grouprow {
  margin: 0px;
  padding: 0px;
}
.groupcol {
  border: black 1px solid;
}
</style>