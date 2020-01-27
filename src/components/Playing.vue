<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-card elevation="10" v-if="groupGrid" light>
        <v-row v-for="rowOfGroupGrid in groupGrid" :key="JSON.stringify(rowOfGroupGrid)">
          <v-col v-for="group in rowOfGroupGrid" :key="group.groupId.idString" class="groupcol">
            <square-group :group="group" />
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>
<script src="./playing.vm.ts" />
<style>
.groupcol {
  margin: 0px;
  padding: 0px;
}
</style>

