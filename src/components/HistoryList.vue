<script setup>
const props =defineProps({
    historyList:{
        type:Array,
        default:()=>[]
    }
})
const emit =defineEmits(['clear'])
</script>
<template>
    <div v-if="props.historyList.length>0" style="margin-top: 20px;">
        <ul style="list-style-type: none; padding: 0; color: #555;">
            <li v-for="(item,index) in props.historyList" :key="index" style="margin-bottom: 8px;">
                第{{ index+1 }}次抽到:{{ item }}
            </li>
        </ul>

        <el-button type="danger" plain size="small" @click="emit('clear')">
            清空历史记录
        </el-button>
    </div>
    <p v-else style="color: #999; margin-top: 20px;">暂无记录，点击随机抽取吧！</p>
</template>