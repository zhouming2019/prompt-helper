<template>
    <!-- 变量关键词组件 -->
    <span 
      class="variable-keyword"
      @click="showPopover = true"
    >{{ variable.name }}测试文本
      <!-- 暂时注释掉变量设置弹出框相关代码
      <el-popover
        v-model:visible="showPopover" 
        :width="300"
        trigger="click"
        placement="bottom"
        popper-class="variable-popover"
      >
        <template #reference>
          <span class="keyword-text" :class="{ 'is-empty': !modelValue }">
            {{ displayValue }}
          </span>
        </template>
  
        <div class="variable-setter">
          <div class="setter-header">
            <span class="variable-name">{{ variable.name }}</span>
            <el-tag size="small" :type="getTagType">{{ getTypeName }}</el-tag>
          </div>
  
          <el-input
            v-if="variable.type === 'text'"
            v-model="inputValue"
            :placeholder="`请输入${variable.name}`"
            clearable
          />
  
          <el-select
            v-else-if="variable.type === 'select'"
            v-model="inputValue"
            :placeholder="`请选择${variable.name}`"
            style="width: 100%"
          >
            <el-option
              v-for="option in variable.options"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
  
          <el-input-number
            v-else-if="variable.type === 'number'"
            v-model="inputValue"
            :placeholder="`请输入${variable.name}`"
            style="width: 100%"
            :min="1"
            :max="99999"
          />
  
          <div v-if="variable.suggestions?.length" class="suggestions">
            <div class="suggestions-title">建议值：</div>
            <div class="suggestions-list">
              <el-tag
                v-for="suggestion in variable.suggestions"
                :key="suggestion"
                class="suggestion-item"
                @click="selectSuggestion(suggestion)"
                size="small"
                effect="plain"
              >
                {{ suggestion }}
              </el-tag>
            </div>
          </div>
  
          <div class="setter-actions">
            <el-button size="small" @click="showPopover = false">取消</el-button>
            <el-button size="small" type="primary" @click="confirmValue">确定</el-button>
          </div>
        </div>
      </el-popover>
      -->
    </span>
  </template>
  
  <script>
  export default {
    // 组件名称
    name: 'VariableKeyword',
    
    // 组件属性定义
    props: {
      // 变量对象,包含变量的所有信息
      variable: {
        type: Object,
        required: true
      },
      // 变量值,支持字符串或数字类型
      modelValue: {
        type: [String, Number],
        default: ''
      }
    },
    
    // 组件事件
    emits: ['update:modelValue'],
    
    // 组件数据
    data() {
      return {
        // 控制弹出框显示状态
        showPopover: false,
        // 输入框的值
        inputValue: this.modelValue
      }
    },
    
    // 计算属性
    computed: {
      // 显示的变量值,如果没有值则显示变量名
      displayValue() {
        return this.modelValue || `{${this.variable.name}}`
      },
      
      // 获取变量类型的中文名称
      getTypeName() {
        const typeMap = {
          text: '文本',
          select: '选择',
          number: '数字'
        }
        return typeMap[this.variable.type] || this.variable.type
      },
      
      // 获取变量类型对应的标签样式
      getTagType() {
        const typeMap = {
          text: '',
          select: 'success',
          number: 'warning'
        }
        return typeMap[this.variable.type] || ''
      }
    },
    
    // 监听属性变化
    watch: {
      // 监听modelValue变化,同步更新输入值
      modelValue: {
        immediate: true,
        handler(val) {
          this.inputValue = val
        }
      }
    },
    
    // 组件方法
    methods: {
      // 选择建议值
      selectSuggestion(value) {
        this.inputValue = value
      },
      
      // 确认变量值
      confirmValue() {
        this.$emit('update:modelValue', this.inputValue)
        this.showPopover = false
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  // 变量关键词样式
  .variable-keyword {
    display: inline-block;
    cursor: pointer;
    color: #ee3838;
    // 关键词文本样式
    .keyword-text {
      display: inline-block;
      padding: 0 4px;
      background-color: #e6f4ff;
      border-radius: 2px;
      color: #409eff;
      font-size: 14px;
      line-height: 1.4;
      transition: all 0.3s;
  
      // 空值状态样式
      &.is-empty {
        background-color: #f4f4f5;
        color: #909399;
      }
  
      // 悬停效果
      &:hover {
        background-color: #d9ecff;
      }
    }
  }
  
  // 变量设置器样式
  .variable-setter {
    padding: 8px;
  
    // 设置器头部样式
    .setter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
  
      // 变量名称样式
      .variable-name {
        font-size: 14px;
        font-weight: 500;
        color: #303133;
      }
    }
  
    // 建议值区域样式
    .suggestions {
      margin-top: 12px;
  
      // 建议值标题
      .suggestions-title {
        font-size: 12px;
        color: #909399;
        margin-bottom: 8px;
      }
  
      // 建议值列表
      .suggestions-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
  
        // 建议值项
        .suggestion-item {
          cursor: pointer;
          transition: all 0.3s;
  
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  
    // 操作按钮区域样式
    .setter-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--el-border-color-lighter);
    }
  }
  
  // 弹出框样式
  :deep(.variable-popover) {
    padding: 12px;
  }
  </style>