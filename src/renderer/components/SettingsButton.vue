<template>
  <el-button 
    type="primary" 
    text 
    :icon="Setting" 
    @click="goToSettings" 
    :title="$t('buttons.settings')">
    {{ $t('buttons.settings') }}
  </el-button>
</template>

<script>
import { Setting } from '@element-plus/icons-vue'

export default {
  name: 'SettingsButton',
  data() {
    return {
      Setting
    }
  },
  methods: {
    goToSettings() {
      this.$router.push('/settings');
    }
  }
}
</script>
