<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Cat</span>
        <span class="font-weight-light">Mash</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/vote">
        <span class="mr-2">vote</span>
      </v-btn>
      <v-btn flat to="/ranks">
        <span class="mr-2">ranks</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>
