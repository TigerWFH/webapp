# flex 及其过渡属性

- -webkit-box,-webkit-inline-box
- -moz-box,-moz-inline-box
- -ms-flexbox,-ms-inline-flexbox
- -webkit-flex,-webkit-inline-flex
- flex,inline-flex

## flex 总结

- `flex元素会沿着main start到main end，沿着cross start 到cross end排列`
- `flex lines：从cross start到cross end，且受flex-wrap影响`

## 术语<https://www.w3.org/TR/css-display-3/#block-level>

- `axis：坐标轴`
- `axes：笛卡尔坐标系`
- `Subplot：子图`
- `Plot：线图`
- `Figure：图窗`

- `physical directions:` 就是指 top、right、bottom、left、axes(vertical and horizontal)、and size(height and width)
- `principal box:`

## block and inline layout

## flow-direction

- block flow direction
- inline flow direction
- flex direction

> The block flow direction is the direction in which block-level boxes stack and the direction in which line boxes stack within a block container. The writing-mode property determines the block flow direction.

## Flex Layout Box Model and Terminology

- flex container: 根据 display: flex | inline-flex;计算得到的 element 就是 flex container
- flex items: flex container 中的 children 就叫做 flex items，且使用 flex layout 计算布局
- flex lines: Flex lines are filled with items and placed into the container starting on the cross-start side of the flex container and going toward the cross-end side.

- flex flow:
- writing mode:

- main axis:
- main dimension:
- main start:
- main end:
- main size:
- cross axis
- cross dimension
- cross-start
- cross-end
- cross-size

-

## caniuse<https://github.com/Fyrd/caniuse/blob/main/CONTRIBUTING.md>

- babel-preset-env: babel6 中极力推荐的 preset，是 plugin 的一个集合。结合了 caniuse 的数据，推荐 es 集合

- Browserslist（babel-preset-env、auto-prefixer），也用到了 caniuse<https://github.com/browserslist/browserslist>

```js
'last 1 version';
'> 1%';
'maintained node version';
'not dead';
```

- caniuse-lite: Browserlist 的浏览器数据来源就是 caniuse-lite，而他是 caniuse-db 的精简版本，提供 API 供外部调用

- caniuse-db: caniuse 的 npm 包，提供了 caniuse 网站所需的所有数据

- caniuse 关于浏览器的数据，主要都来源于 statcounter，此网站统计了全球以及各国的浏览器使用情况

### 特性在标准中的状态即 data.json 中的 status，在标准中的状态

> W3C 发布的只是推荐标准，没有强制力。但是 W3C 有影响力，推荐标准会被厂商实施

```js
/*
  W3C提案流程，5个阶段：
    1、工作草案（WorkingDraft）：工作组提出一系列工作草案
    2、最终工作草案（Last Call Working Draft）：工作组完成工作，并邀请公众和W3C会员提交最后的评论和问题
    3、候选推荐标准（Candidate Recommendation）：开展实验性实施
    4、建议推荐标准（Proposed Recommendation）：邀请会员审议
    5、推荐标准（Recommendation）：

  -------------------------
    caniuse显示特性在W3C标准中的状态:

    WD(W3C Working Draft)：W3C Working Draft, W3C工作草案
    CD(W3C Candidate Recommendation)：W3C候选推荐标准
    PR(W3C Proposed Recommendation)：W3C建议推荐标准
    REC(W3C Recommendation)：W3C提案推荐标准
    LS(WHATWG Living Standard)：活动标准，WHATWG组织维护的HTML活动标准，相对W3C维护的HTML标准更为，并持续更新。网页超文本应用技术工作小组是一个以推动网络HTML 5 标准为目的而成立的组织。在2004年
    other：Non-W3C, but reputable. 非W3C，但流行的
    unoff：Unofficial, Editor's Draft or W3C "Note", 非官方
```

### 分类：categories，分类

```js
  HTML5
  CSS
  CSS2
  CSS3
  SVG
  PNG
  js API
  Canvas
  DOM
  Other
  JS
  Security

```

### 浏览器对特性的支持程度

- y - (Y)es, supported by default 完全支持
- a - (A)lmost supported (aka Partial support) 部分支持
- n - (N)o support, or disabled by default 不支持
- p - No support, but has (P)olyfill 不支持，但有替代方案
- u - Support (u)nknown 未知
- x - Requires prefi(x) to work 需要加前缀
- d - (D)isabled by default (need to enable flag or something)需要打 flag
- '#n' - Where n is a number, starting with 1, corresponds to the notes_by_num note. 支持，请看介绍第 n 条

## box(2009 语法):<https://www.w3.org/TR/2009/WD-css3-flexbox-20090723/>

- ``
- ``
- ``
- ``
- ``
- ``
- ``

## flex-box（2012 语法）:<https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/>

## flex（最新语法）:<https://www.w3.org/TR/css-flexbox-1/>

- `flex和inline-flex：`
- ``
- ``
- ``
- ``
- ``

```css
.flex {
  display: -webkit-box;
  /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;
  /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;
  /* TWEENER - IE 10 */
  display: -webkit-flex;
  /* NEW - Chrome */
  display: flex;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.inline-flex {
  display: -webkit-inline-box;
  display: -moz-inline-box;
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
}

.flex-column {
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -moz-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.flex-center {
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
}

.flex-center-h {
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  align-items: center;
}

.flex-h-baseline {
  -webkit-box-align: baseline;
  -moz-align-items: baseline;
  -webkit-align-items: baseline;
  align-items: baseline;
}

.flex-h-middle {
  -webkit-box-align: middle;
  -moz-align-items: middle;
  -webkit-align-items: middle;
  align-items: middle;
}

.flex-row-reverse {
  -webkit-box-pack: end;
  -webkit-box-direction: reverse;
  -webkit-box-orient: horizontal;
  -moz-flex-direction: row-reverse;
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
}

.flex-between {
  -webkit-box-pack: justify;
  -moz-justify-content: space-between;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}

.flex-around {
  -webkit-box-pack: distribute;
  -moz-justify-content: space-around;
  -webkit-justify-content: space-around;
  justify-content: space-around;
}

.flex-wrap {
  -moz-box-lines: multiple;
  -webkit-box-lines: multiple;
  box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

//解决flex-i 在IOS9以下不兼容
.width-0 {
  width: 0;
}

.flex-start {
  -webkit-box-pack: start;
  -moz-justify-content: flex-start;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
}

.flex-end {
  -webkit-box-pack: end;
  -moz-justify-content: flex-end;
  -webkit-justify-content: flex-end;
  justify-content: flex-end;
}
.flex-1 {
  -webkit-box-flex: 1;
  /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1;
  /* OLD - Firefox 19- */
  -webkit-flex: 1;
  /* Chrome */
  -ms-flex: 1;
  /* IE 10 */
  flex: 1;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.flex-2 {
  -webkit-box-flex: 2;
  /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 2;
  /* OLD - Firefox 19- */
  -webkit-flex: 2;
  /* Chrome */
  -ms-flex: 2;
  /* IE 10 */
  flex: 2;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.flex-3 {
  -webkit-box-flex: 3;
  /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 3;
  /* OLD - Firefox 19- */
  -webkit-flex: 3;
  /* Chrome */
  -ms-flex: 3;
  /* IE 10 */
  flex: 3;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.flex-4 {
  -webkit-box-flex: 4;
  /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 4;
  /* OLD - Firefox 19- */
  -webkit-flex: 4;
  /* Chrome */
  -ms-flex: 4;
  /* IE 10 */
  flex: 4;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.flex-5 {
  -webkit-box-flex: 5;
  /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 5;
  /* OLD - Firefox 19- */
  -webkit-flex: 5;
  /* Chrome */
  -ms-flex: 5;
  /* IE 10 */
  flex: 5;
  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

/* 可以覆盖flex中的flex-shrink属性值 */
.flex-no-shrink {
  -moz-box-flex: 0;
  -webkit-box-flex: 0;
  box-flex: 0;
  -moz-flex-shrink: 0;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
}
```
