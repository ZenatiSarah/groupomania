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
            <router-link to="/home" class="nav-link">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/publication" class="nav-link"
              >Publications</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">Profile</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <section>
      <div class="test" v-for="item in userInfos" :key="item">
        {{ item }}
      </div>
      <div class="profil">
        <div v-for="value in userInfos" :key="value">
          <avatar :fullname="value.userName" size="96"></avatar>
          <div class="btn-profil">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash"></i>
          </div>
        </div>
      </div>
      <div class="form">
        <div class="column">
          <form class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-12 mb-12">
                <label for="validationCustom01">Prénom</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  placeholder="First name"
                  value="Mark"
                  required
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 mb-12">
                <label for="validationCustom01">Nom</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  placeholder="First name"
                  value="Mark"
                  required
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 mb-12">
                <label for="validationCustom01">Pseudo</label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  placeholder="First name"
                  value="Mark"
                  required
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
            </div>
            <div class="btns">
              <button class="btn btn-success" type="submit">Enregistrer</button>
              <button class="btn btn-danger" type="submit" @click="logout()">
                Déconnexion
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
import { mapState } from "vuex";
export default {
  name: "Profile",
  components: { Avatar },
  mounted: function () {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState(["userInfos"]),
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
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