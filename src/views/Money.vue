<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <Notes
      field-name="备注"
      placeholder="在这里输入备注"
      :value="record.notes"
      @update:value="onUpdateNotes"
    />
    <Tags @update:value="record.tags = $event" />
  </Layout>
</template>
<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Component } from "vue-property-decorator";
import store from "../store/index";
import recordTypeList from "../constant/recordTypeList";
import Tabs from "../components/Tabs.vue";

type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};
@Component({
  components: { Tags, Notes, NumberPad, Tabs },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };

  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length == 0) {
      return window.alert("请至少选择一个标签");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError == null) {
      window.alert("已保存");
      this.record.notes = ''
    }
  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
