import axios from "axios";
import router from "../../router";
import config from "../../../config";
import axiosClient from "../../api";

export default {
  state: {
    user: {},
    token: localStorage.getItem("user-token") || "",
    staffLabel: []
  },
  getters: {
    isAuthenticated: state => !!state.user.firstname,
    isHaveToken: state => !!state.token,
    getUserInfo: state => state.user,
    getStaffsLabel: state => state.staffLabel
  },
  mutations: {
    // update User info
    UPDATE_USER_INFO: (state, { user }) => {
      return (state.user = user);
    },
    // update LeftBar status
    UPDATE_TOKEN: (state, { token }) => {
      axios.defaults.headers.common["Authorization"] = token;
      return (state.token = token);
    },
    UPDATE_STAFFSLABEL: (state, { staffs }) => {
      return (state.staffLabel = staffs);
    }
  },
  actions: {
    login: async ({ commit }, payload) => {
      try {
        let response = await axiosClient.post("/auth/login", payload);
        if (response.token) {
          // store user token
          localStorage.setItem("user-token", response.token);
          commit("UPDATE_TOKEN", response);
          commit("UPDATE_USER_INFO", response);
          router.push("/home");
          return true;
        } else return false;
      } catch (error) {
        console.log(error);
        // if the request fails, remove any possible user token if possible
        localStorage.removeItem("user-token");
        return false;
      }
    },
    register: async ({ commit }, payload) => {
      try {
        let response = await axiosClient.post("/auth/signup", payload);
        if (response.token) {
          localStorage.setItem("user-token", response.token);
          commit("UPDATE_TOKEN", response);
          commit("UPDATE_USER_INFO", response);
          return true;
        }
      } catch (error) {
        return false;
      }
    },
    validateToken: async ({ commit }) => {
      try {
        let response = await axiosClient.get("/auth");

        commit("UPDATE_USER_INFO", response);
        // // update staff label
        commit("UPDATE_STAFFSLABEL", response.user);
        return true;
      } catch (error) {
        console.log("validateToken", error);
        return false;
      }
    },
    logout: async () => {
      try {
        // let response = await axios.post(
        //   config.dev.env.ROOT_API + "/auth/me/logout"
        // );
        // if (response.data.success) {
        //   // remove token in localStorage
        localStorage.removeItem("user-token");
        // // Reset state
        // let data = {
        //   user: {},
        //   token: ""
        // };
        // commit("UPDATE_USER_INFO", data);
        // commit("UPDATE_TOKEN", data);
        router.push("/");
        // }
      } catch (error) {
        return error;
      }
    },
    logoutAll: async ({ commit }) => {
      try {
        let response = await axios.post(
          config.dev.env.ROOT_API + "/auth/me/logoutall"
        );
        if (response.data.success) {
          // remove token in localStorage
          localStorage.removeItem("user-token");
          // Reset state
          let data = {
            user: {},
            token: ""
          };
          commit("UPDATE_USER_INFO", data);
          commit("UPDATE_TOKEN", data);
          router.push("/");
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
