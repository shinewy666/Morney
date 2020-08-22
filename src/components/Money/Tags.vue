<template>
    <div class="tags"> 
        <ul class="current">
            <li v-for="tag in dataSource" :key="tag"
            :class="{selected:selectedTags.indexOf(tag)>=0}" 
            @click="toggle(tag)">{{tag}}</li>
        </ul>
        <div class="new">
            <button @click="create">新增标签</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'
@Component
    export default class Tags extends Vue{
        @Prop() readonly dataSource: string[] | undefined;
        //Prop告诉Vue,dataSource 不是 data 是 prop
        //String 告诉 Vue xxx 运行时是个 String 
        //dataSource 属性名
        //string | undefined 告诉 TS xxx 的编译时类型
        selectedTags: string[] = [];

        toggle(tag: string){
            const index = this.selectedTags.indexOf(tag)
            if(index>=0){
                this.selectedTags.splice(index,1)
            }else{
                this.selectedTags.push(tag);
            }
            this.$emit('update:value',this.selectedTags)
        }
        create(){
            const name = window.prompt('请输入标签名');
            if(name==''){
                window.alert('标签名不能为空')
            }else if(this.dataSource){
                    this.$emit('update:dataSource',[...this.dataSource,name])
                }
            
        }
    }
</script>

<style lang="scss" scoped>
    .tags{
        font-size: 14px;
        padding: 16px;
        > .current {
            display: flex;
            > li{
                $bg:#d9d9d9;
                background: $bg;
                height: 24px;
                line-height: 24px;
                border-radius: (24px/2);
                padding: 0 16px;
                margin-right: 12px;
                &.selected{
                    background: darken($bg,50%);
                    color: white;
                }
            }
        }
        > .new{
            padding-top:16px;
            button{
                background: transparent;
                border: none;
                color: #999;
                border-bottom: 2px solid;
            }
        }
    }
</style>