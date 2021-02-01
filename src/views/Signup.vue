<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>Signup form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-alert :value="userExists" color="error" icon="warning"
                >This user already exists, try a different set of data.</v-alert
              >

              <v-text-field
                prepend-icon="person"
                name="firstname"
                v-model="firstname"
                label="First Name"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                prepend-icon="person"
                name="lastname"
                v-model="lastname"
                label="Last Name"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                prepend-icon="email"
                name="email"
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
                v-model="password"
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Confirm Password"
                :rules="[rules.required]"
                type="password"
                v-model="confirm_password"
                :error="!valid()"
              ></v-text-field>

              <v-text-field
                prepend-icon="email"
                name="gender"
                v-model="gender"
                label="Gender"
                :rules="[rules.required]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider light></v-divider>
          <v-card-actions>
            <v-btn to="/login" rounded color="black" dark>Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="success" @click="registerUser">
              Register
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "signup",
  data: () => ({
    userExists: false,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
    role: 2,
    rules: {
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    ...mapActions(["register"]),
    registerUser() {
      this.register({
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        gender: this.gender,
        role: this.role
      }).then(success => {
        if (success) this.$router.push("/home");
        else this.userExists = true;
      });
    },
    valid() {
      return this.password === this.confirm_password;
    }
  }
};
</script>
