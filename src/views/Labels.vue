<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="creatTag-wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>
<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";


@Component({
  components:{Button},
  computed:{
    tags(){
      return this.$store.state.tagList
    }
  }
})
export default class Labels extends Vue {
  beforeCreate(){
    this.$store.commit('fetchTags')
  }
  createTag() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    }
    this.$store.commit('createTag',name)
  }
}
</script>
<style lang="scss" scoped>
.tags {
  background: white;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
  }
}
.creatTag {
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