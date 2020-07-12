链接地址: https://www.cnblogs.com/whaleAlice/p/12488998.html


// 1.简单的拖动使用

<template>
  <div>
    <draggable @start="start"
               @end="end">
      <p v-for="d in list"
         :key="d.id">{{d.name}}</p>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data () {
    return {
      list: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ]
    }
  },
  methods: {
    start (e) {
      console.log(e)
    },
    end (e) {
      console.log(e)
    },
  }
}
</script>
　　

// 　　先引用安装好的vuedraggable插件，然后引入到该组件，即可使用draggable标签，那么该标签下的p标签就可以进行拖动排序。

// 　　其中的start,end事件是拖动开始和结束事件，需要注意一下几个字段，表示的是拖动开始的下标和结束的下标位置。

// 　　可以利用其改动的下标进行排序

// 　　

 

 

//  2.固定其他位，进行某一位排序
// 　　在我的工作中需要进行某一位进行拖动排序，而其他不动，代码如下：


<template>
  <div style="border: 1px solid #e8e8e8;width: 300px;">
    <draggable v-model="reportList"
               @end="endEvent"
               v-bind="dragOptions">
      <p v-for="r in reportList"
         :key="r.id"
         :class="r.active ? 'active' : 'disabled'">{{r.name}}</p>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable"
export default {
  components: {
    draggable
  },
  data () {
    return {
      dragOptions: {
        animation: 500,
        filter: '.disabled'
      },
      reportList: [
        { id: 1, name: 'javascript', active: true },
        { id: 2, active: false, name: 'css' },
        { id: 3, active: false, name: 'typescript' },
        { id: 4, active: false, name: 'vue.js' },
        { id: 5, active: false, name: 'nodejs' }
      ]
    }
  },
  methods: {
    endEvent () {
      console.log(this.reportList) // 自动更新reportList
    }
  }
}
</script>
// 　　实现效果如下：

// 　　

 

 

//  　　此时，只有javascript那一栏可以拖动，其他栏为禁止状态，由dragOption中的filter实现过滤，并添加动画效果

// 　　同时我还发现，其拖动结束后打印的list，竟然是排序后的结果，这样真的很方便

// 　3.复制拖动
// 　　

 

// 　　初始状态如上所示，我现在需要的是将左侧按钮内容拖动到右侧，且左侧依旧存在。代码如下：

 

<template>
  <div style="height: 1000px;">
    <div style="float:left;width: 300px;">
      <!-- 左侧按钮 -->
      <draggable v-model="list1"
                 draggable=".c-item"
                 v-bind="dragOptions"
                 :options="{sort: false, group: {name: 'field', pull:'clone',put: false}}">
        <div v-for="d in list1"
             :key="d.id"
             class="item c-item">{{d.name}}</div>
      </draggable>
    </div>
    <div style="float:right;width: 300px;">
      <!-- 右侧按钮 -->
      <draggable group="field"
                 :list="list2"
                 v-bind="dragOptions"
                 @change="toChange">
        <div v-for="d in list2"
             :key="d.id"
             class="item">{{d.name}}</div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data () {
    return {
      dragOptions: { animation: 500 },
      list1: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    };
  },
  methods: {
    toChange (e) {      <br>　　　　　console.log(e)
        if (e.added) {
        console.log(this.list2)
      }
 
    }
                                  }
                                };
</script>
// 　　　　左侧的draggable标签添加了options配置项，

// 　　　　　　sort:false  表示拖动时禁止其进行排序操作

// 　　　　　　group: {name: 'field', pull: 'clone', put: false}  表示进行克隆拖动操作，并且该name和拖动的目标位置group名称一致，如右侧draggable标签的group同样为field

// 　　　　       draggable=".item"   将可拖动属性下放到每一个按钮下

// 　　　　右侧接收的draggable标签添加标识：group=“field”，同时含有change事件，可以返回添加各种事件，有兴趣的可以查看官网。我这边是添加事件

// 　　　　如下图所示，拖动后返回add事件，并且打印的list 是排好序的list

　　　