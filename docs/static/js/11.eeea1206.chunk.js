(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{660:function(e,t,a){"use strict";a.d(t,"a",function(){return r});var n=a(58);function r(e,t){if(null==e)return{};var a,r,c=Object(n.a)(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(c[a]=e[a])}return c}},695:function(e,t,a){"use strict";a.d(t,"a",function(){return u});var n=a(14),r=a(660),c=a(4),l=a(696),o=a.n(l),i=["children"];function u(e){console.log("TabPanel render");var t=e.children,a=Object(r.a)(e,i);return c.createElement("div",a,t)}t.b=function(e){var t=e.children,a=e.className,r=c.Children.toArray(t),l=c.useState(""),i=Object(n.a)(l,2),u=i[0],s=i[1];c.useEffect(function(){s(e.defaultActiveName)},[e.defaultActiveName]);var m=c.useMemo(function(){return r.find(function(e){return e.props.name===u})},[u,r]);if(r.length<=0)return null;var f=function(t){s(t.props.name),"function"===typeof e.onChange&&e.onChange(t.props.name)};return c.createElement("div",{className:"".concat(o.a.tabs," ").concat(a)},c.createElement("span",{className:"flex ".concat(o.a.scroll)},r.map(function(e){return c.createElement("span",{className:"flex-no-shrink flex flex-column ".concat(o.a.titlewrapper),onClick:f.bind(null,e)},c.createElement("span",{className:"".concat(o.a.title," ").concat(u===e.props.name?o.a.activetitle:"")},e.props.title),c.createElement("span",{className:u===e.props.name?o.a.activebar:""}))})),m)}},696:function(e,t,a){e.exports={tabs:"Tabs_tabs__1Odzd",scroll:"Tabs_scroll__158HO",titlewrapper:"Tabs_titlewrapper__3tIbQ",title:"Tabs_title__1g3Ad",activetitle:"Tabs_activetitle__3_qpW",activebar:"Tabs_activebar__3n3f9"}},781:function(e,t,a){e.exports={canvas:"canvas_canvas__28jIF",container:"canvas_container__ihrUa",component:"canvas_component__3CupA"}},834:function(e,t,a){"use strict";a.r(t);var n=a(4),r=a(695);function c(e){var t=n.useRef(null);return n.useEffect(function(){var e=null;if(null!==t.current){e=t.current.getContext("2d");var a=window.getComputedStyle(t.current.parentNode);t.current.width=parseInt(a.width),t.current.height=parseInt(a.height)}null!==e&&(e.lineWidth=10,e.strokeRect(75,140,150,110),e.fillRect(130,190,40,60),e.beginPath(),e.moveTo(50,140),e.lineTo(150,60),e.lineTo(250,140),e.closePath(),e.stroke())},[]),n.createElement("canvas",{className:e.className,height:"300px",ref:t})}function l(e){var t=n.useRef(null);return n.useEffect(function(){var e=null;if(null!==t.current){e=t.current.getContext("2d");var a=window.getComputedStyle(t.current.parentNode);t.current.width=parseInt(a.width),t.current.height=parseInt(a.height)}null!==e&&(e.fillRect(25,25,100,100),e.clearRect(45,45,60,60),e.strokeRect(50,50,50,50),e.fillRect(25,130,50,50),e.strokeRect(25,190,50,50),e.fillRect(25,245,60,60),e.clearRect(30,250,50,50))},[]),n.createElement("canvas",{className:e.className,height:"300px",ref:t})}function o(e){var t=n.useRef(null);return n.useEffect(function(){var e=null;if(null!==t.current){e=t.current.getContext("2d");var a=window.getComputedStyle(t.current.parentNode);t.current.width=parseInt(a.width),t.current.height=parseInt(a.height)}null!==e&&(e.beginPath(),e.moveTo(125,50),e.lineTo(150,75),e.lineTo(150,25),e.fill(),e.beginPath(),e.arc(75,75,50,0,2*Math.PI,!0),e.moveTo(110,75),e.arc(75,75,35,0,Math.PI,!1),e.moveTo(65,65),e.arc(60,65,5,0,2*Math.PI,!0),e.moveTo(95,65),e.arc(90,65,5,0,2*Math.PI,!0),e.stroke(),function(e){if(null!==e)for(var t=0;t<4;t++)for(var a=0;a<3;a++){e.beginPath();var n=240+50*a,r=50+50*t,c=Math.PI+Math.PI*a/2,l=t%2!==0;e.arc(n,r,20,0,c,l),t>1?e.fill():e.stroke()}}(e),e.beginPath(),e.arc(450,120,60,0,Math.PI,!0),e.fill(),e.beginPath(),e.arc(450,180,60,0,Math.PI,!1),e.fill(),e.beginPath(),e.moveTo(275,225),e.quadraticCurveTo(225,225,225,262.5),e.quadraticCurveTo(225,300,250,300),e.quadraticCurveTo(250,320,230,325),e.quadraticCurveTo(260,320,265,300),e.quadraticCurveTo(325,300,325,262.5),e.quadraticCurveTo(325,225,275,225),e.closePath(),e.stroke(),e.beginPath(),e.moveTo(75,240),e.bezierCurveTo(75,237,70,225,50,225),e.bezierCurveTo(20,225,20,262.5,20,262.5),e.bezierCurveTo(20,280,40,302,75,320),e.bezierCurveTo(110,302,130,280,130,262.5),e.bezierCurveTo(130,262.5,130,225,100,225),e.bezierCurveTo(85,225,75,237,75,240),e.fill())},[]),n.createElement("canvas",{className:e.className,height:"300px",ref:t})}var i=a(781),u=a.n(i);function s(e){return n.createElement("div",{className:u.a.canvas},n.createElement(r.b,{defaultActiveName:"path"},n.createElement(r.a,{key:"@@path",name:"path",title:"path"},n.createElement("div",{className:u.a.container},n.createElement(o,{className:u.a.component}))),n.createElement(r.a,{key:"@@rect",name:"rect",title:"rect"},n.createElement("div",{className:u.a.container},n.createElement(l,{className:u.a.component}))),n.createElement(r.a,{key:"@@demo1",name:"demo1",title:"demo1"},n.createElement("div",{className:u.a.container},n.createElement(c,{className:u.a.component})))))}a.d(t,"default",function(){return s})}}]);
//# sourceMappingURL=11.eeea1206.chunk.js.map