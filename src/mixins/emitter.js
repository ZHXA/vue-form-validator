/**
 * 在父组件调用 broadcast 方法，向下级指定的组件实例 （最近的）上触发自定义事件，
 * 并传递数据， 且该上级组件预先通过 $on 监听这个事件；
 * @param componentName 组件的name值，用于向上或向下递归遍历来寻找对应的组件
 * @param eventName 自定义事件名称
 * @param params  传递的数据
 */
function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

// 因为是用作 mixins 导入，所以在 methods 里定义的 dispatch 和 broadcast 方法会被混合到组件里，
// 自然就可以用 this.dispatch 和 this.broadcast 来使用。
export default {
  methods: {
    /**
     * 在子组件调用 dispatch 方法，向上级指定的组件实例 （最近的）上触发自定义事件，
     * 并传递数据，且该上级组件预先通过 $on 监听这个事件；
     * @param componentName 组件的name值，用于向上或向下递归遍历来寻找对应的组件
     * @param eventName 自定义事件名称
     * @param params  传递的数据
     */
    dispatch (componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      // 通过 while 语句，不断向上遍历更新当前组件（即上下文为当前调用该方法的组件）
      // 的父组件实例（变量 parent 即为父组件实例），直到匹配到定义的 componentName 与
      // 某个上级组件的 name 选项一致时，结束循环，并在找到的组件实例上，调用 $emit 方法来触发自定义事件 eventName
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast (compinentName, eventNane, params) {
      broadcast.call(this, compinentName, eventNane, params)
    }
  }
}
