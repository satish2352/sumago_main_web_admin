"use strict";(self.webpackChunkmodernize=self.webpackChunkmodernize||[]).push([[712],{712:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var l=n(9950),i=n(1320),r=n(2235),s=n(5769),o=n(9780),c=n(9213),a=n(1671),d=n(4075),u=n(899),h=n(1239),m=n(226),x=n(2712),j=n(9928),A=n(8469),g=n(5333),f=n(7988),p=n(4414);const C=()=>{const[e,t]=(0,l.useState)(!1),[n,C]=(0,l.useState)(""),[b,y]=(0,l.useState)(""),[v,S]=(0,l.useState)({}),[k,z]=(0,l.useState)([]);(0,l.useEffect)((()=>{A.A.get("/clientCount/find").then((e=>{z(e.data)})).catch((e=>{console.log("err",e)}))}),[e]);return(0,p.jsx)(x.A,{title:"Valuable Clients",description:"this is Sample page",children:(0,p.jsx)(j.A,{title:"ValuableClients",buttonName:e?"Add Valuable Clients":"View Valuable Clients",onClick:e?()=>{t(!1)}:()=>{t(!0)},children:e?(0,p.jsx)(i.A,{component:r.A,children:(0,p.jsxs)(s.A,{stickyHeader:!0,children:[(0,p.jsx)(o.A,{children:(0,p.jsxs)(c.A,{children:[(0,p.jsx)(a.A,{style:{fontWeight:"bold",fontSize:"1rem"},children:"Title"}),(0,p.jsx)(a.A,{style:{fontWeight:"bold",fontSize:"1rem"},children:"Counts"}),(0,p.jsx)(a.A,{style:{fontWeight:"bold",fontSize:"1rem"},children:"Action"})]})}),(0,p.jsx)(d.A,{children:0==k.length?(0,p.jsx)("div",{style:{marginLeft:"10px",color:"red"},children:(0,p.jsx)("h3",{children:"No data found"})}):k.map(((e,t)=>(console.log("item",e),(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(c.A,{children:[(0,p.jsx)(a.A,{children:null===e||void 0===e?void 0:e.name}),(0,p.jsx)(a.A,{children:null===e||void 0===e?void 0:e.counter}),(0,p.jsx)(g.A,{"aria-label":"delete",style:{color:"red"},onClick:()=>{return t=null===e||void 0===e?void 0:e.id,console.log("clientCount",t),void A.A.delete("clientCount/delete/".concat(t)).then((e=>{console.log("clientCount deleted successfully"),A.A.get("/clientCount/find").then((e=>{z(e.data)})).catch((e=>{console.log("err",e)}))})).catch((e=>{console.error("Error deleting clientCount:",e)}));var t},children:(0,p.jsx)(f.A,{})})]})}))))})]})}):(0,p.jsx)("form",{onSubmit:e=>{if(e.preventDefault(),(()=>{let e={},t=!0;return b.trim()?/^\d+$/.test(b.trim())||(e.counter="counter must contain only numbers",t=!1):(e.counter="counter is required",t=!1),n.trim()||(e.name="name is required",t=!1),S(e),t})()){let e={counter:b,name:n};A.A.post("clientCount/create",e,{headers:{"Content-Type":"application/json"}}).then((e=>{console.log("resp",e),alert("Form submitted successfully")})).catch((e=>{console.log("err",e)})),y(""),C(""),S({}),t(!0)}},children:(0,p.jsxs)(u.Ay,{container:!0,spacing:2,children:[(0,p.jsxs)(u.Ay,{item:!0,xs:12,sm:6,children:[(0,p.jsx)(h.A,{fullWidth:!0,label:"Name",onChange:e=>C(e.target.value),variant:"outlined"}),v.name&&(0,p.jsx)("span",{className:"error",style:{color:"red"},children:v.name})]}),(0,p.jsxs)(u.Ay,{item:!0,xs:12,sm:6,children:[(0,p.jsx)(h.A,{fullWidth:!0,label:"Counts",onChange:e=>y(e.target.value),variant:"outlined"}),v.designation&&(0,p.jsx)("span",{className:"error",style:{color:"red"},children:v.counter})]}),(0,p.jsx)(u.Ay,{item:!0,xs:12,children:(0,p.jsx)(m.A,{variant:"contained",type:"submit",color:"primary",children:"Submit"})})]})})})})}}}]);