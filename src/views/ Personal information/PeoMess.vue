<template>

  <n-modal v-model:show="showModalUpdate" >
    <n-card style="width: 600px;" title="修改资料" :bordered="false" size="small">
      <n-form
          label-placement="left"
           :model="updateMess">
        <n-form-item label="昵称" path="name">
          <n-input placeholder="input" v-model:value="updateMess.name"></n-input>
        </n-form-item>
        <n-form-item label="电话号码"  path="phone">
          <n-input placeholder="input" v-model:value="updateMess.phone"></n-input>
        </n-form-item >
        <n-form-item label="固定电话"  path="telephone">
          <n-input placeholder="input" v-model:value="updateMess.telephone"></n-input>
        </n-form-item>
        <n-form-item label="地址"  path="address">
          <n-input placeholder="input" v-model:value="updateMess.address"></n-input>
        </n-form-item>
        <n-form-item>
          <n-button @click="showModalUpdate=false" type="primary" >取消</n-button>
          <n-button  type="primary" style="margin-left: 120px" @click="update">确定</n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-modal>

  <n-card title="个人信息" hoverable>
    <div>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名：<n-gradient-text
        :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
    >
      {{message.name}}
    </n-gradient-text></div>
    <div>电话号码：<n-gradient-text
        :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
    >
      {{message.phone}}
    </n-gradient-text></div>
    <div>固定电话：<n-gradient-text
        :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
    >
      {{message.telephone}}
    </n-gradient-text></div>
    <div>地&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp址：<n-gradient-text
        :gradient="{
      from: 'rgb(85, 85, 85)',
      to: 'rgb(170, 170, 170)'
    }"
    >
      {{message.address}}
    </n-gradient-text></div>

    <div style="margin-top: 30px">
      <n-button type="primary" dashed @click="showModalUpdate = true">
        <template #icon>
          <n-icon >
            <People />
          </n-icon>
        </template>
        修改信息
      </n-button>
      <n-button type="warning" dashed style="margin-left: 20px">
        <template #icon>
          <n-icon>
            <DocumentLockOutline/>
          </n-icon>
        </template>
        修改密码
      </n-button>
    </div>

  </n-card>
</template>

<script>
import {ref, reactive, onMounted} from 'vue'
import {getRequest, putRequest} from "../../api/request";
import {People,DocumentLockOutline}from"@vicons/ionicons5"
import {useMessage}from 'naive-ui'
import {useStore}from'vuex'

export default {
  name: "PeoMess",
  components:{
    People,
    DocumentLockOutline
  },
  setup(props){

    const store=useStore();
    const showModalUpdate=ref(false)
    const message=ref([])
    const usemessage=useMessage();
    const updateMess=ref([])

    function peoMess() {
      console.log("sda")
      getRequest('/admin/message').then(resp=>{
        console.log('da'+resp.data.name)
        message.value=resp.data
        updateMess.value=resp.data
      })
    }
    // console.log(message)
    onMounted(()=>{
      peoMess()
    })
    // onMounted(peoMess)
    function update(){
      putRequest('/admin/update',updateMess.value).then(resp=>{
        if (resp){

          window.sessionStorage.setItem("user", JSON.stringify(resp.data));
          store.commit('INIT_CURRENTPEOPLE', resp.data);
          showModalUpdate.value=false;
          usemessage.success("更新好了！")
        }
      })
    }

    return{
      showModalUpdate,
      updateMess,
      update,
      message,
      peoMess

    }
  }

}
</script>

<style scoped>
.n-card {
  max-width: 300px;
}
</style>
