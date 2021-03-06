import 'react-app-polyfill/ie9';
// import 'core-js/features/array/from';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch,
    withRouter
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
// import Loadable from 'react-loadable';
import Loadable from '@loadable/component'
import View from 'Components/View';
import Header from 'Components/Header';
import Sidebar from 'Components/Sidebar';
import 'Components/base.scss';
import * as serviceWorker from './serviceWorker';

// 个人简介
const About = Loadable((props: any) => import('@/pages/about'), {
    cacheKey: props => props.path,
    fallback: <div>Loading</div>
})
// 主页
const Home = Loadable((props: any) => import('@/pages/home'), {
    cacheKey: props => props.path,
    fallback: <div>Loading</div>
})
// 博客
const Blog = Loadable((props: any) => import('@/pages/blog'), {
    cacheKey: props => props.path,
    fallback: <div>Loading</div>
})
// Demos
const Demos = Loadable((props: any) => import('@/pages/demos'), {
    cacheKey: props => props.path,
    fallback: <div>Loading</div>
})

const Antd = Loadable((props: any) => import('@/pages/antd'), {
    cacheKey: props => props.path,
    fallback: <div>Loading</div>
})

const Video = Loadable((props: any) => import('@/pages/video'), {
    fallback: <div>Loading</div>
})

const Middle = Loadable((props: any) => import('@/pages/middle'), {
    cacheKey: props => props.path,
    fallback: <div>Loading</div>
})

const Animation = Loadable((props: any) => import('@/pages/animation'), {
    fallback: <div>Loading</div>
})

const Bones = Loadable((props: any) => import('@/pages/bones'), {
    cacheKey: props => props.path,
    fallback: <div>Loading</div>
})
const Hooks = Loadable((props: any) => import('@/pages/hooks'), {
    cacheKey: props => props.path,
    fallback: <div>Loading</div>
})
const States = Loadable((props: any) => import('@/pages/state'), {
    fallback: <div>Loading</div>
})
const Context = Loadable((props: any) => import('@/pages/context'), {
    fallback: <div>Loading</div>
})
const Detail = Loadable((props: any) => import('@/pages/detail'), {
    fallback: <div>Loading</div>
})
const StartApp = Loadable((props: any) => import('@/pages/startapp'), {
    cacheKey: props => props.path,
    fallback: <div>Loading</div>
})
const Signature = Loadable((props: any) => import('@/pages/signature'), {
    fallback: <div>Loading</div>
})
const Child = Loadable((props: any) => import('@/pages/child'), {
    fallback: <div>Loading</div>
})
const Other = Loadable((props: any) => import('@/pages/other'), {
    fallback: <div>Loading</div>
})
const Echat = Loadable((props: any) => import('@/pages/echat'), {
    fallback: <div>Loading</div>
})

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
        href: '/blog',
        title: '博客'
    },
    {
        href: '/demos',
        title: '实践'
    },
    {
        href: '/other',
        title: '其它'
    }
];
const ROUTER_TO_TITLE = new Map([
    ['/', '个人简介'],
    ['/blog', '博客'],
    ['/demos', '实践'],
    ['/home', '主页'],
    ['/other', '其它']
]);

window.document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded===>", Date.now());
})

window.addEventListener('load', function () {
    if (window.performance) {
        console.log("window.performance===>", window.performance);
    }
    console.log("load===>", Date.now());
})

interface IState {
    title: string;
    bSidebar: boolean;
    theme: string
}
class App extends React.Component<any, IState> {
    listen: any;
    constructor(props: any, context: any) {
        super(props);
        this.state = {
            title: '个人简介',
            bSidebar: false,
            theme: 'red'
        }
        // 监听路由变换
        this.listen = this.props.history.listen((location: any, action: any) => {
            this.setState({
                title: ROUTER_TO_TITLE.get(location.pathname) || 'No Match'
            })
        });
    }
    componentDidMount() {
        console.log("App====didMount===>", Date.now());
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

    componentWillUnmount() {
        console.log("App===Unmount===>")
    }
    onSwitchSidebar = () => {
        this.setState({
            bSidebar: !this.state.bSidebar,
            theme: this.state.theme === 'red' ? 'blue' : 'red'
        })
    }
    render() {
        const {
            title,
            bSidebar,
            theme
        } = this.state;

        return (
            <div className={`app ${bSidebar ? 'show' : 'hide'}`}>
                <Header title={title}
                    onSwitchSidebar={this.onSwitchSidebar}
                    name={'monkey的小屋'} />
                <View>
                    {
                        this.props.children
                    }
                </View>
            </div>
        )
    }
}

const MyApp = withRouter(App);
const elem = (
    <Provider store={store}>
        <Router>
            <MyApp>
                <Switch>
                    <Route path={'/'} exact component={About}></Route>
                    <Route path={'/home'} exact component={Home}></Route>
                    <Route path={'/blog'} exact component={Blog}></Route>
                    <Route path={'/demos'} exact component={Demos}></Route>
                    <Route path={'/about'} exact component={About}></Route>
                    <Route path={'/other'} exact component={Other}></Route>
                    <Route path={'/antd'} exact component={Antd}></Route>
                    <Route path={'/video'} exact component={Video}></Route>
                    <Route path={'/middle'} exact component={Middle}></Route>
                    <Route path={'/animation'} exact component={Animation}></Route>
                    <Route path={'/bones'} exact component={Bones}></Route>
                    <Route path={'/hooks'} exact component={Hooks}></Route>
                    <Route path={'/state'} exact component={States}></Route>
                    <Route path={'/context'} exact component={Context}></Route>
                    <Route path={'/detail/:skuid'} exact component={Detail}></Route>
                    <Route path={'/startapp'} exact component={StartApp}></Route>
                    <Route path={'/signature'} exact component={Signature}></Route>
                    <Route path={'/child'} exact component={Child}></Route>
                    <Route component={About}></Route>
                </Switch>
            </MyApp>
        </Router>
    </Provider>
)

ReactDOM.render(elem, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
