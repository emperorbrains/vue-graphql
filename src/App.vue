<template>
  <div id="app">
    <todo-private-list/>
  </div>
</template>

<script>
import TodoPrivateList from './components/TodoPrivateList.vue'

export default {
  name: 'App',
  components: {
    TodoPrivateList
  }
}
</script>

