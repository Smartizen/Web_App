<template>
  <v-row>
    <v-card v-for="farm in getFarmLabel" :key="farm._id" :class="`d-flex ma-6`">
      <v-card @click="openFarmDetail(farm._id)">
        <CardInfo v-bind:data="farm" />
      </v-card>
    </v-card>
  </v-row>
</template>

<script>
// @ is an alias to /src
import CardInfo from "@/components/CardInfo.vue";
import { mapGetters } from "vuex";

export default {
  name: "Farm",
  components: {
    CardInfo
  },
  data: () => ({}),
  created() {
    this.$store.dispatch("validateToken");
  },
  computed: {
    ...mapGetters(["getFarmLabel"])
  },
  methods: {
    // Open farm detail
    async openFarmDetail(_id) {
      this.$router.push("/farm/" + _id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
