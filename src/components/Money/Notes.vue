<template>
    <div>
        <label class="notes">
            <span class="name">{{this.fieldName}}</span>
            <input type="text" :value="value" @input="onValueChange($event.target.value)" :placeholder="this.placeholder">
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop,Watch} from 'vue-property-decorator'
    
    @Component
    export default class Notes extends Vue{
        @Prop({default:''}) readonly value!: string

        @Prop({required:true}) fieldName!: string
        @Prop()placeholder?: string

        // @Watch('value')
        onValueChange(value: string){
            this.$emit('update:value',value)
        }
    }
</script>

<style lang="scss" scoped>
    .notes{
        font-size: 14px;
        display: block;
        padding-left:16px;
        display: flex;
        align-items: center;
        .name{
            padding-right: 16px;
        }
        input{
            height: 40px;
            flex-grow: 1;
            background:transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>