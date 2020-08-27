type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date; 
}
type Tag = {
    id: string;
    name: string;
  }
  type TagListModel={
    update: (id: string,name: string) => 'success'|'not found'|'duplicated';
  }
  interface Window {
    tagList: Tag[];
    createTag: (name: string) => void;
    findTag: (id: string) => Tag | undefined;
    removeTag: (id: string) => boolean;
    updateTag: TagListModel['update'];//(id:string,name:string)=>'success' | 'not found' | 'duplicated'
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
  }  