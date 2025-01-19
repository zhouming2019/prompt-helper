<template>
  <el-button 
    type="primary" 
    text 
    :icon="icon" 
    @click="goToEditor" 
    :title="$t('buttons.create')">
    {{ $t('buttons.create') }}
  </el-button>
</template>

<script>
export default {
  name: 'EditorButton',
  props: {
    icon: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    goToEditor() {
      this.$router.push('/editor');
    }
  }
}
</script>
