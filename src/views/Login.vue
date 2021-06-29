<template>
  <div class="login-wrap">

    <div class="ms-login">
      <div class="ms-title">管理系统</div>
      <n-form :model="param" :rules="rules" ref="login" label-placement="left" >
        <n-form-item-row  path="username" label="账号">
          <n-input  placeholder="username" v-model:value="param.username"></n-input>
        </n-form-item-row>
        <n-form-item-row  path="password" label="密码">
          <n-input
              @keyup.enter.native="submitForm()"
              placeholder="password" type="password" v-model:value="param.password"></n-input>
        </n-form-item-row>
        <div class="login-btn" style="margin-top:30px">
          <n-button type="primary" attr-type="button" @click="submitForm()">登录</n-button>
        </div>
      </n-form>
    </div>

  </div>
</template>

<script>
import {ref, reactive} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {postRequest} from "../api/request";
import {useStore,createStore} from 'vuex'


export default {
  name: "Login",

  setup(){
    //路由
    const route=useRoute();
    const router=useRouter();
    //store
    const store=useStore();
    // const createStore=createStore();
    const param=reactive({

      username:'admin',
      password:''
    })
    const login=ref(null)

    const submitForm=()=>{
      login.value.validate((errors)=>{
        if(!errors){
          postRequest('/login',param).then(resp=>{
            store.commit('INIT_CURRENTPEOPLE', resp.obj);
            window.sessionStorage.setItem("user", JSON.stringify(resp))
            console.log('test:'+JSON.stringify(resp))
            let path=route.query.redirect;
            router.replace((path == '/' || path == undefined) ? '/home' : path)

            console.log(resp)
          })
        }
      })
    }

    return{
      login,
      param,
      submitForm,
      //自定义验证规则
      rules:{
        username:[{required:true,message:'请输入账号',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}]
      },


    }



  }

}
</script>

<style scoped>

.login-wrap {
  background: url("../assets/bg.jpg") ;
  background-size: 100% 100%;
  height: 700px;
  width: 100%;

;

}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  /*color: #fff;*/
  border-bottom: white;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: white;
  overflow: hidden;
  padding: 30px;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
