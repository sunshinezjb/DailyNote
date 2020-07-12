链接：https://www.cnblogs.com/raind/p/10620454.html

vuedraggable(vue2.0)组件详解
github地址

安装
yarn add vuedraggable

npm i -S vuedraggable
使用方式
通常
<draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
   <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
</draggable>

 import draggable from 'vuedraggable'
  ...
  export default {
        components: {
            draggable,
        },
  ...
使用过渡transition-group
<draggable v-model="myArray">
    <transition-group>
        <div v-for="element in myArray" :key="element.id">
            {{element.name}}
        </div>
    </transition-group>
</draggable>
使用footer slot
<draggable v-model="myArray" draggable=".item">
    <div v-for="element in myArray" :key="element.id" class="item">
        {{element.name}}
    </div>
    <button slot="footer" @click="addPeople">Add</button>
</draggable>
使用header slot
<draggable v-model="myArray" draggable=".item'">
    <div v-for="element in myArray" :key="element.id" class="item">
        {{element.name}}
    </div>
    <button slot="header" @click="addPeople">Add</button>
</draggable>
使用vuex
<draggable v-model='myList'>

computed: {
    myList: {
        get() {
            return this.$store.state.myList
        },
        set(value) {
            this.$store.commit('updateList', value)
        }
    }
}
props
value
类型：数组，
必需：否，
默认值：null

通常与内部元素v-for指令引用的数组相同,该组件的首先使用方法，与vuex兼容，也可使用v-model

list
类型：数组，
必需：否，
默认值：null

除了上面的 value prop之外，list是一个要与拖放同步的数组。
主要的区别是list prop是由使用splice方法的draggable组件更新的，而value是不可变的,两者不能一起使用
tag
类型：字符串
默认值：div

可拖动组件创建的元素的HTML节点类型，作为包含插槽的外部元素
还可以将vue组件的名称作为元素传递。在本例中，draggable属性将传递给创建的组件
clone
类型：function
默认值：(original) => { return original;}


当克隆选项为真时，调用源组件上的函数来克隆元素。
惟一的参数是要克隆的viewModel元素，返回的值是它的克隆版本。
在默认情况下vue.draggable重用viewModel元素，所以如果您想克隆或深度克隆它，就必须使用这个钩子。
move
类型：函数

如果不为空，这个函数将以类似于Sortable onMove回调的方式调用。返回false将取消拖动操作

function onMoveCallback(evt, originalEvent){
   ...
    // return false; — for cancel
}

<draggable :list="list" :move="checkMove">

checkMove: function(evt){
    return (evt.draggedContext.element.name!=='apple');
}



componentData
类型：Object

该props是用于传递额外的信息到子组件

props：要在子组件中传递的props
attrs：要在子组件中传递的attrs
on：要在子组件中订阅的事件


<draggable tag="el-collapse" :list="list" :component-data="getComponentData()">
    <el-collapse-item v-for="e in list" :title="e.title" :name="e.name" :key="e.name">
        <div>{{e.description}}</div>
     </el-collapse-item>
</draggable>

methods: {
    handleChange() {
      console.log('changed');
    },
    inputChanged(value) {
      this.activeNames = value;
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        attrs:{
          wrap: true
        },
        props: {
          value: this.activeNames
        }
      };
    }
  }
Events
包括start, add, remove, update, end, choose, sort, filter, clone这些事件
当list不为空且相应数组由于拖放操作而更改时，将触发事件

<draggable :list="list" @end="onEnd">