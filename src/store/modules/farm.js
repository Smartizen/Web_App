import axios from "axios";
import axiosClient from "../../api";

export default {
  state: {
    farmLabel: [],
    farmDetail: {}
  },
  getters: {
    getFarmLabel: state => state.farmLabel,
    getFarmDetail: state => state.farmDetail
  },
  mutations: {
    // update LeftBar status
    UPDATE_FARMLABEL: (state, {farms} ) => {
      return (state.farmLabel = farms);
    },
    // puS LeftBar status
    PUSH_FARMLABEL: (state, {data} ) => {
      return (state.farmLabel.push(data));
    },
    // update FarmDetail status
    UPDATE_FARMDETAIL: (state, { data }) => {
      return (state.farmDetail = data);
    }
  },
  actions: {
    getMyFarm: async ({ commit }) => {
      try {
        let response = await axiosClient.get("/farm/myFarm");
        response.farm = response.farms.map(res => {
          res.link = `/farm/${res.id}`;
          return res;
        });
        commit("UPDATE_FARMLABEL", response);
      } catch (error) {
        console.log(error);
      }
    },

    getFarmData: async ({ commit }, { _id }) => {
      try {
        let response = await axios.get("http://localhost:3000/farms/" + _id);
        commit("UPDATE_FARMDETAIL", response);
      } catch (error) {
        return false;
      }
    },

    newFarm: async ({ commit }, payload) => {
      try {
        let response = await axiosClient.post("/farm", payload);
        response.data.link = `/farm/${response.data.id}`;

        commit("PUSH_FARMLABEL", response);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
