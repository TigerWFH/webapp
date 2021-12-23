# chrome devtools

## Elements（元素面板）：操作 DOM 和 CSS 样式，自由迭代布局和设计页面

## Console（控制台面板）：记录 debug 信息，并用 shell 与页面 JS 进行交互

## Network（网络面板）：了解请求和下载的资源文件并优化网络加载性能

## Sources（源代码面板）：debug javascript 或者连接本地文件用于实时编辑，持久化保存

## performance（性能面板，原时间线面板）：记录查看网站生命周期内发生的各种事件，并进行分析性能瓶颈

## Memory（内存面板，原分析面板）：比性能面板提供更多信息，分析 JS 执行时间，分析内存泄露

## JavascriptProfiler

## Application（应用面板，原资源面板）：检查加载的所有资源，包括 IndexDB，WebSQL，本地和会话存储，cookie，应用缓存，图像，字体，样式表

## Security（安全面板）：调试混合内容问题，证书问题等

## Audit（lighthouse，开源自动化工具，用于改进网络应用的质量）：审查网址，这对当前网址自己进行一些列的测试，并生成报告

## Layers<https://umaar.github.io/devtools-nov-2013/>This panel displays all active compositing layers of the current page as a tree. When you pick a layer, you’ll see information such as its size, memory consumption, repaint count and reason for being composited

```js
/**
 * What is a layer? A portion of the page uploaded to the GPU for compositing.
 * Reasons include：
 *  3D/perspective CSS properties
 *  Certain video/canvas elements
 *  A few more which can change at any time
 *
 * How to use the layers panel
 *  Currently an experimental feature
 *  I shoul be promoted to a layer
 *  Element dimensions, memory estimates, reasons for compositing and more
 *  Show composited layer borders
 *
 *
 *
 */
```

## Redux

## More Tools

## Animations

## Changes

## Coverage

## Newwork conditions

## Performance monitor

## Quick source

## Remote devices

## Rendering

## Request blocking

## Search

## Sensors

## Whats new

## more ---> more tools ---> rending ---> Layer borders

```js
// Shows layer borders(orange/olive) and tiles(cyan)
// layer边界（橙色、黄褐色）
// tiles瓦片（青色）
```

## 关于渲染层的一些资料

- `合成层：`W3C 规范没有 Compositing，Compositing 仅仅是浏览器厂商自己尝试的优化技术，它的实现依赖于浏览器厂商自身
- `to optimize the compositing, the browser has to ensure that animated CSS property`:
  does not affect the documents flow

  does not depend on the documents flow

  does not cause a repaint

```js
/**
 * top,left,em,vh等可能会是百分比值，会依赖offsetParent，即使是compositing也会引起reflow
 * 而transform,opacity是唯一的满足没有依赖的两个css样式
 *
 * 提升性能原因：
 * Because the browser sees that none of the properties would cause a reflow or repaint, it can apply a compositing optimization: painting two images as compositing layers and sending them to the GPU
 *
 * 到底是如何提升性能的？
 * Everything seems pretty clear and easy, right? What problems could we run into? Let’s see how this optimization really works.
 *
 * It might surprise you, but the GPU is a separate computer
 *
 * a special GPU-compositing mode isn’t a part of the CSS specification; it’s just an optimization that the browser applies internally. We must have A appear on top of B exactly in that order, as defined by z-index
 *
 * demo:
 * <div>
 *  <div>A</div> // z-index: 2
 *  <div>B</div> // z-index: 1
 * </div>
 *
 * 展示顺序（面向屏幕）：A --> B(html)
 * 如果A生成新compositing layer，按照展示优先级（z-index影响），B和html会生成一个layer，A会生成一个layer，不影响展示顺序
 * 如果B生成新compositing ，按照展示优先级（z-index影响），B生成一个layer，B上的A也会生成一个layer，B下面的html页会生成一个layer
 *
 * 以上就是implicit compositing，One or more non-composited elements that should appear above a composited one in the stacking order are promoted to composite layers — i.e. painted to separate images that are then sent to the GPU.
 *
 * 可能造成implicit compositing的原因：
 *  3D transform: translate3d, translateX等等
 *  video,canvas,iframe元素
 *  animation of transform and opacity via Element.animate()
 *  animation of transform and opacity via Css transitions and animations
 *  position: fixed
 *  will-change
 *  filter
 *
 * extra repaints, which causes data transfer to the GPU as well, and extra memory consumption. So, all optimization tips below will focus on these very problems
 * Optimization Tips：
 *
 *  AVOID IMPLICIT COMPOSITING: 消除explicit compositing带来的副作用
 *      1、Try to keep animated objects as high as possible in the z-index
 *      2、You can give browser a hint that you’re going to use compositing with the will-change CSS property. With this property set on an element, the browser will (but not always!) promote it to a compositing layer in advance, so that the animation can start and stop smoothly. But don’t misuse this property, or else you’ll end up with a tremendous increase in memory consumption!
 *  REDUCE SIZE OF COMPOSITE LAYER
 *  USE CSS TRANSITIONS AND ANIMATIONS WHENEVER POSSIBLE
 *
 *
 * CSS-based animation has a very important feature: It works entirely on the GPU. Because you declare how an animation should start and finish, the browser can prepare all of the required instructions ahead of the animation’s start and send them to the GPU.In the case of imperative JavaScript, all that the browser knows for sure is the state of the current frame
 */
```

[渲染层](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
[渲染层 2](https://blog.csdn.net/weixin_34268310/article/details/88859536)
