<template>
  <div class="container-fluid" style="padding-top: 40px">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800"></h1>

      <a
        href="#"
        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        @click="createblog"
        ><i class="fas fa-download fa-sm text-white-50"></i> New Blog Post</a
      >
    </div>

    <!-- Content Row -->
    <div class="row">
      <!-- Earnings (Monthly) Card Example -->
      <div class="col-xl-3 col-md-6 mb-4" @click="toggleBlogDiv">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                >
                  Total Blogs
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                 {{blogList.length}}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4" @click="toggleUserDiv">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-success text-uppercase mb-1"
                >
                  Total Users
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{userList.length}}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-3 col-md-6 mb-4" @click="toggleCategoryDiv">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-danger text-uppercase mb-1"
                >
                  Total Category
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {{categoryList.length}}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pending Requests Card Example -->
      <div class="col-xl-3 col-md-6 mb-4" >
        <div class="card border-left-warning shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-warning text-uppercase mb-1"
                >
                  Total Comments
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-comments fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->

    <div class="row" v-if="showBlogDiv">
      <!-- Area Chart -->
      <div class="col-xl-12 col-lg-12">
        <div class="card shadow mb-4">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Create Date</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="main in blogList" :key="main.id">
                <td >{{main.title}}</td>
                <td>{{main.category}}</td>
                <td>{{formatDate(main.date)}}</td>
                <td><i class="bi bi-pencil-square" style="color:orange"></i></td>
                <td><i class="bi bi-trash" style="color:red"></i></td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
    </div>

    <div class="row" v-if="showUserDiv">
      <!-- Area Chart -->
      <div class="col-xl-12 col-lg-12">
        <div class="card shadow mb-4">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Fist Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email Address</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="main in userList" :key="main.id">
                <td>{{main.fname}}</td>
                <td>{{main.lname}}</td>
                <td>{{main.email}}</td>
                <td><i class="bi bi-pencil-square" style="color:orange" @click="openModal"></i></td>
                <td><i class="bi bi-trash" style="color:red"></i></td>
              </tr>
            </tbody>
          </table>
          <div class="card-body">
            <div class="chart-area">
              <canvas id="myAreaChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="showCategoryDiv">
      <div class="col-xl-12 col-lg-12">
        <div class="card shadow mb-4">
          <table class="table table-striped">
            <thead>
              <tr >
                <th scope="col">Name</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="main in categoryList" :key="main.id">
                <td>{{main.name}}</td>
                <td><i class="bi bi-pencil-square" style="color:orange"></i></td>
                <td><i class="bi bi-trash" style="color:red"></i></td>
              </tr>
            </tbody>
          </table>
          <div class="card-body">
            <div class="chart-area">
              <canvas id="myAreaChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

   <div class="modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Save Data</h2>
      <form @submit.prevent="saveData">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="formData.username" required>

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="formData.password" required>

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required>

        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="formData.firstName" required>

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="formData.lastName" required>

        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  data() {
    return {
      showUserDiv: false,
      showBlogDiv: true,
      showCategoryDiv: false,
      showCommentDivL: false,
      totalComment: 0, 
      categoryList: [],
      blogList: [],
      userList: [],
      showModal: true,
      formData: {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
      }
    };
  },
  created() {
    this.fetchCategories();
    this.fetchBlog();
    this.fetchUsers();
  },
  methods: {
    createblog() {
      this.$router.push("/manageblog");
    },
    toggleUserDiv() {
      if (this.showUserDiv == false) {
        this.showUserDiv = true;
        this.showBlogDiv = false;
        this.showCategoryDiv = false;
        this.showCommentDiv = false;
      }
    },
    toggleBlogDiv() {
      if (this.showBlogDiv == false) {
        this.showUserDiv = false;
        this.showBlogDiv = true;
        this.showCategoryDiv = false;
        this.showCommentDiv = false;
      }
    },
    toggleCategoryDiv() {
      if (this.showCategoryDiv == false) {
        this.showUserDiv = false;
        this.showBlogDiv = false;
        this.showCategoryDiv = true;
        this.showCommentDiv = false;
      }
    },
    toggleCommentDiv() {
      if (this.showCategoryDiv == false) {
        this.showUserDiv = false;
        this.showBlogDiv = false;
        this.showCategoryDiv = false;
        this.showCommentDiv = true;
      }
    },
    fetchCategories(){
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
        this.categoryList = data.map(category => {
        return {
          categoryId: category[0],
          name: category[1]
        };
      });
      })
      .catch(error => {
      console.error('Error fetching categories:', error);
      }); 
    },
    fetchBlog(){
        fetch('http://127.0.0.1:5000/blogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        return response.json();
      })
      .then(data => {
        this.blogList = data.map(main => {
        return {
          id: main[0],
          title: main[1],
          data:main[3],
          date:main[4],
          category:main[7],
          fname:main[8],
          lname:main[9],
        };
      });
      })
      .catch(error => {
      console.error('Error fetching blogs:', error);
      }); 
    },
    fetchUsers(){
        fetch('http://127.0.0.1:5000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        this.userList = data.map(main => {
        return {
          id: main[0],
          email: main[1],
          fname: main[4],
          lname: main[5],
        };
      });
      })
      .catch(error => {
      console.error('Error fetching users:', error);
      }); 
    },
    formatDate(dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
    },
    openModal() {
    console.log("work")
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
};
</script>


<style scoped>
/* Styles for the modal */
.modal {
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal content */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 50%; /* Could be more or less, depending on screen size */
}

/* Close button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>