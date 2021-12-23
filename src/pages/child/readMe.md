# 关于this.props.children未随着父组件state变更而没有更新的问题
* 参考资料
[react github](https://github.com/facebook/react/issues/3226)
[stackoverflow](https://stackoverflow.com/questions/47567429/this-props-children-not-re-rendered-on-parent-state-change)
[中文版](https://github.com/shaozj/blog/issues/36)
* 预备知识
```
    Tree Diff: 比较有无
    Component Diff: 比较type
    Element Diff: 比较props

    React.createElement(type, props, ...children): ReactElement
    ReactElement = {
        $$typeof: Symbol('react.element'),
        type: 'html tag' || function,
        key: null,
        ref: null,
        props: {},
        _owner: FiberNode {},
        _store: {},
        _self: null,
        _source: {},
        _proto__: Object
    }
    <div /> ===等价于=== React.createElement('div') ===执行后返回===>ReactElement
        {
            $$typeof: Symbol('react.element'),
            type: 'div',
            key: null,
            ref: null,
            props: {},
            _owner: FiberNode {},
            _store: {},
            _self: null,
            _source: {},
            _proto__: Object
        }
    <Component /> ===等价于 React.createElement('Component') ===执行后返回===>ReactElement
        {
            $$typeof: Symbol('react.element'),
            type: Component(props),
            key: null,
            ref: null,
            props: {},
            _owner: FiberNode {},
            _store: {},
            _self: null,
            _source: {},
            _proto__: Object
        }

```
* react0.14开始，将ReactElement和ReactElement的props object视为value types
* React会自动重用相等的ReactElement，即使重写shouldComponentUpdate
* Demos
```
    场景1：
    function Container(props) {
        console.log('container-render-----)
        const [name, setName] = React.useState('default')
        reutrn (
            <div onClick={() => setName('monkey')}>
                <Child />
            </div>
        )
    }

    function Child(props) {
        console.log('child--redner-----)
        return (
            <div>
                hello
            </div>
        )
    }

    re-render=====>
        container-render-----
        console.log('child--redner-----)

    场景2：
    function Container(props) {
        console.log('container-render-----)
        const [name, setName] = React.useState('default')
        reutrn (
            <div onClick={() => setName('monkey')}>
                {
                    props.children
                }
            </div>
        )
    }

    function Child(props) {
        console.log('child--redner-----)
        return (
            <div>
                hello
            </div>
        )
    }
    re-render=====>
        container-render-----

    <Child /> ===> React.createElement('Child', {}, {}): ReactElement

    关键点在于： React.createElement执行时机是什么？？？？？
    <!-- Container.render -->
    <div>                   React.createElement(
        <Child /> ====>         'div',                      ======
    </div>                      {},
                                React.createElement(
                                    Child,
                                    {},
                                    {}
                                )
                           )
            {
                type: Container,
                props: {
                    children: {
======>                 type: Child,
                        props: {},//重点
                        children: {}
                    }
                }
            }
    <!-- Container.render -->
    <div>                           React.createElement({
        {                               'div',
            props.children ======>      {},
        }                               props.children
    </div>                          )
```
