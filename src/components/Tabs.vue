<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
    :class="{[classPrefix+'-tabs-item']:classPrefix,selected:item.value==value}"
    @click="select(item)">{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: { text: string; value: string }[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  select(item: {text: string;value: string}){
      this.$emit('update:value',item.value)
  }
}
</script>

<style lang="scss" scoped>
    .tabs{             
        background: #c4c4c4;
        display: flex;
        text-align: center; 
        font-size: 24px;
        >li{
            position: relative;
            width: 50%;
            line-height: 64px;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            &.selected::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
</style>