<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'electronvue'
  }
</script>

<style>
  /* CSS */
  #app{
    position: relative;
    height: 100%;
    border:1px solid #A06E50;
    box-sizing: border-box;
    border-radius:3px;
    /* width: 560px;
    height: 548px; */
    /* position: relative;
    background:rgba(255, 255, 255, 1);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
    ;
    margin: 10px auto; */
    /* padding: 10px */
  }
  input,
  button,
  textarea {
    -webkit-app-region: no-drag;
  }
  .titlebar {
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
</style>
