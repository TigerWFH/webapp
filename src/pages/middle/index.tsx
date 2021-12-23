import * as React from 'react';
let count = 1;

class Middle extends React.Component<any, never>{
    constructor(props: any) {
        super(props);
        window.document.addEventListener('DOMContentLoaded', function(){
            alert('domcontentloaded')
            console.log("*********************onDomContentLoaded", count++);
        });
        window.addEventListener('pageshow', this.onShowPage);
        window.addEventListener('load',this.onLoad);
    }

    onDomLoaded = (event: any) => {
        alert('domcontentloaded')
        console.log("*********************onDomContentLoaded", count++);
    }

    onShowPage = (event: any) => {
        alert("pageshow")
        console.log("*********************onShowPage", count++);
    }
    
    onLoad = (event: any) => {
        alert("onload")
        console.log("*********************onLoad", count++);
    }

    componentDidMount() {
        const identify = window.location.href.indexOf('identify') > -1;
        if (!identify) {
            console.log("*********************first", count++);
            let url = `${window.location.href}?identify=2`;
            window.location.replace(url);
            // window.location.href = '#/about';
            window.location.href = 'https://www.baidu.com';
        }
        else {
            console.log("*********************second", count++);
            window.history.go(-1);
            // window.location.href = '#/home';
        }
        
    }

    componentWillUnmount() {
        console.log("*********************unmount", count++);
    }

    render() {
        return null;
    }
}

export default Middle;