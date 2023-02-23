import 'react-app-polyfill/ie9';
// import 'core-js/features/array/from';
import React, { lazy, Suspense } from 'react';
import * as ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import View from 'Components/View';
import Header from 'Components/Header';
import Sidebar from 'Components/Sidebar';
import 'Components/base.scss';
import * as serviceWorker from './serviceWorker';

window.addEventListener('hashchange', function (e) {
  console.log('hash=====>', e);
});

// 个人简介
const About = lazy(() => import('@/pages/about'));
// 主页
const Home = lazy(() => import('@/pages/home'));
// 博客
const Blog = lazy(() => import('@/pages/blog'));
// Demos
const Demos = lazy(() => import('@/pages/demos'));

const Bones = lazy(() => import('@/pages/bones'));
const ReactDemo = lazy(() => import('@/pages/react'));
const Context = lazy(() => import('@/pages/context'));
const Detail = lazy(() => import('@/pages/detail'));
const Mine = lazy(() => import('@/pages/mine'));
const Canvas = lazy(() => import('@/pages/canvas'));
const X6 = lazy(() => import('@/pages/x6'));
const DndFrame = lazy(() => import('@/pages/x6/frame'));

const STATIC_ROUTE = [
  {
    href: '/',
    title: '个人简介'
  },
  {
    href: '/home',
    title: '主页'
  },
  {
    href: '/demos',
    title: '实践'
  },
  {
    href: '/x6',
    title: 'x6'
  },
  {
    href: '/react',
    title: 'react'
  },
  {
    href: 'canvas',
    title: 'canvas'
  },
  {
    href: '/blog',
    title: '博客'
  }
];
const ROUTER_TO_TITLE = new Map([
  ['/', '个人简介'],
  ['/demos', '实践'],
  ['/home', '主页'],
  ['/x6', 'x6'],
  ['/react', 'react'],
  ['/canvas', 'canvas'],
  ['/blog', '博客']
]);

window.document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded===>', Date.now());
});

window.addEventListener('load', function () {
  if (window.performance) {
    console.log('window.performance===>', window.performance);
  }
  console.log('load===>', Date.now());
});

interface IState {
  title: string;
  bSidebar: boolean;
  theme: string;
}
class App extends React.Component<any, IState> {
  listen: any;
  constructor(props: any, context: any) {
    super(props);
    this.state = {
      title: '个人简介',
      bSidebar: false,
      theme: 'red'
    };
    // 监听路由变换
    this.listen = this.props.history.listen((location: any, action: any) => {
      this.setState({
        title: ROUTER_TO_TITLE.get(location.pathname) || 'No Match'
      });
    });
  }
  componentDidMount() {
    console.log('MyApp====didMount===>', Date.now());
    const styleDom: any = document.createElement('style');
    styleDom.id = 'doubi';
    document.head.appendChild(styleDom);
    let position = styleDom.sheet.cssRules.length;
    let sheet = '.demo{background-color: red;}';
    styleDom.sheet.insertRule(sheet, position);

    position = styleDom.sheet.cssRules.length;
    sheet = '.demo2{background-color: blue;}';
    styleDom.sheet.insertRule(sheet, position);
  }

  componentDidUpdate(nextProps: any, nextState: any, snapshot: any) {
    // console.log('MyApp======DidUpdate===>', nextProps, nextState, snapshot);
  }

  componentWillUnmount() {
    // console.log('MyApp===Unmount===>');
  }

  onSwitchSidebar = () => {
    this.setState({
      bSidebar: !this.state.bSidebar,
      theme: this.state.theme === 'red' ? 'blue' : 'red'
    });
  };

  renderSideBar = () => {
    const { bSidebar } = this.state;
    const { history } = this.props;
    return STATIC_ROUTE.length > 0 ? (
      <Sidebar history={history} bSidebar={bSidebar} itemList={STATIC_ROUTE} />
    ) : null;
  };
  render() {
    const {
      title,
      bSidebar
      // theme
    } = this.state;

    return (
      <div className={`app ${bSidebar ? 'show' : 'hide'}`}>
        <Header
          title={title}
          onSwitchSidebar={this.onSwitchSidebar}
          name={'monkey的小屋'}
        />
        {this.renderSideBar()}
        <View className={'view'}>{this.props.children}</View>
      </div>
    );
  }
}

const MyApp = withRouter(App);
const elem = (
  <Provider store={store}>
    <Router>
      <MyApp>
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route path={'/'} exact component={About}></Route>
            <Route path={'/home'} exact component={Home}></Route>
            <Route path={'/blog'} exact component={Blog}></Route>
            <Route path={'/demos'} exact component={Demos}></Route>
            <Route path={'/about'} exact component={About}></Route>
            <Route path={'/x6'} exact component={X6}></Route>
            <Route path={'/canvas'} exact component={Canvas}></Route>
            <Route path={'/react'} exact component={ReactDemo}></Route>

            <Route path={'/dndframe/:type'} exact component={DndFrame}></Route>
            <Route path={'/bones'} exact component={Bones}></Route>
            <Route path={'/context'} exact component={Context}></Route>
            <Route path={'/detail/:skuid'} exact component={Detail}></Route>
            <Route path={'/mine'} exact component={Mine}></Route>
            <Route component={About}></Route>
          </Switch>
        </Suspense>
      </MyApp>
    </Router>
  </Provider>
);

ReactDOM.render(elem, document.getElementById('root'));
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(elem);

// interface IDemoProps {}
// interface IDemoState {
//     name: string
// }
// class Demo extends React.Component<IDemoProps, IDemoState>{
//     constructor(props: IDemoProps) {
//         super(props)
//         this.state = {
//             name: 'default'
//         }
//     }

//     onChangeName = () => {
//         this.setState((state, props) => {
//             return {
//                 name: state.name === 'monkey' ? 'cat' : 'monkey'
//             }
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h1>debug react</h1>
//                 <Children name='monkey' />
//                 <div>
//                     <div onClick={this.onChangeName}>
//                         change name
//                     </div>
//                     <span>
//                         state-name：
//                     </span>
//                     <span>
//                         {
//                             this.state.name
//                         }
//                     </span>
//                     <span>
//                         {
//                             this.props.children
//                         }
//                     </span>
//                 </div>
//             </div>
//         )
//     }
// }

// function Children() {
//     return <div>
//         {
//             props.name
//         }
//         <div>
//             1
//         </div>
//     </div>
// }

// const vDom = <Demo>这是一个Demo组件</Demo>

// ReactDOM.render(vDom, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
