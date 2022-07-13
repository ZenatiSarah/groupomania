<template>
    <div class="nav">
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
    </div>
    
</template>

<script>
export default {
    name: "Nav",
      data: function () {
    return {
      id: this.$store.state.user.id,
    };
  },
}
</script>