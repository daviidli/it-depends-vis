(this["webpackJsonpit-depends-vis"]=this["webpackJsonpit-depends-vis"]||[]).push([[0],{100:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(8),i=a.n(c),s=(a(89),a(57)),o=a(13),l=a(132),u=a(140),m=a(134),d=a(133),f=a(59),h=a.n(f),g=a(141),p=a(138),b=a(126),v=a(135),E=a(3),w=(a(90),function(e){var t=e.selectedValue,a=e.label,c=e.disabled,i=e.setSelectedValue,s=e.values,l=e.className,u=Object(n.useState)(0),m=Object(o.a)(u,2),d=m[0],f=m[1],h=Object(n.useRef)(null);return Object(n.useEffect)((function(){f(h.current.offsetWidth)}),[]),r.a.createElement(b.a,{variant:"outlined",className:Object(E.a)("dropdown",l),disabled:c},r.a.createElement(g.a,{ref:h,id:a,className:"label",margin:"dense"},a),r.a.createElement(v.a,{className:"select",value:t,onChange:function(e){return i(e.target.value)},margin:"dense",labelId:a,labelWidth:d},s.map((function(e,t){return r.a.createElement(p.a,{key:e+t,value:e},e)}))))}),y=function(e){var t,a=e.label,n=e.selectedCommit,c=e.showCommitsAfter,i=e.setSelectedCommit,s=e.commits,o=s.indexOf(c);return t=o<0?s:s.slice(o+1,s.length),r.a.createElement(w,{selectedValue:n,label:a,disabled:!t.length,setSelectedValue:i,values:t})},O=r.a.createContext([]),j=function(e){var t=Object(n.useState)(!1),a=Object(o.a)(t,2),c=a[0],i=a[1];return r.a.createElement(O.Provider,{value:[c,i]},e.children)};a(95);function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function C(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(a,!0).forEach((function(t){Object(s.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var k=function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)([]),s=Object(o.a)(i,2),f=s[0],g=s[1],p=Object(n.useState)({start:"",end:""}),b=Object(o.a)(p,2),v=b[0],E=b[1],w=Object(n.useContext)(O)[1],j=function(){console.log(a),g(["commit #1","commit #2","commit #3","commit #4","commit #5","commit #6","commit #7","commit #8","commit #9","commit #10"])};return r.a.createElement("div",{className:"headerContainer"},r.a.createElement(l.a,{container:!0,className:"repoContainer",spacing:1,justify:"space-evenly"},r.a.createElement(l.a,{item:!0,xs:12},r.a.createElement("span",{className:"heading"},"IT DEPENDS"),r.a.createElement(d.a,{className:"help","aria-label":"help",onClick:function(){w(!0)}},r.a.createElement(h.a,null))),r.a.createElement(l.a,{item:!0,xs:10,sm:11,md:4},r.a.createElement(u.a,{label:"Repository",type:"search",variant:"outlined",margin:"dense",fullWidth:!0,value:a,onChange:function(e){return c(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&j()}})),r.a.createElement(l.a,{item:!0,xs:2,sm:1,md:1},r.a.createElement(m.a,{id:"repoSend",variant:"contained",color:"secondary",onClick:function(){return j()}},">")),r.a.createElement(l.a,{item:!0,xs:12,sm:12,md:3}),r.a.createElement(l.a,{item:!0,xs:6,sm:6,md:2},r.a.createElement(y,{label:"Start Commit",selectedCommit:v.start,showCommitsAfter:"",setSelectedCommit:function(e){E((function(t){return C({},t,{start:e})}))},commits:f})),r.a.createElement(l.a,{item:!0,xs:6,sm:6,md:2},r.a.createElement(y,{label:"End Commit",selectedCommit:v.end,showCommitsAfter:v.start,setSelectedCommit:function(e){E((function(t){return C({},t,{end:e})}))},commits:f}))))},N=a(136),S=(a(98),function(){var e=Object(n.useContext)(O),t=Object(o.a)(e,2),a=t[0],c=t[1],i={top:window.innerHeight/2,left:window.innerWidth/2,width:window.innerWidth>550?480:"85%"};return r.a.createElement(N.a,{"aria-labelledby":"help",open:a,onClose:function(){return c(!1)}},r.a.createElement("div",{className:"helpModal",style:i},r.a.createElement("span",{className:"helpHeader"},"Help"),r.a.createElement("div",{className:"helpDescription"},"This tool enables developers to more easily visualize dependencies between entities in a software system (classes, files, etc...) which cut across commit history."),r.a.createElement(m.a,{className:"closeButton",variant:"contained",color:"secondary",onClick:function(){return c(!1)}},"Close")))}),A=a(137),P=(a(99),function(){var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],c=t[1],i=Object(n.useState)([0,100]),s=Object(o.a)(i,2),u=s[0],m=s[1],d=window.innerWidth>550;return r.a.createElement(l.a,{className:"footer",container:!0,spacing:0,justify:"space-between"},r.a.createElement(l.a,{item:!0,xs:12,sm:5},r.a.createElement(w,{className:Object(E.a)({wide:d}),selectedValue:a,label:"Granularity",disabled:!1,setSelectedValue:c,values:["Files","Classes","Functions"]})),r.a.createElement(l.a,{item:!0,xs:12,sm:1}),r.a.createElement(l.a,{item:!0,xs:12,sm:3,className:"sliderContainer"},r.a.createElement("div",{className:"sliderLabel"},"Percentage Range"),r.a.createElement(A.a,{className:Object(E.a)("slider",{wide:d}),value:u,onChange:function(e,t){return m(t)},valueLabelDisplay:"auto","aria-labelledby":"range-slider",getAriaValueText:function(){return u[0]+"-"+u[1]}})))}),M=a(16),W=a(60),D=a(61),z=function(){function e(t){Object(W.a)(this,e),this.nodes=void 0,this.edges=void 0,this.nodes=this.parseNodes(t.names,t.size),this.edges=this.parseEdges(t.data)}return Object(D.a)(e,[{key:"getNodes",value:function(){return this.nodes}},{key:"getEdges",value:function(){return this.edges}},{key:"parseNodes",value:function(e,t){var a=[];if(e.length!==t.length)throw new Error("bad response");for(var n=0;n<e.length;n++)a.push({name:e[n],size:t[n]});return a}},{key:"parseEdges",value:function(e){for(var t=[],a=0;a<e.length;a++)for(var n=0;n<e[a].length;n++)a!==n&&0!==e[a][n]&&t.push({source:this.nodes[a],target:this.nodes[n],weight:e[a][n]});return t}}]),e}(),B=function(){var e="visualization",t=new z({names:["constructor (A)","main (A)","receiveInput (A)","constructor (B)","doSomething (B)","doSomethingElse (B)","constructor (C1)","foo (C1)","constructor (C2)","barbar (C2)"],size:[1,1,6,2,4,1,1,2,1,1],data:[[1,1,.166666667,.5,.25,0,0,0,0,0],[1,1,1,1,.75,1,1,1,1,0],[1,1,.333333333,1,.25,1,0,0,0,0],[1,1,.5,.5,1,0,0,.5,0,0],[0,0,.166666667,.5,0,1,0,0,0,0],[0,0,.166666667,0,0,0,1,.5,1,0],[0,0,.333333333,0,.25,0,1,1,1,0],[0,0,.166666667,0,0,0,1,.5,1,0],[0,0,0,0,0,0,0,0,0,1]]}),a=t.getNodes(),c=t.getEdges();return Object(n.useEffect)((function(){var t=window.innerWidth,n=window.innerHeight,r=M.g("#"+e).attr("width",t).attr("height",n),i=M.f(a).force("link",M.d(c).id((function(e){return e.id})).distance(500).strength(.3)).force("charge",M.e().strength((function(e){return-500*e.size}))).force("center",M.c(t/2,n/2)),s=r.append("g").selectAll("path").data(c).enter().insert("path").attr("class","link").attr("stroke","#000").attr("stroke-width",(function(e){return Math.sqrt(10*e.weight)})).attr("fill","none").attr("marker-end",(function(e){return"url(#arrow)"})),o=r.append("g").attr("stroke","#fff").attr("stroke-width",1.5).selectAll("circle").data(a).join("circle").attr("r",(function(e){return 10*e.size})).attr("fill","#fedcba").call(function(e){return M.a().on("start",(function(t){M.b.active||e.alphaTarget(.3).restart(),t.fx=t.x,t.fy=t.y})).on("drag",(function(e){e.fx=M.b.x,e.fy=M.b.y})).on("end",(function(t){M.b.active||e.alphaTarget(0),t.fx=null,t.fy=null}))}(i));r.append("defs").selectAll("marker").data(["arrow"]).enter().append("marker").attr("id",(function(e){return e})).attr("viewBox","0 -5 10 10").attr("refX",0).attr("refY",0).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto").append("path").attr("d","M0,-5L10,0L0,5"),i.on("tick",(function(){s.attr("d",(function(e){var t=e.target.x-e.source.x,a=e.target.y-e.source.y,n=Math.sqrt(t*t+a*a);return"M"+e.source.x+","+e.source.y+"A"+n+","+n+" 0 0,1 "+e.target.x+","+e.target.y})).attr("d",(function(e){var t=this.getTotalLength(),a=5*Math.sqrt(10*e.weight),n=Math.sqrt(2*Math.pow(a,2)),r=10*e.target.size+n,c=this.getPointAtLength(t-r),i=c.x-e.source.x,s=c.y-e.source.y,o=Math.sqrt(i*i+s*s);return"M"+e.source.x+","+e.source.y+"A"+o+","+o+" 0 0,1 "+c.x+","+c.y})),o.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y}))}))}),[]),r.a.createElement("svg",{id:e})},V=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(j,null,r.a.createElement(S,null),r.a.createElement(k,null)),r.a.createElement(B,null),r.a.createElement(P,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},84:function(e,t,a){e.exports=a(100)},89:function(e,t,a){},90:function(e,t,a){},95:function(e,t,a){},98:function(e,t,a){},99:function(e,t,a){}},[[84,1,2]]]);
//# sourceMappingURL=main.9d0f02d4.chunk.js.map