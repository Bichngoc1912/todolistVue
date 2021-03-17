<template>
  <div id="app">
    <div>
      <headerMenu />
      <todolist />
      <footerTodo />
    </div>

   
  </div>
</template>

<script>
import todolist from './components/TodoList.vue'
import headerMenu from './components/header.vue'
import footerTodo from './components/footer.vue'
export default {
  name: 'App',
  components: {
    headerMenu,
    todolist,
    footerTodo
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
