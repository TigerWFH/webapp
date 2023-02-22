/**
 * Swiper组件思路：
 *      确定视图：<div class="swiper"></div>，占一屏宽度
 *      确定容器：<div class="container"></div>，根据滚动item，确定长度为元素个数乘以元素宽度
 *      确定元素：<div class="item"></div>
 *
 *      使用translate，移动容器
 *
 * CSS样式：
 *  1、-webkit-overflow-scrolling: 控制元素在移动设备上是否使用滚动回弹效果
 *      1-1: auto，使用普通滚动，当手指离开触摸屏，滚动立即停止
 *      1-2: touch，使用回弹效果的滚动，手指离开，内容会继续保持一段时间的滚动效果
 *  2、touch-action: 用于设置触摸屏用户如何操纵 元素的区域
 *      2-1、auto，浏览器自动响应手势，比如对viewport进行平滑、缩放等
 *      2-2、none，发生触摸事件，不进行任何操作
 *      2-3、pan-x，启用单指水平平移手势，可以与pan-y，pan-up，pan-down和pinch-zoom组合
 *      2-4、pan-y，启用单指垂直平移手势，可以与x,left,right,zoom组合
 *      2-4、manipulation，浏览器只允许进行滚动和持续缩放操作
 *      2-4、pan-left(right,up,down)，启用以指定方向滚动开始的单指手势
 *      2-4、pinch-zoom，启用多手指平移和缩放页面
 *  3、
 *  4、
 *
 * 待处理问题：
 * 1、如何禁止IOS系统的橡皮筋效果？
 * 2、如何处理移动端滚动条显示问题？
 * 3、Swiper组件待优化，高度动态变化引起的reflow
 */
import * as React from 'react';
import IconFont from '../IconFont';
import styles from './index.module.scss';
import { isIOS, isMobile, addClass, removeClass } from './helper';

const SLIDING_THRESHOLD = 3; // 滑屏超出1/3，确认滑屏操作
const DELAY_TIME = 3000; // 自动播放间隔时间
const BASE_HEIGHT = 80;
const BASE_FACTOR = 1;

const map = new Map([
  ['bottom', styles.bottom],
  ['cover', styles.cover]
]);
interface IProps {
  history?: any;
  scrollThreshold?: number;
  showArrow?: boolean;
  showDotFlag?: string /* bottom: 展示在最底部；cover：展示在内容上*/;
  autoPlay?: boolean;
  frameHeight?: number; // 内容高度
  children?: any;
}
interface IState {
  order: number;
  height: number;
}

class Swiper extends React.Component<IProps, IState> {
  startDocY: any;
  swiperRef: any;
  containerRef: any;
  bMobile: boolean;
  beginPositionX: number = 0;
  beginPositionY: number = 0;
  offsetX: number;
  offsetY: number;
  direction: string = '';
  target: any;
  backCallback: any;
  nextCallback: any;
  timer: any;
  mapRef: Map<number, number>;
  constructor(props: IProps) {
    super(props);
    this.swiperRef = React.createRef();
    this.containerRef = React.createRef();
    this.bMobile = isMobile();
    this.offsetX = 0;
    this.offsetY = 0;
    this.target = {
      onTouchStart: this.start,
      onTouchMove: this.move,
      onTouchEnd: this.end
    };
    this.backCallback = {
      onTouchStart: this.back
    };
    this.nextCallback = {
      onTouchStart: this.next
    };
    this.timer = null;
    this.mapRef = new Map();
    const frameList = React.Children.toArray(this.props.children);
    frameList.forEach((frame: any, index: number) => {
      const tmp = frame.props['data-height'];

      this.mapRef.set(index, tmp);
    });

    this.state = {
      order: 0,
      height: this.mapRef.get(0) || BASE_FACTOR
    };
    if (!this.bMobile) {
      this.target = {
        onMouseDown: this.start,
        onMouseMove: this.move,
        onMouseUp: this.end
      };
      this.backCallback = {
        onClick: this.back
      };
      this.nextCallback = {
        onClick: this.next
      };
    }
    if (isIOS()) {
      // 禁止IOS橡皮筋效果，方案不完美
      try {
        document.body &&
          document.body.addEventListener('touchmove', this.moveDoc, {
            passive: false
          });
        document.body &&
          document.body.addEventListener('touchstart', this.startDoc, {
            passive: false
          });
      } catch (error) {
        console.log('error');
      }
    }
  }
  startDoc = (event: any) => {
    this.startDocY = event.touches[0].clientY;
  };
  getScrollParent = (dom: any): any => {
    if (!dom) {
      return null;
    }
    let parent = dom.parentNode;
    while (parent && parent !== document) {
      if (
        parent.style.overflowY === 'scroll' ||
        parent.style.overflowY === 'auto'
      ) {
        return parent;
      }

      parent = parent.parentNode;
    }
  };
  moveDoc = (event: any) => {
    const currentY = event.touches[0].clientY;
    const scrollContainer = this.getScrollParent(this.swiperRef.current);
    if (currentY - this.startDocY > 0 && scrollContainer.scrollTop <= 0) {
      event.preventDefault();
    }
  };
  start = (e: any) => {
    this.endInterval();
    removeClass(this.containerRef.current, styles.animation);
    if (this.bMobile) {
      this.beginPositionX = e.touches[0].clientX;
      this.beginPositionY = e.touches[0].clientY;
    } else {
      this.beginPositionX = e.clientX;
      this.beginPositionY = e.clientY;
    }
  };

  computeDirection = (x: number, y: number) => {
    const { scrollThreshold = 44 } = this.props;
    const dx = x - this.beginPositionX;
    const dy = y - this.beginPositionY;
    this.offsetX = Math.abs(dx);
    this.offsetY = Math.abs(dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (this.offsetX > scrollThreshold) {
      if (-45 < angle && angle < 45) {
        if (dx > scrollThreshold) {
          this.direction = 'right';
        }
      } else if (angle > 135 || angle < -135) {
        this.direction = 'left';
      }
    }
    if (this.offsetY > scrollThreshold) {
      if (45 < angle && angle < 135) {
        this.direction = 'down';
      } else if (-135 < angle && angle < -45) {
        this.direction = 'up';
      }
    }
  };

  computeHeight = (current: number, change: number) => {
    const { frameHeight = BASE_HEIGHT } = this.props;
    let result: string = `${frameHeight * current}px`;
    const changeHeight =
      (this.offsetX / this.swiperRef.current.clientWidth) * frameHeight;
    if (current > change) {
      result = `${frameHeight * current - changeHeight}px`;
    } else if (current < change) {
      result = `${frameHeight * current + changeHeight}px`;
    }

    return result;
  };
  move = (e: any) => {
    if (!Boolean(this.beginPositionX)) {
      return;
    }
    const countOfFrame = React.Children.toArray(this.props.children).length;
    let positionX: any;
    let positionY: any;
    if (this.bMobile) {
      const { changedTouches = [] } = e;
      if (changedTouches.length === 1) {
        const { clientX, clientY } = changedTouches[0];
        positionX = clientX;
        positionY = clientY;
      }
    } else {
      positionX = e.clientX;
      positionY = e.clientY;
    }
    this.computeDirection(positionX, positionY);
    const { order } = this.state;
    if (this.direction === 'left') {
      if (order + 1 < countOfFrame) {
        // 处理高度变化
        const current = this.mapRef.get(order) || BASE_FACTOR;
        const next = this.mapRef.get(order + 1) || BASE_FACTOR;
        const height = this.computeHeight(current, next);
        this.containerRef.current.style.height = height;
        this.containerRef.current.style.transform = `translateX(-${
          order * this.swiperRef.current.clientWidth + this.offsetX
        }px)`;
      }
    } else if (this.direction === 'right') {
      if (order - 1 >= 0) {
        // 处理高度变化
        const current = this.mapRef.get(order) || BASE_FACTOR;
        const next = this.mapRef.get(order - 1) || BASE_FACTOR;
        const height = this.computeHeight(current, next);
        this.containerRef.current.style.height = height;
        this.containerRef.current.style.transform = `translateX(-${
          order * this.swiperRef.current.clientWidth - this.offsetX
        }px)`;
      }
    }
  };

  recoveryElement = () => {
    const { order } = this.state;
    const { frameHeight = BASE_HEIGHT } = this.props;
    this.containerRef.current.style.height = `${
      (this.mapRef.get(order) || BASE_FACTOR) * frameHeight
    }px`;
    this.containerRef.current.style.transform = `translateX(-${
      order * this.swiperRef.current.clientWidth
    }px)`;
  };
  end = (e: any) => {
    const countOfFrame = React.Children.toArray(this.props.children).length;
    const containerWidth = this.swiperRef.current.clientWidth;
    const bSwitch = containerWidth / SLIDING_THRESHOLD < this.offsetX;
    const { order } = this.state;
    addClass(this.containerRef.current, styles.animation);
    if (this.direction === 'left') {
      if (bSwitch) {
        this.setState((state: IState, props: IProps) => {
          if (order + 1 < countOfFrame) {
            return {
              ...state,
              order: (order + 1) % countOfFrame,
              height: this.mapRef.get(order + 1) || BASE_FACTOR
            };
          }

          return null;
        });
      } else {
        // 回滑会导致方向无法识别，故需要recovery
        this.recoveryElement();
      }
    } else if (this.direction === 'right') {
      if (bSwitch) {
        this.setState((state: IState, props: IProps) => {
          if (order - 1 >= 0) {
            return {
              ...state,
              order: (order - 1) % countOfFrame,
              height: this.mapRef.get(order - 1) || BASE_FACTOR
            };
          }

          return null;
        });
      } else {
        this.recoveryElement();
      }
    } else {
      this.recoveryElement();
    }
    this.beginPositionX = 0;
    this.beginPositionY = 0;
    this.direction = '';
    this.startInterval();
  };
  back = () => {
    this.endInterval();
    const countOfFrame = React.Children.toArray(this.props.children).length;
    this.setState(
      (state: IState, props: IProps) => {
        if (state.order - 1 >= 0) {
          return {
            ...state,
            order: (state.order - 1) % countOfFrame,
            height:
              this.mapRef.get((state.order - 1) % countOfFrame) || BASE_FACTOR
          };
        }

        return null;
      },
      () => {
        this.startInterval();
      }
    );
  };
  next = () => {
    this.endInterval();
    const countOfFrame = React.Children.toArray(this.props.children).length;
    this.setState(
      (state: IState, props: IProps) => {
        if (state.order + 1 < countOfFrame) {
          return {
            ...state,
            order: (state.order + 1) % countOfFrame,
            height:
              this.mapRef.get((state.order + 1) % countOfFrame) || BASE_FACTOR
          };
        }

        return null;
      },
      () => {
        this.startInterval();
      }
    );
  };

  componentDidMount() {
    this.startInterval();
  }
  componentWillUnmount() {
    this.endInterval();
  }

  endInterval = () => {
    const { autoPlay } = this.props;
    if (Boolean(autoPlay) && Boolean(this.timer)) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };
  startInterval = () => {
    const { autoPlay, children } = this.props;
    if (Boolean(autoPlay)) {
      if (Boolean(this.timer)) {
        clearInterval(this.timer);
      }
      const frameList = React.Children.toArray(children);
      if (frameList.length === 0) {
        return;
      }
      const that = this;
      this.timer = setInterval(() => {
        that.setState((state: IState, props: IProps) => {
          if (state.order === 3) {
            removeClass(this.containerRef.current, styles.animation);
          } else {
            addClass(this.containerRef.current, styles.animation);
          }
          return {
            ...state,
            order: (state.order + 1) % frameList.length,
            height:
              this.mapRef.get((state.order + 1) % frameList.length) ||
              BASE_FACTOR
          };
        });
      }, DELAY_TIME);
    }
  };

  renderArrow = () => {
    const { order } = this.state;
    const countOfFrame = React.Children.toArray(this.props.children).length;
    if (countOfFrame > 1) {
      return [
        <span
          key="back"
          className={`${styles.back} ${order === 0 ? styles.ghost : ''}`}
          {...this.backCallback}>
          <IconFont icon="back" />
        </span>,
        <span
          key="next"
          className={`${styles.next} ${order === 3 ? styles.ghost : ''}`}
          {...this.nextCallback}>
          <IconFont icon="next" />
        </span>
      ];
    }

    return null;
  };

  render() {
    const {
      children,
      showArrow,
      frameHeight = BASE_HEIGHT,
      showDotFlag,
      ...rest
    } = this.props;
    const { order, height } = this.state;
    const frameList = React.Children.toArray(children);
    const containerStyle = {
      width: `${100 * frameList.length}%`,
      transform: `translateX(-${(order / frameList.length) * 100}%)`,
      height: `${frameHeight * height}px`
    };
    const frameStyle = {
      width: `${100 / frameList.length}%`
    };
    console.log('render===>', order);
    return (
      <div
        className={styles.swiper}
        {...rest}
        ref={this.swiperRef}
        {...this.target}>
        {Boolean(showArrow) ? this.renderArrow() : null}
        <div
          className={`${styles.container} ${styles.animation}`}
          style={containerStyle}
          ref={this.containerRef}>
          {React.Children.map(children, (child, index) => {
            return (
              <div key={index} style={frameStyle}>
                {child}
              </div>
            );
          })}
        </div>
        {Boolean(showDotFlag) && frameList.length > 1 ? (
          <div className={map.get(showDotFlag as string)}>
            {React.Children.map(children, (child: any, index: number) => {
              return (
                <span
                  className={`${styles.dot} ${
                    order === index ? styles.active : ''
                  }`}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Swiper;
