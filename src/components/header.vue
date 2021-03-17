<template>
    <div>
        <header>
                
        </header>
        <div  class="menu">
            <div v-for="item in menuItem" :key="item.name"  class="menu__item">
                <p>
                    <a href="#"  class="menu__item--link">{{ item.item }}</a> 
                </p>
            </div>
        </div>
    </div>
</template>
<style >
@import '../assets/css/style.css';
</style>
<script type="text/javascript">
  export default {
        data() {
            return {
                menuItem: [
                    { item: 'Trang chủ' },
                    { item: 'Danh mục' },
                    { item: 'Tin tức' },
                    { item: 'Giới thiệu'}
                ]
            }
        }
    }
</script>