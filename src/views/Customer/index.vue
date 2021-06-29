<template>
  <n-data-table :columns="columns" :data="data" />
</template>

<script>
import {h, onMounted, ref} from 'vue'
import {NButton, NText} from 'naive-ui'
import {getRequest} from "../../api/request";
import {useRouter} from 'vue-router'

const createColumns=({examine})=>{
  return[
    {
      title:'委托人名称',
      key:'actions',
      render(row){
        return h(
            NText,
            {
            },
            {default:()=>row.user.name}
        )
      }
    },
    {
      title: '性别',
      key: 'actions',
      render(row){
        return h(
            NText,{

            },
            {
              default:()=>row.user.gender
            }
        )
      }
    },
    {
      title: '委托地址',
      key: 'actions',
      render(row){
        return h(
            NText,
            {

            },
            {
              default:()=>row.location+row.community+row.building+"栋"+row.door+"房"
            }
        )
      }
    },
    {
      title: '联系电话',
      key: 'demandPhone'

    },
    {
      title: '初步审核',
      key: 'actions',
      render(row){
        return h(
            NButton,{
              size:'tiny',
              type:'primary',
              onClick:()=>examine(row)
            },
            {
              default:()=>"初步审核"
            }
        )
      }

    },
    {
      title: '删除',
      key: 'actions',
      render(row){
        return h(
            NButton,{
              size:'tiny',
              type:'error'
            },
            {
              default:()=>"删除"
            }
        )
      }
    }
  ]
}
export default {
  name: "Customer",
  setup(){
    const  data=ref([])
    const router=useRouter()
    function getAll(){
      getRequest('/rent/findAll').then(resp=>{
        data.value=resp.data
      })
    }
    onMounted(getAll)
    return{
      getAll,

      data,
      columns:createColumns(
          {
            examine(row){
              router.push({
                path:'/customer/examine',
                query:{
                  data:row.id
                }
              })
            }
          }
      )

    }
  }
}
</script>

<style scoped>

</style>
