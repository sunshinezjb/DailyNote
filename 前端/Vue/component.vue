内置组件component的用法
<component></component>标签是Vue框架自定义的标签，它的用途就是可以动态绑定我们的组件，根据数据的不同更换不同的组件
先看一下vue.js官网的用法：


也就是说component通过属性is的值可以渲染不同的组件。

看一下实际开发中的用法：

其中adminDashboard，editorDashboard是两个不同的组件 ，这是一个具有权限功能系统的部分代码，admin用户和editor用户看到的页面是两个页面（也就是两个组件，adminDashboard，editorDashboard）


<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>
  
  <script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data () {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created () {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
 </script>




<template>
  <div id="app">
    <component :is="key"></component>
  </div>
</template>
 <script>
var componentA = {
  template: `<div style="color:red">我是A组件</div>`
};

var componentB = {
  template: `<div style="color:blank">我是B组件</div>`
};

var componentC = {
  template: `<div style="color:pink">我是C组件</div>`
};
export default {
  name: "component",
  data () {
    return {
      key: "comC"
    };
  },
  methods: {
  },
  components: {
    comA: componentA,
    comB: componentB,
    comC: componentC
  }
};

</script>
 
