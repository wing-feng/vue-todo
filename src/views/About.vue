<script setup>
import { ref } from 'vue'
import { useFoodStore } from '../store/foodStore'

const foodStore=useFoodStore()
// 1. 定义一个变量存图片的网址，给个默认的风景图 API
const imgUrl = ref('https://picsum.photos/600/400')

// 2. 换图函数
const changeImg = () => {
  // 核心技巧：在网址后面加个 ?t=随机数
  // 这是为了防止浏览器偷懒（缓存），强制它去网上重新下载一张新图
  imgUrl.value = `https://picsum.photos/600/400?t=${Math.random()}`
}
</script>

<template>
  <div style="text-align: center; padding: 20px;">
    <h1>这是我做的干饭转盘！</h1>
    <p>当前你的备选菜单里有{{ foodStore.foodList.length }}个菜！</p>
    <p>不知道去哪玩？送你一张随机风景图：</p >

    <!-- ⚠️ 重点：<img> 的 src 前面必须加冒号 :，意思是动态绑定变量 -->
    <img :src="imgUrl" alt="随机风景" style="width: 80%; max-width: 600px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 20px;" />

    <br />
    
    <el-button type="success" @click="changeImg">换一张风景图</el-button>
  </div>
</template>

<style scoped>
/* 不用写复杂的样式，直接在模板里用内联了 */
</style>