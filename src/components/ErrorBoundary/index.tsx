/**
 * name: ErrorBoundary：捕捉子组件render、lifecycle methods、constructors等异常
 * version:React-v16.0.0
 * */
import * as React from 'react';

interface IState {
    bError: boolean;
}

class ErrorBoundary extends React.Component<any, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            bError: false
        }
    }
    
    static getDerivedStateFromError(err: any) {
        // 更新UI
        return {
            bError: true
        }
    }

    componentDidCatch(err: any, info: any) {
        // 可以上报服务器error信息
        console.log("componentDidCatch===>", err);
    }

    render() {
        console.log("error====render====>", this.state);
        if (this.state.bError) {
            return <h1>发生了错误</h1>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;