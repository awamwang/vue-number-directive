<template>
  <div>
    <el-row>
      <el-col :span="16">
        <!-- <p>使用Knobs功能可以修改当前的options</p> -->
        <p>在Controls Addon中可以查看支持的options，并且修改生效</p>
        <slot></slot>
      </el-col>
      <el-col :span="6">
        <p>Current Options</p>

        <el-table :data="myOptions" style="width: 100%">
          <el-table-column prop="key" label="OptionName" min-width="180"> </el-table-column>
          <el-table-column prop="value" label="OptionValue" min-width="180">
            <template v-slot="{ row }">
              {{ row.value }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Row, Col, Table, TableColumn } from 'element-ui'
import { action } from '@storybook/addon-actions'

export default {
  name: 'NumberDirectiveWrap',
  components: {
    elRow: Row,
    elCol: Col,
    elTable: Table,
    elTableColumn: TableColumn,
  },
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
    model: {
      type: String,
    },
    scope: {
      type: Object,
      default() {
        return {}
      },
    },

    integer: {
      type: Boolean,
      default: false,
    },
    'integer[Modifier]': {
      type: Boolean,
    },
    'int[Modifier]': {
      type: Boolean,
    },
    positive: {
      type: Boolean,
      default: false,
    },
    'positive[Modifier]': {
      type: Boolean,
    },
    'pos[Modifier]': {
      type: Boolean,
    },

    fixed: {
      type: Number,
      default: 2,
    },
    flag: {
      type: Boolean,
      default: true,
    },
    minimum: {
      type: [Number, String],
      default: Number.MIN_SAFE_INTEGER,
    },
    maximum: {
      type: [Number, String],
      default: Number.MAX_SAFE_INTEGER,
    },
    exclusiveMinimum: {
      type: Boolean,
      default: false,
    },
    exclusiveMaximum: {
      type: Boolean,
      default: false,
    },
    sep: {
      type: [Boolean, String],
      default: false,
    },
    schema: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      myOptions: null,
      parsedOptions: null,
    }
  },
  watch: {
    myOptions() {
      this.onOptions(this.parsedOptions)
    },
  },
  methods: {
    onOptions: action('options'),
  },
}
</script>

<style lang="scss" scoped></style>
