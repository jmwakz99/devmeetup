<template>
  <div>
    <v-btn accent @click.stop="openDialog()" v-if="userIsCreator">Edit Date</v-btn>
    <v-dialog width="350px" persistent v-model="editDialog" @activatorr="openDialog">
      <v-card>
        <v-container>
          <v-row>
            <v-col xs="12">
              <v-card-title class="headline lighten-1">Edit Meetup Date</v-card-title>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col xs="12">
              <v-date-picker v-model="editableDate" style="width: 100%" actions elevation="2">
                <v-row>
                  <v-col xs="12" offset="4">
                    <v-btn text @click="editDialog = false" class="blue--text darken-1">Close</v-btn>
                  </v-col>
                  <v-col xs="12" offset="4">
                    <v-btn text @click="onSaveChanges" class="blue--text darken-1">Save</v-btn>
                  </v-col>
                </v-row>
              </v-date-picker>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ["meetup", "userIsCreator"],
  data() {
    return {
      editDialog: false,
      dialog: true,
      editableDate: null,
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        date: newDate,
      });
      this.editDialog = false;
    },
    openDialog() {
      this.editDialog = true;
    },
  },
  created() {
    let date = new Date(this.meetup.date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    this.editableTime = hours + ":" + minutes;
    this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10);
  },
};
</script>