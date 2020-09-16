import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);
const theme = {
  primary: "#FF5252",
  secondary: "#9C27b0",
  accent: "#82B1FF",
  info: "#2196F3",
  error: "#FF5252",
  success: "#4CAF50",
  warning: "#FFC107"
};

export default new Vuetify({
  theme: {
    themes: {
      dark: theme,
      light: theme
    }
  }
});
