# Better Swiper（源码阅读）

## BScrollConstructor(入口)
```js
    /*
        1、注册事件类型：[refresh, contentChanged, enable, disable, beforeScrollStart, scrollStart, scroll, scrollEnd, scrollCancel, touchEnd, flick, destroy]
        2、初始化plugins：this.plugins = {}
        3、初始化配置项：this.options = new OptionsConstructor().merge(options).process()
        4、this.content = el.children[0] // 默认
        5、初始化hooks：this.hooke = new EventEmitter([refresh, enable, disable, destroy, beforeInitialScrollTo, contentChanged])
        6、初始化容器：this.wrapper = wrapper
        7、标记容器：wrapper.isBScrollContainer = true
        8、初始化滚动器：this.scroller = new Scroller(wrapper, this.content, this.options)
            8-1、Scroller初始化容器：this.wrapper = wrapper
            8-2、Scroller初始化内容：this.content = content
            8-3、Scroller初始化hooks：this.hooks = new EventEmitter([beforeStart, beforeMove, beforeScrollStart, scrollStart, scroll, beforeEnd, resize, touchEnd, end, flick, scrollCancel, momentum, scrollTo, minDistanceScroll, scrollToElement, beforeRefresh])
            8-4、Scroller初始化options：this.options = options
            8-5、创建X方向Behavior实例：this.scrollBehaviorX = new Behavior(wrapper, content, createBehaviorOptions(options, "scrollX", [left, right]))
                8-5-1、
                8-5-2、
                8-5-3、
            8-6、创建Y方向Behavior实例：this.scrollBehaviorY = new Behavior(wrapper, content, createBehaviorOptions(options, "scrollY", [top, bottom]))
            8-7、创建Translater实例：this.translater = new Translater(this.content)
            8-8、初始化animater：this.animater = createAnimater(this.content, this.translater, this.options)
            8-9、初始化actionsHandler：this.actionsHandler = new ScrollerActions()
            8-10、初始化：this.resizeRegister = new EventRegister(window, [])
            8-11、调用this.registerTransitionEnd()
            8-11、调用this.init()
    */ 
```
## EventEmitter
## Scroller