let Vue
// vue 插件形式：
// 可能是一个类 可能是一个方法，实现一个install方法，该方法会在use的时候调用
class carlRouter {
    constructor(options) {
        // 参数包含路由配置，保存起来
        this.$options = options
        // 需要将current 生命为响应式
        Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')
        // 监听hashchange时间，并且变化的时候响应
        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.slice(1) 
        })
    }
}

// 形参1是VUE构造函数
carlRouter.install = function(_Vue) {
    // 传入构造函数，我们可以修改原型，用于扩展
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    // 注册router-link 和 router-view
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true 
            }
        },
        render(h) { 
            // h = createElement 返回虚拟dom
            // 获取插槽内容
            return h('a', {
                attrs: {
                    href: '#' + this.to
                }
            }, this.$slots.default)
        }
    })
    Vue.component('router-view', {
        // 数据响应式：数据变化可侦听，使用这些数据组件就会和响应式数据产生依赖关系，如果响应式发生变化，组件重新渲染
        render(h) { // h = createElement 返回虚拟dom
            // 0.通过router实例 得到options
            // 1.获取hash部分，获取path
            // 2.根据path,从路由表中获取组件
            // console.log(this.$router.$options, this.$router.current)
            let component = null
            let route = this.$router.$options.routes.find(route => route.path === this.$router.current)
            if (route) {
                component = route.component
            }
            return h(component)
        }
    })
}

export default carlRouter