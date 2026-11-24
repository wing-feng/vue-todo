import { defineStore } from "pinia";
import { ref, watch } from "vue";

// 定义一个叫 food 的仓库
export const useFoodStore = defineStore("food", () => {
  // 1. 数据（把你之前在 Lottery.vue 里的本地存储逻辑搬过来）
  const savedData = localStorage.getItem("myFoodList");
  const foodList = ref(
    savedData
      ? JSON.parse(savedData)
      : ["米饭", "饺子", "鸡腿饭", "手撕鸡", "麻辣烫", "汉堡"],
  );

  // 2. 自动本地存储
  watch(
    foodList,
    (newValue) => {
      localStorage.setItem("myFoodList", JSON.stringify(newValue));
    },
    { deep: true },
  );

  // 3. 添加方法
  const addFoodToStore = (food) => {
    foodList.value.push(food);
  };

  // 4. 删除方法
  const deleteFoodFromStore = (index) => {
    foodList.value.splice(index, 1);
  };

  // 把数据和操作暴露给外部使用
  return {
    foodList,
    addFoodToStore,
    deleteFoodFromStore,
  };
});
