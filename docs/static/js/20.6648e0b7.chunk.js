(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{815:function(e,n,t){"use strict";t.r(n);var o=t(8),a=t(0),r=t(1),c=t(2),l=t(3),i=t(4),u=i.memo(function(e){var n=e.name;return console.log("wfh-Name-render"),i.createElement("div",null,n)}),m=i.memo(function(e){return console.log("wfh-Age---render"),i.createElement("div",null,"12")}),f=i.memo(function(e){var n=e.info;return console.log("wfh-info---render"),i.createElement("div",null,"Info:".concat(n.first,"-").concat(n.second))}),s=i.memo(function(e){return console.log("wfh-NoProps----render"),i.createElement("div",null,"no props")}),d=function(e){Object(c.a)(t,e);var n=Object(l.a)(t);function t(e){var r;return Object(a.a)(this,t),(r=n.call(this,e)).onChangeInfo=function(){var e=Object(o.a)({},r.state);e.info.first=8,e.info.second=8,r.setState(e)},r.state={name:"default",age:12,info:{first:1,second:2}},r}return Object(r.a)(t,[{key:"render",value:function(){var e=this,n=this.state,t=n.name,o=n.age,a=n.info;return console.log("wfh--render====>",this.state),i.createElement("div",null,i.createElement("button",{onClick:function(){return e.setState({name:"monkey",age:16})}},"change all"),i.createElement("button",{onClick:function(){return e.setState({name:"monkey1"})}},"change name"),i.createElement("button",{onClick:function(){return e.setState({age:18})}},"change age"),i.createElement("button",{onClick:this.onChangeInfo},"change info"),i.createElement("div",null,t),i.createElement("div",null,o),i.createElement(u,{name:t}),i.createElement(m,{age:o}),i.createElement(f,{info:a}),i.createElement(s,null))}}]),t}(i.Component);n.default=d}}]);
//# sourceMappingURL=20.6648e0b7.chunk.js.map