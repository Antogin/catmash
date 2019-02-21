<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list three-line>
          <template v-for="(cat, index) in cats">
            <v-list-tile :key="cat.id.stringValue" avatar>
              <v-list-tile-avatar>
                <img :src="cat.url.stringValue" />
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="index + 1"></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="cat.elo.integerValue"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getCats");
  },
  computed: {
    cats() {
      return this.$store.getters.cats;
    }
  }
};
</script>
