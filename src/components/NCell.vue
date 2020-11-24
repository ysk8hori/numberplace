<template>
  <div
    justify="center"
    align="center"
    class="nCell"
    v-bind:class="{ selected: isSelected, unchangeable: !changeable }"
    :style="cellStyle"
    @click="onClick"
  >
    <!--// eslint-disable-next-line prettier/prettier-->
    {{ answer }}
  </div>
</template>
<script src="./nCell.vm.ts" />
<style scoped>
.nCell {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.selected {
  border: indianred 2px solid;
}
.unchangeable {
  font-weight: bold;
}
</style>
