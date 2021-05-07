<template>
  <div>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add Todo" />
    <button @click="addTodo">Add</button>
    <div v-if="loading">Loading...</div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import { GET_MY_TODOS } from "./TodoPrivateList.vue";
const ADD_TODO = gql`
  mutation insert_todos($title: String!) {
    insert_todos(objects: { title: $title }) {
      affected_rows
      returning {
        id
        title
        created_at
      }
    }
  }
`;
export default {
  data() {
    return {
      newTodo: "",
      loading: false,
    };
  },
  apollo: {},

  methods: {
    addTodo() {
      const title = this.newTodo && this.newTodo.trim();
      this.loading = true;
      this.$apollo.mutate({
        mutation: ADD_TODO,
        variables: {
          title: title,
        },
        update: (cache, { data: { insert_todos } }) => {
          try {
            const data = cache.readQuery({
              query: GET_MY_TODOS,
            });
            console.log(insert_todos);
            const insertedTodo = insert_todos.returning;
            data.todos.splice(0, 0, insertedTodo[0]);
            cache.writeQuery({
              query: GET_MY_TODOS,
              data,
            });
            this.newTodo = "";
          } catch (e) {
            console.error(e);
          } finally {
            this.loading = false;
          }
        },
      });
    },
  },
};
</script>
