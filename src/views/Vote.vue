<template>
  <v-layout justify-center class="py-5" v-if="currentMatch.id">
    <imageSlider
      v-on:fullSwipe="vote"
      :leftImage="currentMatch.cat1.url"
      :rightImage="currentMatch.cat2.url"
    />
  </v-layout>
</template>

<script>
import imageSlider from "./../components/ImageSlider";

export default {
  components: { imageSlider },
  mounted() {
    this.$store.dispatch("getMatch");
  },
  methods: {
    vote(cat) {
      const { currentMatch } = this;

      this.$store
        .dispatch("vote", cat ? currentMatch.cat2 : currentMatch.cat1)
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
