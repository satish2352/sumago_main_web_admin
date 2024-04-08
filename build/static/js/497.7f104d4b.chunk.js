"use strict";(self.webpackChunkmodernize=self.webpackChunkmodernize||[]).push([[497],{5497:(e,i,t)=>{t.r(i),t.d(i,{default:()=>b});var n=t(9950),l=t(1320),s=t(2235),r=t(5769),o=t(9780),a=t(9213),d=t(1671),c=t(4075),m=t(899),h=t(1239),u=t(9277),x=t(9890),g=t(226),j=t(2712),A=t(9928),p=t(8469),f=t(5333),v=t(7988),y=t(4414);const b=()=>{const[e,i]=(0,n.useState)(!1),[t,b]=(0,n.useState)(""),[S,w]=(0,n.useState)(""),[C,W]=(0,n.useState)(""),[N,k]=(0,n.useState)(),[z,T]=(0,n.useState)({}),[D,q]=(0,n.useState)([]);(0,n.useEffect)((()=>{p.A.get("/testimonials/find").then((e=>{q(e.data)})).catch((e=>{console.log("err",e)}))}),[e]);return(0,y.jsx)(j.A,{title:"Testimonials",description:"this is Sample page",children:(0,y.jsx)(A.A,{title:"Testimonials",buttonName:e?"Add Testimonial":"View Testimonial",onClick:e?()=>{i(!1)}:()=>{i(!0)},children:e?(0,y.jsx)(l.A,{component:s.A,children:(0,y.jsxs)(r.A,{stickyHeader:!0,children:[(0,y.jsx)(o.A,{children:(0,y.jsxs)(a.A,{children:[(0,y.jsx)(d.A,{style:{fontWeight:"bold",fontSize:"1rem"},children:"Name"}),(0,y.jsx)(d.A,{style:{fontWeight:"bold",fontSize:"1rem"},children:"Designation"}),(0,y.jsx)(d.A,{style:{fontWeight:"bold",fontSize:"1rem"},children:"Review"}),(0,y.jsx)(d.A,{style:{fontWeight:"bold",fontSize:"1rem"},children:"Profile Image"}),(0,y.jsx)(d.A,{style:{fontWeight:"bold",fontSize:"1rem"},children:"Action"})]})}),(0,y.jsx)(c.A,{children:0==D.length?(0,y.jsx)("div",{style:{marginLeft:"10px",color:"red"},children:(0,y.jsx)("h3",{children:"No data found"})}):D.map(((e,i)=>(console.log("item",e),(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(a.A,{children:[(0,y.jsx)(d.A,{children:null===e||void 0===e?void 0:e.name}),(0,y.jsx)(d.A,{children:null===e||void 0===e?void 0:e.designation}),(0,y.jsx)(d.A,{children:null===e||void 0===e?void 0:e.review}),(0,y.jsx)(d.A,{children:null===e||void 0===e?void 0:e.img}),(0,y.jsx)(f.A,{"aria-label":"delete",style:{color:"red"},onClick:()=>{return i=null===e||void 0===e?void 0:e.id,console.log("testimonialId",i),void p.A.delete("testimonials/delete/".concat(i)).then((e=>{console.log("Testimonial deleted successfully"),p.A.get("/testimonials/find").then((e=>{q(e.data)})).catch((e=>{console.log("err",e)}))})).catch((e=>{console.error("Error deleting testimonial:",e)}));var i},children:(0,y.jsx)(v.A,{})})]})}))))})]})}):(0,y.jsx)("form",{onSubmit:e=>{if(e.preventDefault(),(()=>{let e={},i=!0;return C.trim()||(e.designation="designation is required",i=!1),S.trim()||(e.review="review is required",i=!1),t.trim()||(e.name="name is required",i=!1),N||(e.img="image is required",i=!1),T(e),i})()){const e=new FormData;e.append("name",t),e.append("designation",C),e.append("review",S),e.append("img",N),console.log("formData",e),p.A.post("testimonials/create",e,{headers:{"Content-Type":"multipart/form-data"}}).then((e=>{console.log("resp",e),alert("Form submitted successfully")})).catch((e=>{console.log("err",e)})),W(""),b(""),w(""),k(null),T({}),i(!0)}},children:(0,y.jsxs)(m.Ay,{container:!0,spacing:2,children:[(0,y.jsxs)(m.Ay,{item:!0,xs:12,sm:6,children:[(0,y.jsx)(h.A,{fullWidth:!0,label:"Name",onChange:e=>b(e.target.value),variant:"outlined"}),z.name&&(0,y.jsx)("span",{className:"error",style:{color:"red"},children:z.name})]}),(0,y.jsxs)(m.Ay,{item:!0,xs:12,sm:6,children:[(0,y.jsx)(h.A,{fullWidth:!0,label:"Designation",onChange:e=>W(e.target.value),variant:"outlined"}),z.designation&&(0,y.jsx)("span",{className:"error",style:{color:"red"},children:z.designation})]}),(0,y.jsxs)(m.Ay,{item:!0,xs:12,children:[(0,y.jsx)(h.A,{fullWidth:!0,multiline:!0,rows:2,onChange:e=>w(e.target.value),label:"Review",variant:"outlined"}),z.review&&(0,y.jsx)("span",{className:"error",style:{color:"red"},children:z.review})]}),(0,y.jsx)(m.Ay,{item:!0,xs:12,sm:12,children:(0,y.jsxs)("div",{children:[(0,y.jsx)(u.A,{style:{marginBottom:"10px"},children:"File Upload"}),(0,y.jsx)(x.A,{type:"file",onChange:e=>k(e.target.files[0]),fullWidth:!0,style:{marginTop:"10px"}}),z.img&&(0,y.jsx)("span",{className:"error",style:{color:"red"},children:z.img})]})}),(0,y.jsx)(m.Ay,{item:!0,xs:12,children:(0,y.jsx)(g.A,{variant:"contained",type:"submit",color:"primary",children:"Submit"})})]})})})})}}}]);