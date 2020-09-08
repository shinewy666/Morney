<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{selected:selectedTags.indexOf(tag)>=0}"
        @click="toggle(tag)"
      >{{tag.name}}</li>
    </ul>
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mixins } from 'vue-class-component';
import { Component, Prop } from "vue-property-decorator";
import TagHelper from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins (TagHelper){
  get tagList(){
    return this.$store.state.tagList
  }
  selectedTags: string[] = [];
  created(){
    this.$store.commit('fetchTags')
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }

}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  > .current {
    display: flex;
    > li {
      $bg: #d9d9d9;
      background: $bg;
      height: 24px;
      line-height: 24px;
      border-radius: (24px/2);
      padding: 0 16px;
      margin-right: 12px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 2px solid;
    }
  }
}
</style>