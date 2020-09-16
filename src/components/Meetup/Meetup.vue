<template>
  <v-container>
    <v-row>
      <v-col xs="12">
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{meetup.title}}</h6>
          </v-card-title>
          <v-img height="400px" :src="meetup.imageUrl"></v-img>
          <v-card-text>
            <div class="info--text">{{meetup.date | date }}- {{meetup.location}}</div>
            <div>{{meetup.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
  },
};
</script>