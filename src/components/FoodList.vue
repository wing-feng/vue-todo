<script setup>
// 1. 接收父组件传来的数据
const props = defineProps({
  foods: Array,
});
//告诉vue，准备发送一个叫‘del’的信号
const emit = defineEmits(["del"]);
</script>

<template>
  <!-- 2. 把你剪切的 ul 贴在这里 -->
  <ul class="food-list">
    <li v-for="(item, index) in props.foods" :key="index">
      {{ item }}
      <button
        @click="emit('del', index)"
        style="margin-left: 5px; color: red; cursor: pointer"
      >
        ×
      </button>
    </li>
  </ul>
</template>

<style scoped>
/* 4. 把 App.vue 原来底部的 .food-list 和 .food-list li 的样式剪切到这里 */
.food-list {
  list-style: none;
  padding: 0;
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.food-list li {
  background-color: #f1f2f6;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 15px;
  color: #555;
}
</style>
