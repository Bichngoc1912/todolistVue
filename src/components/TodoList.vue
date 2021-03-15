
<template>
    <div >
        <div class="container-fuild">
            <div id="Title">
                <h1>To do list</h1>
            </div>
            <div class="container">
                <div class="nav">
                    <div class="nav-box">
                        <div class="nav-box--title"><span>Danh mục </span> </div>
                        <div class="content">All</div>
                    </div>
                    <div class="nav-box">
                        <div class="nav-box--title">Bài báo </div>
                    </div>
                </div>
                <div class="content">
                    <form method="POST" class="input-txt" id="formSubmit" >
                        <input id="addItem" type="text" placeholder="Add Item">
                        <button  class="btn-submit" type="button" onclick="addItem1()" >+Add</button>
                    </form>
                    <div class="list-item" id="item">
                        <section v-if="errored">
                            <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
                        </section>
                        <section v-else-if="data=null">

                        </section>
                        <section v-else>
                            <div v-if="loading">
                                <p>Loading.....</p>
                            </div>
                            <div id="" v-else v-for="strTitle in listItem.data" :key="strTitle.strTitle"  class = "list-item--01"> 
                                <div class="item-content">
                                    <p>{{strTitle.strTitle}} </p>
                                </div>
                                <div class="btn-item" id="haha">
                                    <input type="button" :id="strTitle.intId" value="Delete" onclick="deleteItem()" class="btn-item--del"/> 
                                    <input type="button" id=""  onclick="changeStatus(this.id)" value="Done" class="btn-item--done "/>
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
      loading: true
    }
  },
  mounted () {
    axios.get('http://localhost:8082/Api/indexApi.php')
        .then((response)=>{
          this.listItem = response.data
          console.log(this.listItem)
      })
        .catch(error => {
          console.log(error)
          this.errored = true
          })
        .finally(()=>this.loading = false)
  }
 }
</script>


