/*
Svg标签foreignObject
<svg xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="120" height="50">
        <body xmlns="http://www.w3.org/1999/xhtml">
            <p>
                Hello World
            </p>
        </body>
    </foreignObject>
</svg>
X6正是借助该标签，可以渲染html、react、vue等。根本在html
自定义X6节点：使用html
    不需要辅助，直接使用
*/
import { Graph } from '@antv/x6'

const graph = new Graph({
    width: 800,
    height: 800
});

const source = graph.addNode({
    x: 40,
    y: 40,
    width: 100,
    height: 40,
    shape: 'html',
    html() {
        return 'html'
    }
})
