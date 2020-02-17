<template>
  <div class="gameBoard">
    <v-row v-for="rowOfGroupGrid in groupGrid" :key="JSON.stringify(rowOfGroupGrid)">
      <v-col v-for="group in rowOfGroupGrid" :key="group.groupId.idString" class="groupcol">
        <square-group :group="group" :gameId="gameId" />
      </v-col>
    </v-row>
  </div>
</template>
<script src="./gameBoard.vm.ts"></script>

<style scoped>
.gameBoard {
  background-color: white;
  color: black;
  /* position: fixed;
  top: 30;  */
}
.groupcol {
  margin: 0px;
  padding: 0px;
}
</style>
