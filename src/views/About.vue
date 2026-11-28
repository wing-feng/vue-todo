<script setup>
import { ref } from "vue";
import { useFoodStore } from "../store/foodStore";
import { Loading } from "@element-plus/icons-vue";

const foodStore = useFoodStore();
//  定义一个变量存图片的网址，给个默认的风景图 API
const imgUrl = ref("https://picsum.photos/600/400");
const isImgLoading = ref(true); //默认正在加载
const imgError = ref(false); //默认没有报错

// 换一张随机风景图
const changeImg = () => {
  isImgLoading.value = true; //换图时，重新开始加载
  imgError.value = false;
  // 核心技巧：在网址后面加个 ?t=随机数
  // 这是为了防止浏览器偷懒（缓存），强制它去网上重新下载一张新图
  imgUrl.value = `https://picsum.photos/600/400?t=${Math.random()}`;
};
</script>

<template>
  <div style="text-align: center; padding: 20px">
    <h1>这是我做的干饭转盘！</h1>
    <p>当前你的备选菜单里有{{ foodStore.foodList.length }}个菜！</p>
    <p>不知道去哪玩？送你一张随机风景图：</p>
    <!-- 固定比例的相框 -->
    <div
      style="
        width: 80%;
        max-width: 600px;
        aspect-ratio: 3/2;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      "
    >
      <!-- 错误提示 -->
      <div v-if="imgError" style="color: #f56c6c; margin: 20px 0">
        图片加载失败，请检查网络
      </div>

      <!-- 图片本体：注意这里的换行和引号 -->
      <img
        v-show="!imgError && !isImgLoading"
        :src="imgUrl"
        alt="随机风景"
        @load="isImgLoading = false"
        @error="
          isImgLoading = false;
          imgError = true;
        "
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        "
      />

      <!-- 加载中 -->
      <div v-if="isImgLoading" style="margin: 20px 0; color: #409eff">
        <el-icon class="is-loading" :size="30"><Loading /></el-icon>
      </div>
    </div>
    <br />
    <el-button type="success" @click="changeImg">换一张风景图</el-button>
  </div>
</template>

<style scoped>
/* 不用写复杂的样式，直接在模板里用内联了 */
</style>
