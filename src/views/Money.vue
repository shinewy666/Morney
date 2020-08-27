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
    import recordListModel from '@/components/models/recordListModel'
    

    const version = window.localStorage.getItem('version') || '0'
    
    

        if(version === '0.0.1'){
            //数据库升级，数据迁移
            window.recordList.forEach(record=>{
                record.createdAt = new Date(2020,0,1)
            })
            window.localStorage.setItem('recordList',JSON.stringify(window.recordList))
        }
    
    window.localStorage.setItem('version','0.0.2')//数据库版本

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

        tags=window.tagList;
        recordList=window.recordList
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
            window.createRecord(this.record)
        }
    }
</script>
<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>
