vuedraggable快速入门

    // 最近看了下vuedraggable，就是在vue中的拖放插件，插件的github介绍地址： vuedraggable介绍，插件的所有演示demo: vuedraggable演示地址，插件比较好用，但是配置的参数有点多，这里大致讲下常用的参数。

    // value和list
    // 这两个都可以给一个draggable注入数据源：

    /*value注入数据源*/
    < draggable v - model="list" ></draggable >
export default {
    data () {
        return {
            list: [{
                name: 'aaa', id: 1,
            }, {
                name: 'bbb', id: 2,
            }]
        };
    }
}
    /*list注入数据源头*/
    < draggable : list = "list" ></draggable >
export default {
    data () {
        return {
            list: [{
                name: 'aaa', id: 1,
            }, {
                name: 'bbb', id: 2,
            }]
        };
    }
}

// 它们的区别是：value注入的，如果发生了拖拽，value的数据并不会跟着变化，list注入的，则会发生变化。

// 也就是说value注入的，后续有无变化都和数据体没关系，它用于只需要展示拖拽效果的地方；list注入的，数据体和当前页面上的属性是保持一致的，页面上的顺序变了，内部数组对应的结构体数组的顺序也会重新排列，和显示保持一致。

// 注意，它们不能同时出现，只能二选一。

// ghost-class和handle
// ghost指的在拖拽体原本位置占坑的那个元素：



// ghost-class就是给占坑元素设置样式:

{/* <draggable ghost-class="ghost" > </draggable> */ }
<style scoped>
    .ghost {
        opacity: 0.5;
background: #c8ebfb;
}
</style>

// handle是拖拽的把手，表示拖拽元素指定可拖拽的部分：

// 正常情况下拖拽元素的整体都是可拖拽的，加了handle之后，只能指定的地方可以拖拽了，其他地方不能进行拖拽：

{/* <draggable tag="ul" :list="list" class="list-group" handle=".handle">
    <li class="list-group-item" v-for="(element, idx) in list" :key="element.name" >
        <i class="fa fa-align-justify handle"></i>
        <span class="text">{{ element.name }} </span>
        <input type="text" class="form-control" v-model="element.text" />
        <i class="fa fa-times close" @click="removeAt(idx)"></i>
    </li>
</draggable> */}

// tag和componentData
// 对于一些特定的原生组合标签，例如ul,li或者table,tr还有tr,td之类的，可以指定一个tag，让draggable替换成指定的标签：

{/* <draggable v-model="list" tag="tbody">
<tr v-for="item in list" :key="item.name">
    <td scope="row">{{ item.id }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.sport }}</td>
</tr>
</draggable> */}

// 例如上面的draggable就会被替换成table。

// componentData和tag类似，但是是对于那种组合组件的，例如在ElementUI中的折叠面边，el-collapse和el-collapse-item就是这种组合关系：

{/* <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
    </el-collapse-item>
    <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </el-collapse-item>
</el-collapse> */}

// 对于上面那种情况，如果要转成vuedraggable的话，首先要设置tag，但是那些el-collapse上的数据怎么办呢？就要通过component-data配置了：

<draggable tag="el-collapse" : list="list" : component-data="collapseComponentData" >
    <el-collapse-item v-for="item in list" :key="item.id" :title="item.title" :name="item.id" >
    <div v-for="(lign, idx) in item.text" : {{ lign }}</div>
    </el - collapse - item >
</draggable >
    {/* <script> */ }
// export default {
// name: "third-party",
// display: "Third party",
// order: 10,
// components: {
//     draggable
// },
// data() {
//     return {
//      list: [
//         {
//          title: "Consistency",
//          id: 1,
//          text: [
//             "Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;",
//             "Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc."
//          ]
//         },
//         {
//          title: "Feedback",
//          id: 2,
//          text: [
//             "Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;",
//             "Visual feedback: reflect current state by updating or rearranging elements of the page."
//          ]
//         }
//      ],
//      activeNames: [1],
//      collapseComponentData: {
//         on: {
//          change: this.inputChanged
//         },
//         props: {
//          value: this.activeNames
//         }
//      }
//     };
// },
// methods: {
//     inputChanged(val) {
//      this.activeNames = val;
//     }
// }
// };
// </script>

// 上面代码中的collapseComponentData就是将原来el-collapse上传递数据的部分抽离出来了，包括事件(on)，属性(prop,attr)的设置。

// group和clone
// group一般的用法是用来区分拖拽组的，group名称相同的拖拽组可以互相拖放：

{/* <draggable class="list-group" :list="list1" group="people" >
    <div class="list-group-item" v-for="(element, index) in list1" :key="element.name" >
        {{ element.name }} {{ index }}
    </div>
</draggable>
<draggable class="list-group" :list="list2" group="people" >
    <div class="list-group-item" v-for="(element, index) in list2" :key="element.name" >
        {{ element.name }} {{ index }}
    </div>
</draggable> */}

// group属性还有更详细的配置，例如:group="{name:'abc',pull:'clone',put:false}"。

// put参数比较简单，是用来控制别的地方内容是否可以拖拽到自己这边来。如果设置为false，那么就表示别的地方的内容无法拖拽到自己这边来。

// pull参数控制的是从当前拽走，放在另外一个地方的行为。默认情况下(设置为true)是你拽到另外一个地方去，当前列表中就会少一个，对方列表多一个。如果设置为'clone',那么当前列表不会减少，同时对方列表多了一个。

// 当然你甚至可以配置一个:clone='func'，用来控制放入对方列表的内容，我们看一个复杂一点的例子：

<draggable class="list-group" : list="list1" : group="{name:'people',pull:pullFunction,put:false}" : clone='clone'>
    <div class="list-group-item" v-for="(element, index) in list1" :key="element.name" >
        {{ element.name }} {{ index }}
    </div>
</draggable >
    <draggable class="list-group" : list="list2" group="people" >
        <div class="list-group-item" v-for="(element, index) in list2" :key="element.name" >
        {{ element.name }} {{ index }}
    </div>
</draggable >

// export default {
// methods: {
//     clone: function(el) {
//      return {
//         name: el.name + " cloned"
//      };
//     },
//      pullFunction() {
//      return Math.random()*10%2 ? "clone" : true;
//     },
// }
// };

// 上面的代码中，pull设置为true还是'clone'是随机的(pullFunction)。如果设置的true，那么就是当前少一个，对方多一个；如果是'clone'，同时:clone='func'，那么就会用调用你自定义的clone方法，当前不少，对方多一个。

// transition-group和animation
// vuedraggable中的动画主要分成两类，一类是交换过程的动画：

// 上图我们可以看到，拖拽元素每经过一个内容项，它就会发生动画移动的效果，这个主要是通过animation的设置：
//     <draggable class="list-group" : list="list1" : animation='200'>
//         <transition-group>
//             <div class="list-group-item" v-for="(element, index) in list1" :key="element.name" >
//             {{ element.name }} {{ index }}
//         </div>
//     </transition-group>
// </draggable >

// 还有一种就是只有交换的双方才有动画：

// 这种和上面的不一样，这种交换过程中没有动画，但是只是最后真正交换的时候才有动画，这种需要加个class就好了：

{/* <draggable class="list-group" :list="list1" >
    <transition-group name='flip-list'>
        <div class="list-group-item" v-for="(element, index) in list1" :key="element.name" >
            {{ element.name }} {{ index }}
        </div>
    </transition-group>
</draggable> */}
{/* <style>
.flip-list-move {
    transition: transform 0.5s;
}
</style> */}