# Carousel([ˌkærəˈsel])：css3实现的Banner

## CSS3 backface-visible与overflow属性冲突,影响的是当前元素的三维空间（即影响直接子元素）
* 问题描述：
    设置了backface-visible: hidden;overflow: hidden;的元素翻转180度后背面没有被隐藏。
* 原因描述：overflow等属性会导致backface-visible属性失效
[详情](https://blog.csdn.net/weixin_30448603/article/details/97811845)
[详情2](https://codepen.io/thebabydino/details/rACbl)
## the following css属性值会要求userAgent为在后代元素applied之前创建 扁平 渲染环境，会覆盖transform-style: preserve-3的效果
* `overflow`：除了visible的任何值
* `filter`：除了none之外的任何值
* `clip`：除了auto之外的任何值
* `clip-path`：除了none之外的任何值
* `isolation`：isolate值
* `mask-image`：除了none之外的任何值
* `mask-box-source`：除了none之外的任何值
* `mix-blend-mode`：除了normal之外的任何值