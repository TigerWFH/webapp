# 关于字体

## em（rem）

- 磅（pound）：打印的字符的高度的度量单位。1 磅约等于 1/72 英寸，大约是 1/28 厘米
- 默认 1em 等于 16px，即 font-size: 16px;
- `EM Square(EM Size, UPM)`

```
    在传统的印刷行业中，每一个字符都放置在一个空间容器中（泥块、木块、金属块）。每个字符的高度是统一，这样每一个字模可以整齐的放进一行或块中。
```

![](./imgs/first.jpg)

```
字模的高度被称为em（equal M？），起源于大写字符M的宽度，这个字母的比例被做成了方形，因此有了EM Square的称呼。基本上em和磅是1：1对应的，即10磅的字体对应的EM Size也是10。
```

- `数字化的字体设计`

```
    在数字化字体中，em是空间数字化定义总量，可以理解为虚拟字模的高度就是1em。在OpenType中大约是1000个单位，在TrueType中，约定是2的幂，通常是1024或2048个单位。浏览器默认情况下1em=16px。
```

- `字型(font)和字体(typeface、font-family)`

```
    在传统的印刷行业中，某一整套具有 同样样式（style）、字重（wight）、和尺码（size）的字形（glyph），为字型（font）
    多个不同的字型集合就是字体(typeface、font-family)
```

## 字体设计的无线格

![五线格展示](./imgs/file-line.png)

- `认识五条线`

```
    Ascender Line：小写字母b、d、f、h、i、j、k、l、t等向上延伸最高线
    Cap-Height Line：大写字母最高点所在线
    X-Height Line：小写字母x最高点所在的线
    Base-Line：大小写字母的基准线
    Descender Line：小写字母g、p、q、y等字母向下延伸最低点所在线

    Ascender：小写字母的升部（小写字母超出x-height的部分，一般高于Cap高度）
    Descender：小写字母的降部（小写字母低于baseline的部分）
```

- `高度定义`

```
    X-Height：EM中X-Height Line到Baseline的距离
    Cap-Height：EM中Cap-Height Line到Baseline的距离
    Ascent：EM中Ascender Line到Baseline的距离
    Descent：EM中Descender Line到Baseline的距离
```

## 获取字体信息

- `工具: FontForge`
  [工具](https://github.com/fontforge/fontforge/releases)
- `获取helvetica字体信息`
  ![helvetica字体信息](../src/pages/demos/components/Font/res/helvetica-1.png)
  ![helvetica字体信息](../src/pages/demos/components/Font/res/helvetica-2.png)
- `获取PingFangSC字体信息`
  ![PingFangSC字体信息](../src/pages/demos/components/Font/res/pingfangsc-1.png)
  ![PingFangSC字体信息](../src/pages/demos/components/Font/res/pingfangsc-2.png)

## font-size 属性

```
    MDN: font-size css属性指定字体的大小。该属性的值会被用于计算em和ex（相对于字符x的高度，通常为字体尺寸的一半）长度的单位。
```

## 计算实际渲染尺寸，以 px 为单位

- `计算公式`

```
    (Ascent + Descent)/em虚拟单位大小 * font-size
```

## 实验结果

[demo](http://127.0.0.1:3000#/demos)

## 字体渲染引擎：说到底字符也是图形，字符的渲染实际上就是图形渲染

- `window平台：`微软认为，字符的形状应和像素契合，以防止模糊，提高可读性，即便扭曲了字体的构造

```
    windows平台提供了GDI、GDI+和DirectWrite
    GDI又分为GDI Grayscale（灰阶api）和GDI ClearType（亚像素渲染api）
    DirectWrite是基于亚像素api的文字渲染引擎，对文字做了垂直方向的边缘优化
    chrome37以上版本已经采用最新的DirectWrite Api对字体进行渲染

    MacType则是网友FlyingSnow在GDI++的基础上持续开发的一个用在window平台的字体渲染引擎，用于实现Mac平台上的字体渲染效果
```

- `Mac平台：`苹果认为，字符渲染的目标尽可能还原字体的设计，即便造成字体模糊

```
    OSX平台则是quartz（石英）引擎对字体进行渲染
```

## 字体规范

- `type1和打印语言postscript：`Adobe 私有
- `TrueType,ttf：`Apple 和 Microsoft
- `EOT-Embedded Open Type，eot：`嵌入式字体，Microsoft
- `OpenType,otf：`Microsoft 和 Adobe
- `web开发字体格式,woff：`基于 OpenType 和 TrueType
- `SVG Fonts,svg`

[demo](../src/components/IconFont/fonts/iconfont.css)
