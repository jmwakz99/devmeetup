<template>
  <div>
    <v-btn fab large accent @click.stop="openDialog()" v-if="userIsCreator">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-dialog width="350px" persistent v-model="editedDialog" @activatorr="openDialog">
      <v-card>
        <v-container>
          <v-row>
            <v-col xs="12">
              <v-card-title class="headline lighten-1">Edit Meetup</v-card-title>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col xs="12">
              <v-card-text>
                <v-text-field name="title" id="title" v-model="editedTitle" label="Title" required></v-text-field>
                <v-textarea
                  name="description"
                  id="description"
                  v-model="editedDescription"
                  label="Description"
                  required
                ></v-textarea>
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col xs="12">
              <v-card-actions>
                <v-btn text class="blue--text darken-1" @click="editedDialog = false">Close</v-btn>
                <v-btn text class="blue--text darken-1" @click="onSave">Save</v-btn>
              </v-card-actions>
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
      editedDialog: false,
      dialog: true,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
    };
  },
  methods: {
    onSave() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }

      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      });
      this.editedDialog = false;
    },
    openDialog() {
      this.editedDialog = true;
    },
  },
};
</script>