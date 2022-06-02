<template>
<div class="app">
  <div class="logo">
    <img src="../assets/icon-left-font.png" alt="Logo groupomania">
  </div>
<div class="card">
    <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p class="card__subtitle" v-if="mode == 'login'">
      Tu n'as pas encore de compte ?
      <span class="card__action" @click="switchToCreateAccount()"
        >Créer un compte</span
      >
    </p>
    <p class="card__subtitle" v-else>
      Tu as déjà un compte ?
      <span class="card__action" @click="switchToLogin()">Se connecter</span>
    </p>
    <div class="form-row">
      <input
        v-model="email"
        class="form-row__input"
        type="text"
        placeholder="Adresse mail"
      />
    </div>

    <div class="form-row" v-if="mode == 'create'">
      <input
        v-model="firstName"
        class="form-row__input"
        type="text"
        placeholder="firstName"
      />
      <input
        v-model="lastName"
        class="form-row__input"
        type="text"
        placeholder="lastName"
      />
      <input
        v-model="userName"
        class="form-row__input"
        type="text"
        placeholder="userName"
      />
    </div>
    <div class="form-row">
      <input
        v-model="password"
        class="form-row__input"
        type="password"
        placeholder="Mot de passe"
      />
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
    <div class="form-row">
      <button
        @click="login()"
        class="button"
        :class="{ 'button--disabled': !validatedFields }"
        v-if="mode == 'login'"
      >
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button
        @click="createAccount()"
        class="button"
        :class="{ 'button--disabled': !validatedFields }"
        v-else
      >
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
  </div>
</div>
  
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: "",
      userName: "",
      firstName: "",
      lastName: "",
      password: "",
    };
  },
  mounted() {
    if (this.$store.state.user.id != -1) {
      this.$router.push("/publications");
      return;
    }

    this.$store.dispatch("getPublications");
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "create") {
        if (
          this.email != "" &&
          this.userName != "" &&
          this.firstName != "" &&
          this.lastName != "" &&
          this.password != ""
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    switchToCreateAccount() {
      this.mode = "create";
    },
    switchToLogin() {
      this.mode = "login";
    },
    login: function () {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(function () {
          self.$router.push("/publications");
        });
    },
    createAccount: function () {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          userName: this.userName,
          lastName: this.lastName,
          firstName: this.firstName,
          password: this.password,
        })
        .then(function () {
          self.login();
        })
        .then(function (error) {
          console.log(error);
        });
    },
  },
};
</script>


<style scoped>
.app{
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card{
  text-align: center;
    margin: 0 auto;
    position: relative;
    top: 40px;
    width: 35rem;
    padding: 20px;
    height: 25rem;
}
.logo{
  width: 25rem;
  height: 9rem;
}
img{
  width: 100%;
  height: 100%;
}
.card__action{
  color: #fd2d01;
  font-weight: bold;
  cursor: pointer;
}

button {
      border-radius: 20px;
    padding: 5px 15px;
    border: 1px solid;
}
.form-row {
  display: flex;
  justify-content: center;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}
</style>