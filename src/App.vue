<template>
  <div class="nav">
    <!-- router-link 相当于以前的 a 标签，用来跳转 -->
    <router-link to="/">🍚 干饭转盘</router-link>
    <router-link to="/about">👤 关于我</router-link>
  </div>

  <!-- 核心魔法：页面内容在这里动态切换！ -->
  <router-view></router-view>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background: #f1f2f6;
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