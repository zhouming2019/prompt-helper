<template>
    <div class="variable-editor">
      <el-form :model="variable" label-width="100px">
        <el-form-item label="变量名称">
          <el-input v-model="variable.name" placeholder="请输入变量名称"></el-input>
        </el-form-item>
        <el-form-item label="变量类型">
          <el-select v-model="variable.type" placeholder="请选择变量类型">
            <el-option label="文本" value="text"></el-option>
            <el-option label="选择" value="select"></el-option>
            <el-option label="数字" value="number"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="variable.type === 'select'" label="选项列表">
          <el-input v-model="variable.options" placeholder="请输入选项，用逗号分隔"></el-input>
        </el-form-item>
        <el-form-item label="建议值">
          <el-input v-model="variable.suggestions" placeholder="请输入建议值，用逗号分隔"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VariableEditor',
    data() {
      return {
        variable: {
          name: '',
          type: 'text',
          options: '',
          suggestions: ''
        }
      };
    },
    methods: {
      submit() {
        const formattedVariable = {
          name: this.variable.name,
          type: this.variable.type,
          options: this.variable.type === 'select' ? this.variable.options.split(',') : [],
          suggestions: this.variable.suggestions.split(',')
        };
        this.$emit('submit', formattedVariable);
      }
    }
  };
  </script>
  
  <style scoped>
  .variable-editor {
    padding: 20px;
  }
  </style>