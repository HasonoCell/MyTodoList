<script setup>
    import Bottom from './components/Bottom.vue'
    import Content from './components/Content.vue';
    import Input from './components/Input.vue';
</script>

<template>
    <div class="main">
        <h1>Todo List</h1>
        <Input />
        <Content />
        <Bottom />
    </div>
</template>

<style scoped lang="less">
.main {
    h1 {
        font-size: 48px;
    }
    position: relative;
    width: 600px;
    min-height: 800px;
    background-color: rgb(245, 246, 252);
    border-radius: 20px;
    margin: 0 auto;
    padding-top: 80px;
    box-shadow: 0px 5px 15px #888888;
    text-align: center;
}
</style>