# 关于文字
## 术语：[参考资料](http://designwithfontforge.com/zh-CN/What_Is_a_Font.html)
### 符号（Semiotics）：在一种认知系统中，符号是指代一定意义的意象，可以是圆形图像、文字组合也可以是声音信号、建筑造型，甚至是一种思想文化等等
### 文字（text）：原始文字是人类用来记录特定事物、简化图像而成的书写符号，算是符号集合的子集
```
    文字的分类：
    表意文字（象形文字，以形表意的文字），和发音没有关系
    表音文字（以形表音的文字），外形表示发音
    意音文字（即表形又表音）
    常见文字：拉丁字母（欧美）、阿拉伯字母（中东）、西里尔字母（俄罗斯、乌克兰）、梵文字母（古印度）、汉字系统（汉字、日语假名、谚文、台湾使用的注音符号）
```
### 语言：根据现代语言学的定义，它是一个符号系统，是一个有限的符号和规则的集合
```
    其中的符号一般被称为文字，规则被称为文法
    例如哑语（手势）、盲语（凸起的文字）
```
### 语言学中的文字(script)、书写系统(writing system)和语言(language)的定义
```
    Unicode定义：（知乎-梁海）
        Writing System: A set of rules for using one or more scripts to write a particular language.
        Examples include the American English writing system, the British English writing system, the French wirting system, and the Japanese writing system.
        书写系统：用一种或多种文字来书写某种语言的一套规则。例如美式英语书写系统、英式英语书写系统、法语书写系统以及日语书写系统。

        Script: A collection of letters and other written signs used to represent textural infomation in one or more writing systems. For example，Russian is written with a subset of the Cyrillic script.
        Ukranian is written with a different subset.The Japanese writing system use several scripts.
        文字：在一个或多个书写系统中用于表示文字信息的一套字母以及其它书写符号。例如，俄语以西里尔文字（西里尔字母，字母是文字的一类）的一个子集书写，而乌克兰以另一个不同的子集书写（日语书写系统包含汉字、平假名、片假名，拉丁字母也算在内）。

        广义上的文字（script）：是指符号集合，一个符号系统可以使用多种媒介表达，声音、视觉、触觉等等。所以，广义的文字包括语音、手势、书写文字

        语言：根据现代语言学的定义，它是一个符号系统，是一个有限的符号和规则的集合。其中的符号一般被称为文字，规则被称为文法。
            例如哑语（手势）、盲语（凸起的文字）
        
        书写系统：符号和规则的集合。
        书写系统 是 文字 和 语言 碰撞的地带。
```
### 字母系统：字母和规则的集合
### 字位：是书写系统的一个特殊基础单位，是最小的有意义元素，在字母系统中就是一个字母
### 字母（letter）：是字母系统中的字位，用独立的子音和母音来构成字词的书写系统，是书写时最基本的单位
### 字母表（alphabet）：letter的集合
# 关于字体设计
### 字符（character，字元）：在计算机和电信领域中，字符是一个信息单位，基本上对应于语言系统中的字位即字母、汉字、假名、韩文字
### 字形(glyph、字符)：指单个字的形体（就是符号），语言系统中符号的形状（笔画构成）
```
    对比(contrast)：指的是一个字形内能够找到多少笔画宽度的变化
    茎(Stems)：字形中竖直部分
    连接(Joins)：不同线条连接处
    弧(Bowls)：闭合空间的弧线笔画
    末端(Terminals)：笔画的终端部分（可以做衬线）
```
### 字型(font)：排版印刷学和书法领域的专业术语，是指印刷行业中某一整套具有 同样样式（style）、字重（wight）、和尺码（size）的字形（glyph），例如一整套用于正文的宋体5号字、一套用于标题的10号字就叫一套字型，可以理解为一个语言系统(script)中所有的符号
```
    1、电脑早期使用 点阵字（类似金属印刷版、活字印刷版），根据点阵数确定字体大小。一套字型（font）则是指一整套15*16点数的字形（glyph）集合或者是一整套24*24点数的字形集合（glyph）
    2、向量字型出现以后，同一套风格字型（font）已不用制作不同点数字型（font），一套即可以随意缩放成不同的字型(font)，至此字型（font）和字体（typeface，font-family）界限开始模糊
    3、字型特点有风格（style）、字重（weight）、尺寸（size）等特性
    3-1、风格（style）：斜体（italic type，意大利斜体）和伪斜体（oblique type）
    3-2、尺寸(点阵数，对应size)
    3-3、字重（weight）：指相对于字体高度的笔画(strok width)粗细程度，一个字体(typeface)的某个字型(font)的字重常常至少      4-6个，其中正常和黑体几乎是必须的
            100（淡体、thin、hairline）
            200（特细、extra-light、ultra-light）
            300（细体、light）
            350（次细、demi-light）
            400（标准、regular、normal、book、plain）
            500（适中、medium）
            600（次粗、demi-bold、semi-bold）
            700（粗体、bold）
            800（特粗、extra-bold、extra）
            900（黑体、black、heavy）
            950（特黑体、extra-black、ultra-black）
```
### 字体(typeface, font-family, 字型族)：多个不同的字型集合
### 关于EM Square(EM Size,UPM)`
* 字模：印刷术中承载字形的模具，西文字母模具依据宽高相等M而作，故又有EM Square之称
* 字模的高度称为"em"
* 在数字化字体中，em是一个相对量，单位是1。在OpenType中，EM（UPM）大小是1000*1000；在TrueType中，则是1024*1024或者2048*2048
### 五线格基础：高度都是相对于baseline的
![五线格图示](./imgs/file-line.png)
```
    Ascender Line：小写字母b、d、f、h、i、j、k、l、t等向上延伸最高线
    Cap-Height Line：大写字母最高点所在线
    x-height Line：小写字母x最高点所在的线
    Base-Line：大小写字母的基准线
    Descender Line：小写字母g、p、q、y等字母向下延伸最低点所在线
```
* Ascender：小写字母的升部（小写字母超出x-height的部分，一般高于Cap高度）
* Descender：小写字母的降部（小写字母低于baseline的部分）
* Ascent：EM中Ascender Line到Baseline的距离
* Cap-Height：EM中Cap-Line到Baseline的距离
* X-Height：EM中X-Line到Baseline的距离
* Descent：EM中Descender Line到Baseline的距离
### 工具
* [FontForge：可以设计字体，查看已有字体的信息，严格遵守OpenType标准](https://github.com/fontforge/fontforge/releases)
* [Glypha](https://glyphsapp.com/)
* [RoboFont](https://robofont.com/)
* [FontLab Studio](https://www.fontlab.com/font-editor/fontlab-studio/)
* [FontLab new](https://www.fontlab.com/font-editor/fontlab/)
```
    字体信息与元素局查看：菜单栏---》Element---》Font Info
```
![菜单栏](./imgs/menu.png)
![信息栏](./imgs/info.png)
* [一些参数](http://designwithfontforge.com/zh-CN/Line_Spacing.html)
```
    General：中的Ascent和Descent和，应该等于Em Size
    OS/2：中的Metrics信息栏
            Win Ascent [Offset]:
            Win Descent [Offset]:
            Typo Ascent [Offset]:
            Typo Descent [Offset]:
            Typo Line Gap:
            HHead Ascent [Offset]:
            HHead Descent [Offset]:
            HHead Line Gap:
    Win：
    Typo：
    HHead：
```
# css属性：CSS Fonts是一个CSS模块，定义字体相关的属性和字体资源的加载
[CSS Fonts](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Fonts)
* `@font-face`规则：指定一个用于显示文本的自定义字体，可以加载远程服务器上的字体或者本地已安装的字体
```
    1、@font-face用在CSS的顶层
    2、@font-face可以用在CSS条件组中
    3、受同域限制
    @font-face {
        [ font-family: <family-name>; ] ||
        [ src: <src> [<format>]; ] ||
        [ unicode-range: <unicode-range>; ] ||
        [ font-variant: <font-variant>; ] ||
        [ font-feature-settings: <font-feature-settings>; ] ||
        [ font-variation-settings: <font-variation-settings>; ] ||
        [ font-stretch: <font-stretch>; ] ||
        [ font-weight: <font-weight>; ] ||
        [ font-style: <font-style>; ]
    }
```
* src：[url('路径+字体名'),local('字体名')]
```
    src：指定字体文件存放路径，可以是相对路径或者绝对路径
    format：指定自定义字体的格式，主要用于帮助浏览器识别，主要有以下几种格式[embedded-opentype, truetype,woff,svg]
```
* `@font-feature-values`规则：
* `font`：是font-style，font-variant，font-weight，font-size，line-height和font-family的简写，或将元素的字体设置为系统字体
* `font-family`：允许开发者定义一个有序的，字体名或者字体族名组成的列表为选定元素设置字体，属性值用逗号隔开，[family-namily, genericc-name]
```
    预备知识：
        字体族：在字体设计上具有相关性的多种字体的集合
    family-name：字体族名
    generic-name：通用字体族名，[serif,sans-serif,monospace,cursive,fantasy,system-ui,math,emoji,fangsong]
        特殊说明：
            system-ui，从浏览器所处平台处获取的默认用户界面字体
            math，针对显示数学相关字符的特殊样式问题而设计的字体：支持上标和下标、跨行括号、嵌套表达式和具有不同含义的double struck glyphs
            emoji，专门用于呈现 Emoji 表情符号的字体
            fangsong，一种汉字字体，介于宋体和楷体之间
```
* `font-feature-settings`：用于控制OpenType字体中的高级印刷功能[normal, liga, tnum, smcp, zero]
```
    normal：文本使用默认设置进行布局
    "smcp" on：use small-cap alternate glyphs
    "c2sc", "smcp"：convert both upper and lowercase to small caps (affects punctuation also) 
    "hist"：enable historical forms 
    "liga" 0：disable common ligatures, usually on by default
    "tnum"：enable tabular (monospaced) figures
    "frac"：enable automatic fractions 
    "swsh" 2：use the second available swash character
    "ss07"：enable stylistic set 7
```
* `font-kerning`：设置是否使用字体中存储的字距信息。
```
    kerning（字距）：定义了字母的分布情况
    auto：浏览器决定是否使用字体间距。一些浏览器会在小字体情况下禁用字距，使得文本可读性下降。
    normal：必须使用字体中的字距信息
    none：禁用字体中的字距信息
    inherit：继承值
    initial：初始值
    unset：重置
```
* `font-language-override`：指定使用哪种语言
```
    默认，HTML的lang属性告知浏览器使用哪种语言
    normal：
    "ENG"：使用English glyphs
    "TRK"：使用Turkish glyphs
    string类型，似乎是国家码
    inherit：
    initial：
    unset：
```
* `font-size`：属性指定字体的大小。因为该属性的值会被用于计算em和ex长度单位，定义该值可能改变其他元素的大小
```
    像素：像素的大小是固定的。这是一个不取决于平台的、跨浏览器的准确设置字体大小高度为你所想的像素大小的方法
    em：em和ex单位值相对于父元素的字体大小
    ex：相对于字符x的高度
    rem：html元素的字体大小
```
* `font-size-adjust`：定义字体大小应取决于小写字母，而不是大写字母
```
    在字体较小时，字体的可读性主要由小写字母的大小决定，通过此选项即可进行调整。
```
* `font-stretch`
* `font-style`
* `font-synthesis`
* `font-variant`
* `font-variant-alternates`：废弃，控制替换字形，@font-feature-values指定替换字形
```
    normal:
    historical-forms:
    stylistic()
    styleset()
    character-variant()
    swash()
    ornaments()
    annotation()
```
* `font-variant-east-asign`：控制东亚替代字形，例如日语和汉语
```
    normal
    ruby
    <east-asian-variant-values>
    <east-asian-width-values>

```
* `font-variant-ligatures`：控制合字
[参考资料](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures)
```
    normal：
    none：
    common-ligatures：
    no-common-ligatures：
    discretionary-ligatures：
    no-discretionary-ligatures：
    historical-ligatures：
    no-historical-ligatures：
    contextual：
    no-contextual：
```
* `font-variant-numeric`
* `font-variant-position`
* `font-weight`：指定字体的粗细程度
```
    font-weight：normal(400)
    font-weight: bold(700)
```
* `line box`[参考资料](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting)
```
    In an inline formatting context, boxes are laid out horizontally, one after the other, beginning at the top of a containing block. Horizontal margins, borders, and padding are respected between these boxes. The boxes may be aligned vertically in different ways: their bottoms or tops may be aligned, or the baselines of text within them may be aligned. The rectangular area that contains the boxes that form a line is called a line box.
    inline-level box水平排列，包裹多个inline-level box的矩形区域被称为line box，但并不是containing block（容器）

```
```
```
* `line-height`
```
    1、line-height的计算方式：
        1-1：计算line box中的每一个inline-level box的高度。
            对于replaced elements、inline-block elements和inline-table elements，就是他们margin box的高度。
            对于inline boxes、就是对应line-height的高度
        1-2：inline-level boxes根据他们vertaical-align属性做垂直对齐。top或bottom对齐，会影响line box高度计  算，且css2.1并没有定义line box的baseline
        1-3：line box的高度是指最高的inline-level box的最高点到inline-level box的最低点的距离
        empty inline elements会生成empty inline boxes，和有内容的容器一样参与line height的高度
    2、对于block container element，它的内容是inline-level elements，所以line-height指定了block container element的最小高度,exactly as if each line box starts with a zero-width inline box with the element's font and line height properties. We call that imaginary box a "strut." (The name is inspired by TeX.).
    3、对于non-replaceed inline element，line-height指定了用于计算line box的高度

    实测结果：
        1、实测浏览器block中line-height并不是最小高度，当指定为1时，block不会撑开，高度就是1
        2、block中的line-height指定了自身content的高度，其中的inline-level box
        的line-height和block的line-height，合并重新计算高度
        3、vertical-align会影响line box的高度计算
        4、这一块高度计算很蛋疼，没法搞清楚
```
## 
* `字体(typefaces,font)：可以理解为一个语言系统(script)中所有的符号`
* 手写体(hand-writing)：
* 书法(calligraphy)：
* 印刷(lettering)：
* Logo：
* 结构(constrcution)：指的是形成特定字形的基础笔画的构造，即字形的骨架，线条终端和衬线不属于骨架，剩下的宽度、粗细、末端都是血肉的一部分
* 衬线(Serif)：末端的样式，通常字体的一级分类就是衬线和非衬线
* 字宽(Width)：一个字的整体宽度，字体的样式
* 粗细(Weight)：线条粗细，字体的样式
* 倾斜(Slant)：字体的样式
* 间距()：字间距

## 字体
* -apple-system      OSX ^10.11 & IOS ^9 San Francisco & 苹方

* "Helvetica Neue"   OSX 无衬线
* "Arial"            Win 无衬线 TyueType字体
* "Segoe UI"         Win ^8

* "Pingfang SC"      苹方（华康信凭黑）      OSX^10.11 & IOS ^9
* "Hiragino Sans GB" 冬青黑体               OSX ^10.6
* "STHeiti"          华文黑体               OSX <10.6 & IOS < 9

* "Microsoft YaHei"  微软雅黑               Win
* "Microsoft Jhenghei" 微软正黑             Win
* "Source Han Sans Sc" 思源黑体             SourceHan-begin
* "Noto Sans CJK SC"
* "Source Han Sans CN"
* "Noto Sans SC"
* "Source Han Sans TC"
* "Noto Sans CJK TC"                       SourceHan-end
* "WenQuanYi Micro Hei" 文泉驿微米黑        Linux
* "SimSun"              中易宋体            Win old
* "sans-serif"                             System Fallback

## css属性：CSS Fonts是一个CSS模块，定义字体相关的属性和字体资源的加载
* [github的font-family](https://csspod.com/using-the-system-font-in-web-content/)
```
     font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
     系统默认最佳字体：
     0、system-ui，系统默认字体
     1、-apple-system：用于调用系统默认的UI字体。system有可能成为标准，-apple是厂商前缀。
     2、BlinkMacSystemFont：用于指定MacOS上chrome应用系统UI字体
    
     3、定义已知的系统字体
        Segoe UI 面向 Windows 和 Windows Phone，vista以上的默认西文字体族，默认字体
        Roboto Android 及 较新的 Chrome OS，安卓系统的无衬线字体族
        Oxygen 面向 KDE、Ubuntu 等
        Fira Sans 面向 Firefox OS
        Droid Sans 面向老版本 Android

        Helvetica、Arial用于向前兼容

    4、Helvetica Neue El Capitan 之前的 macOS 系统 UI 字体
    5、sans-serif 字体回退
```

* 单位em、rem、px
```
    单位em就是字号，即font-size,单位可以选px（像素）或pt（磅），至于px和pt如何转换到mm等单位上，和PPI之类的有关（1inch=72pt）
```
* 字体特性（font feature）或变体（variant）指的是同一个OpenType字体中包含的不同的字形或字母风格，包括连字（fi）、字偶距（Kerning，调整特定字母组合的间距）、分数形式、数字风格等，见font-feature-settings
* 字体的样式（样式、尺寸大小、字体宽度）
```
    1、font: 2-7属性的简写形式，具有顺序性
    2、font-style: 属性允许你选择 font-family 字体下的 italic 或 oblique 样式
    3、font-variant:
    4、font-weight:  属性指定了字体的粗细程度。 一些字体只提供 normal 和 bold 两种值
    5、font-size: 属性指定字体的大小。因为该属性的值会被用于计算em和ex长度单位，定义该值可能改变其他元素的大小。
    6、line-height: 对于块级元素，它指定元素行盒（line boxes）的最小高度; 对于非替代的 inline 元素，它用于计算行盒（line box）的高度。
    7、font-family:  允许您通过给定一个有先后顺序的，由 字体名 或者 字体族名 组成的列表来为选定的元素设置字体
    8、font-stretch: 属性为字体定义一个正常或经过伸缩变形的字体外观，这个属性并不会通过伸展/缩小而改变字体的几何外形
    9、font-size-adjust: CSS属性定义字体大小应取决于小写字母，而不是大写字母。在字体较小时，字体的可读性主要由小写字母的大小决定，通过此选项即可进行调整。
    10、font-kerning: 字偶间距，特定字符组合内部的间距（letter-spacing，是词距）
```
注意：
1、CSS Fonts Module 3 定义了5个通用字体族名：serif（衬线字体族）、sans-serif（非衬线字体族）、monospace（等宽字体族）、cursive（草书字体）、fantasy（艺术效果的问题）
2、CSS Fonts Module 4 定义了新属性值：system-ui(系统默认UI字体)、emoji（用于兼容emoji表情）、math（数学公式）、fangsong（用于中文的仿宋字体）
* 字形的变体（加粗、斜体等等）
## 测试字体
* window平台常用字体：
* Mac平台常用字体：
## 结论
```
    结论一：
        window平台字体渲染的实际尺寸大小为：Math.ceil(（win ascent + win descent）* font-size / em);
        window平台没有gap属性，且descent是正值
    结论二：
        Mac平台字体渲染的实际尺寸大小为：Math.round(((hhead ascent + Math.abs(hhead descent) ）* font-size / em).toFixed(1));
        对Pingfang SC的fontSize设置了14,20,30等数据，发现gap参数并没有参与到计算中，推测gap值已经包含在ascent+descent中
        Mac平台，Helvetica Neue字体，div和span渲染高度不一样（font-size=24）
```