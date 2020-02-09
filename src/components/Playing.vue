<template>
  <v-container>
    <v-row align="stretch">
      <v-card light elevation="10">
        <v-row justify="center">
          <v-card elevation="0" v-if="groupGrid" light class="mt-3">
            <v-row v-for="rowOfGroupGrid in groupGrid" :key="JSON.stringify(rowOfGroupGrid)">
              <v-col v-for="group in rowOfGroupGrid" :key="group.groupId.idString" class="groupcol">
                <square-group :group="group" :gameId="gameId" />
              </v-col>
            </v-row>
          </v-card>
        </v-row>
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
.input-btn {
  text-align: center;
}
</style>
