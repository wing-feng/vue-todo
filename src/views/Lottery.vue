<script setup>
import FoodList from "../components/FoodList.vue";
import { ref, watch } from "vue";
import { fetchHitokoto } from "../api/index.js";
import { useFoodStore } from "../store/foodStore.js";
import MyModal from "../components/MyModal.vue";
import HistoryList from "../components/HistoryList.vue";

const foodStore = useFoodStore();
const result = ref("今天吃什么？");
const newFood = ref("");
const savedHistory = localStorage.getItem("myHistoryList");
const historyList = ref(savedHistory ? JSON.parse(savedHistory) : []);
const showModal = ref(false); //控制弹窗隐藏

watch(
  historyList,
  (newvalue) => {
    localStorage.setItem("myHistoryList", JSON.stringify(newvalue));
  },
  { deep: true },
);

const addFood = () => {
  if (newFood.value !== "") {
    foodStore.addFoodToStore(newFood.value);
    newFood.value = "";
  }
};

// 加一个变量，用来记录当前是不是正在抽奖，防止用户狂点按钮
const isSpinning = ref(false);

//执行抽奖动画并记录结果
const pickFood = () => {
  // 如果菜单是空的，或者正在抽奖中，直接拦截
  if (foodStore.foodList.length === 0 || isSpinning.value) return;

  // 1. 标记进入“抽奖中”状态
  isSpinning.value = true;
  result.value = "疯狂翻滚中...";

  // 2. 开启定时器，每 50 毫秒换一个菜（制造闪烁特效）
  const timer = setInterval(() => {
    let randomIndex = Math.floor(Math.random() * foodStore.foodList.length);
    result.value = foodStore.foodList[randomIndex];
  }, 50);

  // 3. 1.5 秒后停止滚动
  setTimeout(() => {
    clearInterval(timer); // 清除定时器，停止闪烁

    // 抽取最终中奖结果
    let finalIndex = Math.floor(Math.random() * foodStore.foodList.length);
    result.value = foodStore.foodList[finalIndex];
    //添加抽奖记录
    historyList.value.push(result.value);
    if (historyList.value.length > 5) {
      historyList.value.shift();
    }

    // 解除锁定，允许下次抽奖
    isSpinning.value = false;
  }, 1500); // 1500 毫秒 = 1.5 秒
};

const deleteFood = (index) => {
  foodStore.deleteFoodFromStore(index);
};

//打开清空记录的弹窗
const cleanHistory = () => {
  showModal.value = true;
};
//弹窗点确定
const handleConfirm = () => {
  historyList.value = [];
  showModal.value = false;
};
//弹窗点取消
const handleCancel = () => {
  showModal.value = false;
};

// 定义一个变量存拿到的文字
const hitokoto = ref("点击下方按钮获取今日运势");
const isLoading = ref(false);
// 写一个异步请求函数
const getHitokoto = async () => {
  if (isLoading.value) return; //防手抖，如果正在加载，直接拦截，别发请求
  isLoading.value = true;
  try {
    // 直接调用被抽离的api函数，拿到结果
    const res = await fetchHitokoto();

    // axios 会自动把服务器返回的数据包在 res.data 里
    // 接口原本的数据在 data.hitokoto，所以现在是 res.data.hitokoto
    hitokoto.value = res.data.hitokoto;
  } catch (error) {
    console.error("请求失败", error);
    hitokoto.value = "网络抽风了，请稍后再试";
  } finally {
    //finally的意思是：不管成功还是失败，最后都要执行这里
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="app-container">
    <h1 class="result-title">{{ result }}</h1>

    <div class="input-group">
      <el-input
        v-model="newFood"
        placeholder="输入你想吃的..."
        @keyup.enter="addFood"
      />
      <el-button type="primary" @click="addFood">添加</el-button>
    </div>

    <FoodList :foods="foodStore.foodList" @del="deleteFood"></FoodList>

    <button class="pick-btn" @click="pickFood">随机抽取！</button>

    <HistoryList
      :history-list="historyList"
      @clear="cleanHistory"
    ></HistoryList>

    <div style="margin-top: 40px; padding: 20px; border-top: 1px dashed #ccc">
      <p style="color: #666; font-size: 16px">{{ hitokoto }}</p>
      <el-button type="primary" :loading="isLoading" @click="getHitokoto">{{
        isLoading ? "正在获取..." : "获取今日毒鸡汤"
      }}</el-button>
    </div>
    <MyModal
      :visible="showModal"
      title="再次确认"
      message="确定要清空所有历史记录吗？"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    ></MyModal>
  </div>
</template>

<style scoped>
/* 整个页面的容器，限制宽度，居中显示 */
.app-container {
  max-width: 500px;
  margin: 60px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  color: #333;
}

/* 抽奖结果的大标题 */
.result-title {
  font-size: 42px;
  color: #e74c3c; /* 醒目的红色 */
  margin-bottom: 30px;
  min-height: 60px; /* 防止没字的时候页面跳动 */
}

/* 输入框和添加按钮的包裹层 */
.input-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

/* 输入框美化 */
.input-group input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #3498db; /* 聚焦时变蓝 */
}

/* 添加按钮美化 */
.input-group button {
  padding: 0 25px;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.input-group button:hover {
  background-color: #2980b9;
}

/* 菜单列表美化 */

/* 抽奖大按钮 */
.pick-btn {
  width: 100%;
  padding: 18px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background: linear-gradient(
    135deg,
    #ff6b6b,
    #ee5253
  ); /* 渐变色，看着更高级 */
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(238, 82, 83, 0.4); /* 阴影增加立体感 */
  transition:
    transform 0.1s,
    box-shadow 0.1s;
}

/* 鼠标按下去的时候缩小一点点，增加点击手感 */
.pick-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 5px rgba(238, 82, 83, 0.4);
}
</style>
