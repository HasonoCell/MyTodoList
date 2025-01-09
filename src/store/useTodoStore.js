import { defineStore } from "pinia"

export const useTodoStore = defineStore('todos', {
    state: () => {
        return {
            todos: [ { value: 'example', isDone: 0, } ],
            del: true,
        }
    },

    actions: {
        addTodo(todo) {
            this.todos.push(todo)
        },
        subTodo(index) {
            this.todos.splice(index, 1)
        },
        clearTodo() {
            this.todos = []
        }
    },
})