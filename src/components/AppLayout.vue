<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <!-- <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
        <v-list-item link :href="home">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>number place infinity</v-toolbar-title>
    </v-app-bar>

    <v-content class="pl-0 pr-0 bgcontainer">
      <v-container class="bgcontainer pl-0 pr-0">
        <v-row align="start" justify="start">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script src="./appLayout.vm.ts">
</script>
<style>
.bgcontainer {
  /* max-width: 100%;
  width: 100%;
  height: 100%; */
  background-image: url(images/11-g-90.png);
  background-repeat: repeat;
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: lighten;
}
.row {
  margin: 0px;
  padding: 0px;
}
</style>