<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs class-prefix="interval" :data-source="intervaList" :value.sync="interval" />
    <div>
      type:{{type}}
      <br />
      interval:{{interval}}
    </div>
    <div>
      <ol>
        <li v-for="(group,index) in result" :key="index">
          <h3>{{group.title}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id">
              {{item.amount}} {{item.createdAt}}
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>
<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "../components/Tabs.vue";
import intervaList from "../constant/interval";
import recordTypeList from '../constant/recordTypeList';

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get result(){
    const {recordList} = this
    type HashTableValue = {title: string;items: RecordItem[]}
    const hashTable: {[key: string]: HashTableValue}={}
    for(let i = 0; i<recordList.length; i++){
      const [date,time] = recordList[i].createdAt!.split('T')
      console.log(date);
      hashTable[date] = hashTable[date] || {title:date,items:[]}
      hashTable[date].items.push(recordList[i])

    }
    return hashTable
  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
  type = "-";
  interval = "day";
  intervaList = intervaList;
  recordTypeList = recordTypeList;
}
</script>
<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item{
  height: 48px;
}
</style>