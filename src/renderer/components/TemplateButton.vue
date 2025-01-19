<template>
  <el-button 
    type="primary" 
    text 
    :icon="Document"
    @click="goToTemplates" 
    :title="$t('buttons.template')">
    {{ $t('buttons.template') }}
  </el-button>
</template>

<script>
import { Document } from '@element-plus/icons-vue'

export default {
  name: 'TemplateButton',
  data() {
    return {
      Document
    }
  },
  methods: {
    goToTemplates() {
      this.$router.push('/my-templates');
    }
  }
}
</script>
