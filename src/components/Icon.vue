<template>
    <div>
    <svg class="icon" @click="$emit('click',$event)">
      <use :xlink:href="'#'+name"/>
    </svg>  
    </div>
</template>

<script lang="ts">
  const importAll = (requireContext: __WebpackModuleApi.RequireContext)=>requireContext.keys().forEach(requireContext);
  try{
    importAll(require.context('../assets/icons',true,/\.svg$/));
  }catch(error){
    console.log(error);
  }
    export default {
        props:['name'],
        name:'Icon'
    }
</script>

<style lang="scss" scoped>
    .icon{
        width: 1.2em;
        height: 1.2em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>