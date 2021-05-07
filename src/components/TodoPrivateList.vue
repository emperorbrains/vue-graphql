<template>
  <div class="apollo">
    <todo-input />
    <div v-if="$apollo.queries.todos.loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <br />
    <input placeholder="Add Todo On Change" @change="addTodos($event)" />
    <br />
    <br />
    <button v-if="todos.length != 0" @click="updateOffset(currentPage++)">Next Page</button>
    <button @click="updateOffset(currentPage--)">Previous Page</button>
    <br />
    <br />
    <table>
      <thead>
        <th>#</th>
        <th>Todo</th>
        <th>User Name</th>
        <th>Edit</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) of todos" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td><button @click="handleTodoDelete(item)">Delete</button></td>
          <td>
            <input :value="item.title" @change="editTodos($event, item)" />
          </td>
        </tr>
      </tbody>
    </table>
    <br><br>
  </div>
</template>

<script>
import gql from "graphql-tag";
import TodoInput from "./TodoInput.vue";

export const GET_MY_TODOS = gql`
  query getMyTodos ($limit: Int!, $offset: Int!){
    todos(order_by: { updated_at: desc } limit: $limit  offset: $offset) {
      id
      title
      created_at
    }
  }
`;

const REMOVE_TODO = gql`
  mutation MyMutation($id: Int!) {
    delete_todos_by_pk(id: $id) {
      title
      id
    }
  }`;

const EDIT_TODO = gql`
  mutation MyMutation($id: Int!, $title: String!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
      id
      title
      created_at
    }
  }
`;

const ADD_TODO = gql`
  mutation MyMutation($title: String!) {
    insert_todos(objects: { title: $title }) {
    returning {
      id
      title
      created_at
    }
  }
}`

export default {
  components: { TodoInput },
  data() {
    return {
      todos: [],
      error: null,
      filterType: "all",
      pageSize: 5,
      offset: 0,
      currentPage: 1,
      todosRealTime: []
    };
  },
  apollo: {
    todos: {
      query: GET_MY_TODOS,
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      variables() {
        return {
          limit: this.pageSize,
          offset: this.offset
        }
      }
    },
  },
  methods: {
    editTodos(e, item) {
      this.$apollo.mutate({
        mutation: EDIT_TODO,
        variables: {
          id: item.id,
          title: e.target.value,
        },
      });
    },
    addTodos(e) {
      this.$apollo.mutate({
        mutation: ADD_TODO,
        variables: {
          title: e.target.value,
        },
        update: (a, { data: { insert_todos } }) => {
          this.todos.unshift(...insert_todos.returning)
          this.todos.splice(this.todos.length - 1, 1)
          return e.target.value = ''
        },
      });
    },
    handleTodoDelete(todo) {
      // delete todo from db
      this.$apollo.mutate({
        mutation: REMOVE_TODO,
        variables: {
          id: todo.id,
        },
        update: (a, { data: { delete_todos_by_pk: { id } } }) => {
          const inx = this.todos.findIndex(i => i.id == id)
          this.todos.splice(inx, 1)

          a.writeQuery({
            query: GET_MY_TODOS,
            todos: this.todos,
          });
        },
        
      });
    },
    updateOffset(pageNumber) {
      this.offset = (pageNumber - 1) * this.pageSize;
    },
  },
};
</script>
