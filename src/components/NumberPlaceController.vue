<template>
  <v-container class="pa-0">
    <v-row justify="center" v-for="rownum in [0, 5]" :key="rownum">
      <template v-for="num in [1, 2, 3, 4, 5]">
        <v-col class="input-btn" :key="num">
          <v-btn text icon color="pink" large @click="fill(num + rownum)">
            <v-icon>{{ `mdi-numeric-${num + rownum}-box-outline` }}</v-icon>
          </v-btn>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
<script src="./numberPlaceController.vm.ts" />
<style>
.input-btn {
  text-align: center;
  /* max-width: 40px; */
}
</style>
