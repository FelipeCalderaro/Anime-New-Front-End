<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-logo">
        Anime New
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link to="/" class="navbar-item">
          Página 1
        </router-link>
        <router-link to="/media-page" class="navbar-item">
          Página 2
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}

.navbar-brand {
  font-size: 1.5rem;
  color: rgb(78, 9, 4) !important;
  padding: 12px 20px;
  background-color: crimson;
}

.navbar-logo {
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s ease;
  padding: 12px 20px;
}



.navbar-item {
  height: 60px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  padding: 0px 4px 0px;
  border-radius: 0px;
  color: #fff;
}

.navbar-item:hover {
  background-color: crimson;
  transition: background-color 0.3s ease;

}

.navbar-menu {
  display: flex;
  height: 60px;

}

.navbar-end {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>