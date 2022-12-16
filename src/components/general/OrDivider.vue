<template>
  <div class="divider">
    <div class="line"></div>
    <div class="word">{{translate('OrLabel')}}</div>
    <div class="line"></div>
  </div>
</template>
<style scoped>
  .divider
  {
    display: flex;
    align-items: center;
    margin: auto;
    padding: 16px;
  }
  .line
  {
    flex:1;
    height:1px;
    background-color:#ccc;
  }
  .word
  {
    padding-left: 20px;
    padding-right: 20px;
  }
</style>
