<template>
  <v-layout class="py-5" v-if="currentMatch.id">
    <v-flex xs6 sm6 class="px-5">
      <v-card>
        <v-card-actions>
          <v-btn flat color="orange" @click="vote(currentMatch.cat1)"
            >Vote</v-btn
          >
        </v-card-actions>
        <v-img class="white--text" :src="currentMatch.cat1.url"></v-img>
        <v-card-actions>
          <v-btn flat color="orange" @click="vote(currentMatch.cat1)"
            >Vote</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs6 sm6 class="px-5">
      <v-card>
        <v-card-actions>
          <v-btn flat color="orange" @click="vote(currentMatch.cat2)"
            >Vote</v-btn
          >
        </v-card-actions>
        <v-img class="white--text" :src="currentMatch.cat2.url"></v-img>
        <v-card-actions>
          <v-btn flat color="orange" @click="vote(currentMatch.cat2)"
            >Vote</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getMatch");
  },
  methods: {
    vote(cat) {
      this.$store
        .dispatch("vote", cat)
        .then(() => this.$store.dispatch("getMatch"));
    }
  },
  computed: {
    currentMatch() {
      return this.$store.getters.currentMatch;
    }
  }
};
</script>
