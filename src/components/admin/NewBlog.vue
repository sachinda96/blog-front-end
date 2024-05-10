<template>

<div class="container" style="padding-top: 40px">
  <div class="row">
    <div class="col-8">
        <div class="form-group">
        <h2 style="20px;text-align: left;color:black" >Titile</h2>
        <input type="text" v-model="title" class="form-control" id="inputTitle" aria-describedby="ttHelp" placeholder="Enter title">
        
        <br>
        <h2 style="20px;text-align: left;color:black">Category</h2>
        <select class="form-select" aria-label="Default select example" v-model="selectedCategory">
            <option v-for="category in categories" :key="category.categoryId" :value="category.categoryId">{{category.name}}</option>
        </select>
  </div>
    </div>
    <div class="col-4">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" >
        <div class="card-body">
        <h5 class="card-title">Blog Image</h5>
        <input style="width: 18rem;" type="file" ref="fileInput" @change="handleFileInputChange">
       <!--  -->
  </div>
</div>
    </div>
    
  </div>
  <div class="row">
    <div class="col-12">
    <div style="height: 400px; padding-top: 30px">
        <QuillEditor @input="updateEditorContent" theme="snow" toolbar="full"  />
    </div>
    </div>
  </div>
  <br>  <br>  <br>
  <div class="row">
    <div class="col-12">
    <button type="button" class="btn btn-danger">Cancel</button>
    &nbsp;	
    <button type="button" class="btn btn-dark" @click="save">Save</button>
    </div>
  </div>
  <br>
</div>
    
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      title: '',
      selectedCategory:'',  
      imageUrl: '',
      editorContent: '', 
      boundVariable: '',
      body: '',
      categories: []

    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    handleFileInputChange(event) {
      const file = event.target.files[0]; 
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result; 
          console.log(this.imageUrl)
        };
        reader.readAsDataURL(file); 
       
      }
    },
    updateEditorContent(newContent) {
      this.editorContent = newContent;
    },
    save() {
      this.boundVariable = this.editorContent;
      this.body = this.boundVariable.srcElement.innerHTML

      const userId = 1;

      const currentDate = new Date();
 


    fetch('http://127.0.0.1:5000/blogs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: this.title,
        description: this.body,
        createDate: currentDate.toISOString(),
        categoryId: this.selectedCategory,
        userId: userId,
        mainImage: this.imageUrl,
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // Clear input fields
  // Example:
  // document.getElementById('inputField').value = '';
  // Repeat for each input field
  console.log('Response:', response);
  alert('Successfully Saved!');
  this.$router.push('/dashboard');
})
.catch(error => {
  console.error('Error:', error);
  alert('Failed to make request. Please try again.');
});


    },
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
  
}


</script>
