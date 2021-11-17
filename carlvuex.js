// Store： 统一存储state,并且是响应式的
// 它提供给用户一些api commit/dispatch
let Vue
class Store {
    constructor(options) {
        // 保存选项
        this.$options = options
        this._mutations = options.mutations
        this._actions = options.actions
        // 对state进行响应式处理
        // Vue.util.defineReactive(this, 'state', {})
        this._vm = new Vue({
            data() {
                return {
                    $$state: options.state
                }
            }
        })

        
    }
    get state() {
        return this._vm._data.$$state
    }
    set state(v) {
        console.error('请使用replaceState重置state')
    }
    commit(type, payload) {
        // 根据type从用户配置的mutations中获取函数
        const entry = this._mutations[type]
        if (!entry) {
            console.error('unknown mutation!');
            return 
        }
        entry(this.state,payload)
    }
    dispatch(type, payload) {
        const entry = this._actions[type]
        if (!entry) {
            console.error('unknown mutation!');
            return 
        }
        // dispatch的实例是Store
        entry(this,payload)
    }
}

function install(_Vue) {
    // 注册$store
    // 传入构造函数，我们可以修改原型，用于扩展
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                console.log(this, this.$options)
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

// 导出的对象是Vuex
export default {
    Store,
    install
}