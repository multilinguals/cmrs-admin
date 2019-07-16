<template>
  <div class="bio-section">
    <div class="bio-section-header">
      <svg-icon :icon-class="icon"/>
      <span>{{ title }}</span>
    </div>
    <div class="bio-section-body">
      <template v-if="description">
        {{ description }}
      </template>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BioSection",
    props: {
      title: String,
      icon: String,
      description: String
    }
  }
</script>

<style scoped lang="scss">
  .bio-section {
    font-size: 14px;
    padding: 15px 0;

    .bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
</style>
