<script setup>
    import { ref } from 'vue'
    import { useTodoStore } from '@/store/useTodoStore'
    import { CircleCloseFilled } from '@element-plus/icons-vue';
    const TodoStore = useTodoStore()
    let value = ref('')
    let on = ref(false)
    let warning = ref(false)

    const handleEnter = () => {
        let todo = {
            value: value.value,
            isDone: false,
        }
        value.value = ''
        let inspected = TodoStore.todos.filter(
            item => item.value.trim() == todo.value.trim()
        )
        if (!inspected.length && todo.value.trim()) {
            TodoStore.addTodo(todo)
        } else {
            warning.value = true
        }
    }

    const handleInput = () => {
        if (value.value.trim().length > 0) {
            on.value = true
        } else {
            warning.value = false
        }
    }

    const clearInput = () => {
        if (value.value.length != 0) {
            value.value = ''
        }
    }
</script>

<template>
    <div class="newTodo">
        <input class="addTodo" 
        type="text" placeholder="Please Add Your Todo" v-model="value"
        @keydown.enter="handleEnter" @input="handleInput">


        <div v-if="on">
            <el-icon :size="60" class="close" @click="clearInput">
                <CircleCloseFilled />
            </el-icon>
            <el-alert title="内容为空或已存在！" type="warning" effect="dark" 
            class="warning" v-if="warning">
            </el-alert>
        </div>
    </div>
</template>

<style scoped>
.newTodo {
    width: 400px;
    height: 60px;
    margin: 0 auto;
    border-radius: 30px;
    position: relative;
}
.addTodo {
    width: 400px;
    height: 60px;
    text-align: center;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: larger;
    box-shadow: 0px 5px 15px #e4dddd;
    transition: all 0.5s linear;
}
.addTodo:focus {
    background-color: rgb(193, 218, 218);
}
.close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
}
.warning {
    margin-top: 5px;
    border-radius: 30px;
}
</style>