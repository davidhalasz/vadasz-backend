"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[21],{8021:function(e,t,l){l.r(t);var n=l(4165),r=l(5861),s=l(3433),a=l(9439),i=l(3263),o=l(2791),c=l(7689),u=l(5877),d=l(5849),p=l(5094),h=l(1595),m=l(184);t.default=function(){var e=(0,c.s0)(),t=new FileReader,l=(0,o.useState)([]),f=(0,a.Z)(l,2),x=f[0],v=f[1],g=(0,o.useState)(""),j=(0,a.Z)(g,2),w=j[0],b=j[1],k=(0,o.useState)(null),N=(0,a.Z)(k,2),y=N[0],Z=N[1],C=(0,o.useState)([]),z=(0,a.Z)(C,2),V=z[0],I=z[1],L=(0,o.useState)("fegyverek"),T=(0,a.Z)(L,2),E=T[0],B=T[1],F=(0,o.useState)(!1),D=(0,a.Z)(F,2),S=D[0],H=D[1],R=(0,p.c)({title:{value:"",isValid:!1},price:{value:"",isValid:!1},desc:{value:"",isValid:!1}},!1),A=(0,a.Z)(R,2),M=A[0],P=A[1];t.addEventListener("load",(function(e){var l=t.result,n=(0,s.Z)(V);n.push({filePath:l,isDeleted:!1}),I(n)}));(0,o.useEffect)((function(){x.length!==V.length&&t.readAsDataURL(y)}),[y,x,V]);var G=function(){var t=(0,r.Z)((0,n.Z)().mark((function t(l){var r,s,a,o;return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l.preventDefault(),r=M.inputs.desc.value,s=M.inputs.title.value,a=M.inputs.price.value,o=new FormData,x.forEach((function(e){!1===e.isDeleted&&o.append("files",e.file)})),o.append("title",s),o.append("desc",r),o.append("price",a),o.append("category",E),o.append("featured",S),t.prev=11,t.next=14,i.Z.post("".concat("http://localhost:4000/api","/product"),o);case 14:e("/kezelofelulet/feltoltott-hirdetesek"),t.next=20;break;case 17:t.prev=17,t.t0=t.catch(11),t.t0.response&&(b(t.t0.response.data.msg),console.log(t.t0.response.data.msg));case 20:case"end":return t.stop()}}),t,null,[[11,17]])})));return function(e){return t.apply(this,arguments)}}();return(0,m.jsxs)(o.Fragment,{children:[(0,m.jsx)("div",{className:"w-full text-center p-4 text-customBlue font-bold text-2xl",children:(0,m.jsx)("h1",{className:"text-customBlue",children:"\xdaj hirdet\xe9s hozz\xe1ad\xe1sa"})}),(0,m.jsxs)("div",{className:"mx-auto w-10/12",children:[w&&(0,m.jsx)("p",{children:w}),(0,m.jsxs)("form",{onSubmit:G,children:[(0,m.jsxs)("div",{className:"flex flex-wrap -mx-4",children:[(0,m.jsx)("div",{className:"w-full md:w-1/2 lg:w-1/3 px-4",children:(0,m.jsx)("div",{className:"mb-8",children:(0,m.jsxs)("div",{className:"form-control",children:[(0,m.jsx)("label",{className:"block text-customBlue text-sm font-bold mb-2",htmlFor:"category",children:"Kateg\xf3ria"}),(0,m.jsxs)("select",{onChange:function(e){B(e.target.value)},defaultValue:E,className:"shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",name:"category",id:"category",children:[(0,m.jsx)("option",{value:"fegyverek",children:"Fegyverek"}),(0,m.jsx)("option",{value:"l\u0151szerek",children:"L\u0151szerek"}),(0,m.jsx)("option",{value:"optik\xe1k",children:"Optik\xe1k"}),(0,m.jsx)("option",{value:"\xf6lt\xf6z\xe9kek",children:"\xd6lt\xf6z\xe9kek"}),(0,m.jsx)("option",{value:"vad\xe1szkuty\xe1k",children:"Vad\xe1szkuty\xe1k"}),(0,m.jsx)("option",{value:"j\xe1rm\u0171vek",children:"J\xe1rm\u0171vek"}),(0,m.jsx)("option",{value:"szolg\xe1ltat\xe1sok",children:"Szolg\xe1ltat\xe1sok"}),(0,m.jsx)("option",{value:"kell\xe9kek",children:"Kell\xe9kek"})]})]})})}),(0,m.jsx)("div",{className:"w-full md:w-1/2 lg:w-1/3 px-4",children:(0,m.jsx)("div",{className:"mb-8",children:(0,m.jsx)(d.Z,{id:"price",type:"number",label:"\xc1r",placeholder:"\xc1r",element:"input",validators:[(0,h.hg)()],errorText:"\xc1r megad\xe1sa k\xf6telez\u0151",onInput:P})})}),(0,m.jsx)("div",{className:"w-full px-4",children:(0,m.jsx)("div",{className:"mb-8",children:(0,m.jsx)(d.Z,{id:"title",type:"text",label:"C\xedm",placeholder:"C\xedm",element:"input",validators:[(0,h.hg)()],errorText:"C\xedm megad\xe1sa k\xf6telez\u0151",onInput:P})})}),(0,m.jsx)("div",{className:"w-full px-4",children:(0,m.jsx)("div",{className:"mb-8",children:(0,m.jsx)(d.Z,{id:"desc",type:"text",label:"Le\xedr\xe1s",placeholder:"Le\xedr\xe1s",element:"textaera",validators:[(0,h.hg)()],errorText:"Le\xedr\xe1s megad\xe1sa k\xf6telez\u0151",onInput:P})})}),(0,m.jsx)("div",{className:"w-full px-4",children:(0,m.jsxs)("div",{className:"mb-5 w-fit flex",children:[(0,m.jsx)("label",{htmlFor:"featured",className:"font-medium text-base text-black block mb-3",children:"Kiemelt hirdet\xe9s"}),(0,m.jsx)("input",{type:"checkbox",name:"featured",checked:S,onChange:function(){H(!S)},className:"border-[1.5px] border-form-stroke ml-2 p-2 font-medium text-body-color placeholder-body-color outline-none focus:border-primary active:border-primary transition disabled:bg-[#F5F7FD] disabled:cursor-default"})]})}),(0,m.jsxs)("div",{className:"w-full md:w-1/2 lg:w-1/3 px-4",children:[(0,m.jsx)("p",{className:"font-medium text-base text-black mb-3",children:"K\xe9pek hozz\xe1ad\xe1sa"}),(0,m.jsxs)("div",{className:"flex flex-row gap-2",children:[V.map((function(e,t){return!1===e.isDeleted&&(0,m.jsxs)("div",{className:"relative border border-mint w-24 h-24 shrink-0",children:[(0,m.jsx)("img",{className:"object-cover object-center w-full h-full",src:e.filePath,alt:"public"}),(0,m.jsx)("button",{onClick:function(){return function(e){v((function(t){var l=(0,s.Z)(t);return l[e].isDeleted=!0,l})),I((function(t){var l=(0,s.Z)(t);return l[e].isDeleted=!0,l}))}(t)},type:"button",className:"bg-customRed rounded-full text-white absolute -top-1 -right-1",children:(0,m.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-7 h-7",children:(0,m.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"})})})]},t)})),(0,m.jsx)(u.Z,{id:"image",onInput:function(e){var t=(0,s.Z)(x);t.push({file:e,isDeleted:!1}),v(t),Z(e)},showPreview:!1})]})]})]}),(0,m.jsx)("div",{className:"row",children:(0,m.jsx)("div",{className:"col-md-12 text-right",children:(0,m.jsx)("button",{type:"submit",className:"px-4 bg-customBlue rounded-md text-white text-base px-5 py-2.5",children:"Felt\xf6lt\xe9s"})})})]})]})]})}},5877:function(e,t,l){var n=l(9439),r=l(2791),s=l(184);t.Z=function(e){var t=(0,r.useState)(),l=(0,n.Z)(t,2),a=l[0],i=l[1],o=(0,r.useState)(),c=(0,n.Z)(o,2),u=c[0],d=c[1],p=(0,r.useState)(!0),h=(0,n.Z)(p,2),m=h[0],f=h[1],x=(0,r.useRef)();(0,r.useEffect)((function(){if(a){var t=new FileReader;e.showPreview&&(t.onload=function(){d(t.result)}),t.readAsDataURL(a)}}),[a,e.showPreview]);var v=function(){x.current.click()};return(0,s.jsxs)("div",{className:"form-control",children:[(0,s.jsx)("input",{id:e.id,ref:x,style:{display:"none"},type:"file",accept:".jpg,.jpeg,.png",onChange:function(t){var l;t.target.files||1===t.target.files.length?(l=t.target.files[0],i(l),f(!0)):f(!1),e.onInput(l)}}),(0,s.jsx)("div",{className:"image-upload ".concat(e.center&&"center"),children:(0,s.jsxs)("div",{className:"image-upload__preview w-full flex justify-center",children:[u&&(0,s.jsxs)("div",{className:"w-24 h-24 relative",children:[(0,s.jsx)("button",{type:"button",onClick:function(){i(),d(),e.onInput()},children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"absolute -top-3 -right-3 w-7 h-7 bg-red-500 rounded-full",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,s.jsx)("button",{type:"button",onClick:v,children:(0,s.jsx)("img",{className:"w-24 h-24 object-cover",src:u,alt:"Preview"})})]}),!u&&(0,s.jsx)("button",{type:"button",onClick:v,className:"w-24 h-24 text-customBlue hover:text-mint border rounded-sm border-customBlue hover:border-mint flex items-center",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1",stroke:"currentColor",className:"w-12 h-12 mx-auto",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"})})})]})}),!m&&(0,s.jsx)("p",{children:"Nem megfelelo kepformatum"})]})}},5849:function(e,t,l){var n=l(9439),r=l(1413),s=l(2791),a=l(1595),i=l(184),o=function(e,t){switch(t.type){case"CHANGE":return(0,r.Z)((0,r.Z)({},e),{},{value:t.val,isValid:(0,a.Gu)(t.val,t.vaidators)});case"TOUCH":return(0,r.Z)((0,r.Z)({},e),{},{isTouched:!0});default:return e}};t.Z=function(e){var t=(0,s.useReducer)(o,{value:e.value||"",isTouched:!1,isValid:e.valid||!1}),l=(0,n.Z)(t,2),r=l[0],a=l[1],c=e.id,u=e.onInput,d=r.value,p=r.isValid;(0,s.useEffect)((function(){u(c,d,p)}),[c,u,d,p]);var h=function(t){a({type:"CHANGE",val:t.target.value,vaidators:e.validators})},m=function(){a({type:"TOUCH"})},f="input"===e.element?(0,i.jsx)("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ".concat(!r.isValid&&r.isTouched&&"border-red-500"),id:e.id,type:e.type,placeholder:e.placeholder,onChange:h,onBlur:m,value:r.value}):(0,i.jsx)("textarea",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ".concat(!r.isValid&&r.isTouched&&"border-red-500"),id:e.id,rows:e.rows||6,onChange:h,onBlur:m,value:r.value});return(0,i.jsxs)("div",{className:"form-control",children:[(0,i.jsx)("label",{className:"block text-customBlue text-sm font-bold mb-2",htmlFor:e.id,children:e.label}),f,!r.isValid&&r.isTouched&&(0,i.jsx)("p",{className:"text-red-500",children:e.errorText})]})}},5094:function(e,t,l){l.d(t,{c:function(){return o}});var n=l(9439),r=l(4942),s=l(1413),a=l(2791),i=function(e,t){if("INPUT_CHANGE"===t.type){var l=!0;for(var n in e.inputs)l=n===t.inputId?l&&t.isValid:l&&e.inputs[n].isValid;return(0,s.Z)((0,s.Z)({},e),{},{inputs:(0,s.Z)((0,s.Z)({},e.inputs),{},(0,r.Z)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:l})}return e},o=function(e,t){var l=(0,a.useReducer)(i,{inputs:e,isValid:t}),r=(0,n.Z)(l,2),s=r[0],o=r[1];return[s,(0,a.useCallback)((function(e,t,l){o({type:"INPUT_CHANGE",value:t,isValid:l,inputId:e})}),[])]}},1595:function(e,t,l){l.d(t,{CP:function(){return u},Gu:function(){return d},Ox:function(){return c},hg:function(){return o}});var n=l(7762),r="REQUIRE",s="MINLENGTH",a="MAXLENGTH",i="EMAIL",o=function(){return{type:r}},c=function(){return{type:i}},u=function(e){return{type:s,val:e}},d=function(e,t){var l,o=!0,c=(0,n.Z)(t);try{for(c.s();!(l=c.n()).done;){var u=l.value;u.type===r&&(o=o&&e.trim().length>0),u.type===s&&(o=o&&e.trim().length>=u.val),u.type===a&&(o=o&&e.trim().length<=u.val),"MIN"===u.type&&(o=o&&+e>=u.val),"MAX"===u.type&&(o=o&&+e<=u.val),u.type===i&&(o=o&&/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(e))}}catch(d){c.e(d)}finally{c.f()}return o}}}]);
//# sourceMappingURL=21.39b4aca4.chunk.js.map