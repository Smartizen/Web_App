<template>
  <v-app>
    <div v-show="isAuthenticated">
      <FarmBar />
      <NavBar />
    </div>
    <div v-show="!isAuthenticated">
      <NavWelcome />
    </div>

    <v-main>
      <v-row class="minHeight">
        <v-col cols="3" class="leftBar">
          <LeftBar app />
        </v-col>
        <v-col>
          <router-view />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<style lang="css" scoped>
.leftBar {
  position: -webkit-sticky;
  position: sticky;
  top: 4rem;
}

.minHeight {
  min-height: 100%;
}
</style>

<script>
import NavBar from "./components/NavBar";
import FarmBar from "./components/FarmBar";
import LeftBar from "./components/LeftBar";
import NavWelcome from "./components/NavWelcome";

import { mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    NavBar,
    FarmBar,
    LeftBar,
    NavWelcome,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
};
</script>
