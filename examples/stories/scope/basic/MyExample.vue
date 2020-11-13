<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
      <template v-slot="{ row }">
        <el-input
          v-model="row.age"
          v-number="{
            ...options,
            scope: { row },
          }"
          @focus="onFocus"
        ></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
import { Input, Table, TableColumn } from 'element-ui'

export default {
  name: 'MyExample',
  components: { elInput: Input, elTable: Table, elTableColumn: TableColumn },
  data() {
    return {
      input1: '123',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          age: 12,
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          age: 11,
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          age: 23,
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          age: 12,
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    }
  },
  methods: {},
}
</script>
