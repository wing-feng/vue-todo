<script setup>
import { ref } from "vue";
const isDark = ref(false);
//切换函数
const toggleDark = () => {
  const html = document.documentElement;
  if (isDark.value) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};
</script>
<template>
  <div class="nav">
    <!-- router-link 相当于以前的 a 标签，用来跳转 -->
    <router-link to="/">🍚 干饭转盘</router-link>
    <router-link to="/about">👤 关于我</router-link>
    <!--加一个Element的开关组件-->
    <el-switch
      v-model="isDark"
      inline-prompt
      active-text="🌙 暗"
      inactive-text="☀️ 亮"
      @change="toggleDark"
      style="margin-left: 20px"
    ></el-switch>
  </div>

  <!-- 核心魔法：页面内容在这里动态切换！ -->
  <router-view></router-view>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 15px;
  background: var(--bg-color);
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  transition: background 0.3s;
}
.nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.nav a.router-link-active {
  color: #409eff; /* 选中的状态变蓝 */
}
</style>
