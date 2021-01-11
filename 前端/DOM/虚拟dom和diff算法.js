// 虚拟DOM和diff算法
// 参考：

// https://juejin.im/post/5a3200fe51882554bd5111a0

// https://www.cnblogs.com/zhuzhenwei918/p/7271305.html

// https://juejin.im/post/5ad6182df265da23906c8627

// 虚拟DOM
// React将DOM抽象为虚拟DOM, 然后通过新旧虚拟DOM 这两个对象的差异(Diff算法), 最终只把变化的部分重新渲染, 提高渲染效率的过程; diff 是通过JS层面的计算，返回一个patch对象，即补丁对象，在通过特定的操作解析patch对象，完成页面的重新渲染

// img

// img

// 表示虚拟DOM的JS对象上面有如下三个属性：

// tagName: 用来表示这个元素的标签名。
// props: 用来表示这元素所包含的属性。
// children: 用来表示这元素的children（数组）。
// 虚拟DOM快取决于两个前提：1. JavaScript在浏览器上运行很快 2.DOM的渲染过程很慢，性能消耗高

// 用算法实现虚拟DOM：

function VDOM (tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
}
VDOM.prototype.render = function () {
    // 建立一个真实元素
    var el = document.createElement(this.tagName);

    // 往该元素上添加属性
    for (var name in this.props) {
        el.setAttribute(name, this.props[name]);
    }

    // children是一个数组
    var children = this.children || [];
    for (var child of children) {
        var childEl = (child instanceof VDOM) ? child.render() : document.createTextNode(child);
        // 无论childEl是元素还是文字节点，都需要添加到这个元素中。
        el.appendChild(childEl);
    }
    return el;
}
// Diff算法
// 比较两颗DOM数的差异是Virtual DOM算法中最为核心的部分，这也就是所谓的Virtual DOM的diff算法。 两个树的完全的diff算法是一个时间复杂度为 O(n3) 的问题。 但是在前端中，你会很少跨层地移动DOM元素，所以真实的DOM算法会对同一个层级的元素进行对比。

// img

// 上图中，div只会和同一层级的div对比，第二层级的只会和第二层级对比。 这样算法复杂度就可以达到O(n)。

// img

// 上面的这个遍历过程就是深度优先，即深度完全完成之后，再转移位置。 在深度优先遍历的时候，每遍历到一个节点就把该节点和新的树进行对比，如果有差异的话就记录到一个对象里面。

// diff.js 的简单代码实现：

// 在同层进行比较时候会出现四种情况：

// 1、此节点是否被移除 -> 添加新的节点
// 2、属性是否被改变 -> 旧属性改为新属性
// 3、文本内容被改变-> 旧内容改为新内容
// 4、节点要被整个替换 -> 结构完全不相同 移除整个替换

// 最后返回一个patch对象用来应用到实际的DOM tree更新，它的结构是这样的：

// index记录是哪一层的改变，type表示是哪种变化，第二个属性对应着变化存储相应的内容
patches = { index: [{ type: utils.REMOVE / utils.TEXT / utils.ATTRS / utils.REPLACE, index/ content / attrs / node: }, ...], ...}
let utils = require('./utils');

let keyIndex = 0;
function diff (oldTree, newTree) {
    //记录差异的空对象。key就是老节点在原来虚拟DOM树中的序号，值就是一个差异对象数组
    let patches = {};
    keyIndex = 0; // 儿子要起另外一个标识
    let index = 0; // 父亲的表示 1 儿子的标识就是1.1 1.2
    walk(oldTree, newTree, index, patches);
    return patches;
}
//遍历
function walk (oldNode, newNode, index, patches) {
    let currentPatches = []; //这个数组里记录了所有的oldNode的变化
    if (!newNode) { //如果新节点没有了，则认为此节点被删除了
        currentPatches.push({ type: utils.REMOVE, index });
        //如果说老节点的新的节点都是文本节点的话
    } else if (utils.isString(oldNode) && utils.isString(newNode)) {
        //如果新的字符符值和旧的不一样
        if (oldNode != newNode) {
            ///文本改变
            currentPatches.push({ type: utils.TEXT, content: newNode });
        }
    } else if (oldNode.tagName == newNode.tagName) {
        //比较新旧元素的属性对象
        let attrsPatch = diffAttr(oldNode.attrs, newNode.attrs);
        //如果新旧元素有差异 的属性的话
        if (Object.keys(attrsPatch).length > 0) {
            //添加到差异数组中去
            currentPatches.push({ type: utils.ATTRS, attrs: attrsPatch });
        }
        //自己比完后再比自己的儿子们
        diffChildren(oldNode.children, newNode.children, index, patches, currentPatches);
    } else {
        currentPatches.push({ type: utils.REPLACE, node: newNode });
    }
    if (currentPatches.length > 0) {
        patches[index] = currentPatches;
    }
}
//老的节点的儿子们 新节点的儿子们 父节点的序号 完整补丁对象 当前旧节点的补丁对象
function diffChildren (oldChildren, newChildren, index, patches, currentPatches) {
    oldChildren.forEach((child, idx) => {
        walk(child, newChildren[idx], ++keyIndex, patches);
    });
}
function diffAttr (oldAttrs, newAttrs) {
    let attrsPatch = {};
    for (let attr in oldAttrs) {
        //如果说老的属性和新属性不一样。一种是值改变 ，一种是属性被删除 了
        if (oldAttrs[attr] != newAttrs[attr]) {
            attrsPatch[attr] = newAttrs[attr];
        }
    }

    // 对比旧节点新增的属性
    for (let attr in newAttrs) {
        if (!oldAttrs.hasOwnProperty(attr)) {
            attrsPatch[attr] = newAttrs[attr];
        }
    }
    return attrsPatch;
}
module.exports = diff;
patch.js的简单实现

let keyIndex = 0;
let utils = require('./utils');
let allPatches;//这里就是完整的补丁包
function patch (root, patches) {
    allPatches = patches;
    walk(root);
}
function walk (node) {
    let currentPatches = allPatches[keyIndex++];
    (node.childNodes || []).forEach(child => walk(child));
    if (currentPatches) {
        doPatch(node, currentPatches);
    }
}
function doPatch (node, currentPatches) {
    currentPatches.forEach(patch => {
        switch (patch.type) {
            case utils.ATTRS:
                for (let attr in patch.attrs) {
                    let value = patch.attrs[attr];
                    if (value) {
                        utils.setAttr(node, attr, value);
                    } else {
                        node.removeAttribute(attr);
                    }
                }
                break;
            case utils.TEXT:
                node.textContent = patch.content;
                break;
            case utils.REPLACE:
                let newNode = (patch.node instanceof Element) ? path.node.render() : document.createTextNode(path.node);
                node.parentNode.replaceChild(newNode, node);
                break;
            case utils.REMOVE:
                node.parentNode.removeChild(node);
                break;
        }
    });
}
module.exports = patch;