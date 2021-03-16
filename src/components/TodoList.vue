<template>
    <div >
        <div class="container-fuild">
            
            <div class="container">
                <div class="nav">
                    <div class="nav-box">
                        <div class="nav-box--title"><span>Danh mục </span> </div>
                        <div class="nav-content">All</div>
                    </div>
                    <div class="nav-box">
                        <div class="nav-box--title">Bài báo </div>
                    </div>
                </div>
                <div class="content">
                    <form method="POST" class="input-txt" id="formSubmit" >
                        <input id="addItem" v-model="strTitle"  type="text" placeholder="Thêm công việc">
                        <button class="btn-submit" type="button" v-on:click="formSubmit()">Add</button>
                    </form>
                    <div id="error" :style="{display:displayInput}">
                       Trường này không được để trống!
                    </div>
                    <div class="list-item" id="item">
                         <!-- we're not able to retrieve -->
                        <section v-if="errored">
                            <p>Rất tiếc, chúng tôi không thể truy xuất thông tin vào lúc này, vui lòng thử lại sau.</p>
                        </section>
                        <section v-else-if="data = null">
                            <p>You haven't data.</p>
                        </section>
                        <section v-else>
                            <div v-if="loading">
                                <p class="loader"></p>
                            </div>
                            <div :id="strTitle.intId" v-else v-for="strTitle in listItem.data" :key="strTitle.strTitle"  class = "list-item--01"> 
                                <div class="item-content">
                                    <p>{{strTitle.strTitle}} </p>
                                </div>
                                <div class="btn-item" >
                                    <input type="button" value="Delete" v-on:click="deleteItem()" class="btn-item--del"/> 
                                    <section v-if="strTitle.flagStatus == true">
                                        <input type="button" v-on:click="changeStatus()" value="unDone" class="btn-item--done "/>
                                    </section>
                                    <section v-else>
                                        <input type="button" v-on:click="changeStatus()" id="" value="Done" class="btn-item--done "/>
                                    </section>
                                </div>
                            </div>
                        </section>
                       
                    </div>
                </div>
                </div>
            </div>
        </div>
</template>
<style>
@import '../assets/css/index.css';
</style>

<script>
import axios from 'axios';
export default{
   
    data () {
        
    return {
        listItem: [],
        errored : false,
        loading: true,
        strTitle: '',
        postErr: [],
        displayInput: "none"
    }
  },
  mounted () {
    axios.get(`http://localhost:8082/Api/indexApi.php`)
        .then((response)=>{
          this.listItem = response.data
          console.log(this.listItem)
      })
        .catch(error => {
          console.log(error)
          this.errored = true
          })
        .finally(()=>this.loading = false)
  },
  methods:{
      formSubmit() {
          if(this.strTitle !== ''){
             var formData = new FormData();
            formData.append('strTitle',this.strTitle)
            axios.post('http://localhost:8082/Api/postApi.php',formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                console.log(response);
                location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
          }
            this.displayInput = "block"
        },
    deleteItem(){
        var conf = confirm('Bạn chắc chắn muốn xóa item này?');
        if(conf=== true){
            var itemDel = event.target.parentElement.parentElement.id;
            var formData = new FormData();
            formData.append('intId',itemDel)
            axios.post('http://localhost:8082/Api/deleteApi.php',formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                console.log(response);
                location.reload();
            })
            .catch(function (error) {
                console.log(error);
                });
        }
    },
    changeStatus(){
        var itemChange = event.target.parentElement.parentElement.parentElement.id;
        console.log(itemChange);
        var formData = new FormData();
            formData.append('intId',itemChange)
            axios.post('http://localhost:8082/Api/changeStatusApi.php',formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                console.log(response);
                location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    },

  }
}
</script>


