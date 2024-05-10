<template>
  <div class="container" style="padding-top: 50px;">
    <div>
      <div class="d-lg-flex half">
        <div class="bg order-1 order-md-2">
          <img src="../../assets/img/app/login_image.jpg" alt="" class="img-fluid" style="width: 650px">
        </div>
        <div class="contents order-2 order-md-1">
          <img src="" alt="">
          <div class="container">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-7">
                <div class="mb-4">
                  <h3>Sign In</h3>
                  <p class="mb-4">The BlogPage admin console. Please login with your admin credentials.</p>
                </div>
                <form @submit.prevent="logIn">
                  <div class="form-group first">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" v-model="username">
                  </div>
                  <div class="form-group last mb-3">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" v-model="password">
                  </div>
                  <input type="submit" value="Log In" class="btn btn-block btn-primary">
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    logIn() {
      console.log("working");

      this.$router.push('/dashboard');
      // Here you can add your logic for authentication
      // For example, you can send a request to your backend to authenticate the user
    }
  }
};
</script>
