<template>
  <div>
    <el-row>
      <el-col :span="16">
        <slot ></slot>
      </el-col>
      <el-col :span="6">
        <p>Current Options</p>

        <el-table :data="myOptions" style="width: 100%">
          <el-table-column prop="key" label="OptionName" min-width="180">
          </el-table-column>
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
import { boolean, text } from '@storybook/addon-knobs'

export default {
  name: 'NumberDirectiveWrap',
  components: {
    elRow: Row,
    elCol: Col,
    elTable: Table,
    elTableColumn: TableColumn
  },
  props: {
    debug: {
      type: Boolean
    },
    model: {
      type: String
    },
    scope: {
      type: Object
    },

    integer: {
      type: Boolean
    },
    integerModifier: {
      type: Boolean
    },
    intModifier: {
      type: Boolean
    },
    positive: {
      type: Boolean
    },
    positiveModifier: {
      type: Boolean
    },
    posModifier: {
      type: Boolean
    },

    sientific: {
      type: Boolean
    },
    fixed: {
      type: Number
    },
    flag: {
      type: Boolean
    },
    minimum: {
      type: Number | String,
      default: Number.MIN_SAFE_INTEGER
    },
    maximum: {
      type: Number | String,
      default: Number.MAX_SAFE_INTEGER
    },
    // exclusiveMinimum,
    // exclusiveMaximum,
    sep: {
      type: Boolean | String
    }
  },
  data() {
    return {
      myOptions: null,
      parsedOptions: null
    }
  },
  watch: {
    myOptions() {
      this.onOptions(this.parsedOptions)
    }
  },
  methods: {
    onOptions: action('options')
  }
}
</script>

<style lang="scss" scoped>
</style>