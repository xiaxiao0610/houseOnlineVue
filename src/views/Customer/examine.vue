<template>
  <n-card title="用户信息" :bordered="true" size="small" style="width: 350px">
    <n-form

        :label-width="80"
        :model="oneData"
        ref="formRef"
        label-placement="left"
    >
      <n-form-item label="姓名" >
        <n-input v-model:value="oneData.user.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="性别" >
        <n-input v-model:value="oneData.user.gender" placeholder="输入性别" />
      </n-form-item>
      <n-form-item label="区域" >
        <n-input v-model:value="oneData.location" placeholder="输入区域" />
      </n-form-item>
      <n-form-item label="小区" >
        <n-input v-model:value="oneData.community" placeholder="输入小区" />
      </n-form-item>
      <n-form-item label="楼号" >
        <n-input v-model:value="oneData.building" placeholder="输入楼号" />
      </n-form-item>
      <n-form-item label="房号" >
        <n-input v-model:value="oneData.door" placeholder="输入房号" />
      </n-form-item>
      <n-form-item label="联系电话" >
        <n-input v-model:value="oneData.demandPhone" placeholder="输入联系电话" />
      </n-form-item>
      <n-form-item label="选择预约的日期">
        <n-date-picker v-model:value="timestamp" type="datetime" clearable />
      </n-form-item>
      <n-form-item style="margin-left: 180px">
        <n-button type="primary" size="small">取消</n-button>
        <n-button type="primary" size="small" style="margin-left: 30px" @click="submit">确定</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script>

import {onMounted, reactive, ref} from "vue";
import {useRoute}from"vue-router"
import {getRequest, postRequest} from "../../api/request";
import {useMessage} from 'naive-ui'

export default {
  name: "examine",
  setup(){
    const data=ref()
    const route=useRoute()
    const oneData=ref({user:{}})
    const timestamp=ref()
    const  message=useMessage()



    data.value=route.query.data;

    function findOne(){
      getRequest('/rent/findOne/'+data.value).then(resp=>{
        oneData.value=resp.data
        console.log(resp.data)
      })
    }
    function submit() {
      postRequest('/appointment/add/?'+'rentalId='+data.value+'&&appointmentDate='+timestamp.value).then(resp=>{
        if (resp){
          message.success('已经成功处理！')
        }
        console.log(resp)
      })
      console.log(timestamp.value)
    }
    onMounted(findOne)



    return{
      findOne,
      oneData,
      data,
      timestamp,
      submit,
      message



    }
  }
}
</script>

<style scoped>

</style>
