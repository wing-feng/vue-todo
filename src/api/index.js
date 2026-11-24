import axios from "axios";

// 导出一个专门获取毒鸡汤的函数
export const fetchHitokoto = () => {
  return axios.get("https://v1.hitokoto.cn/");
};
