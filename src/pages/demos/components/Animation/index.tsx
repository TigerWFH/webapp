/*
欧几里得几何 有时单指平面上的几何，即平面几何。
欧式空间（笛卡尔空间）描述2D/3D很适合，但不适合处理透视空间
欧氏几何是透视几何的一个子集合
平面笛卡尔坐标系：是直角坐标系和斜坐标系的统称。
    相交于原点的两条数轴，构成了平面放射坐标系。
    如两条数轴上的度量单位相等，则称此放射坐标系为 笛卡尔坐标系。
    两条数轴互相垂直的笛卡尔坐标系，称为 笛卡尔直角坐标系，否则称为 笛卡尔斜角坐标系。
空间笛卡尔坐标系：放射坐标系和笛卡尔坐标系由平面向空间的推广：相交于原点的三条不共面的数轴构成空间的放射坐标系。
    三条数轴上度量单位相等的放射坐标系被称为空间笛卡尔坐标系。
    三条数轴互相垂直的笛卡尔坐标系被称为空间笛卡尔直角坐标系，否则被称为空间笛卡尔斜角坐标系。

齐次坐标：就是用N+1维代表N维坐标(https://www.zhihu.com/question/59595799/answer/301242100)
    我们可以在一个2D笛卡尔坐标系末尾增加一个额外的变量w来形成2D齐次坐标，因此，一个点(X,Y)在
    齐次坐标里就成了(x,y,w)且X=x/w,Y=y/w
把齐次坐标转化为笛卡尔坐标的方法是前面n-1个坐标分量分别除以最后一个分量即可
点：(x,y,z,1)
向量：(x,y,z,0)
A = (x,y,z,1)
B = (x1,y1,z1,1)
AB = A - B = (x-x1, y-y1, z-z1, 0)
demo：
    笛卡尔坐标系下点(1, 2)的其次坐标可以表示为点(1, 2, 1)
    如果点(1, 2)移动到无限远处，笛卡尔坐标下变成(无穷， 无穷)，其次坐标是(1, 2, 0)成了一个向量
--------------------------------------------------------------------------
CSS函数matrix指定了一个由6个值组成的2D变换矩阵。这个变换矩阵的常量值是隐含的，而非传递参数进来。
matrix(a,b,c,d,tx,ty)是matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1) 的简写
matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())
--------------------------------------------------------------------------
matrix3d(a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4,b4,c4,d4)
--------------------------------------------------------------------------
直角坐标系中任意点关于任意轴对称(镜像)坐标变换
设A（X0,Y0）,对称轴L：y=kx+b,求对称点B的坐标X和Y

1、A和B的中点在对称轴L上，即Y=(X0+X)/2*k+b
2、A和B所在直线的斜率和L斜率互为倒数，即k(Y0-Y)/(X0-X)=-1
推导出：
    X=(1-K*K)*X0/(1+k*k)+2*k*Y0/(1+k*k)-2*k*b/(1+k*k)
    Y=2*k*X0/(1+k*k)+(k*k-1)Y0/(1+k*k)-2b/(1+k*k)
对于matrix而言，设对称轴偏离x轴的角度为β
a = (1-tanβ*tanβ)/(1+tanβ*tanβ)
c=2*tanβ/(1+tanβ*tanβ)
e=-2*tanβ*b/(1+tanβ*tanβ)
b=2*tanβ/(1+tanβ*tanβ)
d=(tanβ*tanβ-1)/(1+tanβ*tanβ)
f=-2*b/(1+tanβ*tanβ)

matrix方法把左右转换方法组合在一起。
matrix3d(a1,b1,c1,d1,a2,b2,c2,d2,a3,b3,c3,d3,a4,b4,c4,d4)
translate,scale,skew,rotate知识matrix的一部分功能

transform: matrix() | translate() | scale() | rotate() | skew()
transform: translateX() | translateY() | scaleX() | scaleY() | skewX() | skewY()

transform: matrix3d() | translate3d() | scale3d() | rotated3d() | perspective()
transform: translateZ() | scaleZ() | rotateX() | rotateY() | rotateZ()
备注：
    rotateX(a) 等价于 rotate3d(1,0,0,a)
    rotateY(a) 等价于 rotate3d(0,1,0,a)
    rotateZ(a) 等价于 rotate3d(0,0,1,a)
--------------------------------------------------------------
transform: matrix(a,b,c,d,e,f)
matrix 
a c e   x        ax+cy+e
b d f   y    =   bx+dy+f
0 0 1   1        0+0+1
x` = ax+cy+e
y` = bx+dy+f
偏移translate：transform()定义了元素在每个方向上移动的距离,translate3D()
    x` = x + 偏移量
    y` = y + 偏移量
    套用公式得到：a=1,c=0,e=偏移量；b=0,d=1,f=偏移量
    即matrix(1,0,0,1,e,f)
缩放scale：scale()定义了元素在每个方向缩放的量，scale3D()
    x` = x * factor
    y` = y * factor
    套用公式：a=factor,c=0,e=0;b=0,d=factor,f=0
    即matrix(factor,0,0,factor,0,0) 
倾斜skew：
    x` = ax + cy
    y` = bx + dy
    a=cos,b=sin,c=sin,d=cos,e=0,f=0
    matrix(cos,sin,sin,cos,0,0)
    沿Y轴倾斜30，只计算x`值；
    沿X轴倾斜，只计算y`值
旋转rotate：就是绕轴旋转（过transform-origin点的平行轴的直线），而不变形的转换。指定的角度定义了旋转的量度。若角度为正，顺时针旋转，否者逆时针旋转。
    绕过transform-origin点且平行对应轴线的直线进行旋转（绕点旋转方向不能确定，绕轴旋转可以确定方向，最多两个，顺时针和逆时针）
    二维就是绕平行Z轴的直线旋转，即三维的rotateZ()
    
    沿X轴旋转，x不变，
    沿Y轴旋转，

perspective: 指定观察者与z=0平面的距离，使具有三维位置变换的元素产生透视效果
perspective-origin: 定义观察者相对于元素的位置，用来定义视线灭点，即视线消失的位置。

--------------------------------------------------------------
translate(tx, ty);	matrix(1, 0, 0, 1, tx, ty);
scale(sx, sy);	matrix(sx, 0, 0, sy, 0, 0);
rotate(a);	matrix(cos(a), sin(a), -sin(a), cos(a), 0, 0);
skew(ax, ay);	matrix(1, tan(ay), tan(ax), 1, 0, 0);
--------------------------------------------------------------
translate3d(tx,ty,tz)等价于matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,tx,ty,tz,1)
scale3d(sx,sy,sz)等价于matrix3d(sx,0,0,0,0,sy,0,0,0,0,sz,0,0,0,0,1)
后面的太复杂了
<https://www.jianshu.com/p/52e0018e6ce2>
--------------------------------------------------------------
**/

import * as React from 'react';
import styles from './index.module.scss';
import ErrorBoundary from 'Components/ErrorBoundary';
import Card from 'Components/Card';
// const ANGLE_DEFAULT = Math.PI / 4;

const MAP_ZOOM_FACTOR = new Map([
  [0, '500px'],
  [1, '1000px'],
  [2, '2000px'],
  [3, '5000px'],
  [4, '8000px']
]);
class Error extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      monkey: {
        age: 12,
        direction: 'top'
      }
    };
  }
  onToError = () => {
    this.setState({
      monkey: 'undeinfed'
    });
  };

  render() {
    return (
      <div>
        <h1>Error Component Demo</h1>
        {this.state.monkey.age.age}
        <button onClick={this.onToError}>抛异常</button>
      </div>
    );
  }
}

let index = 0;
class Animation extends React.Component<{}, any> {
  map: Map<string, string>;
  constructor(props: any) {
    super(props);
    this.state = {
      angle: 0,
      bFlip: false,
      direction: 'front',
      zoom: '500px'
    };
    this.map = new Map([
      ['front', styles.showfront],
      ['left', styles.showleft],
      ['right', styles.showright],
      ['back', styles.showback],
      ['top', styles.showtop],
      ['bottom', styles.showbottom]
    ]);
  }

  onZoom = () => {
    const { zoom } = this.state;
    console.log('zoom===>', zoom);
    this.setState({
      zoom: MAP_ZOOM_FACTOR.get(index++ % 5)
    });
  };

  onRotate2 = () => {
    this.setState({
      angle: this.state.angle + 40
    });
  };
  onRotate = () => {
    this.setState({
      angle: this.state.angle + 90
    });
  };
  onFlipped = () => {
    this.setState({
      bFlip: !this.state.bFlip
    });
  };
  onFront = () => {
    this.setState({
      direction: 'front'
    });
  };
  onLeft = () => {
    this.setState({
      direction: 'left'
    });
  };
  onRight = () => {
    this.setState({
      direction: 'right'
    });
  };
  onBack = () => {
    this.setState({
      direction: 'back'
    });
  };
  onTop = () => {
    this.setState({
      direction: 'top'
    });
  };
  onBottom = () => {
    this.setState({
      direction: 'bottom'
    });
  };
  render() {
    const { angle, bFlip, direction, zoom } = this.state;
    const zoomStyle = {
      transform: `translateZ(${zoom})`
    };
    return (
      <div className={styles.wrapper}>
        <Card title="测试overflow覆盖">
          <div className={styles.slipcontainer}>
            <div className={styles.flip} onClick={this.onFlipped}>
              <div
                className={`${styles.scene} ${
                  bFlip ? styles.flipped : styles.flipped1
                }`}>
                <div className={styles.front}>front</div>
                <div className={styles.back}>back</div>
              </div>
            </div>
          </div>
        </Card>
        <ErrorBoundary>
          <Error />
        </ErrorBoundary>
        <Card title={'zoom'}>
          <div
            className={`flex flex-center ${styles.zoom}`}
            onTouchMove={this.onZoom}>
            <div className={styles.stage} style={zoomStyle}>
              <img src={require('../../../../res/mouse.jpeg')} alt="" />
            </div>
          </div>
        </Card>
        <Card title="改造旋转木马（Carousel）">
          <div className={styles.carousel2}>
            <div
              className={styles.scene}
              onClick={this.onRotate2}
              style={{
                transform: `translateZ(-288px) rotateY(${this.state.angle}deg)`
              }}>
              <div className={`flex flex-center flex-center-h ${styles.cell1}`}>
                原图1
              </div>
              <div className={`flex flex-center flex-center-h ${styles.cell2}`}>
                原图2
              </div>
              <div className={`flex flex-center flex-center-h ${styles.cell3}`}>
                原图3
              </div>
              <div className={`flex flex-center flex-center-h ${styles.cell4}`}>
                原图4
              </div>
              <div className={`flex flex-center flex-center-h ${styles.cell5}`}>
                原图5
              </div>
              <div className={`flex flex-center flex-center-h ${styles.cell6}`}>
                原图6
              </div>
              <div className={`flex flex-center flex-center-h ${styles.cell7}`}>
                原图7
              </div>
              <div className={`flex flex-center flex-center-h ${styles.cell8}`}>
                原图8
              </div>
              <div className={`flex flex-center flex-center-h ${styles.cell9}`}>
                原图9
              </div>
            </div>
          </div>
        </Card>
        <Card title="旋转木马（Carousel）">
          <div className={styles.carousel}>
            <div
              className={styles.scene}
              onClick={this.onRotate2}
              style={{
                transform: `translateZ(-288px) rotateY(${this.state.angle}deg)`
              }}>
              <div className={styles.cell1}>原图1</div>
              <div className={styles.cell2}>原图2</div>
              <div className={styles.cell3}>原图3</div>
              <div className={styles.cell4}>原图4</div>
              <div className={styles.cell5}>原图5</div>
              <div className={styles.cell6}>原图6</div>
              <div className={styles.cell7}>原图7</div>
              <div className={styles.cell8}>原图8</div>
              <div className={styles.cell9}>原图9</div>
            </div>
          </div>
        </Card>
        <Card title="旋转木马">
          <div className={styles.container}>
            <div
              onClick={this.onRotate}
              className={styles.stage}
              style={{ transform: `rotateY(${this.state.angle}deg)` }}>
              <div className={styles.base1}>原图1</div>
              <div className={styles.base2}>原图2</div>
              <div className={styles.base3}>原图3</div>
              <div className={styles.base4}>原图4</div>
            </div>
          </div>
        </Card>
        <Card title="Loop">
          <div className={styles.loop}>
            <div
              className={styles.perspective}
              style={{ transform: `rotateY(${angle}deg)` }}
              onClick={this.onRotate}>
              <div className={styles.image1}>图1</div>
              <div className={styles.image2}>图2</div>
              {/* <div className={styles.image3}>
                                图3
                            </div>
                            <div className={styles.image4}>
                                图4
                            </div> */}
            </div>
          </div>
        </Card>
        <Card title="镜像">
          <div className={styles.mirror}>
            <img
              className={styles.origin}
              alt={'XXX'}
              src={require('../../../../res/bg1.jpg')}
            />
            <img
              className={styles.origin}
              alt={'XXX'}
              src={require('../../../../res/bg1.jpg')}
            />
          </div>
        </Card>
        <Card title="rotate 元素不变形" className={styles.demo}>
          <div className={'flex'}>
            <div className={styles.rotate}>1</div>
            <div className={styles.rotate2}>2</div>
            <div className={styles.rotate3}>3</div>
            <div className={styles.rotate4}>4</div>
          </div>
        </Card>
        <Card title="skew 元素变形了">
          <div className={`flex ${styles.skew}`}>
            <div className={styles.demo1}>1</div>
            <div className={styles.demo2}>2</div>
            <div className={styles.demo3}>3</div>
          </div>
        </Card>
        <Card title="flip">
          <div className={styles.flip} onClick={this.onFlipped}>
            <div
              className={`${styles.scene} ${
                bFlip ? styles.flipped : styles.flipped1
              }`}>
              <div className={styles.front}>front</div>
              <div className={styles.back}>back</div>
            </div>
          </div>
        </Card>
        <Card title="cube">
          <div>
            <span className={styles.btn} onClick={this.onFront}>
              font
            </span>
            <span className={styles.btn} onClick={this.onLeft}>
              left
            </span>
            <span className={styles.btn} onClick={this.onRight}>
              right
            </span>
            <span className={styles.btn} onClick={this.onBack}>
              back
            </span>
            <span className={styles.btn} onClick={this.onTop}>
              top
            </span>
            <span className={styles.btn} onClick={this.onBottom}>
              bottom
            </span>
          </div>
          <div className={styles.cube}>
            <div className={`${styles.scene} ${this.map.get(direction)}`}>
              <div className={styles.front}>front</div>
              <div className={styles.back}>back</div>
              <div className={styles.right}>right</div>
              <div className={styles.left}>left</div>
              <div className={styles.top}>top</div>
              <div className={styles.bottom}>bottom</div>
            </div>
          </div>
        </Card>
        <Card title="box">
          <div>
            <span className={styles.btn} onClick={this.onFront}>
              font
            </span>
            <span className={styles.btn} onClick={this.onLeft}>
              left
            </span>
            <span className={styles.btn} onClick={this.onRight}>
              right
            </span>
            <span className={styles.btn} onClick={this.onBack}>
              back
            </span>
            <span className={styles.btn} onClick={this.onTop}>
              top
            </span>
            <span className={styles.btn} onClick={this.onBottom}>
              bottom
            </span>
          </div>
          <div className={styles.box}>
            <div className={`${styles.scene} ${this.map.get(direction)}`}>
              <div className={styles.front}>front</div>
              <div className={styles.back}>back</div>
              <div className={styles.left}>left</div>
              <div className={styles.right}>right</div>
              <div className={styles.top}>top</div>
              <div className={styles.bottom}>bottom</div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Animation;
