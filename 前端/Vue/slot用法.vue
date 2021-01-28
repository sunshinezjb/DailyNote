详解Vue的slot新用法
摘要： 理解Vue插槽。

作者：前端小智
原文：vue 2.6 中 slot 的新用法
Fundebug经授权转载，版权归原作者所有。

为了保证的可读性，本文采用意译而非直译。

最近发布不久的Vue 2.6，使用插槽的语法变得更加简洁。 对插槽的这种改变让我对发现插槽的潜在功能感兴趣，以便为我们基于Vue的项目提供可重用性，新功能和更清晰的可读性。 真正有能力的插槽是什么？

如果你是Vue的新手，或者还没有看到2.6版的变化，请继续阅读。也许学习插槽的最佳资源是Vue自己的文档，但是我将在这里给出一个纲要。

想阅读更多优质文章请猛戳GitHub博客,一年百来篇优质文章等着你！

插槽是什么？
插槽是Vue组件的一种机制，它允许你以一种不同于严格的父子关系的方式组合组件。插槽为你提供了一个将内容放置到新位置或使组件更通用的出口。从一个简单的例子开始：

// frame.vue
<template>
  <div class="frame">
    <slot></slot>
  </div>
</template>
这个组件最外层是一个div。假设div的存在是为了围绕其内容创建一个样式框架。这个组件可以通用地用于将框架包围在wq你想要的任何内容上，来看看它是怎么用的。这里的frame组件指的是我们刚才做的组件。

// app.vue
<template>
  <frame><img src="an-image.jpg"></frame>
</template>
在开始和结束frame标记之间的内容将插入到插槽所在的frame组件中，替换slot标记。这是最基本的方法。还可以简单地通过填充指定要放入槽中的默认内容

// frame.vue
<template>
  <div class="frame">
    <slot>如果这里没有指定任何内容，这就是默认内容</slot>
  </div>
</template>
所以现在如果我们这样使用它：

// app.vue
<template>
  <frame />
</template>
“如果这里没有指定任何内容，这就是默认内容”是默认内容，但是如果像以前那样使用它，默认文本将被img标记覆盖。

多个/命名的插槽
可以向组件添加多个插槽，但是如果这样做了，那么除了其中一个之外，其他所有插槽都需要有名称。如果有一个没有名称的槽，它就是默认槽。下面是如何创建多个插槽：

// titled-frame.vue
<template>
  <div class="frame">
    <header><h2>
      <slot name="header">Title</slot>
    </h2></header>
    <slot>如果这里没有指定任何内容，这就是默认内容</slot>
  </div>
</template>
我们保留了相同的默认槽，但这次我们添加了一个名为header的槽，可以在其中输入标题，用法如下：

// app.vue
<template>
  <titled-frame>
    <template v-slot:header>
      <!-- The code below goes into the header slot -->
      My Image’s Title
    </template>
    <!-- The code below goes into the default slot -->
    <img src="an-image.jpg">
  </titled-frame>
</template>
就像之前一样，如果我们想将内容添加到默认槽中，只需将其直接放在titled-frame组件中。但是，要将内容添加到命名槽中，我们需要用v-slot指令将代码包裹在在template标记中。在v-slot之后添加冒号(:)，然后写出要传递内容的slot的名称。

注意，v-slot是Vue 2.6的新版本，所以如果你使用的是旧版本，则需要阅读关于不推荐的slot语法的文档。

作用域插槽
还需要知道的另一件事是插槽可以将数据/函数传递给他们的孩子。 为了证明这一点，我们需要一个完全不同的带有插槽的示例组件：创建一个组件，该组件将当前用户的数据提供给其插槽：

// current-user.vue
<template>
  <span>
    <slot v-bind:user="user">
      {{ user.lastName }}
    </slot>
  </span>
</template>

<script>
export default {
  data () {
    return {
      user: ...
    }
  }
}
</script>
该组件有一个名为user的属性，其中包含关于用户的详细信息。默认情况下，组件显示用户的姓，但请注意，它使用v-bind将用户数据绑定到slot。这样，我们就可以使用这个组件向它的后代提供用户数据

// app.vue
<template>
  <current-user>
    <template v-slot:default="slotProps">{{ slotProps.user.firstName }}</template>    
  </current-user>
</template>
为了访问传递给slot的数据，我们使用v-slot指令的值指定作用域变量的名称。

这里有几点需要注意：

我们指定了default的名称，但是不需要为默认槽指定名称。相反，我们可以使用v-slot="slotProps"。
不需要使用slotProps作为名称，可以随便叫它什么。
如果只使用默认槽，可以跳过内部template标记，直接将v-slot指令放到当前current-user上。
可以使用对象解构来创建对作用域插槽数据的直接引用，而不是使用单个变量名。换句话说，可以使用v-slot="{user}"代替v-slot="slotProps"，然后可以直接使用user而不是slotProps.user。
所以，上面的例子可以这样重写

// app.vue
<template>
  <current-user v-slot="{user}">
    {{ user.firstName }}
  </current-user>
</template>
还有几点要记住：

可以使用v-bind指令绑定多个值。
也可以将函数传递到作用域槽。许多库使用它来提供可重用的函数组件。
v-slot 的别名是#。因此，可以用#header="data" 来代替 v-slot:header="data"。还可以使用 #header来代替 v-slot:header(前提:不是作用域插槽时)。对于默认插槽，在使用别名时需要指定默认名称。换句话说，需要这样写 #default="data" 而不是#="data"。
可以从文档中了解更多的细节，但这足以帮助你理解在本文剩下部分中讨论的内容。

你能用插槽做什么？
插槽不是为了一个目的而构建的，或者至少如果它们是，它们已经超越了最初的意图，成为做许多不同事物的强大工具。

可重用的模式
组件总是被设计为可重用的，但是某些模式对于使用单个“普通”组件来实施是不切实际的，因为为了自定义它，需要的props 数量可能过多或者需要通过props传递大部分内容或其它组件。

插槽可用包裹外部的HTML标签或者组件，并允许其他HTML或组件放在具名插槽对应名称的插槽上。

对于的第一个例子，从简单的东西开始:一个按钮。假设咱们的团队正在使用 Bootstrap。使用Bootstrap，按钮通常与基本的“btn”类和指定颜色的类绑定在一起，比如“btn-primary”。你还可以添加size类，比如'btn-lg'。

为了简单起见，现在让我们假设你的应用使用btn、btn-primary和btn-lg。你不希望总是必须在按钮上写下这三个类，或者你不相信新手会记得写下这三个类。

在这种情况下，可以创建一个自动包含所有这三个类的组件，但是如何允许自定义内容？ prop 不实用，因为允许按钮包含各种HTML，因此我们应该使用一个插槽。

<!-- my-button.vue -->
<template>
  <button class="btn btn-primary btn-lg">
    <slot>Click Me!</slot>
  </button>
</template>
现在我们可以在任何地方使用它，无论你想要什么内容

<!-- 使用 my-button.vue -->
<template>
  <my-button>
    <img src="/img/awesome-icon.jpg"> 我是小智！
  </my-button>
</template>
当然，你可以选择比按钮更大的东西。 坚持使用Bootstrap，让我们看一个模态：

<!-- my-modal.vue -->
<template>
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</div>
</template>
现在，使用它：

<!-- 使用 my-modal.vue -->
<template>
  <my-modal>
    <template #header>
      <h5>大家最棒!</h5>
    </template>
    <template #body>
      <p>大家加油</p>
    </template>
    <template #footer>
      <em>大家好样的!</em>
    </template>
  </my-modal>
</template>
上述类型的插槽用例显然非常有用，但它可以做得更多。

代码部署后可能存在的BUG没法实时知道，事后为了解决这些BUG，花了大量的时间进行log 调试，这边顺便给大家推荐一个好用的BUG监控工具 Fundebug。

复用函数
Vue组件并不完全是关于HTML和CSS的。它们是用JavaScript构建的，所以也是关于函数的。插槽对于一次性创建函数并在多个地方使用功能非常有用。让我们回到模态示例并添加一个关闭模态的函数

<!-- my-modal.vue -->
<template>
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">        
        <slot name="footer" :closeModal="closeModal"></slot>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  //...
  methods: {
    closeModal () {
      // 关闭对话框时，需要做的事情
    }
  }
}
</script>
当使用此组件时，可以向footer添加一个可以关闭模态的按钮。 通常，在Bootstrap模式的情况下，可以将data-dismiss =“modal”添加到按钮来进行关闭。

但我们希望隐藏Bootstrap 特定的东西。 所以我们传递给他们一个他们可以调用的函数，这样使用者就不会知道我们有使用 Bootstrap 的东西。

<!-- 使用 my-modal.vue -->
<template>
  <my-modal>
    <template #header>
      <h5>Awesome Interruption!</h5>
    </template>
    <template #body>
      <p>大家加油！</p>
    </template>
    <template #footer="{closeModal}">
      <button @click="closeModal">
        点我可以关闭烦人的对话框
      </button>
    </template>
  </my-modal>
</template>
无渲染组件
最后，可以利用你所知道的关于使用插槽来传递可重用函数的知识，并剥离所有HTML，只使用插槽。这就是无渲染组件的本质:一个只提供函数而不包含任何HTML的组件。

使组件真正无渲染可能有点棘手，因为需要编写render函数而不是使用模板来消除对根元素的依赖，但它可能并不总是必要的。 来看看一个先使用模板的简单示例：

<template>
  <transition name="fade" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </transition>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
{/* 这是一个无渲染组件的奇怪例子，因为它甚至没有任何JavaScript。这主要是因为我们正在创建一个内置无渲染函数的预配置可重用版本:transition。

是的，Vue有内置的无渲染组件。这个特殊的例子取自Cristi Jora的一篇关于可重用transition的文章，展示了一种创建无渲染组件的简单方法，该组件可以标准化整个应用程序中使用的 transition。

对于我们的另一个示例，我们将创建一个组件来处理切换 Promise 的不同状态中显示的内容: pending、resolved 和 failed。这是一种常见的模式，虽然它不需要很多代码，但是如果没有为了可重用性而提取逻辑，它会使很多组件变得混乱 */}

<!-- promised.vue -->
<template>
  <span>
    <slot  name="rejected"  v-if="error" :error="error"></slot>
    <slot  name="resolved"  v-else-if="resolved" :data="data"></slot>
    <slot  name="pending"  v-else></slot>
  </span>
</template>

<script>
export  default {
  props: {
    promise:  Promise
  },

  data: () => ({
    resolved:  false,
    data:  null,
    error:  null
  }),  

  watch: {
    promise: {
      handler (promise) {
        this.resolved  =  false
        this.error  =  null

        if (!promise) {
          this.data  =  null
          return
        }

        promise.then(data  => {
          this.data  =  data
          this.resolved  =  true
        })
        .catch(err  => {
          this.error  =  err
          this.resolved  =  true
        })
      },
      immediate:  true
    }
  }
}
</script>
{/* 这是怎么回事,小老弟?首先，请注意，该组件接收一个Promise 类型参数。在watch部分中，监听promise的变化，当promise发生变化时，清除状态，然后调用 then 并 catch promise，当 promise 成功完成或失败时更新状态。

然后，在模板中，我们根据状态显示一个不同的槽。请注意，我们没有保持它真正的无渲染，因为我们需要一个根元素来使用模板。我们还将data和error传递到相关的插槽范围。 */}

<template>
  <div>
    <promised :promise="somePromise">
      <template #resolved="{ data }">
        Resolved: {{ data }}
      </template>
      <template #rejected="{ error }">
        Rejected: {{ error }}
      </template>
      <template #pending>
          请求中...
      </template>
    </promised>
  </div>
</template>

// 我们将somePromise传递给无渲染组件。 然后等待它完成，对于 pending 的插槽，显示“请求中...”。 如果成功，显示“Resolved：对应的值”。 如果失败，显示“已Rejected：失败的原因”。 现在我们不再需要跟踪此组件中的promise的状态，因为该部分被拉出到它自己的可重用组件中。

// 那么，我们可以做些什么来绕过promised.vue中的插槽？ 要删除它，我们需要删除template部分并向我们的组件添加render函数：

render () {
  if (this.error) {
    return this.$scopedSlots['rejected']({error: this.error})
  }

  if (this.resolved) {
    return this.$scopedSlots['resolved']({data: this.data})
  }

  return this.$scopedSlots['pending']()
}
// 这里没有什么太复杂的。我们只是使用一些if块来查找状态，然后返回正确的作用域slot(通过this.$ scopedslot ['SLOTNAME'](…))，并将相关数据传递到slot作用域。当你不使用模板时，可以跳过使用.vue文件扩展名，方法是将JavaScript从script标记中提取出来，然后将其放入.js文件中。在编译这些Vue文件时，这应该会给你带来非常小的性能提升。

// 总结
// Vue的插槽将基于组件的开发提升到了一个全新的水平，虽然本文已经展示了许多可以使用插槽的好方法，但还有更多的插槽。欢迎留言讨论。

// 代码部署后可能存在的BUG没法实时知道，事后为了解决这些BUG，花了大量的时间进行log 调试，这边顺便给大家推荐一个好用的BUG监控工具 Fundebug。

// 关于Fundebug
// Fundebug专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java线上应用实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了10亿+错误事件，付费客户有阳光保险、核桃编程、荔枝FM、掌门1对1、微脉、青团社等众多品牌企业。欢迎大家免费试用！