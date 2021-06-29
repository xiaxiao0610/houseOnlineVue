<template>

  <n-data-table :columns="columns" :data="data" :pagination="pagination" />
  <n-modal v-model:show="showModal">
    <n-card style="width: 600px;" title="模态框" :bordered="false" size="huge">
      <n-space vertical>
        <n-select v-model:value="defaultValue" multiple :options="options" :default-value="defaultValue" :on-blur="updateRole"/>

      </n-space>

    </n-card>
  </n-modal>
</template>

<script>
import {h, defineComponent, ref, onMounted} from 'vue'
import { NTag, NButton, useMessage,NSelect } from 'naive-ui'
import {getRequest,postRequest,putRequest} from "../../api/request";

const createColumns = ({ sendMail,openModal }) => {
  return [
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '电话号码',
      key: 'phone'
    },
    {
      title: '地址',
      key: 'address'
    },
    {
      title: 'Select',
      key: 'actions',
      render(row){
        return h(
            NButton,
            {
              size:'small',
              onClick:()=>openModal(row)
            },
            {default:()=>'权限组'}
        )
      }
    },
    {
      title: 'Action',
      key: 'actions',
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              onClick: () => sendMail(row)
            },
            { default: () => 'Send Email' }
        )
      }
    }
  ]
}



export default defineComponent({
  setup () {
    const message = useMessage()
    const showModal=ref(false)
    const allAdmin=ref([])
    const options=ref([])
    const defaultValue=ref([])
    const adminid=ref()
    function getAlladmin(){
      getRequest('/admin/getAll').then(resp=>{
        console.log(resp)
        allAdmin.value=resp.data
      })
    }
    function getAllRoles(){
      getRequest('/role/message').then(resp=>{
        options.value=resp.data;
      })
    }
    function updateRole(){
      putRequest('/adminRole/update/?adminid='+adminid.value+"&&rids="+defaultValue.value).then(resp=>{
        if (resp.data){
        message.success("成功更新权限，请刷新！")}
      })
    }

    onMounted(getAlladmin)
    onMounted(getAllRoles)
    return {
      getAlladmin,
      getAllRoles,
      updateRole,
      options,
      defaultValue,

      showModal,
      data: allAdmin,
      columns: createColumns({

        sendMail (rowData) {
          message.info('send mail to ' + rowData.id)
          showModal.value=true
        },
        openModal(row){
          message.info('id'+row.id)
          getRequest('/adminRole/'+row.id).then(resp=>{
            defaultValue.value=resp.data
            adminid.value=row.id
            console.log(resp)
          })
          showModal.value=true
        }
      }),
      pagination: {
        pageSize: 10
      }
    }
  }
})
</script>

<style scoped>

</style>
