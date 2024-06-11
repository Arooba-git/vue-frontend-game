<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/sketchy/bootstrap.rtl.min.css" integrity="sha512-DrfIoz+WWGpPIF5K60bjfml3ubG8OUCvIYLqCSezgVmfnH+YL2IN8Bvh5giGt2gcOmYEP7qJgwa9zcKuuEzlvw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.3/sketchy/bootstrap.min.css" integrity="sha512-y4F259NzBXkxhixXEuh574bj6TdXVeS6RX+2x9wezULTmAOSgWCm25a+6d0IQxAnbg+D4xIEJoll8piTADM5Gg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <div class="row">
        <div class="col-sm-12">
          <h1
            class="text-center bg-primary text-white"
            style="border-radius: 10px">
            Games Library 🎲
          </h1>
          <hr> <br>
          <b-alert variant="success" v-if="showMessage" show>{{ message }}</b-alert>
          <button v-b-modal.addGameModal type="button" class="btn btn-success btn-sm">
            Add Game
          </button>
          <br><br>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">
                  Title
                </th>
                <th scope="col">
                  Genre
                </th>
                <th scope="col">
                  Played?
                </th>
                <th scope="col" style="display: flex; justify-content: center;">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="game, index in games"
                :key="index"
              >
                <td>{{ game.title }}</td>
                <td>{{ game.genre }}</td>
                <td>
                  <span v-if="game.played[0] == true || game.played">Yes</span>
                  <span v-else>No</span>
                </td>
                <td style="display:flex; justify-content: center">
                   <div class="btn btn-group" role="group" style="width: 75%; gap: 10px">
                    <button type="button" class="btn btn-info btn-sm" v-b-modal.editGameModal @click="editGame(game)">Update</button>
                    <button type="button" class="btn btn-danger btn-sm" @click="deleteGame(game)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <footer
            class="bg-primary text-white text-center"
            style="border-radius:10px;"
          >
            Copyright &copy;. All Rights Reserved 2024.
          </footer>
        </div>
      </div>
      <!-------MODEL---------->
      <b-modal
        id="addGameModal"
        ref="addGameModal"
        title="Add a new game"
        hide-backdrop
        hide-footer
      >
        <b-form class="w-100" @submit="onSubmit" @reset="onReset">
          <b-form-group id="titleGroup" label="Title" label-for="titleInput">
              <b-form-input id="titleInput" v-model="addGameData.title" type="text" placeholder="Enter a game title" required />
          </b-form-group>

          <b-form-group id="genreGroup" label="Genre" label-for="genreInput">
            <b-form-input id="genreInput" v-model="addGameData.genre" type="text" placeholder="Add a game genre" required />
          </b-form-group>

          <b-form-group id="playedGroup">
            <b-form-checkbox-group>
              <b-form-checkbox id="playedCheckbox" v-model="addGameData.played">
                Played?
              </b-form-checkbox>

            </b-form-checkbox-group>
          </b-form-group>
            <b-button type="submit" variant="outline-info">Submit</b-button>
            <b-button type="reset" variant="outline-danger">Reset</b-button>
        </b-form>
      </b-modal>

       <!------- /ADD MODEL END---------->

       <!------- EDIT MODEL BEGIN---------->
       <b-modal
        id="editGameModal"
        ref="editGameModal"
        title="Edit game"
        hide-backdrop
        hide-footer
      >
        <b-form class="w-100" @submit="onUpdateSubmit" @reset="onUpdateReset">
          <b-form-group id="titleGroup" label="Title" label-for="titleInput">
              <b-form-input id="titleInput" v-model="editGameData.title" type="text" placeholder="Enter a game title" required />
          </b-form-group>

          <b-form-group id="genreGroup" label="Genre" label-for="genreInput">
            <b-form-input id="genreInput" v-model="editGameData.genre" type="text" placeholder="Add a game genre" required />
          </b-form-group>

          <b-form-group id="playedGroup">
            <b-form-checkbox-group>
              <b-form-checkbox id="playedCheckbox" v-model="editGameData.played">
                Played?
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>

          <b-button type="submit" variant="outline-info">Update</b-button>
          <b-button type="reset" variant="outline-danger">Cancel</b-button>
        </b-form>
      </b-modal>
       <!------- /ADD MODEL END---------->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Game",
    
    data() {
        return {
            games:[],
            message: "",
            showMessage: false,
            addGameData: {
                title: "",
                genre: "",
                played: false
            },
          editGameData: {
            id: "",
            title: "",
            genre: "",
            played: false
          }
        }
    },
    created() {
        this.getGames();
    },
    methods: {
        getGames() {
            const apiURL = 'http://localhost:5000/games';
            axios.get(apiURL)
                .then((response) => {
                    this.games = response.data.games;
                    console.log('this.games', this.games);
                }).catch((errors) => {
                    console.log('error', errors);
                })
        },
        addGame(payload) {
            const apiURL  = 'http://localhost:5000/games';
            axios.post(apiURL, payload).then(() => {
                this.getGames();
                this.message = "Game added!";
                this.showMessage = true;

                setTimeout(() => {
                  this.message = "";
                  this.showMessage = false;
                }, 3000)
            }).catch((errors) => {
                console.log('error', errors);
            })
        },
        updateGame(payload, gameID) {
          const apiURL = `http://localhost:5000/games/${gameID}`;
          axios.put(apiURL, payload).then(() => {
            this.getGames();
            this.message = "Game updated!"
            this.showMessage = true;

            setTimeout(() => {
              this.message = "";
              this.showMessage = false;
            }, 3000)
          }).catch((errors) => {
            console.log('error', errors);
          })
        },
      removeGame(gameID) {
          const apiURL = `http://localhost:5000/games/${gameID}`;
          axios.delete(apiURL).then(() => {
            this.getGames();
            this.message = "Game deleted!"
            this.showMessage = true;

            setTimeout(() => {
              this.message = "";
              this.showMessage = false;
            }, 3000)
          }).catch((errors) => {
            console.log('error', errors);
          })
        },
        editGame(game) {
          console.log("inside edit game", game);
          this.editGameData = game;
        },
        deleteGame(game) {
          this.removeGame(game.id);
        },
        initForm() {
            this.addGameData.title = "";
            this.addGameData.genre = "";
            this.addGameData.played = false;
            this.editGameData.id = "";
            this.editGameData.title = "";
            this.editGameData.genre = "";
            this.editGameData.played = false;
        },
        onSubmit(e) {
            e.preventDefault();
            this.$refs.addGameModal.hide();

            const payload = {
                title: this.addGameData.title,
                genre: this.addGameData.genre,
                played: this.addGameData.played,
            }

            this.addGame(payload);
            this.initForm();
        },
        onUpdateSubmit(e) {
          e.preventDefault();
          this.$refs.editGameModal.hide();

          const payload = {
            title: this.editGameData.title,
            genre: this.editGameData.genre,
            played: this.editGameData.played[0] == true ?  true :  false,
          }

          console.log("this.editGameData.played", this.editGameData.played);

          this.updateGame(payload, this.editGameData.id);
          this.initForm();
        },
        onReset(e) {
          e.preventDefault();
          this.$refs.addGameModal.hide();
          this.initForm();
          this.getGames();
        },
        onUpdateReset(e) {
          e.preventDefault();
          this.$refs.editGameModal.hide();
          this.initForm();
        },

    }
}
</script>
