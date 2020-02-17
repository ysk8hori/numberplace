<template>
  <v-container v-if="!!cellGrid" class="groupContainer">
    <v-row
      v-for="row in cellGrid"
      :key="JSON.stringify(row)"
      class="grouprow"
      justify="center"
      align="center"
    >
      <v-col
        class="numbercell"
        v-for="cell in row"
        :key="cell.position.toString()"
        justify="center"
        align="center"
      >
        <n-cell :userCell="cell" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script src="./squareGroup.vm.ts"></script>
<style scoped>
.numbercell {
  margin: 0px;
  padding: 0px;
  text-align: center;
  border: #aad6ec 1px solid;
}
.grouprow {
  margin: 0px;
  padding: 0px;
}
.groupContainer {
  border: #aad6ec 1px solid;
  margin: 0px;
  padding: 0px;
}
</style>
