<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/publications/" class="nav-link"
              >Publications</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="'/profile/' + this.id" class="nav-link"
              >Profile</router-link
            >
          </li>
        </ul>
      </div>
    </nav>

    <section>
      <div class="profil">
        <div>
          <avatar :fullname="this.userName" :size="100"></avatar>
        </div>
      </div>
      <div class="form">
        <div class="column">
          <form class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-12 mb-12">
                <label for="validationCustom01">Prénom</label>
                <p v-if="this.mode == 'infos'">{{ this.firstName }}</p>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  :value="this.firstName"
                  v-if="this.mode == 'edit'"
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 mb-12">
                <label for="validationCustom01">Nom</label>
                <p v-if="this.mode == 'infos'">{{ this.lastName }}</p>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  :value="this.lastName"
                  v-if="this.mode == 'edit'"
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 mb-12">
                <label for="validationCustom01">Pseudo</label>
                <p v-if="this.mode == 'infos'">{{ this.userName }}</p>
                <input
                  type="text"
                  class="form-control"
                  v-if="this.mode == 'edit'"
                  id="userName"
                  :value="this.userName"
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div class="btns">
              <button
                v-if="this.mode == 'edit'"
                class="btn btn-success"
                type="submit"
                @click="save()"
              >
                Enregistrer
              </button>
              <button
                v-if="this.mode == 'infos'"
                class="btn btn-success"
                type="submit"
                @click="switchToEdit()"
              >
                Modifier
              </button>
              <button class="btn btn-danger" type="submit" @click="logout()">
                Déconnexion
              </button>
              <button class="btn btn-danger" type="submit" @click="remove()">
                Supression du compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    <router-view />
  </div>
</template>

<script>
import Avatar from "vue-avatar-component";
import axios from "axios";
export default {
  name: "Profile",
  components: { Avatar },
  data() {
    return {
      mode: "infos",
      id: this.$store.state.user.id,
      firstName: this.$store.state.user.firstName,
      lastName: this.$store.state.user.lastName,
      userName: this.$store.state.user.userName,
    };
  },
  mounted: function () {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/");
      return;
    }
  },
  computed: {
    reloadLocalStorage: function () {
      return {
        id: this.$store.state.user.id,
        firstName: this.$store.state.user.firstName,
        lastName: this.$store.state.user.lastName,
        userName: this.$store.state.user.userName,
      };
    },
  },
  methods: {
    switchToEdit: function () {
      this.mode = "edit";
    },
    switchToInfos: function () {
      this.mode = "infos";
    },
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    save: function () {
      var editFirstName = document.getElementById("firstName").value;
      var editLastName = document.getElementById("lastName").value;
      var editUserName = document.getElementById("userName").value;

      var editUser = {
        id: this.$store.state.user.id,
        firstName: editFirstName,
        lastName: editLastName,
        userName: editUserName,
      };
      axios
        .patch(`http://localhost:3000/api/users/profile/` + this.id, editUser)
        .then(
          (response) => console.log(response),
          localStorage.setItem("user", JSON.stringify(editUser))
        );
      this.reloadLocalStorage();
      this.switchToInfos();
    },
    remove() {
      axios.delete(`http://localhost:3000/api/users/profile/${this.id}`, {
        data: {
          id: this.id,
        },
      });
      this.logout();
    },
  },
};
</script>

<style scoped>
#navbarSupportedContent {
  margin-left: 2rem;
}
section {
  width: 100%;
  height: 350px;
}
.profil {
  height: 8rem;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
.form {
  height: 100%;
  display: flex;
}

.column {
  height: 80%;
  display: flex;
  justify-content: center;
  width: 100%;
}
.form-row {
  margin-top: 2rem;
}
button {
  margin: 1rem;
}
.btn-profil {
  display: flex;
  justify-content: space-around;
}
</style>