<template>
  <button class="button" @click="$emit('click',$event)">
      <slot/>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.button {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  padding: 10px 16px;
  &-wrapper {
    text-align: center;
    margin-top: 44px;
  }
}
</style>