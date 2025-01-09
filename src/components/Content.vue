<script setup>
import { reactive } from 'vue'
import { useTodoStore } from '@/store/useTodoStore'
import { watchEffect } from 'vue'
    let heads = reactive([
        {
            name: 'All',
            isSelected: true,
        },
        {
            name: 'Done',
            isSelected: false,
        },
        {
            name: 'NeedTodo',
            isSelected: false,
        },
    ])
    const TodoStore = useTodoStore()
    const showTodo = reactive([...TodoStore.todos])

    const handleHeadChange = (item) => {
        for (let t of heads) {
            t.isSelected = false
        }
        item.isSelected = true
    }
    const handleChecked = (index) => {
        showTodo[index].isDone = !showTodo[index].isDone
    }
    const handleDel = (index) => {
        TodoStore.subTodo(index)
    }
    watchEffect(() => {
        let name = heads.filter(item => item.isSelected === true)[0].name
        if (name == 'All') {
            showTodo.splice(0, showTodo.length, ...TodoStore.todos)
        } else if (name === 'Done') {
            showTodo.splice(0, showTodo.length, ...TodoStore.todos.filter(item => item.isDone))
        } else if (name === 'NeedTodo') {
            showTodo.splice(0, showTodo.length, ...TodoStore.todos.filter(item => !item.isDone))
        }
    })
</script>

<template>
    <div class="head">
        <div 
        :class="{ item: !item.isSelected, select: item.isSelected }"
        v-for="item in heads"
        @click="handleHeadChange(item)">
            {{ item.name }}
        </div>
    </div>
    <div class="main">
        <div class="todos" v-for="(item, index) in showTodo" :key="index"
        @dblclick="handleChecked(index)">
            <span class="todo" :class="{ isDone: item.isDone == 1 }" >
                <input type="checkbox" :id="index + 10" class="check" 
                :checked="item.isDone" @click="handleChecked(index)">
                {{ item.value }}
                <label :for="index + 10"></label>
            </span>
            <button class="delete" @click="handleDel(index)">Delete</button>
        </div>
    </div>
</template>

<style scoped lang="less">
.head {
    width: 300px;
    height: 40px;
    display: flex;
    padding-left: 10px;
    margin-left: 60px;
    justify-content: space-evenly;
    color: rgb(199, 201, 212);
}
.item {
    color: rgb(199, 201, 212);
    margin-top: 10px;
    transition: all 0.25s;
}
.item:hover {
    color: rgb(121, 121, 157);
    margin-top: 10px;
    font-size: larger;
    border-bottom: 2px solid rgb(121, 121, 157);
    cursor: pointer;
}
.select, .item:hover {
    color: rgb(121, 121, 157);
    margin-top: 10px;
    font-size: larger;
    border-bottom: 2px solid rgb(121, 121, 157);
}
.todos {
    width: 400px;
    height: 60px;
    user-select: none;
    background-color: #fff;
    margin-left: 100px;
    margin-top: 10px;
    padding-left: 10px;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
}
.todo {
    position: relative;
    padding-left: 30px;
}
.check {
    display: none;
}
.check + label {
    position: absolute;
    left: 0;
    top: 4px;
    width: 20px;
    height: 20px;
    border: 2px solid rgb(180, 132, 249);
    border-radius: 50%;
    color: black;
    background-color: #fff;
}
.delete {
    width: 80px;
    height: 60px;
    border-radius: 15px;
    border: none;
    user-select: none;
    font-size: 18px;
    background-color: #fff;
    transition: all 0.5s;
}
.delete:hover {
    background-color: #eee;
}
.check:checked + label::after {
  content: "";
  position: absolute;
  left: 2px;
  top: 2px;
  width: 16px;
  height: 16px;
  background-color: rgb(180, 132, 249);
  border-radius: 50%;
}
.isDone {
    text-decoration: line-through;
    color: rgb(148, 144, 144);
}
</style>