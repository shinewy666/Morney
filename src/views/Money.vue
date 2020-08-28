<template>

        <Layout class-prefix='layout'>
            
            <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
            <Types :value.sync="record.type"/>
            <Notes field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
            <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
        </Layout>

</template>
<script lang="ts">
    import Vue from 'vue'
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Tags from '@/components/Money/Tags.vue';
    import { Component} from 'vue-property-decorator';
    import store from '../store/index2';

    // const version = store.localStorage.getItem('version') || '0'
    
    

    //     if(version === '0.0.1'){
    //         //数据库升级，数据迁移
    //         store.recordList.forEach(record=>{
    //             record.createdAt = new Date(2020,0,1)
    //         })
    //         window.localStorage.setItem('recordList',JSON.stringify(store.recordList))
    //     }
    
    // window.localStorage.setItem('version','0.0.2')//数据库版本

    type RecordItem = {
        tags: string[];
        notes: string;
        type: string;
        amount: number;
        createdAt?: Date; 
    }
    @Component({
        components:{Tags,Notes,Types,NumberPad},
    })
    export default class Money extends Vue{

        tags=store.tagList;
        recordList=store.recordList
        record: RecordItem={tags:[], notes:'',type:'-',amount:0}

        onUpdateTags(value: string[]){
            this.record.tags=value
        }
        onUpdateNotes(value: string){
            this.record.notes=value
            
        }
        // onUpdateType(value: string){
        //     this.record.type=value
            
        // }
        // onUpdateAmount(value: string){
        //     this.record.amount=parseFloat(value)
            
        // }
        saveRecord(){
            store.createRecord(this.record)
        }
    }
</script>
<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>
