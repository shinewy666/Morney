import Icon from '@/components/Icon.vue';
import Labels from '@/views/Labels.vue';
<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in tags" :key="tag.id">
        <span>{{tag.name}}</span>
        <Icon name="right" />
      </li>
    </ol>
    <div class="creatTag-wrapper">
      <button class="creatTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import tagListModel from '@/components/models/tagListModel';



tagListModel.fetch()
@Component
export default class Labels extends Vue{
  tags = tagListModel.data
  createTag(){
      const name = window.prompt('请输入标签名')
      if(name){
          const message = tagListModel.create(name)
          if(message === 'duplicated'){
              window.alert('标签名重复')
          }else if(message === 'success'){
              window.alert('新增标签成功')
          }
      }
  }
}

</script>
<style lang="scss" scoped>
.tags {
  background: white;
  padding-left: 16px;
  > li {
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