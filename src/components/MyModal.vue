<script setup>
defineProps({
  visible: Boolean, // 控制显示隐藏
  title: String,
  message: String,
});
const emit = defineEmits(["confirm", "cancel"]);
</script>

<template>
  <!-- 遮罩层：v-if 控制显示，点击遮罩不关闭（防手滑） -->
  <div v-if="visible" class="modal-mask">
    <!-- 弹窗本体 -->
    <div class="modal-box">
      <h3 style="margin-top: 0; color: #333">{{ title }}</h3>
      <p style="color: #666">{{ message }}</p>
      <div class="btn-group">
        <el-button @click="emit('cancel')">取消</el-button>
        <el-button type="danger" @click="emit('confirm')">确定</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 半透明黑底 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-box {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 300px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: pop 0.3s ease-out; /* 加个弹出来的小动画 */
}
.btn-group {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* 简单的缩放动画 */
@keyframes pop {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
