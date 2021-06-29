<template>

  <n-collapse   @item-header-click="handleItemHeaderClick" >

    <n-collapse-item :title="item.nameZh" :name="item.id" v-for="item in roleMess">
      <n-cascader
          v-model:value="defaultValue"
          :on-blur="updateMenuRole"
          :accordion="true"

          multiple
          clearable
          placeholder="点击这里选择"
          :max-tag-count="responsiveMaxTagCount ? 'responsive' : undefined"
          :expand-trigger="hoverTrigger ? 'hover' : 'click'"
          :options="options"
          :cascade="cascade"
          :leaf-only="leafOnly"
          :show-path="showPath"
          :filterable="filterable"
          :default-value="defaultValue"

      />
      </n-collapse-item>
    <n-divider />
  </n-collapse>
</template>

<script>
import {MenuOutline} from '@vicons/ionicons5'
import {computed, onMounted, ref,onBeforeMount} from "vue"
import {getRequest, postRequest,putRequest} from "../../api/request";
import {useMessage}from"naive-ui"

export default {
  name: "RoleBasic",
  components:{
    MenuOutline
  },


  setup(){
    const message=useMessage()
    const rid=ref()
    const roleMess=ref([])
    let options=ref([])
    const defaultValue=ref([])


    function getRoleMess() {
      getRequest('/role/message').then(resp=>{
        roleMess.value=resp.data

      })
    }
    function getAllMenus() {
      getRequest('/system/allMenus').then(resp=>{
        options.value=resp.data


      })
      return options.value

    }
    function handleItemHeaderClick ({ name }) {
      getRequest('/system/findByRid/'+name).then(resp=>{
        defaultValue.value=resp.data;
        rid.value=name


        console.log(resp.data)
      })
    }
    function updateMenuRole() {
      putRequest('/system/updateMenusRole/?rid='+rid.value+"&&mids="+defaultValue.value).then(resp=>{
        console.log(resp.data)
        message.success("已经成功更新权限！请刷新！")
      })
    }






    onMounted(()=>{
      getAllMenus();
      getRoleMess();

    })


    console.log(options)



    return{
      updateMenuRole,
      rid,
      showModal: false,
      roleMess,
      getRoleMess,
      options,
      getAllMenus,
      handleItemHeaderClick,
      leafOnly: true,
      cascade: true,
      showPath: true,
      hoverTrigger: false,
      // value: null,
      filterable: false,
      responsiveMaxTagCount: true,
      defaultValue,



    }
  }
}
</script>

<style scoped>

</style>
