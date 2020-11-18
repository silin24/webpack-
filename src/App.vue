<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List :todos='todos' :deleteTodo="deleteTodo" :updateTodo="updateTodo"/>
      <Footer :todos='todos':checkAllTodos="checkAllTodos" :clearCompleteTodos='clearCompleteTodos'/> 
    </div>
  </div>
</template>

<script>

import Header from './component/Header'
import List from './component/List'
import Footer from './component/Footer'

import {saveTodos,readTodos} from './utils/storageUtils'

export default {
  // name: 'App'
data() {
  return {
    todos:[]
}
},
mounted() {
  setTimeout(() => {
        // 读取local中保存的todos, 更新数据
        this.todos = readTodos()
      }, 1000);
},
watch: {
  todos:{
    deep:true, //深度监视
    /* handler(value){
          saveTodos(value)
     } */
    handler:saveTodos
  }
},
methods: { //所以的方法都成为组件对象的方法
  addTodo(todo){
    this.todos.unshift(todo)
  },
  deleteTodo(index){
     this.todos.splice(index,1)
  },
  checkAllTodos(isCheck){
      this.todos.forEach(todo => todo.complete = isCheck)
  },
  clearCompleteTodos(){
   this.todos = this.todos.filter(todo => !todo.complete)
  },
   updateTodo (todo, isCheck) {
        todo.complete = isCheck
      }
},
components:{ //局部注册组件,只能在当前组件使用
  Header,
  List,
  Footer

}
}
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>