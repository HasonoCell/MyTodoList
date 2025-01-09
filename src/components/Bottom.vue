<script setup>
    import { useTodoStore } from '@/store/useTodoStore'
    import { computed } from 'vue'

    const TodoStore = useTodoStore()
    let data = computed(() => {
        return {
            isShow: TodoStore.todos.length !== 0,
            num: TodoStore.todos.length,
        }
    })
    const handleClear = () => {
        TodoStore.clearTodo()
    }
</script>

<template>
    <div class="bottom" v-if="data.isShow">
        <el-button type="danger" class="clear" 
        @click="handleClear">Clear</el-button>
        <span>合 计：{{ data.num }}</span>
    </div>
</template>

<style scoped lang="less">
.bottom {
    margin-left: 100px;
    margin-top: 30px;
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.clear {
    width: 110px;
    height: 50px;
    border-radius: 15px;
}
</style>