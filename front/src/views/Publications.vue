<template>
  <div class="accueil">
     
    <nav class="navbar navbar-expand-lg navbar-light">
      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="logo">
    <img src="../assets/icon-left-font.png" alt="Logo groupomania">
  </div>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/publications/" class="nav-link">Publications</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/profile/' + this.id" class="nav-link">Profile</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/rechercher/" class="nav-link">Rechercher</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />

    <div class="form-group">
      <label for="publication">Exprimez-vous !</label>
      <textarea v-model="content" class="form-control" id="publication" rows="6"></textarea>
      <div class="btn-form">
        <input type="file" accept="image/*" class="form-control-file" id="inputImage" @change="selectFile" />
        <button @click="send()" class="btn btn-primary">Publiez !</button>
      </div>
    </div>
    <div class="card" id="v-for-object">
      <div class="card-body" v-for="currency in publications" :key="currency.id">
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <p class="card-text">{{ currency.content }}</p>
            <p>{{ currency.image }}</p>
          </div>

          <router-link :to="`/publications/${currency.id}`" class="btn btn-primary">
            Voir plus</router-link>
          <button id="shareLinkedin" class="share_linkedin" data-url="https://fr.vuejs.org/v2/guide/events.html" v-on:click="share()">Partager sur linkedin</button>
          <!--:data-url="`/publications/${currency.id}`"-->
          <!-- <img class="card-img-top" src="currency.image" alt="" /> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "Publications",
  data: function () {
    return {
      image: "",
      content: "",
      id: this.$store.state.user.id,
    };
  },
  methods: {
    selectFile: function () {
      const img = document.getElementById("inputImage");
      if (img.files === 0) {
        return;
      } else {
        this.image = img.files[0];
        console.log(img.files);
      }
    },
    send: function () {
      this.$store.dispatch("post", {
        image: this.image.name,
        content: this.content,
        userId: this.id,
      })
        .then(function () {
          location.reload();
        });
    },
    share(){
      console.log(this.publications)
      const btnDataUrl = document.getElementById('shareLinkedin')
      var url = btnDataUrl.getAttribute('data-url');
      var shareUrl = "https://www.linkedin.com/shareArticle?url=" + encodeURIComponent(url);
      window.open(shareUrl)
    }
  },
  mounted: function () {
    if (this.$store.state.user.id == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getPublications");
  },
  computed: {
    ...mapState(["publications"]),
  },
};
</script>


<style scoped>
#navbarSupportedContent {
  justify-content: space-between;
}

.logo{
  width: 25rem;
  height: 9rem;
}
img{
  width: 100%;
  height: 100%;
}
.form-group,
.card {
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  align-items: center;
}

label,
textarea {
  margin-bottom: 2rem;
}

textarea {
  width: 30rem;
  height: 65px;
}
</style>