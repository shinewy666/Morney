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
    import { Component, Watch } from 'vue-property-decorator';
    import recordListModel from '@/components/models/recordListModel'
    import tagListModel from '@/components/models/tagListModel'
    

    const version = window.localStorage.getItem('version') || '0'
    const recordList = recordListModel.fetch()
    const tagList = tagListModel.fetch()

        if(version === '0.0.1'){
            //数据库升级，数据迁移
            recordList.forEach(record=>{
                record.createdAt = new Date(2020,0,1)
            })
            window.localStorage.setItem('recordList',JSON.stringify(recordList))
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

        tags=tagList;
        recordList: RecordItem[]=recordList
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
            const record2: RecordItem = recordListModel.clone(this.record)
            record2.createdAt = new Date()
            this.recordList.push(record2)
        }
        @Watch('recordList')
        onRecordListChange(){
           recordListModel.save(this.recordList)
        }

    }
</script>
<style lang="scss">
    .layout-content{
        display: flex;
        flex-direction: column-reverse;
    }
</style>
<style lang="scss" scoped>




</style>
