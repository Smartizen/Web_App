<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-list-item class="px-2" v-on="on">
        <v-list-item-icon class="icon">
          <v-icon x-large>add</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Add Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Create Farm</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Legal Farm Name*"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="location"
                label="Location*"
                required
              ></v-text-field>
            </v-col>

            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              label="Upload Image"
            ></v-file-input>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onCreateFarm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.icon {
  height: 40px !important;
  margin-right: 16px !important;
}
</style>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddFarmForm",
  data: () => ({
    name: "",
    location: "",
    image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg", // default image
    dialog: false,

    date: new Date().toISOString().substr(0, 10),
    menu: false,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
  }),
  methods: {
    ...mapActions(["newFarm", "getMyFarm"]),
    async onCreateFarm() {
      this.dialog = false;

      let payload = {};
      payload.image = this.image;
      payload.name = this.name;
      payload.location = this.location;

      this.newFarm(payload).then((success) => {
        console.log(success);
      });
    },
  },
  beforeMount() {
    this.getMyFarm();
  },
};
</script>
