<template>
  <v-container>
    <v-row v-for="meetup in meetups" :key="meetup.id">
      <v-col xs="12" sm="10" md="8" offset-sm="1" offset-md="2">
        <v-card class="info">
          <v-container fluid>
            <v-row class="mb-2">
              <v-col xs="5" sm="4" md="3">
                <v-img height="130px" :src="meetup.imageUrl"></v-img>
              </v-col>
              <v-col xs="7" sm="8" md="9">
                <v-card-title>
                  <div>
                    <h5 class="white--text mb-0">{{meetup.title}}</h5>
                    <div>{{meetup.date | date}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn text :to="'/meetups/'+ meetup.id">
                    <v-icon left>mdi-arrow-right</v-icon>View Meetup
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
  },
};
</script>    
