<template>
<!--  表格数据-->
  <n-data-table
  ref="table"
  :columns="columns"
  :data="userData"
  :max-height="650"
  :scroll-x="500"
  :row-key="dataKey"
  />
  <n-divider />
  <n-pagination :item-count="itemCount" :page-sizes="[5, 10, 15]" showSizePicker :on-update:page="onChangePage"
                :on-update:page-size="onChangePageSize"
  />

</template>
<script>
import {ref, h, reactive, onMounted} from 'vue'
import {getRequest, putRequest} from "../../api/request";
import {useMessage,useDialog,NSwitch,NGradientText} from "naive-ui";

const createColumns=({switchChangeSpeak,switchChangeEnable})=>{
  return[
    {
      type:'selection',
      fixed:'left'
    },
    {
      title: '姓名',
      key:'name'
    },
    {
      title:'性别',
      key:'gender'
    },
    {
      title:'电话号码',
      key:'phone'
    },
    {
      title:'地址',
      key:'address'
    },
    {
      title:'婚姻状态',
      key:'wedlock'
    },
    {
      title:'民族',
      key:'actions',
      render(row){
        return h(
            NGradientText,
            {
              type:'info'
            },
            {default:()=>row.nation.name}
        )
      }
    },
    {
      title:'政治状态',
      key:'actions',
      render(row){
        return h(
            NGradientText,
            {


            },
            {default:()=>row.political.name}
        )
      }
    },
    {
      title:'可用状态',
      key:'actions',
      render(row){
        return h(
            NSwitch,
            {
              defaultValue:row.enabled,
              onUpdateValue:()=>switchChangeEnable(row)
            }
        )
      }
    },
    {
      title:'可发言状态',
      key:'actions',
      render(row){
        return h(
            NSwitch,
            {
              // defaultValue:row.speak,
              // value:row.speak,
              defaultValue:row.speak,
              onUpdateValue:()=>switchChangeSpeak(row)
            }
        )
      }
    },

  ]
}

export  default {

  setup(props){
    const message=useMessage()
    const dialog=useDialog()
    const userData=ref([])
    const itemCount=ref()
    const active=ref(false)

    const pagination=reactive({
      page:1,
      pageSize:5,
    })

    // 该页面的数据
    function onChangePage(page){
      pagination.page=page
      getAllUser()
      // message.success(page)
    }
    function onChangePageSize(pageSize){
      pagination.pageSize=pageSize
      getAllUser()
      // message.success(pageSize)
    }

function getAllUser() {
  getRequest('/user/getAll/?page='+pagination.page+"&&size="+pagination.pageSize).then(resp=>{
    userData.value=resp.data.data;
    itemCount.value=resp.data.total
    console.log(userData)
  })
}
onMounted(getAllUser)
    return{
      //分页
      active,
      itemCount,
      onChangePage,
      onChangePageSize,
      pagination,
        userData,
        getAllUser,
        dataKey: (userData) => {
          return userData.key = userData.id;
        },
        columns: createColumns({
          switchChangeEnable(row){
           putRequest('/user/updateEnabled/?id='+row.id).then(resp=>{
             if (resp){
               message.success("成功更新可用状态！")
             }

           })

          },
          switchChangeSpeak(row){
            putRequest('/user/updateSpeak/?id='+row.id).then(resp=>{
              if(resp){
                message.success("成功更新可留言状态！")
              }
            })
          }

        })
      }
  }
}
</script>
