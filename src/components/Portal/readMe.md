# 关于 Portal

## 预备知识

### document

```js
/*
1、继承顺序
    EventTarget  <-- Node  <--  Document
2、意义：Document接口描述了任何类型的文档的通用属性和方法
    1、不同文档，HTML、XML、SVG等等。HTML实现了HTMLDocument，XML和SVG实现了XMLDocument接口
    2、媒体类型，text/html
3、属性
    1、all：返回以文档为根节点的HTMLAllCollection集合，包含文档完整内容
    2、characterSet：文档使用的字符集
    3、contentType：文档的mime类型
    4、documentElement：文档的直接子节点，一般是HTMLHtmlElement
    5、documentURI：文档的完整URL，地址栏的完整URL
    6、anchors、fonts、forms、head、body、images、links、scripts等等文档中的所有对应元素
    7、scrollingElement、styleSheetSets、visibilityState
    // HTMLDocument扩展
    8、cookie
    9、defaultView：对容器window的引用
    10、designMode：文档编辑能力
    11、dir：文档文字排版方向
    12、domain：域名
    13、lastModified：最后修改时间
    14、location：当前文档的URI
    15、title：文档标题
    16、readyState：文档加载状态
    17、referrer：源页面的URI
    18、URL：文档地址栏链接
*/
```

### HTMLDocument

```js

```

## 关于 Portal

```js
/**
 * 实现Modal方式
 * 1、正常的Modal组件，用样式定位
 *  1-1：当父组件容器overflow： hidden或者存在z-index时候，需要在视觉上突破父组件的容器
 * 2、使用ReactDOM.render(instance, container[, callback]):null | reference
 *    使用ReactDOM.unmountComponentAtNode()
 * 3、使用ReactDOM.unstable_renderSubtreeIntoContainer(parent, component, container, callback)
 * 4、使用ReactDOM.createPortal(instance, container)
 *
 * 区别：
 *  render函数意味着Modal是一个单独的react tree
 *  createPortal和createElement同级，创建的Portal仍然属于一个react tree
 *  跨react tree自然带来数据传递和事件冒泡的问题
 *  场景1：Modal内容触发事件，父组件是否可以感知问题
 *  场景2：父组件所在的react tree的conotext共享问题
 *  场景3：父组件更重新state，Modal是否可以更新问题
 *
 * margin：百分比的锚点是容器的宽度，可以通过书写顺序样式writing-mode进行更改，但是内容书写顺序会发生变化，不友好
 *  writing-mode: horizontal-tb | vertical-rl | vertical-lr
 * */
```
