(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{735:function(e,t,a){e.exports={about:"about_about__1xLiH"}},736:function(e,t,a){e.exports={profile:"Profile_profile__UEIwu",container:"Profile_container__1ejGN",label:"Profile_label__2LDqt",sublabel:"Profile_sublabel__2Tj6O"}},738:function(e,t,a){e.exports={technology:"Technology_technology__2MgQY",container:"Technology_container__1zMU8"}},739:function(e,t,a){e.exports={experience:"Experience_experience__2rcny",container:"Experience_container__2a785",chart:"Experience_chart__1dsm_",content:"Experience_content__2651b",summary:"Experience_summary__23IXg",label:"Experience_label__3JrB8","summary-content":"Experience_summary-content__VNB1W",detail:"Experience_detail__250oy",info:"Experience_info__Evk5_","info-label":"Experience_info-label__18N_f","info-data":"Experience_info-data__F6wIG"}},740:function(e,t,a){e.exports={contact:"Contact_contact__232LX",hello:"Contact_hello__3UpiA",content:"Contact_content__2nEDl",hope:"Contact_hope__225ch",want:"Contact_want__qyhTZ",container:"Contact_container__F7slF",tome:"Contact_tome__1Pb_r",info:"Contact_info__1OX1h"}},831:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a(1),r=a(2),l=a(3),c=a(4),i=a(735),s=a.n(i),u=a(736),m=a.n(u),d=[{label:"\u5927\u5bb6\u597d,\u6211\u662fMonkeyWong",sublabel:"\u76ee\u524d\u5c45\u4f4f\u5728\u4e2d\u56fd\u4e0a\u6d77"},{label:"\u6211\u662f\u4e00\u540d\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",sublabel:"\u76ee\u524d\u5de5\u4f5c\u5728\u5e73\u5b89\u597d\u533b\u751f"},{label:"\u521d\u604bC++\uff0c\u8f6c\u89d2\u9047\u5230Javascript",sublabel:"\u521d\u604b\u6700\u751c\uff0cJavascript\u4e5f\u5f88\u68d2"}],f=function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var o=arguments.length,r=new Array(o),l=0;l<o;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).onToNext=function(){},e.renderInfo=function(e,t,a){return c.createElement("div",{key:"".concat(a,"-label"),className:m.a.container},c.createElement("div",{className:m.a.label},e),c.createElement("div",{className:m.a.sublabel},t))},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this;return c.createElement("div",{className:"flex flex-center flex-column ".concat(m.a.profile)},d.map(function(t,a){return e.renderInfo(t.label,t.sublabel,a)}))}}]),a}(c.Component),p=a(706),b=a.n(p),v=a(738),_=a.n(v),E=function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var o=arguments.length,r=new Array(o),l=0;l<o;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).context=void 0,e.onToNext=function(){var t=e.props.onToNext;"function"===typeof t&&t()},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){if(!this.context)return null;var e=this.context.getContext("2d"),t={type:"line",data:{xLabels:["javascript","http","c/c++","react&other","redux","webpack","rollup"],yLabels:["\u7cbe\u901a","\u638c\u63e1","\u719f\u6089","\u4e86\u89e3","\u672a\u77e5"],datasets:[{label:"\u6280\u80fd\u503c",data:["\u638c\u63e1","\u719f\u6089","\u719f\u6089","\u719f\u6089","\u719f\u6089","\u719f\u6089","\u4e86\u89e3"],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:{xAxes:[{scaleLabel:{display:!0,labelString:"\u6280\u80fd\u79cd\u7c7b"}}],yAxes:[{type:"category",scaleLabel:{display:!0,labelString:"\u719f\u7ec3\u7a0b\u5ea6"},ticks:{beginAtZero:!0}}]},title:{display:!0,text:"MonkeyWong\u7684\u6280\u80fd\u56fe\u8c31"},animation:{duration:5e3}}};new b.a(e,t)}},{key:"render",value:function(){var e=this;return c.createElement("div",{className:_.a.technology},c.createElement("div",{className:_.a.container},c.createElement("canvas",{ref:function(t){e.context=t}})))}}]),a}(c.Component),x=a(739),h=a.n(x),g="\u516c\u53f8/\u5b66\u6821\uff1a",y="\u804c\u4f4d\uff1a",N="\u65f6\u95f4\u6bb5\uff1a",w="\u5de5\u4f5c\u5185\u5bb9\uff1a",C=["\u5e73\u5b89\u597d\u533b\u751f","\u9886\u58f9\u91d1\u878d","\u4e91\u4e4b\u8f69","\u5927\u8fde\u6c11\u65cf\u5927\u5b66","\u5b89\u9633\u5de5\u5b66\u9662"],j=new Map([["\u5e73\u5b89\u597d\u533b\u751f",{organization:"\u5e73\u5b89\u597d\u533b\u751f",position:"\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",duration:"2017-\u81f3\u4eca",job:""}],["\u9886\u58f9\u91d1\u878d",{organization:"\u9886\u58f9\u91d1\u878d",position:"\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",duration:"2016-2017",job:"\u5e94\u8058\u524d\u7aef\u5f00\u53d1\u5de5\u7a0b\u5c97\u4f4d\uff0c\u4eceangular\u8f6c\u5411react\uff0c\u7b2c\u4e00\u6b21\u63a5\u89e6\u4e86webpack\u3001gulp\u7b49\u524d\u7aef\u81ea\u52a8\u5316\u5f00\u53d1\u5de5\u5177\uff0c\u5e76\u5feb\u901f\u4e0a\u624b\u4e86nodejs\u3002\u5728\u6b64\u671f\u95f4\uff0c\u5148\u540e\u53c2\u4e0e\u4e86trade work\uff0cbroker work\u4ee5\u53ca\u5bf9\u5e94\u7684\u5fae\u4fe1\u5c0f\u7a0b\u5e8f\u7248\u672c\u5f00\u53d1\uff0c\u5145\u5206\u5b66\u4e60\u4e86\u524d\u7aefUI\u5e93react\uff0c\u5e76\u4e86\u89e3\u5b66\u4e60\u4e86\u5176\u5468\u8fb9react-router\uff0creact-redux\uff0cwebpack\u7b49\u7b49\uff0c\u5b66\u4e60\u4e86\u524d\u7aef\u7ec4\u4ef6\u5316\u5f00\u53d1\u7684\u601d\u7ef4\uff0c\u521d\u6b65\u4e86\u89e3\u4e86\u6570\u636e\u9a71\u52a8\u89c6\u56fe\u7684\u6982\u5ff5\u3002\u540c\u65f6\u4f7f\u7528nodejs\u7f16\u5199\u4e86\u5185\u90e8\u7684\u4f7f\u7528\u7684\u5de5\u5177\uff0c\u4f53\u4f1a\u5230\u4e86\u524d\u7aef\u81ea\u52a8\u5316\u7684\u4e00\u4e9b\u4f18\u52bf\u548c\u601d\u8def\u3002\u5ef6\u7eed\u4e86\u4e4b\u524d\u989d\u72ec\u7acb\u5b66\u4e60\u548c\u8c03\u7814\u65b0\u6280\u672f\u7684\u80fd\u529b\uff0c\u5e76\u8fdb\u884c\u4e86\u90e8\u5206\u603b\u7ed3\uff1a\u5bf9\u4e8e\u4f7f\u7528\u5df2\u7ecf\u6210\u719f\u7684\u6280\u672f\uff0c\u4e3a\u4e86\u5feb\u901f\u505a\u51faDemo\uff0c\u4f18\u5148\u641c\u7d22\u4e2d\u6587\u8d44\u6599\uff0c\u5feb\u901f\u4e86\u89e3\u5b66\u4e60\u57fa\u672c\u6982\u5ff5\uff0c\u5e76\u5b9e\u73b0Demo\uff0c\u7136\u540e\u53bb\u67e5\u770b\u5b98\u7f51\u6587\u6863\uff1b\u5bf9\u4e8e\u65b0\u6280\u672f\uff08\u82f1\u8bed\u7c7b\u8f83\u591a\uff0c\u6240\u4ee5\u82f1\u8bed\u9605\u8bfb\u4e00\u5b9a\u8981\u8fc7\u5173\uff09\uff0c\u5219\u76f4\u63a5\u53bb\u5b98\u7f51\u67e5\u770b\u6587\u6863\uff0c\u5b66\u4e60\u5e76\u5b9e\u8df5\uff0c\u638c\u63e1\u57fa\u672c\u6982\u5ff5\u3002"}],["\u4e91\u4e4b\u8f69",{organization:"\u4e91\u4e4b\u8f69",position:"\u684c\u9762\u5f00\u53d1\u5de5\u7a0b\u5e08&\u65e0\u7ebf\u7aef\u5f00\u53d1\u5de5\u7a0b\u5e08",duration:"2015-2016",job:"\u6700\u521d\u5e94\u8058\u5c97\u4f4d\u662fC++\u684c\u9762\u5f00\u53d1\u5de5\u7a0b\u5e08\uff0c\u5f00\u53d1\u7c7b\u4f3c\u767e\u5ea6\u4e91\u76d8\u7684\u5b9a\u5236\u5316\u4e91\u76d8\uff0c\u4f46\u968f\u7740\u516c\u53f8\u6218\u7565\u8c03\u6574\uff0c\u4ea7\u54c1\u7ebf\u53bb\u6389\u4e86PC\u7aef\uff0c\u6211\u4e5f\u968f\u7740\u516c\u53f8\u7684\u8f6c\u53d8\u6539\u53d8\u4e86\u65b9\u5411\uff0c\u5148\u540e\u8f6c\u5411OC\u539f\u751f\u5f00\u53d1\u3001\u518d\u5230H5\u6df7\u5408\u5f00\u53d1\u3002\u5728\u6b64\u8fc7\u7a0b\u4e2d\uff0c\u6211\u4fdd\u6301\u5e76\u7ee7\u7eed\u4e86\u7814\u7a76\u751f\u671f\u95f4\u7684\u72ec\u7acb\u5b66\u4e60\u548c\u8c03\u7814\u80fd\u529b\uff0c\u5148\u540e\u5b66\u4e60\u4e86OC\u539f\u751f\u8bed\u8a00\u5f00\u53d1\uff0c\u57fa\u4e8eCordova\u548cangular\u7684H5\u6df7\u5408\u5f00\u53d1\uff0c\u5e76\u7ed9\u51faDemo\u6d4b\u8bd5\u6280\u672f\u53ef\u884c\u6027\u3002\u540c\u65f6\uff0c\u6211\u8fd8\u5b66\u4e60\u4e86\u540e\u53f0\u76f8\u5173\u6280\u672f\uff0c\u5305\u62ectomcat\u96c6\u7fa4\u642d\u5efa\u3001restful\u98ce\u683c\u7684api\u8bbe\u8ba1\u7b49\u77e5\u8bc6\uff0c\u987a\u4fbf\u73a9\u4e86\u4e00\u4e0bmongodb"}],["\u5927\u8fde\u6c11\u65cf\u5927\u5b66",{organization:"\u5927\u8fde\u6c11\u65cf\u5927\u5b66",position:"\u5b66\u751f",duration:"2013-2015",job:"\u7814\u7a76\u751f2\u5e74\uff0c\u4e3b\u8981\u65b9\u5411\u662f\u56fe\u5f62\u56fe\u50cf\u8bc6\u522b\u65b9\u5411\uff0c\u57fa\u4e8eopencv\u7684\u820c\u63a7\u9f20\u6807\u7cfb\u7edf\uff0c\u662f\u6211\u7684\u6bd5\u4e1a\u8bbe\u8ba1\uff0c\u4e5f\u662f\u5bf9\u8be5\u65b9\u5411\u7684\u4e00\u6b21\u5b9e\u8df5\u3002\u5728\u505a\u820c\u63a7\u9f20\u6807\u7cfb\u7edf\u7684\u8fc7\u7a0b\u4e2d\uff0c\u6211\u5148\u540e\u72ec\u7acb\u8c03\u7814\u4e86duilib UI\u5e93\uff0c\u5fae\u8f6f\u7684DirectShow\u548cFFmpeg\u7b49\u97f3\u89c6\u9891\u7f16\u89e3\u7801\u5e93\uff0c\u867d\u7136\u6700\u7ec8\u5e76\u6ca1\u6709\u771f\u6b63\u7684\u5e94\u7528\u5230\u6211\u7684\u9879\u76ee\u4e2d\uff0c\u4f46\u57f9\u517b\u4e86\u6211\u72ec\u7acb\u5b66\u4e60\u548c\u8c03\u7814\u65b0\uff08\u964c\u751f\uff09\u6280\u672f\u7684\u80fd\u529b\uff0c\u8fd9\u662f\u6211\u76ee\u524d\u4e3a\u6b62get\u5230\u7684\u6700\u6709\u7528\u7684\u6280\u80fd\u70b9\u3002"}],["\u5b89\u9633\u5de5\u5b66\u9662",{organization:"\u5b89\u9633\u5de5\u5b66\u9662",position:"\u5b66\u751f",duration:"2009-2013",job:"\u5927\u5b66\u56db\u5e74\uff0c\u66f4\u591a\u79ef\u7d2f\u4e86\u8ba1\u7b97\u673a\u4e13\u4e1a\u76f8\u5173\u7684\u57fa\u7840\u77e5\u8bc6\uff1a\u5148\u540e\u5b66\u4e60\u4e86\u300a\u6570\u636e\u7ed3\u6784\u300b\u3001\u300a\u8ba1\u7b97\u673a\u7ec4\u6210\u539f\u7406\u300b\u3001\u300a\u8ba1\u7b97\u673a\u7f51\u7edc\u300b\u3001\u300a\u64cd\u4f5c\u7cfb\u7edf\u300b\u3001\u300a\u901a\u4fe1\u539f\u7406\u300b\u7b49\u57fa\u7840\u8bfe\u7a0b\uff0c\u540c\u65f6\u5b66\u4e60\u4e86\u300a\u6570\u636e\u5e93\u7cfb\u7edf\u6982\u8bba\u300b\u3001\u300aC\u8bed\u8a00\u7a0b\u5e8f\u8bbe\u8ba1\u300b\u3001\u300aC++\u7a0b\u5e8f\u8bbe\u8ba1\u6559\u7a0b\u300b\u4ee5\u53cajava\u3001xml\u7b49\u5176\u5b83\u8bed\u8a00\u7c7b\u8bfe\u7a0b\uff0c\u6700\u7ec8\u7684\u6bd5\u4e1a\u8bbe\u8ba1\u662f\u57fa\u4e8eMFC\u548c\u5f00\u6e90api\u7684\u97f3\u4e50\u64ad\u653e\u5668\uff0c\u4e3b\u8981\u5de5\u4f5c\u70b9\u662fUI\u90e8\u5206"}]]),k=function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).context=void 0,o.pieChart=void 0,o.onToNext=function(){var e=o.props.onToNext;"function"===typeof e&&e()},o.setIndex=function(e){o.setState({index:e})},o.renderExperienceDetail=function(){var e=j.get(o.state.index);return c.createElement("div",{className:h.a.detail},c.createElement("div",{className:h.a.info},c.createElement("span",{className:h.a["info-label"]},g),c.createElement("span",{className:h.a["info-data"]},e&&e.organization)),c.createElement("div",{className:h.a.info},c.createElement("span",{className:h.a["info-label"]},y),c.createElement("span",{className:h.a["info-data"]},e&&e.position)),c.createElement("div",{className:h.a.info},c.createElement("span",{className:h.a["info-label"]},N),c.createElement("span",{className:h.a["info-data"]},e&&e.duration)),c.createElement("div",{className:h.a.info},c.createElement("span",{className:h.a["info-label"]},w),c.createElement("span",{className:h.a["info-data"]},e&&e.job)))},o.state={index:"\u5e73\u5b89\u597d\u533b\u751f"},o}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;if(!this.context)return null;var t=this.context.getContext("2d"),a={type:"pie",data:{datasets:[{data:[8,1,1,2,4],backgroundColor:["#1E90FF","#00A3FE","#FF0000","#FF6347","#FFA500"]}],labels:C},options:{title:{display:!0,text:"\u4e3b\u8981\u7684\u5b66\u4e60\u5de5\u4f5c\u7ecf\u5386"},legend:{position:"left",fullWidth:!0,onClick:function(t,a){var n=a.text;e.setIndex(n)},onHover:function(e,t){"pointer"!==e.target.style.cursor&&(e.target.style.cursor="pointer")}},tooltips:{callbacks:{title:function(t,a){var n=t[0].index,o=void 0===n?0:n;return e.setIndex(a.labels[o]),a.labels[o]},label:function(e,t){var a=e.index,n=void 0===a?0:a,o=8===t.datasets[0].data[n]?"\u81f3\u4eca":t.datasets[0].data[n];return o}}},animation:{},elements:{},layout:{}}};this.pieChart=new b.a(t,a)}},{key:"render",value:function(){var e=this;return c.createElement("div",{className:h.a.experience},c.createElement("div",{className:h.a.container},c.createElement("div",{className:h.a.chart},c.createElement("canvas",{ref:function(t){e.context=t}})),c.createElement("div",{className:h.a.content},c.createElement("div",{className:h.a.summary},c.createElement("div",{className:h.a.label},"\u603b\u7ed3\uff1a"),c.createElement("div",{className:"we-summary-content"},c.createElement("div",null,"1\u3001\u5927\u5b66\u671f\u95f4\uff0c\u79ef\u7d2f\u4e86\u4e30\u5bcc\u8ba1\u7b97\u673a\u4e13\u4e1a\u57fa\u7840\u77e5\u8bc6"),c.createElement("div",null,"2\u3001\u7814\u7a76\u751f\u5230\u5de5\u4f5c\u7b2c\u4e00\u5e74\uff0c\u57f9\u517b\u4e86\u72ec\u7acb\u8c03\u7814\u548c\u5b66\u4e60\u65b0\u6280\u672f\u7684\u80fd\u529b\uff0c\u5e76\u5e7f\u6cdb\u63a5\u89e6\u5b66\u4e60\u4e86\u524d\u540e\u7aef\u6280\u672f\u77e5\u8bc6"),c.createElement("div",null,"3\u3001\u5de5\u4f5c\u7b2c\u4e8c\u5e74\uff0c\u6280\u672f\u6808\u8f6c\u5411React\u53ca\u5176\u5468\u8fb9\uff0c\u6280\u672f\u6709\u4e86\u5feb\u901f\u7684\u8fdb\u6b65\uff0c\u5e76\u63a5\u89e6\u5b66\u4e60\u4e86\u524d\u7aef\u5de5\u7a0b\u5316\u7684\u6982\u5ff5"),c.createElement("div",null,"4\u3001\u5de5\u4f5c\u7b2c\u4e09\u5e74\u81f3\u4eca\uff0c\u4e00\u65b9\u9762\u5ef6\u7eed\u4e86\u5bf9\u6280\u672f\u7684\u5b66\u4e60\u548c\u63a2\u7d22\uff0c\u53e6\u4e00\u65b9\u9762\u5219\u586b\u5145\u4e86\u5bf9\u4e1a\u52a1\u7684\u76f8\u5173\u5b66\u4e60\u548c\u5b9e\u8df5\u7ecf\u9a8c"))),this.renderExperienceDetail())))}}]),a}(c.Component),O=a(740),F=a.n(O),D="\u6253\u4e2a\u62db\u547c",I="\u4e0a\u6d77",M="\u65b0\u670b\u53cb",T="\u6709\u8da3",A="\u5982\u4f55\u627e\u5230\u6211",S="+8617612151221",z="334080374@qq.com";var L=function(){return c.createElement("div",{className:"flex flex-column flex-center ".concat(F.a.contact)},c.createElement("span",{className:"flex flex-column flex-center ".concat(F.a.hello)},D),c.createElement("div",{className:"flex flex-center-h flex-evenly ".concat(F.a.content)},c.createElement("div",{className:F.a.hope},c.createElement("div",{className:F.a.want},"\u76ee\u524d\u5e38\u9a7b",c.createElement("span",null,I)),c.createElement("div",{className:F.a.want},"\u60f3\u7ed3\u4ea4",c.createElement("span",null,M)),c.createElement("div",{className:F.a.want},"\u505a",c.createElement("span",null,T),"\u7684\u4e8b\u60c5")),c.createElement("div",{className:F.a.container},c.createElement("div",{className:F.a.tome},A),c.createElement("div",{className:F.a.info},S),c.createElement("div",{className:F.a.info},z))))},P=function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).root=void 0,o.toNextPage=function(){var e=o.root.clientHeight;o.root.scrollTop+=e+10},o.onStart=function(e){o.root.style.overflowY="hidden"},o.onEnd=function(e){o.root.style.overflowY="auto",o.setState({end:o.root.style.overflowY})},o.onMove=function(e){o.setState(function(e){return{count:e.count+1}})},o.state={count:1,start:"",end:""},o}return Object(o.a)(a,[{key:"componentDidMount",value:function(){for(var e=this.root;e&&e!==document;)console.log("parent==>",e.style.overflowY),e=e.parentNode;this.setState({start:this.root.style.overflowY})}},{key:"componentWillUnmount",value:function(){console.log("About unmount===========>")}},{key:"render",value:function(){var e=this;return c.createElement("div",{id:"about",className:s.a.about,style:{overflowY:"scroll"},ref:function(t){e.root=t}},c.createElement(f,null),c.createElement(E,null),c.createElement(k,null),c.createElement(L,null))}}]),a}(c.Component);t.default=P}}]);
//# sourceMappingURL=10.f38feede.chunk.js.map