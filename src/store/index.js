import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
        id: "dihiriheihihihe123",
        title: "Meetup in New York",
        date: new Date(),
        location: "New York",
        description: "It's New York"
      },
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/b/be/Tour_Eiffel%2C_%C3%89cole_militaire%2C_Champ-de-Mars%2C_Palais_de_Chaillot%2C_La_D%C3%A9fense_-_03.jpg",
        id: "edjiejijei47",
        title: "Meetup in Paris",
        date: new Date(),
        location: "Paris",
        description: "It's Paris"
      }
    ],
    user: null
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: "djiirjfjrijijr83"
      };
      // reach out to firebase and store it
      commit("createMeetup", meetup);
    },
    signUserUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          console.log(user);
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(err => console.log(err));
    },
    signUserIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          console.log(user);
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(err => console.log(err));
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    }
  },
  modules: {}
});
