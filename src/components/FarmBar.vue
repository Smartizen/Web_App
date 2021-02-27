<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      expand-on-hover
      app
    >
      <v-list dense>
        <v-list-item class="px-2" v-for="item in items" :key="item.title" link>
          <v-list-item-avatar v-if="!!item.image">
            <v-img v-bind:src="item.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
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
    ...mapGetters(["getDrawer", "getUserInfo"]),
  },
  mounted: async function () {
    await this.getFarm();
  },
  watch: {
    async getUserInfo() {
      if (JSON.stringify(this.getUserInfo) !== this.checkLoadingFarm) {
        this.checkLoadingFarm = JSON.stringify(this.getUserInfo);
        await this.getFarm();
      }
    },
  },
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Add Home",
          image: "https://randomuser.me/api/portraits/men/85.jpg",
        },
        {
          title: "Add Home",
          image: "https://randomuser.me/api/portraits/men/85.jpg",
        },
        {
          title: "Add Home",
          image: "https://randomuser.me/api/portraits/men/85.jpg",
        },
      ],
      mini: true,
    };
  },
  // data: () => ({
  //   drawer: null,
  //   checkLoadingFarm: "",
  //   items: [
  //     { icon: "mdi-contacts", text: "Contacts", link: "/" },
  //     { icon: "mdi-account-box", text: "Staff", link: "/staff" },
  //     { icon: "mdi-factory", text: "Farm", link: "/farm" },
  //     // { icon: "mdi-content-copy", text: "Device", link: "/device" }
  //   ],
  //   staff_items: [{ icon: "mdi-contacts", text: "Contacts", link: "/" }],
  // }),
  methods: {
    async getFarm() {
      if (this.getUserInfo.role === 2) {
        let farms = [];
        await Promise.all(
          this.getUserInfo.farms.map((farm) => {
            let item = {};
            item.icon = "mdi-factory";
            item.text = farm.name;
            item.link = `/farm/${farm._id}`;
            farms.push(item);
            Promise.resolve(farms);
          })
        );
        this.staff_items = this.staff_items.concat(farms);
      }
    },
  },
};
</script>
