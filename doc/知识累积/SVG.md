# SVG 和 X6 和 jsplumb

## SVG(Scalable Vector Graphics)，可缩放矢量图形，是一种用于描述二维的矢量图形，基于 XML 的标记语言

> 可以和 CSS、DOM、JavaScript、SMIL 等无缝衔接
>
> SVG 图像是使用各种元素创建的，这些元素分别应用于矢量图像的结构、绘制与布局<https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element>

### SVG 属性

#### 核心属性

> id, lang, tabindex, xml:base, xml:lang, xml:space

#### 样式属性

> class, style

#### 显示属性（所有 SVG 显示属性都可以作为 CSS 属性使用）<https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/Presentation>

> alignment-baseline, baseline-shift, clip, clip-path, clip-rule, color, color-profile, cusor, direction, display, fill, stroke,...

### SVG 元素

#### 容器元素

- `svg`
- `defs`
- `g`
- `a`

#### 图形元素

- `path`实现了 SVGPathElement 接口，创建线条, 曲线, 弧形
  - `专有属性d:`命令+参数形式，属性 d 采用的是用户坐标系统，所以不需标明单位
    - `M 命令：`移动画笔
    - `L 命令：`画直线
    - `H 命令：`水平直线
    - `V 命令：`垂直直线
    - `Z 命令：`闭合路径命令，d="M10 10 H 90 V 90 H 10 Z"
    - `C（S） 命令：`三次贝塞尔曲线命令，C x1 y1, x2 y2, x y
    - `Q（T） 命令：`二次贝塞尔曲线命令，Q x1 y1, x y
    - `A 命令：`弧线命令
  - `专有属性pathLength`
- `circle`
- `line`
- `ellipse`
- `polygon`
- `polyline`
- `rect`

#### 非渲染元素

- `script`
- `style`
- `title`
- `symbol`
