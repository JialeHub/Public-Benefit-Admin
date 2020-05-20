/**
 *
 * @author 王业鹏
 * @description 根据树状结构菜单自动引入.vue文件
 * @date 2020/03/16 21:44
 * @class TraverseTree
 * @constructor menu
 * @constructor layout
 * @return layout
 *
 * */

export class TraverseTree {
  constructor(menu, layout) {
    this.menu = menu; // 菜单
    this.layout = layout; // 路由集合
    this.leftNode = []; // 叶子节点集合
    this.allNode = []; // 所有节点集合
    this.filePathArray = []; // 根节点到叶子节点路径集合
    this.start() // 启动
  }

  static isEmpty(value) { // 判断数组是否可以继续遍历
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    )
  }

  traverseByRecursion(node, NODE) { // 递归遍历
    if (!node) {
      return;
    }
    if (!TraverseTree.isEmpty(node.children)) {
      for (let i = 0; i < node.children.length; i++) {
        this.traverseByRecursion(node.children[i], NODE);
      }
    } else { // 叶子节点
      this.allNode.push(NODE)
    }
  }

  traverseByNonRecursion(node) { // 非递归遍历
    if (!node) {
      return;
    }
    let stack = [];
    stack.push(node);
    let tmpNode;
    while (stack.length > 0) {
      tmpNode = stack.pop();
      if (!TraverseTree.isEmpty(tmpNode.children)) {
        this.traverseByRecursion(tmpNode, tmpNode);
        let i = tmpNode.children.length - 1;
        for (i; i >= 0; i--) {
          stack.push(tmpNode.children[i]);
        }
      } else { // 叶子节点
        this.leftNode.push(tmpNode);
        this.allNode.push(tmpNode)
      }
    }
  }

  getOnlyOneTreePath(root) { // 获得一棵树根节点到叶子节点的全部路径
    this.leftNode = [];
    this.allNode = [];
    this.traverseByNonRecursion(root);
    let pathNode = []; // 路径节点数组
    let leftIndex = 0;
    let rowIndex = 0;
    this.allNode.forEach(currentNode => {
      if (TraverseTree.isEmpty(pathNode[rowIndex]))
        pathNode[rowIndex] = [];
      pathNode[rowIndex++].push(currentNode);
      if (rowIndex === this.leftNode.length)
        rowIndex = leftIndex;
      if (currentNode.id === this.leftNode[leftIndex].id)
        leftIndex++
    });
    return pathNode
  }

  addRouter(item) { // 添加路由
    let obj = {};
    obj.name = item.name;
    obj.path = item.path;
    obj.meta = {};
    obj.meta.title = item.title;
    obj.component = () => import(`@/views${obj.path}`);
    this.layout.children.push(obj)
  }

  getRouter() { // 获取叶子组件路径 和 获取隐藏组件的父组件路径 (注意: 隐藏组件需位叶子组件)
    let routerList = [];
    this.filePathArray.forEach(array => {
      let path = '';
      let length = array.length;
      array.forEach((item, index) => {
        path += `/${item.name}`;
        if (index === length - 2 && array[length - 1].hidden) { // 隐藏组件的父组件
          item.path = path;
          routerList.push(item);
        }
        if (++index === length && !item.iframe) { // 叶子组件
          item.path = path;
          this.addRouter(item);
          path = '';
        }
      })
    });
    for (let i = 0; i < routerList.length; i++) { // 父组件路径去重
      for (let j = i + 1; j < routerList.length; j++) {
        if (routerList[i].path === routerList[j].path) {
          routerList.splice(j, 1);
          j--;
        }
      }
    }
    routerList.forEach(router => { // 判断父组件的子组件是否全部隐藏
      let isAllHidden = router.children.every(item => {
        return item.hidden
      });
      if (isAllHidden) this.addRouter(router)
    })
  }

  release() { // 释放内存
    this.menu = null;
    this.leftNode = null;
    this.allNode = null;
    this.filePathArray = null;
  }

  start() {
    this.menu.forEach(root => { // 获得多棵树根节点到叶子节点的全部路径
      this.filePathArray = this.filePathArray.concat(this.getOnlyOneTreePath(root))
    });
    this.getRouter();
    this.release()
  }

  get() {
    return this.layout;
  }
}
