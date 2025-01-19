<template>
  <el-button 
    type="warning" 
    text 
    :icon="RefreshLeft"
    @click="resetSettings" 
    :title="$t('buttons.resetDefault')">
    {{ $t('buttons.resetDefault') }}
  </el-button>
</template>

<script>
import { RefreshLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import db from '../services/db'

export default {
  name: 'ResetButton',
  data() {
    return {
      RefreshLeft
    }
  },
  methods: {
    resetSettings() {
      try {
        db.resetSettings()
        ElMessage.success(this.$t('common.success'))
        // 刷新页面以应用新设置
        window.location.reload()
      } catch (error) {
        ElMessage.error(this.$t('common.error') + ': ' + error.message)
      }
    }
  }
}
</script> 