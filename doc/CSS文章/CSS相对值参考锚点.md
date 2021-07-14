# CSS中的百分比参考锚点
```
作者：boring
链接：https://www.zhihu.com/question/36079531/answer/65809167

相对于父级宽度的：
    max-width、min-width、width、left、right、text-indent、padding、margin、grid-template-columns、grid-auto-columns、column-gap 等；
    
相对于父级高度的：max-height、min-height、height、top、bottom、grid-template-rows、grid-auto-rows、row-gap 等；相对于主轴长度的：flex-basis 等；相对于继承字号的：font-size 等；

相对于自身字号的：line-height 等；

相对于自身宽高的：border-radius、background-size、border-image-width、transform: translate()、transform-origin、zoom、clip-path 等；相对于行高的：vertical-align 等；

特殊算法的：background-position （方向长度 / 该方向除背景图之外部分总长度）、border-image-slice （相对于图片尺寸）、filter 系列函数等；如果自身设置 position: absolute，“父级”指：Boring：破坏文档流的div高度设为百分比是相对谁而言的？；如果 position: fixed，“父级”指视口（父级不存在 transform 为非 none 值的情况下）。
```