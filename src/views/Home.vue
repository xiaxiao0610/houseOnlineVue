<template>
  <div >


  <n-space vertical>

<n-layout >
  <n-layout-header :inverted="inverted" bordered style="height: 60px">
    <n-space style="flex-direction: row-reverse;margin-right: 30px" >
      <n-dropdown @select="handleSelect" trigger="hover" :options="options">

        <n-avatar
          :size="48"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />

      </n-dropdown>
    </n-space>

  </n-layout-header>
    <n-layout has-sider>
      <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"

          show-trigger
          :inverted="inverted"
      >

        <n-menu router
                @update:value="handleUpdateValue"
                :inverted="inverted"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="menuData"

        style="height: 630px"></n-menu>

      </n-layout-sider>
      <n-layout style="max-height: 630px;">
        <router-view/>
      </n-layout>
    </n-layout>

</n-layout>
  </n-space>
  </div>
</template>

<script>
import {h, defineComponent, ref, computed, onMounted, reactive, render} from 'vue'
import { NIcon,useMessage } from 'naive-ui'
import {useStore,createStore}from'vuex'
import {useRoute,useRouter} from 'vue-router'
import {BookOutline as BookIcon} from '@vicons/ionicons5'



function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}



export default ({
  setup () {
const message=useMessage();
    const store=useStore();
    const router=useRouter();
    const route=useRoute();
    const peopleMessage=ref()
    onMounted(()=>{

    })
    const menuData=computed(()=>{
      return store.state.routes

    })
    console.log(menuData.value)
    //获取本地session里面的user用户信息
    peopleMessage.value=window.sessionStorage.getItem("user")



    return {
      handleUpdateValue (key, item) {
        router.push(item.path)
        console.log(JSON.stringify(item.path))
        console.log("哈哈哈")
        // message.info('[onUpdate:value]: ' + JSON.stringify(key))
        // message.info('[onUpdate:value]: ' + JSON.stringify(item))
      },
      inverted: ref(true),
      router,
      menuData,
      peopleMessage,
      options: [
        {
          label: '个人信息',
          key: '/peoMessage',
          disabled:false
        },
        {
          label: '退出',
          key: 'layout',
          disabled:false
        },],
      handleSelect(key){
        message.info(key)
        router.push(key)
      }


      // menus



    }
  }

})
</script>
