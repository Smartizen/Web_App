<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      expand-on-hover
      app
    >
      <v-list dense>
        <v-list-item
          class="px-2"
          v-for="item in items"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-avatar v-if="!!item.image">
            <v-img v-bind:src="item.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <AddFarmForm />
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import AddFarmForm from "@/components/AddFarmForm.vue";

export default {
  name: "FarmBar",
  components: {
    AddFarmForm,
  },
  computed: {
    ...mapGetters(["getFarmLabel"]),
    reverseMessage() {
      return this.getFarmLabel;
    },
  },
  mounted: async function () {
    this.items = this.getFarmLabel;
  },

  watch: {
    reverseMessage() {
      this.items = this.getFarmLabel;
    },
  },
  data() {
    return {
      drawer: true,
      items: [],
    };
  },
  methods: {},
};
</script>
