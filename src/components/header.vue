<template>
    <div>
            <header>
                
        </header>
        <div  class="flex-menu">
            <div v-for="item in menuItem" :key="item.name"  class="menu-item">
                <p>
                    <a href="#"  class="menu-item--link">{{ item.item }}</a> 
                </p>
            </div>
        </div>
    </div>
</template>
<style>
@import '../assets/css/index.css';
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