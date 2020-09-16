import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DateFilter from "./filters/date";

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBG--BmVnPDsUGev2oefkiSYs90U-gvDsQ",
      authDomain: "devmeetup-d8060.firebaseapp.com",
      databaseURL: "https://devmeetup-d8060.firebaseio.com",
      projectId: "devmeetup-d8060",
      storageBucket: "devmeetup-d8060.appspot.com"
    });
  }
}).$mount("#app");
