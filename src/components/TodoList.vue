<template>
            <div class="container">
                <col-left class="nav">
                    <div class="nav__box">
                        <div class="nav__box--title"><span>Danh mục </span> </div>
                        <div class="nav__content">All</div>
                    </div>
                    <div class="nav__box">
                        <div class="nav__box--title">Bài báo </div>
                    </div>
                </col-left>
                <col-right class="content">
                    <form method="POST" class="formInput" id="formSubmit" >
                        <input id="addItem" v-model="strTitle"  type="text" placeholder="Thêm công việc">
                        <button class="formInput__btn--add" type="button" v-on:click="formSubmit()">Add</button>
                    </form>
                    <div id="error" :style="{display:displayInput}">
                       Trường này không được để trống!
                    </div>
                    <div class="listItem" id="item">
                        <div v-if="errored">
                            <p>Rất tiếc, chúng tôi không thể truy xuất thông tin vào lúc này, vui lòng thử lại sau.</p>
                        </div>
                        <div v-else-if="data = null">
                            <p>You haven't data.</p>
                        </div>
                        <div v-else>
                            <div v-if="loading">
                                <p class="loader"></p>
                            </div>
                            <div :id="strTitle.intId" v-else v-for="strTitle in listItem.data" :key="strTitle.strTitle"  class = "listItem__01"> 
                                <div class="listItem__01--content">
                                    <p>{{strTitle.strTitle}} </p>
                                </div>
                                <div class="listItem__01--btn" >
                                    <input type="button" value="Delete" v-on:click="deleteItem()" class="listItem__01--btnDel"/> 
                                    <div v-if="strTitle.flagStatus == true">
                                        <input type="button" v-on:click="changeStatus()" value="unDone" class="listItem__01--btnDone unDone"/>
                                    </div>
                                    <div v-else>
                                        <input type="button" v-on:click="changeStatus()" id="" value="Done" class="listItem__01--btnDone done"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </col-right>
            </div>
</template>
<style >
@import '../assets/css/style.css';
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
          }else{
            this.displayInput = "block"
          }
            
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


