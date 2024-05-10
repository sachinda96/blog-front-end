<template>
    <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center">
        <h1>Blog Page</h1>
      </a>

      <nav id="navbar" class="navbar">
        <ul>
          <li><RouterLink to="/blog">Blog</RouterLink></li>
          <li class="dropdown"><a ><span>Categories</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li v-for="category in categories" :key="category.categoryId" ><RouterLink :to="'/blog/' + category.categoryId" >{{ category.name}}</RouterLink></li>
            </ul>
          </li>

          <li><a href="about.html">About</a></li>
           <li><RouterLink to="/dashboard">Contact</RouterLink></li>
          <li><RouterLink to="/admin">Admin</RouterLink></li>
          
        </ul>
      </nav><!-- .navbar -->

      <div class="position-relative">
        <a href="#" class="mx-2"><span class="bi-facebook"></span></a>
        <a href="#" class="mx-2"><span class="bi-twitter"></span></a>
        <a href="#" class="mx-2"><span class="bi-instagram"></span></a>

        <a href="#" class="mx-2 js-search-open"><span class="bi-search"></span></a>
        <i class="bi bi-list mobile-nav-toggle"></i>

        <!-- ======= Search Form ======= -->
        <div class="search-form-wrap js-search-form-wrap">
          <form action="search-result.html" class="search-form">
            <span class="icon bi-search"></span>
            <input type="text" placeholder="Search" class="form-control">
            <button class="btn js-search-close"><span class="bi-x"></span></button>
          </form>
        </div><!-- End Search Form -->

      </div>

    </div>

  </header>
</template>

<script>

export default {
  data() {
    return {
      categories: []
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      fetch('http://127.0.0.1:5000/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        this.categories = data.map(category => {
        return {
          categoryId: category[0],
          name: category[1]
        };
      });
      })
      .catch(error => {
      console.error('Error fetching categories:', error);
      });
}
  }
};
</script>