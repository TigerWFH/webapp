[原文链接](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
# 发布时间: 2016.12.9
# 作者：Sergey Chikuyonok（Russian front-end web-developer）
# CSS GPU Animation: Doing It Right
```
    摘要：本文目的是帮助读者更好的理解浏览器是如何使用GPU进行渲染的，了解以后你就可以创建出能够在各种设备上运行良好的令人印象深刻的网站

    目前，大部分读者都已经知道了现代浏览器可以使用GPU渲染一部分网页，尤其是使用动画效果的场景。例如，使用transforms属性做的动画要比使用left和top属性做的动画运行起来更流畅。但如果你问“我如何使用GPU制作出流畅的动画？”，大部分情况下你得到的回答就是，使用"transform: translateX(0)"或者"will-change: transform" css属性。这些属性成了类似IE6中用于使用GPU渲染动画的的zoom:1属性，或者compositing，这是浏览器厂商的称呼。

    但是，有时候在简单的demo中运行很流畅效果很不错的动画在真实场景会变得很慢，就会引起视觉问题，甚至造成浏览器crash。为什么会发生这种异常情况？如何修复？详情看下文。

    严重声明

    在我们更深的探索GPU compositing之前，我要告诉你一个重要的事情，这就是一个巨大大的hack技术。你在W3C的技术规范中根本找不到任何有关compositing如何工作的内容，如何将一个元素放到一个compositing layer，连如何compositing的资料都没有。这仅仅是浏览器用于执行特定任务事后做的优化，每一个浏览器厂商都会有自己的实现方案。
    本文中的经验并不是官方文档，而是作者自身实践经验。你必须明白，有些东西可能是完全错的，也可能会过时。

    Compositing是如何工作的

    为了优化compositing，浏览器必须保证CSS动画属性1、不能影响文档流(docuemnts flow)，2、不能依赖文档流，3、不能引起repaint

    GPU payload：
    Paint each compositing layer to a separate image
    Prepare the layer data(size, offset, opacity, etc)
    Prepare shaders for the animation(if applicable)
    Send the data to the GPU
    
    给一个element使用transform: translateZ(0)或者will-change: transform属性，就是构建GPU payload处理流程一样。repaiting是很消耗性能的。

    Implicit Compositing(隐式组合): A元素生成独立layer，B元素本身没有生成独立的layer，但是受A元素的影响（例如z-idnex叠加顺序的影响，B元素会被浏览器提升成一个独立的layer）的场景，就是implicit compositiong。

    浏览器会因为各种原因讲一个元素提升为compositing layer，一下是一些原因：
        3D变换：translate3d, translateX等等
        video、canvas、iframe元素
        通过Element.animation()使用动画的transform和opacity属性
        通过CSS的transition和animation属性使用动画的transform和opacity属性
        窗口定位：position：fixed
        will-change
        filter
    
    GPU加速，会消耗额外的内存（对移动端影响较大）

    GPU动画加速的优劣：
    优势：
        在60Hz下，动画比较快，比较流畅
        动画在独立的线程工作，不会应为JS计算量过大而被阻塞
        3D变化比较cheap
    劣势：
        当提升普通元素为compositing layer时，需要额外的repaiting，消耗性能
        已经绘制好的元素（初始不是compositing layer，动画被转成layer）被转换成compositing layer时，需要将对应的数据传递给GPU，性能受数据规模影响
        每一个compositing layer都会消耗额外的内存。过度消耗内存会引起crash
        如果不处理好implicit compositing，会引起很多问题
        某些场景下，会丢失视觉效果
    
    使用GPU会产生两个问题，额外的repaint，需要将数据传递给GPU进行渲染；另外就是内存消耗
    优化建议：
        设置好环境，我们就可以开始优化compositing layer了。我们已经去人两个主要待优化的点：额外的repaints（需要CPU将准备好的数据，将数据传递给GPU进行repaint，然后compositing）和额外的内存消耗，所以所有的优化都是针对这两点来做的。
        一、AVOID IMPLICIT COMPOSITING 避免隐式的层组合，减少repaint和内存消耗
        demo：用户交互才会引起compositing layer
            <!-- css -->
            .a, .b {
                position: absolute;
                width: 90px;
                height: 90px;
                transition: transform 1s;
                font-size: 90px;
                line-height: 90px;
                text-align: center;
                color: #fff;
                font-family: sans-serif;
            }
            .a {
                z-index: 1;
                background: red;
                left: 30px;
                top: 110px;
            }
            .b {
                z-index: 2;
                background: blue;
            }
            .a::before {
                content: "A";
            }
            .b::before {
                content: "B"
            }
            .animate .a {
                transform: translateX(100px);
            }
            button {
                position: relative;
                top: 210px;
            }
            <!-- html -->
            <div class="a"></div>
            <div class="b"></div>
            <button onclick="document.body.classList.toggle("animation")"></button>
            下面是浏览器compositing layer过程：
            1、页面加载后，没有触发compositing的属性，浏览器就将所有的元素渲染到background layer上
            2、用户点击play按钮，显示为A增加transform: translateX(100px)(2D属性会在运行中触发compositing layer的创建)属性，运行中浏览器为A创建独立的compositing layer，但是A在B之下（z-index），浏览器会隐式的为B创建独立的compositing layer（这就是implicit compositing）
            3、为B创建独立的layer，就会引起repaint。浏览器需要创建新的texture，并从background layer上移除B（repaint）
            4、新的texture数据需要传递给GPU并生成最终的layer，性能消耗与变动元素的数据规模正相关。性能消耗过大，有可能会引起页面闪烁。
            5、动画结束，A的transform的2D变换停止运行，layer被销毁，随之B的layer也被销毁，A和B会被重新repaint到background layer上。以上步骤可能会引起页面闪烁

            为了避免implicit compositing问题，并减少视觉故障，建议以下步骤：
            1、将动画元素的z-index属性尽量提升到最大值。理想情况下，这些元素应该成为body的直接子节点。当然情况不一定这么理想。当元素嵌套过深而且无法依赖正常的文档流时，你可以克隆这个元素，并把它作为body的直接子节点并用来做动画。
            2、可以使用CSS属性will-change告知浏览器即将compositing的元素。对于有这个属性的元素，浏览器就会（并不总是这样）提前为他创建layer，这样一来动画开始和结束都会很流畅。但是不要滥用这个属性，因为这样很消耗内存，甚至引起crash。
        二、尽量只是用animation的transform和opacity属性
            transform和opacity属性，能够确保即不受正常文档流元素的影响，也不会受DOM环境的影响。这两个属性不会引起reflow和repaint，这样的动画可以直接使用GPU（没明白）。这样，你就可以高效的使用动画的移动，缩放，旋转，透明度以及仿射变换。有时候，你可以使用这些属性模拟一些动画。
            demo：背景色的透明变化，最基础的就是使用transition属性
            <!-- html -->
            <div id="bg-change"></div>
            <!-- css -->
            <style>
                #bg-change {
                    width: 100px;
                    height: 100px;
                    background: red;
                    transition: background 0.4s;
                }
                #bg-change:hover {
                    background: blue;
                }
            </style>
            在这个Demo中，animation是完全工作在CPU上的。每一步都会repaint。可以使用GPU代替。添加一个layer，改变opacity
            <div id="bg-change"></div>
            <style type="text/css">
                #bg-change {
                    width: 100px;
                    height: 100px;
                    background: red;
                }
                #bg-change:hover {
                    background: blue;
                    opacity: 0;
                    transition: opacity 0.4s;
                }
                <!-- #bg-change:hover::before {
                    opacity: 1;
                } -->
            </style>

            经实际测试，GPU样式总共repaint97次；CPU样式总共repaint333次。GPU的animation更流畅。
        三、REDUCE SIZE OF COMPOSITE LAYER（降低layer的尺寸）
            Demo：
            <div id="a"></div>
            <div id="b"></div>

            <style>
                #a,#b {
                    will-change: transform; // 直接创建layer
                }
                #a {
                    width: 100px;
                    height: 100px;
                }
                #b {
                    width: 10px;
                    height: 10px;
                    transform: scale(10);
                }
            </style>
            #a的物理尺寸是100*100像素，共计100*100*4=40000bytes，而#b只有10*10像素，共计10*10*4=400bytes，然后缩放到100*100。技巧很简单，就在于降低实际像素尺寸，然后进行缩放，以降低数据量，降低了内存消耗。同样的，可以用于图片
        四、尽量使用CSS的transitions和animations属性
            可以使用CSS属性中transition用于改变transform或opacity属性或者animation属性，会自动创建layer，使用GPU渲染。也可以使用JS的animate，但是需要为目标属性添加transform: traslateZ(0)或will-change: transform,opacity等属性，保证元素获得自己的layer。JS的动画应该在requestAnimationFrame的callback中计算得出并运行。Element.animation()和CSS属性中的animation有很大的不同。

            JS可以创建复杂的动画，也是唯一能够用于交互的。CSS动画很JS动画那个更好？

            基于CSS的动画，完全工作在GPU上；
            JS动画，我们只知道当前frame的数据，并且需要实时传递数据给GPU，会很慢。

            尽量使用基于CSS的动画效果，CSS动画不但很快，也不会被block
        五、真实案例
```

## 词汇
```
    flicker：闪烁
    3D 和 2D transform 的区别就在于，浏览器在页面渲染前为3D动画创建独立的复合图层，而在运行期间为2D动画创建。动画开始时，生成新的复合图层并加载为GPU的纹理用于初始化 repaint。然后由GPU的复合器操纵整个动画的执行。最后当动画结束时，再次执行 repaint 操作删除复合图层（https://www.cnblogs.com/wangqiao170/p/10729692.html）
    强制使用GPU渲染：
        transform: translateZ(0)
        transform: rotateZ(0)
    开启GPU加速，可能会引起页面闪烁（flicker），解决方案：
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
```