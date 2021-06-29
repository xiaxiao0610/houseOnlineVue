<template>
  <n-space vertical>
    <n-space>
      <n-space><n-switch v-model:value="leafOnly" />Leaf Only</n-space>
      <n-space><n-switch v-model:value="cascade" />Cascade</n-space>
      <n-space><n-switch v-model:value="showPath" />Show Path</n-space>
      <n-space><n-switch v-model:value="hoverTrigger" />Hover Trigger</n-space>
      <n-space><n-switch v-model:value="filterable" />Filterable</n-space>
      <n-space
      ><n-switch v-model:value="responsiveMaxTagCount" />Responsive
        MaxTagCount</n-space
      >
    </n-space>
    <n-cascader
        v-model:value="value"
        multiple
        clearable
        placeholder="没啥用的值"
        :max-tag-count="responsiveMaxTagCount ? 'responsive' : undefined"
        :expand-trigger="hoverTrigger ? 'hover' : 'click'"
        :options="options"
        :cascade="cascade"
        :leaf-only="leafOnly"
        :show-path="showPath"
        :filterable="filterable"
    />
  </n-space>
</template>

<script>



export default {
  setup(){
    return{
      options:[
          {
            "id": 1,
            "name": "所有",
            "label": "所有",
            "value": 1,
            "children": [
              {
                "id": 2,
                "name": "角色权限管理",
                "label": "角色权限管理",
                "value": 2,
                "children": [
                  {
                    "id": 7,
                    "name": "角色基本资料",
                    "label": "角色基本资料",
                    "value": 7
                  },
                  {
                    "id": 8,
                    "name": "角色高级资料",
                    "label": "角色高级资料",
                    "value": 8
                  }
                ]
              },
              {
                "id": 3,
                "name": "用户管理",
                "label": "用户管理",
                "value": 3,
                "children": [
                  {
                    "id": 9,
                    "name": "用户资料",
                    "label": "用户资料",
                    "value": 9
                  },
                  {
                    "id": 10,
                    "name": "用户留言",
                    "label": "用户留言",
                    "value": 10
                  },
                  {
                    "id": 11,
                    "name": "员工培训",
                    "label": "员工培训",
                    "value": 11
                  },
                  {
                    "id": 12,
                    "name": "员工调薪",
                    "label": "员工调薪",
                    "value": 12
                  },
                  {
                    "id": 13,
                    "name": "员工调动",
                    "label": "员工调动",
                    "value": 13
                  }
                ]
              },
              {
                "id": 4,
                "name": "经纪人中心",
                "label": "经纪人中心",
                "value": 4,
                "children": [
                  {
                    "id": 14,
                    "name": "工资账套管理",
                    "label": "工资账套管理",
                    "value": 14
                  },
                  {
                    "id": 15,
                    "name": "员工账套设置",
                    "label": "员工账套设置",
                    "value": 15
                  },
                  {
                    "id": 16,
                    "name": "工资表管理",
                    "label": "工资表管理",
                    "value": 16
                  },
                  {
                    "id": 17,
                    "name": "月末处理",
                    "label": "月末处理",
                    "value": 17
                  },
                  {
                    "id": 18,
                    "name": "工资表查询",
                    "label": "工资表查询",
                    "value": 18
                  }
                ]
              },
              {
                "id": 5,
                "name": "客户中心",
                "label": "客户中心",
                "value": 5,
                "children": [
                  {
                    "id": 19,
                    "name": "综合信息统计",
                    "label": "综合信息统计",
                    "value": 19
                  },
                  {
                    "id": 20,
                    "name": "员工积分统计",
                    "label": "员工积分统计",
                    "value": 20
                  },
                  {
                    "id": 21,
                    "name": "人事信息统计",
                    "label": "人事信息统计",
                    "value": 21
                  },
                  {
                    "id": 22,
                    "name": "人事记录统计",
                    "label": "人事记录统计",
                    "value": 22
                  }
                ]
              },
              {
                "id": 6,
                "name": "系统管理",
                "label": "系统管理",
                "value": 6,
                "children": [
                  {
                    "id": 23,
                    "name": "基础信息设置",
                    "label": "基础信息设置",
                    "value": 23
                  },
                  {
                    "id": 24,
                    "name": "系统管理",
                    "label": "系统管理",
                    "value": 24
                  },
                  {
                    "id": 25,
                    "name": "操作日志管理",
                    "label": "操作日志管理",
                    "value": 25
                  },
                  {
                    "id": 26,
                    "name": "操作员管理",
                    "label": "操作员管理",
                    "value": 26
                  },
                  {
                    "id": 27,
                    "name": "备份恢复数据库",
                    "label": "备份恢复数据库",
                    "value": 27
                  },
                  {
                    "id": 28,
                    "name": "初始化数据库",
                    "label": "初始化数据库",
                    "value": 28
                  }
                ]
              }
            ]
          }
          ]
    }
  }

  // data () {
  //   return {
  //     leafOnly: true,
  //     cascade: true,
  //     showPath: true,
  //     hoverTrigger: false,
  //     value: null,
  //     filterable: false,
  //     responsiveMaxTagCount: true,
  //     options: [{"id":1,"name":"所有","label":"所有","value":1,"children":[{"id":2,"name":"角色权限管理","label":"角色权限管理","value":2,"children":[{"id":7,"name":"角色基本资料","label":"角色基本资料","value":7},{"id":8,"name":"角色高级资料","label":"角色高级资料","value":8}]},{"id":3,"name":"用户管理","label":"用户管理","value":3,"children":[{"id":9,"name":"用户资料","label":"用户资料","value":9},{"id":10,"name":"用户留言","label":"用户留言","value":10},{"id":11,"name":"员工培训","label":"员工培训","value":11},{"id":12,"name":"员工调薪","label":"员工调薪","value":12},{"id":13,"name":"员工调动","label":"员工调动","value":13}]},{"id":4,"name":"经纪人中心","label":"经纪人中心","value":4,"children":[{"id":14,"name":"工资账套管理","label":"工资账套管理","value":14},{"id":15,"name":"员工账套设置","label":"员工账套设置","value":15},{"id":16,"name":"工资表管理","label":"工资表管理","value":16},{"id":17,"name":"月末处理","label":"月末处理","value":17},{"id":18,"name":"工资表查询","label":"工资表查询","value":18}]},{"id":5,"name":"客户中心","label":"客户中心","value":5,"children":[{"id":19,"name":"综合信息统计","label":"综合信息统计","value":19},{"id":20,"name":"员工积分统计","label":"员工积分统计","value":20},{"id":21,"name":"人事信息统计","label":"人事信息统计","value":21},{"id":22,"name":"人事记录统计","label":"人事记录统计","value":22}]},{"id":6,"name":"系统管理","label":"系统管理","value":6,"children":[{"id":23,"name":"基础信息设置","label":"基础信息设置","value":23},{"id":24,"name":"系统管理","label":"系统管理","value":24},{"id":25,"name":"操作日志管理","label":"操作日志管理","value":25},{"id":26,"name":"操作员管理","label":"操作员管理","value":26},{"id":27,"name":"备份恢复数据库","label":"备份恢复数据库","value":27},{"id":28,"name":"初始化数据库","label":"初始化数据库","value":28}]}]}]
  //   }
  // }
}
</script>
