(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();var Be=globalThis,Ke=Be.ShadowRoot&&(Be.ShadyCSS===void 0||Be.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ze=Symbol(),nt=new WeakMap,Dt=class{constructor(t,e,s){if(this.ut=!0,s!==Ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Ke&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&nt.set(e,t))}return t}toString(){return this.cssText}},Vt=t=>new Dt(typeof t=="string"?t:t+"",void 0,Ze),Mt=(t,...e)=>{let s=t.length===1?t[0]:e.reduce((i,a,o)=>i+(r=>{if(r.ut===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[o+1],t[0]);return new Dt(s,t,Ze)},Yt=(t,e)=>{if(Ke)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(let s of e){let i=document.createElement("style"),a=Be.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=s.cssText,t.appendChild(i)}},lt=Ke?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(let i of e.cssRules)s+=i.cssText;return Vt(s)})(t):t,{is:Wt,defineProperty:Xt,getOwnPropertyDescriptor:Gt,getOwnPropertyNames:Jt,getOwnPropertySymbols:Qt,getPrototypeOf:Kt}=Object,xe=globalThis,ct=xe.trustedTypes,Zt=ct?ct.emptyScript:"",je=xe.reactiveElementPolyfillSupport,Le=(t,e)=>t,Ge={toAttribute(t,e){switch(e){case Boolean:t=t?Zt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},At=(t,e)=>!Wt(t,e),dt={attribute:!0,type:String,converter:Ge,reflect:!1,useDefault:!1,hasChanged:At};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),xe.litPropertyMetadata??(xe.litPropertyMetadata=new WeakMap);var ye=class extends HTMLElement{static addInitializer(t){this.g(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this.d&&[...this.d.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this.g(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Xt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:a}=Gt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let r=i==null?void 0:i.call(this);a==null||a.call(this,o),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static g(){if(this.hasOwnProperty(Le("elementProperties")))return;let t=Kt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Le("finalized")))return;if(this.finalized=!0,this.g(),this.hasOwnProperty(Le("properties"))){let e=this.properties,s=[...Jt(e),...Qt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this.d=new Map;for(let[e,s]of this.elementProperties){let i=this.f(e,s);i!==void 0&&this.d.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(lt(i))}else t!==void 0&&e.push(lt(t));return e}static f(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.b=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.s=null,this.K()}K(){var t;this.v=new Promise(e=>this.enableUpdating=e),this.i=new Map,this.Z(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var s;var e;(this[e="r"]??(this[e]=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)==null||s.call(t))}removeController(t){var e;(e=this.r)==null||e.delete(t)}Z(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.b=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Yt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this.r)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this.r)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._(t,s)}G(t,e){var a;let s=this.constructor.elementProperties.get(t),i=this.constructor.f(t,s);if(i!==void 0&&s.reflect===!0){let o=(((a=s.converter)==null?void 0:a.toAttribute)!==void 0?s.converter:Ge).toAttribute(e,s.type);this.s=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this.s=null}}_(t,e){var a,o;let s=this.constructor,i=s.d.get(t);if(i!==void 0&&this.s!==i){let r=s.getPropertyOptions(i),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((a=r.converter)==null?void 0:a.fromAttribute)!==void 0?r.converter:Ge;this.s=i;let d=l.fromAttribute(e,r.type);this[i]=d??((o=this.m)==null?void 0:o.get(i))??d,this.s=null}}requestUpdate(t,e,s){var i;if(t!==void 0){let a=this.constructor,o=this[t];if(s??(s=a.getPropertyOptions(t)),!((s.hasChanged??At)(o,e)||s.useDefault&&s.reflect&&o===((i=this.m)==null?void 0:i.get(t))&&!this.hasAttribute(a.f(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this.v=this.Q())}C(t,e,{useDefault:s,reflect:i,wrapped:a},o){var r,l;s&&!(this[r="m"]??(this[r]=new Map)).has(t)&&(this.m.set(t,o??e??this[t]),a!==!0||o!==void 0)||(this.i.has(t)||(this.hasUpdated||s||(e=void 0),this.i.set(t,e)),i===!0&&this.s!==t&&(this[l="y"]??(this[l]=new Set)).add(t))}async Q(){this.isUpdatePending=!0;try{await this.v}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.b){for(let[a,o]of this.b)this[a]=o;this.b=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[a,o]of i){let{wrapped:r}=o,l=this[a];r!==!0||this.i.has(a)||l===void 0||this.C(a,void 0,o,l)}}let t=!1,e=this.i;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this.r)==null||s.forEach(i=>{var a;return(a=i.hostUpdate)==null?void 0:a.call(i)}),this.update(e)):this.w()}catch(i){throw t=!1,this.w(),i}t&&this.tt(e)}willUpdate(t){}tt(t){var e;(e=this.r)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}w(){this.i=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.v}shouldUpdate(t){return!0}update(t){var e;this[e="y"]&&(this[e]=this.y.forEach(s=>this.G(s,this[s]))),this.w()}updated(t){}firstUpdated(t){}};ye.elementStyles=[],ye.shadowRootOptions={mode:"open"},ye[Le("elementProperties")]=new Map,ye[Le("finalized")]=new Map,je==null||je({ReactiveElement:ye}),(xe.reactiveElementVersions??(xe.reactiveElementVersions=[])).push("2.1.1");var Re=globalThis,qe=Re.trustedTypes,pt=qe?qe.createPolicy("lit-html",{createHTML:t=>t}):void 0,Tt="$lit$",pe=`lit$${Math.random().toFixed(9).slice(2)}$`,Lt="?"+pe,es=`<${Lt}>`,fe=document,Ie=()=>fe.createComment(""),ze=t=>t===null||typeof t!="object"&&typeof t!="function",et=Array.isArray,ts=t=>et(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Ve=`[ 	
\f\r]`,Me=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,ht=/>/g,ge=RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,gt=/"/g,$t=/^(?:script|style|textarea|title)$/i,ss=t=>(e,...s)=>({et:t,strings:e,values:s}),O=ss(1),we=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),bt=new WeakMap,be=fe.createTreeWalker(fe,129);function It(t,e){if(!et(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(e):e}var as=(t,e)=>{let s=t.length-1,i=[],a,o=e===2?"<svg>":e===3?"<math>":"",r=Me;for(let l=0;l<s;l++){let d=t[l],p,h,m=-1,x=0;for(;x<d.length&&(r.lastIndex=x,h=r.exec(d),h!==null);)x=r.lastIndex,r===Me?h[1]==="!--"?r=ut:h[1]!==void 0?r=ht:h[2]!==void 0?($t.test(h[2])&&(a=RegExp("</"+h[2],"g")),r=ge):h[3]!==void 0&&(r=ge):r===ge?h[0]===">"?(r=a??Me,m=-1):h[1]===void 0?m=-2:(m=r.lastIndex-h[2].length,p=h[1],r=h[3]===void 0?ge:h[3]==='"'?gt:mt):r===gt||r===mt?r=ge:r===ut||r===ht?r=Me:(r=ge,a=void 0);let w=r===ge&&t[l+1].startsWith("/>")?" ":"";o+=r===Me?d+es:m>=0?(i.push(p),d.slice(0,m)+Tt+d.slice(m)+pe+w):d+pe+(m===-2?l:w)}return[It(t,o+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},Je=class zt{constructor({strings:e,et:s},i){let a;this.parts=[];let o=0,r=0,l=e.length-1,d=this.parts,[p,h]=as(e,s);if(this.el=zt.createElement(p,i),be.currentNode=this.el.content,s===2||s===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(a=be.nextNode())!==null&&d.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(let m of a.getAttributeNames())if(m.endsWith(Tt)){let x=h[r++],w=a.getAttribute(m).split(pe),S=/([.?@])?(.*)/.exec(x);d.push({type:1,index:o,name:S[2],strings:w,ctor:S[1]==="."?os:S[1]==="?"?rs:S[1]==="@"?ns:He}),a.removeAttribute(m)}else m.startsWith(pe)&&(d.push({type:6,index:o}),a.removeAttribute(m));if($t.test(a.tagName)){let m=a.textContent.split(pe),x=m.length-1;if(x>0){a.textContent=qe?qe.emptyScript:"";for(let w=0;w<x;w++)a.append(m[w],Ie()),be.nextNode(),d.push({type:2,index:++o});a.append(m[x],Ie())}}}else if(a.nodeType===8)if(a.data===Lt)d.push({type:2,index:o});else{let m=-1;for(;(m=a.data.indexOf(pe,m+1))!==-1;)d.push({type:7,index:o}),m+=pe.length-1}o++}}static createElement(e,s){let i=fe.createElement("template");return i.innerHTML=e,i}};function Ee(t,e,s=t,i){var l,d;var a;if(e===we)return e;let o=i!==void 0?(l=s.St)==null?void 0:l[i]:s.Ct,r=ze(e)?void 0:e.Ot;return(o==null?void 0:o.constructor)!==r&&((d=o==null?void 0:o.Lt)==null||d.call(o,!1),r===void 0?o=void 0:(o=new r(t),o.Ut(t,s,i)),i!==void 0?(s[a="St"]??(s[a]=[]))[i]=o:s.Ct=o),o!==void 0&&(e=Ee(t,o.Rt(t,e.values),o,i)),e}var is=class{constructor(t,e){this.pt=[],this.st=void 0,this.bt=t,this.n=e}get parentNode(){return this.n.parentNode}get x(){return this.n.x}u(t){let{el:{content:e},parts:s}=this.bt,i=((t==null?void 0:t.creationScope)??fe).importNode(e,!0);be.currentNode=i;let a=be.nextNode(),o=0,r=0,l=s[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new tt(a,a.nextSibling,this,t):l.type===1?d=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(d=new ls(a,this,t)),this.pt.push(d),l=s[++r]}o!==(l==null?void 0:l.index)&&(a=be.nextNode(),o++)}return be.currentNode=fe,i}p(t){let e=0;for(let s of this.pt)s!==void 0&&(s.strings!==void 0?(s.S(t,s,e),e+=s.strings.length-2):s.S(t[e])),e++}},tt=class Nt{get x(){var e;return((e=this.n)==null?void 0:e.x)??this.mt}constructor(e,s,i,a){this.type=2,this.e=z,this.st=void 0,this.z=e,this.Y=s,this.n=i,this.options=a,this.mt=(a==null?void 0:a.isConnected)??!0}get parentNode(){let e=this.z.parentNode,s=this.n;return s!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=s.parentNode),e}get startNode(){return this.z}get endNode(){return this.Y}S(e,s=this){e=Ee(this,e,s),ze(e)?e===z||e==null||e===""?(this.e!==z&&this.q(),this.e=z):e!==this.e&&e!==we&&this.gt(e):e.et!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ts(e)?this.k(e):this.gt(e)}O(e){return this.z.parentNode.insertBefore(e,this.Y)}T(e){this.e!==e&&(this.q(),this.e=this.O(e))}gt(e){this.e!==z&&ze(this.e)?this.z.nextSibling.data=e:this.T(fe.createTextNode(e)),this.e=e}$(e){var o;let{values:s,et:i}=e,a=typeof i=="number"?this.Dt(e):(i.el===void 0&&(i.el=Je.createElement(It(i.h,i.h[0]),this.options)),i);if(((o=this.e)==null?void 0:o.bt)===a)this.e.p(s);else{let r=new is(a,this),l=r.u(this.options);r.p(s),this.T(l),this.e=r}}Dt(e){let s=bt.get(e.strings);return s===void 0&&bt.set(e.strings,s=new Je(e)),s}k(e){et(this.e)||(this.e=[],this.q());let s=this.e,i,a=0;for(let o of e)a===s.length?s.push(i=new Nt(this.O(Ie()),this.O(Ie()),this,this.options)):i=s[a],i.S(o),a++;a<s.length&&(this.q(i&&i.Y.nextSibling,a),s.length=a)}q(e=this.z.nextSibling,s){var i;for((i=this.Et)==null?void 0:i.call(this,!1,!0,s);e!==this.Y;){let a=e.nextSibling;e.remove(),e=a}}setConnected(e){var s;this.n===void 0&&(this.mt=e,(s=this.Et)==null||s.call(this,e))}},He=class{get tagName(){return this.element.tagName}get x(){return this.n.x}constructor(t,e,s,i,a){this.type=1,this.e=z,this.st=void 0,this.element=t,this.name=e,this.n=i,this.options=a,s.length>2||s[0]!==""||s[1]!==""?(this.e=Array(s.length-1).fill(new String),this.strings=s):this.e=z}S(t,e=this,s,i){let a=this.strings,o=!1;if(a===void 0)t=Ee(this,t,e,0),o=!ze(t)||t!==this.e&&t!==we,o&&(this.e=t);else{let r=t,l,d;for(t=a[0],l=0;l<a.length-1;l++)d=Ee(this,r[s+l],e,l),d===we&&(d=this.e[l]),o||(o=!ze(d)||d!==this.e[l]),d===z?t=z:t!==z&&(t+=(d??"")+a[l+1]),this.e[l]=d}o&&!i&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},os=class extends He{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}},rs=class extends He{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==z)}},ns=class extends He{constructor(t,e,s,i,a){super(t,e,s,i,a),this.type=5}S(t,e=this){if((t=Ee(this,t,e,0)??z)===we)return;let s=this.e,i=t===z&&s!==z||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==z&&(s===z||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this.e=t}handleEvent(t){var e;typeof this.e=="function"?this.e.call(((e=this.options)==null?void 0:e.host)??this.element,t):this.e.handleEvent(t)}},ls=class{constructor(t,e,s){this.element=t,this.type=6,this.st=void 0,this.n=e,this.options=s}get x(){return this.n.x}S(t){Ee(this,t)}},Ye=Re.litHtmlPolyfillSupport;Ye==null||Ye(Je,tt),(Re.litHtmlVersions??(Re.litHtmlVersions=[])).push("3.3.1");var cs=(t,e,s)=>{let i=(s==null?void 0:s.renderBefore)??e,a=i._t;if(a===void 0){let o=(s==null?void 0:s.renderBefore)??null;i._t=a=new tt(e.insertBefore(Ie(),o),o,void 0,s??{})}return a.S(t),a},_e=globalThis,ue=class extends ye{constructor(){super(...arguments),this.renderOptions={host:this},this.it=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this.it=cs(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this.it)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.it)==null||t.setConnected(!1)}render(){return we}},St;ue.Nt=!0,ue.finalized=!0,(St=_e.litElementHydrateSupport)==null||St.call(_e,{LitElement:ue});var We=_e.litElementPolyfillSupport;We==null||We({LitElement:ue});(_e.litElementVersions??(_e.litElementVersions=[])).push("4.2.1");function ft(){document.addEventListener("click",t=>{let e=t.target.closest(".sb-ui-alert__close");if(!e)return;let s=e.closest(".sb-ui-alert");if(!s)return;s.classList.add("sb-ui-alert--fade-out");let i=parseFloat(getComputedStyle(s).getPropertyValue("--sb-ui-alert-fade-duration")||"0.3")*1e3;setTimeout(()=>s.remove(),i||300)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ft):ft();function ds(t){var e;let s=t.querySelector(".sb-ui-carrusel__track"),i=t.querySelectorAll(".sb-ui-carrusel__button"),a=i[0],o=i[i.length-1];if(!s||!a||!o)return;let r=t.querySelector(".sb-ui-carrusel__indicators")??((e=t.nextElementSibling)==null?void 0:e.classList.contains("sb-ui-carrusel__indicators"))?t.nextElementSibling:null,l=r?r.querySelectorAll(".sb-ui-carrusel__indicator-dot"):t.querySelectorAll(".sb-ui-carrusel__indicator-dot"),d=s.querySelectorAll(".sb-ui-carrusel__card"),p=0;function h(){let m=d[0];if(!m)return;let x=parseFloat(getComputedStyle(s).gap)||0,w=p*(m.offsetWidth+x);s.style.transform=`translateX(-${w}px)`,a.classList.toggle("sb-ui-carrusel__button--disabled",p===0),a.disabled=p===0,o.classList.toggle("sb-ui-carrusel__button--disabled",p===d.length-1),o.disabled=p===d.length-1,l.forEach((S,C)=>{S.classList.toggle("sb-ui-carrusel__indicator-dot--active",C===p),S.setAttribute("aria-selected",C===p?"true":"false")})}o.addEventListener("click",()=>{p<d.length-1&&(p++,h())}),a.addEventListener("click",()=>{p>0&&(p--,h())}),l.forEach((m,x)=>{m.addEventListener("click",()=>{p=x,h()})}),h()}function vt(){document.querySelectorAll(".sb-ui-carrusel").forEach(ds)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",vt):vt();function Qe(){document.querySelectorAll(".sb-ui-file-upload-wrapper").forEach(t=>{let e=t.querySelector('input[type="file"]'),s=t.querySelector(".sb-ui-file-upload-dropzone"),i=t.querySelector("button.sb-ui-file-upload__select-button");if(!e||!s)return;i==null||i.addEventListener("click",()=>e.click()),s.addEventListener("click",()=>e.click());let a=0;s.addEventListener("dragenter",o=>{o.preventDefault(),a++,s.classList.add("is-dragover")}),s.addEventListener("dragover",o=>{o.preventDefault()}),s.addEventListener("dragleave",()=>{a--,a===0&&s.classList.remove("is-dragover")}),s.addEventListener("drop",o=>{var r;o.preventDefault(),a=0,s.classList.remove("is-dragover");let l=(r=o.dataTransfer)==null?void 0:r.files;if(!(l!=null&&l.length))return;let d=new DataTransfer;Array.from(l).forEach(p=>d.items.add(p)),e.files=d.files,e.dispatchEvent(new Event("change",{bubbles:!0}))}),e.addEventListener("change",()=>{t.dispatchEvent(new CustomEvent("sb-ui-file-upload-change",{bubbles:!0,detail:{files:e.files}}))})})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Qe):Qe();typeof window<"u"&&(window.initFileUploadBehavior=Qe);var ps=6;function us(t){let e=Array.from(t.querySelectorAll(".sb-ui-tabs__item[data-tp-tab]")),s=Array.from(t.querySelectorAll(".sb-ui-tabla-pestanas__doc-row[data-tp-tab]")),i=t.querySelectorAll(".sb-ui-tabla-pestanas__pagination-nav"),a=t.querySelector(".sb-ui-tabla-pestanas__pagination-pages");if(!e.length||!s.length||i.length<2||!a)return;let o=i[0],r=i[i.length-1],l=parseInt(t.dataset.itemsPerPage??"",10)||ps,d=a,p=0,h=0;function m(){return s.filter(C=>C.dataset.tpTab===String(p))}function x(){return Math.max(1,Math.ceil(m().length/l))}function w(){let C=m(),A=h*l;s.forEach(E=>{E.hidden=!0}),C.slice(A,A+l).forEach(E=>{E.hidden=!1});let I=x();d.replaceChildren();for(let E=0;E<I;E++){let X=document.createElement("li");if(E===h){let L=document.createElement("span");L.className="sb-ui-tabla-pestanas__pagination-page sb-ui-tabla-pestanas__pagination-page--current",L.textContent=String(E+1),L.setAttribute("aria-current","page"),X.appendChild(L)}else{let L=document.createElement("button");L.type="button",L.className="sb-ui-tabla-pestanas__pagination-page",L.textContent=String(E+1),L.setAttribute("aria-label",`Ir a la página ${E+1}`),L.addEventListener("click",()=>{h=E,w()}),X.appendChild(L)}d.appendChild(X)}o.disabled=h<=0,r.disabled=h>=I-1}function S(C){p=C,h=0,e.forEach((A,I)=>{let E=I===C;A.classList.toggle("sb-ui-tabs__item--active",E),A.setAttribute("aria-selected",E?"true":"false"),A.tabIndex=E?0:-1}),w()}e.forEach((C,A)=>{C.addEventListener("click",()=>S(A)),C.addEventListener("keydown",I=>{let E=A;if(I.key==="ArrowRight"||I.key==="ArrowDown")I.preventDefault(),E=(A+1)%e.length;else if(I.key==="ArrowLeft"||I.key==="ArrowUp")I.preventDefault(),E=(A-1+e.length)%e.length;else if(I.key==="Home")I.preventDefault(),E=0;else if(I.key==="End")I.preventDefault(),E=e.length-1;else return;S(E),e[E].focus()})}),o.addEventListener("click",()=>{h=Math.max(0,h-1),w()}),r.addEventListener("click",()=>{h=Math.min(x()-1,h+1),w()}),w()}function yt(){document.querySelectorAll(".sb-ui-tabla-pestanas").forEach(us)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",yt):yt();var Ue=t=>(e,s)=>{s!==void 0?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},Pe=globalThis,st=Pe.ShadowRoot&&(Pe.ShadyCSS===void 0||Pe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ot=Symbol(),_t=new WeakMap,hs=class{constructor(t,e,s){if(this.ut=!0,s!==Ot)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(st&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=_t.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&_t.set(e,t))}return t}toString(){return this.cssText}},ms=t=>new hs(typeof t=="string"?t:t+"",void 0,Ot),gs=(t,e)=>{if(st)t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet);else for(let s of e){let i=document.createElement("style"),a=Pe.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=s.cssText,t.appendChild(i)}},xt=st?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(let i of e.cssRules)s+=i.cssText;return ms(s)})(t):t,{is:bs,defineProperty:fs,getOwnPropertyDescriptor:vs,getOwnPropertyNames:ys,getOwnPropertySymbols:_s,getPrototypeOf:xs}=Object,ke=globalThis,wt=ke.trustedTypes,ws=wt?wt.emptyScript:"",Xe=ke.reactiveElementPolyfillSupport,$e=(t,e)=>t,Fe={toAttribute(t,e){switch(e){case Boolean:t=t?ws:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},at=(t,e)=>!bs(t,e),Et={attribute:!0,type:String,converter:Fe,reflect:!1,useDefault:!1,hasChanged:at};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),ke.litPropertyMetadata??(ke.litPropertyMetadata=new WeakMap);var Ae=class extends HTMLElement{static addInitializer(t){this.g(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this.d&&[...this.d.keys()]}static createProperty(t,e=Et){if(e.state&&(e.attribute=!1),this.g(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&fs(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:a}=vs(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let r=i==null?void 0:i.call(this);a==null||a.call(this,o),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Et}static g(){if(this.hasOwnProperty($e("elementProperties")))return;let t=xs(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($e("finalized")))return;if(this.finalized=!0,this.g(),this.hasOwnProperty($e("properties"))){let e=this.properties,s=[...ys(e),..._s(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this.d=new Map;for(let[e,s]of this.elementProperties){let i=this.f(e,s);i!==void 0&&this.d.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(xt(i))}else t!==void 0&&e.push(xt(t));return e}static f(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this.b=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.s=null,this.K()}K(){var t;this.v=new Promise(e=>this.enableUpdating=e),this.i=new Map,this.Z(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this.r??(this.r=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this.r)==null||e.delete(t)}Z(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this.b=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gs(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this.r)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this.r)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._(t,s)}G(t,e){var s;let i=this.constructor.elementProperties.get(t),a=this.constructor.f(t,i);if(a!==void 0&&i.reflect===!0){let o=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:Fe).toAttribute(e,i.type);this.s=t,o==null?this.removeAttribute(a):this.setAttribute(a,o),this.s=null}}_(t,e){var s,i;let a=this.constructor,o=a.d.get(t);if(o!==void 0&&this.s!==o){let r=a.getPropertyOptions(o),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)==null?void 0:s.fromAttribute)!==void 0?r.converter:Fe;this.s=o;let d=l.fromAttribute(e,r.type);this[o]=d??((i=this.m)==null?void 0:i.get(o))??d,this.s=null}}requestUpdate(t,e,s){var i;if(t!==void 0){let a=this.constructor,o=this[t];if(s??(s=a.getPropertyOptions(t)),!((s.hasChanged??at)(o,e)||s.useDefault&&s.reflect&&o===((i=this.m)==null?void 0:i.get(t))&&!this.hasAttribute(a.f(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this.v=this.Q())}C(t,e,{useDefault:s,reflect:i,wrapped:a},o){s&&!(this.m??(this.m=new Map)).has(t)&&(this.m.set(t,o??e??this[t]),a!==!0||o!==void 0)||(this.i.has(t)||(this.hasUpdated||s||(e=void 0),this.i.set(t,e)),i===!0&&this.s!==t&&(this.y??(this.y=new Set)).add(t))}async Q(){this.isUpdatePending=!0;try{await this.v}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.b){for(let[a,o]of this.b)this[a]=o;this.b=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[a,o]of i){let{wrapped:r}=o,l=this[a];r!==!0||this.i.has(a)||l===void 0||this.C(a,void 0,o,l)}}let e=!1,s=this.i;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this.r)==null||t.forEach(i=>{var a;return(a=i.hostUpdate)==null?void 0:a.call(i)}),this.update(s)):this.w()}catch(i){throw e=!1,this.w(),i}e&&this.tt(s)}willUpdate(t){}tt(t){var e;(e=this.r)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}w(){this.i=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.v}shouldUpdate(t){return!0}update(t){this.y&&(this.y=this.y.forEach(e=>this.G(e,this[e]))),this.w()}updated(t){}firstUpdated(t){}};Ae.elementStyles=[],Ae.shadowRootOptions={mode:"open"},Ae[$e("elementProperties")]=new Map,Ae[$e("finalized")]=new Map,Xe==null||Xe({ReactiveElement:Ae}),(ke.reactiveElementVersions??(ke.reactiveElementVersions=[])).push("2.1.1");var Es={attribute:!0,type:String,converter:Fe,reflect:!1,hasChanged:at},ks=(t=Es,e,s)=>{let{kind:i,metadata:a}=s,o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),i==="accessor"){let{name:r}=s;return{set(l){let d=e.get.call(this);e.set.call(this,l),this.requestUpdate(r,d,t)},init(l){return l!==void 0&&this.C(r,void 0,t,l),l}}}if(i==="setter"){let{name:r}=s;return function(l){let d=this[r];e.call(this,l),this.requestUpdate(r,d,t)}}throw Error("Unsupported decorator location: "+i)};function y(t){return(e,s)=>typeof s=="object"?ks(t,e,s):((i,a,o)=>{let r=a.hasOwnProperty(o);return a.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(a,o):void 0})(t,e,s)}function ne(t){return y({...t,state:!0,attribute:!1})}var Cs=(t,e,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,s),s);function Ss(t,e){return(s,i,a)=>{let o=r=>{var l;return((l=r.renderRoot)==null?void 0:l.querySelector(t))??null};return Cs(s,i,{get(){return o(this)}})}}var Ds=Object.defineProperty,Ms=Object.getOwnPropertyDescriptor,P=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ms(e,s):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Ds(e,s,a),a},kt={es:{weekdays:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],weekdaysShort:["Do","Lu","Ma","Mi","Ju","Vi","Sa"],months:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],monthsShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],today:"Hoy",cancel:"Cancelar",accept:"Aceptar"},en:{weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Su","Mo","Tu","We","Th","Fr","Sa"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",cancel:"Cancel",accept:"Accept"}},B=class extends ue{constructor(){super(...arguments),this.variant="single",this.size="medium",this.locale="es",this.showFooter=!0,this.showDouble=!1,this.inline=!1,this.currentMonth=new Date().getMonth(),this.currentYear=new Date().getFullYear(),this.secondMonth=new Date().getMonth()+1,this.secondYear=new Date().getFullYear(),this.internalSelectedDates=[]}connectedCallback(){super.connectedCallback(),this.initializeDates(),this.updateSecondMonth()}updated(t){if(super.updated(t),t.has("selectedDate")&&this.selectedDate){let e=this.parseDate(this.selectedDate);e&&(this.internalSelectedDates=[e],this.currentMonth=e.getUTCMonth(),this.currentYear=e.getUTCFullYear())}if(t.has("selectedDates")&&this.selectedDates&&(this.internalSelectedDates=this.selectedDates.split(",").map(e=>this.parseDate(e.trim())).filter(e=>e!==null)),t.has("rangeStart")&&this.rangeStart){let e=this.parseDate(this.rangeStart);this.internalRangeStart=e??void 0}if(t.has("rangeEnd")&&this.rangeEnd){let e=this.parseDate(this.rangeEnd);this.internalRangeEnd=e??void 0}}createRenderRoot(){return this}parseDate(t){if(!t)return null;let e=t.split("-");if(e.length!==3)return null;let s=parseInt(e[0],10),i=parseInt(e[1],10)-1,a=parseInt(e[2],10);if(isNaN(s)||isNaN(i)||isNaN(a))return null;let o=new Date(Date.UTC(s,i,a,12,0,0));return isNaN(o.getTime())?null:o}formatDate(t){return t.toISOString().split("T")[0]}isSameDay(t,e){return!t||!e?!1:t.getUTCDate()===e.getUTCDate()&&t.getUTCMonth()===e.getUTCMonth()&&t.getUTCFullYear()===e.getUTCFullYear()}isToday(t){let e=new Date,s=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),12,0,0));return this.isSameDay(t,s)}isDateInRange(t,e,s){if(!e||!s)return!1;let i=t.getTime();return i>e.getTime()&&i<s.getTime()}isDateDisabled(t){if(this.minDate){let e=this.parseDate(this.minDate);if(e&&t<e)return!0}if(this.maxDate){let e=this.parseDate(this.maxDate);if(e&&t>e)return!0}if(this.disabledDates){let e=this.disabledDates.split(",").map(i=>i.trim()),s=this.formatDate(t);if(e.includes(s))return!0}return!1}initializeDates(){if(this.selectedDate){let t=this.parseDate(this.selectedDate);t&&(this.internalSelectedDates=[t],this.currentMonth=t.getUTCMonth(),this.currentYear=t.getUTCFullYear())}if(this.selectedDates&&(this.internalSelectedDates=this.selectedDates.split(",").map(t=>this.parseDate(t.trim())).filter(t=>t!==null)),this.rangeStart){let t=this.parseDate(this.rangeStart);this.internalRangeStart=t??void 0}if(this.rangeEnd){let t=this.parseDate(this.rangeEnd);this.internalRangeEnd=t??void 0}}updateSecondMonth(){this.secondMonth=this.currentMonth+1,this.secondYear=this.currentYear,this.secondMonth>11&&(this.secondMonth=0,this.secondYear++)}getDaysInMonth(t,e){return new Date(e,t+1,0).getDate()}getFirstDayOfMonth(t,e){return new Date(e,t,1).getDay()}generateCalendarDays(t,e){let s=this.getDaysInMonth(t,e),i=this.getFirstDayOfMonth(t,e),a=this.getDaysInMonth(t-1,e),o=[];for(let l=i-1;l>=0;l--){let d=a-l,p=new Date(Date.UTC(e,t-1,d,12,0,0));o.push(this.createDateInfo(p,!0))}for(let l=1;l<=s;l++){let d=new Date(Date.UTC(e,t,l,12,0,0));o.push(this.createDateInfo(d,!1))}let r=7-o.length%7;if(r<7)for(let l=1;l<=r;l++){let d=new Date(Date.UTC(e,t+1,l,12,0,0));o.push(this.createDateInfo(d,!0))}return o}createDateInfo(t,e){let s=this.internalSelectedDates.some(r=>this.isSameDay(r,t)),i=this.isSameDay(t,this.internalRangeStart),a=this.isSameDay(t,this.internalRangeEnd),o=this.isDateInRange(t,this.internalRangeStart,this.internalRangeEnd);return{date:t,day:t.getUTCDate(),month:t.getUTCMonth(),year:t.getUTCFullYear(),isToday:this.isToday(t),isSelected:s,isInRange:o,isRangeStart:i,isRangeEnd:a,isOutsideMonth:e,isDisabled:this.isDateDisabled(t)}}handlePrevMonth(){this.currentMonth--,this.currentMonth<0&&(this.currentMonth=11,this.currentYear--),this.updateSecondMonth(),this.dispatchMonthChangeEvent()}handleNextMonth(){this.currentMonth++,this.currentMonth>11&&(this.currentMonth=0,this.currentYear++),this.updateSecondMonth(),this.dispatchMonthChangeEvent()}handleMonthChange(t){let e=t.target;this.currentMonth=parseInt(e.value,10),this.updateSecondMonth(),this.dispatchMonthChangeEvent()}handleYearChange(t){let e=t.target;this.currentYear=parseInt(e.value,10),this.updateSecondMonth(),this.dispatchMonthChangeEvent()}handleDayClick(t){if(t.isDisabled||t.isOutsideMonth)return;let e=t.date;switch(this.variant){case"single":this.internalSelectedDates=[e],this.dispatchDateSelectEvent(e),this.dispatchDateChangeEvent();break;case"multiple":let s=this.internalSelectedDates.findIndex(i=>this.isSameDay(i,e));s>=0?this.internalSelectedDates.splice(s,1):this.internalSelectedDates.push(e),this.internalSelectedDates=[...this.internalSelectedDates],this.dispatchDateSelectEvent(e),this.dispatchDateChangeEvent();break;case"range":!this.internalRangeStart||this.internalRangeStart&&this.internalRangeEnd?(this.internalRangeStart=e,this.internalRangeEnd=void 0):(e<this.internalRangeStart?(this.internalRangeEnd=this.internalRangeStart,this.internalRangeStart=e):this.internalRangeEnd=e,this.dispatchDateChangeEvent()),this.requestUpdate();break}}handleKeyDown(t,e,s){let i=this.generateCalendarDays(this.currentMonth,this.currentYear);switch(t.key){case"Enter":case" ":t.preventDefault(),this.handleDayClick(e);break;case"ArrowLeft":t.preventDefault(),this.focusPreviousDay(s,i);break;case"ArrowRight":t.preventDefault(),this.focusNextDay(s,i);break;case"ArrowUp":t.preventDefault(),this.focusDayAbove(s,i);break;case"ArrowDown":t.preventDefault(),this.focusDayBelow(s,i);break;case"Home":t.preventDefault(),this.focusFirstDay(i);break;case"End":t.preventDefault(),this.focusLastDay(i);break}}focusPreviousDay(t,e){let s=t-1;for(;s>=0&&(e[s].isDisabled||e[s].isOutsideMonth);)s--;s>=0&&this.focusDayButton(s)}focusNextDay(t,e){let s=t+1;for(;s<e.length&&(e[s].isDisabled||e[s].isOutsideMonth);)s++;s<e.length&&this.focusDayButton(s)}focusDayAbove(t,e){let s=t-7;s>=0&&!e[s].isDisabled&&!e[s].isOutsideMonth&&this.focusDayButton(s)}focusDayBelow(t,e){let s=t+7;s<e.length&&!e[s].isDisabled&&!e[s].isOutsideMonth&&this.focusDayButton(s)}focusFirstDay(t){let e=t.findIndex(s=>!s.isDisabled&&!s.isOutsideMonth);e>=0&&this.focusDayButton(e)}focusLastDay(t){let e=t.slice().reverse().findIndex(s=>!s.isDisabled&&!s.isOutsideMonth);if(e>=0){let s=t.length-1-e;this.focusDayButton(s)}}focusDayButton(t){this.updateComplete.then(()=>{var e;let s=(e=this.shadowRoot)==null?void 0:e.querySelector(`.sb-ui-calendar__day:nth-child(${t+1})`);s==null||s.focus()})}handleCancel(){this.dispatchEvent(new CustomEvent("calendar-cancel",{bubbles:!0,composed:!0}))}handleAccept(){this.dispatchEvent(new CustomEvent("calendar-accept",{bubbles:!0,composed:!0,detail:this.getSelectionData()}))}dispatchDateSelectEvent(t){this.dispatchEvent(new CustomEvent("date-select",{detail:{date:this.formatDate(t),timestamp:t.getTime()},bubbles:!0,composed:!0}))}dispatchDateChangeEvent(){this.dispatchEvent(new CustomEvent("date-change",{detail:this.getSelectionData(),bubbles:!0,composed:!0}))}dispatchMonthChangeEvent(){this.dispatchEvent(new CustomEvent("month-change",{detail:{month:this.currentMonth,year:this.currentYear,monthName:this.getLocaleConfig().months[this.currentMonth]},bubbles:!0,composed:!0}))}getSelectionData(){switch(this.variant){case"single":return{variant:"single",date:this.internalSelectedDates[0]?this.formatDate(this.internalSelectedDates[0]):null};case"multiple":return{variant:"multiple",dates:this.internalSelectedDates.map(t=>this.formatDate(t))};case"range":return{variant:"range",start:this.internalRangeStart?this.formatDate(this.internalRangeStart):null,end:this.internalRangeEnd?this.formatDate(this.internalRangeEnd):null};default:return{}}}getLocaleConfig(){return kt[this.locale]||kt.es}getYearRange(){let t=new Date().getFullYear(),e=t-100,s=t+50,i=[];for(let a=e;a<=s;a++)i.push(a);return i}getDayClasses(t){let e=["sb-ui-calendar__day"];return t.isToday&&e.push("sb-ui-calendar__day--today"),t.isSelected&&e.push("sb-ui-calendar__day--selected"),t.isRangeStart&&e.push("sb-ui-calendar__day--range-start"),t.isRangeEnd&&e.push("sb-ui-calendar__day--range-end"),t.isInRange&&e.push("sb-ui-calendar__day--in-range"),t.isOutsideMonth&&e.push("sb-ui-calendar__day--outside"),t.isDisabled&&e.push("sb-ui-calendar__day--disabled"),e.join(" ")}getAriaLabel(t){let e=this.getLocaleConfig(),s=e.months[t.month],i=`${t.day} de ${s}, ${t.year}`;return t.isToday&&(i+=`, ${e.today}`),t.isSelected&&(i+=", Seleccionado"),t.isRangeStart&&(i+=", Inicio del rango"),t.isRangeEnd&&(i+=", Fin del rango"),i}renderNavIcon(t){return t==="left"?O`
        <svg class="sb-ui-calendar__nav-icon" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      `:O`
      <svg class="sb-ui-calendar__nav-icon" viewBox="0 0 24 24">
        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
      </svg>
    `}renderMonth(t,e){let s=this.getLocaleConfig(),i=this.generateCalendarDays(t,e),a=this.getYearRange();return O`
      <div class="sb-ui-calendar__month">
        <div class="sb-ui-calendar__header">
          <button
            class="sb-ui-calendar__nav-button"
            @click=${this.handlePrevMonth}
            aria-label="Mes anterior"
          >
            ${this.renderNavIcon("left")}
          </button>
          <div class="sb-ui-calendar__month-year">
            <select
              class="sb-ui-select sb-ui-calendar__month-select"
              .value=${t.toString()}
              @change=${this.handleMonthChange}
              aria-label="Seleccionar mes"
            >
              ${s.months.map((o,r)=>O`<option value=${r} ?selected=${r===t}>${o}</option>`)}
            </select>
            <select
              class="sb-ui-select sb-ui-calendar__year-select"
              .value=${e.toString()}
              @change=${this.handleYearChange}
              aria-label="Seleccionar año"
            >
              ${a.map(o=>O`<option value=${o} ?selected=${o===e}>${o}</option>`)}
            </select>
          </div>
          <button
            class="sb-ui-calendar__nav-button"
            @click=${this.handleNextMonth}
            aria-label="Mes siguiente"
          >
            ${this.renderNavIcon("right")}
          </button>
        </div>

        <div class="sb-ui-calendar__weekdays">
          ${s.weekdaysShort.map(o=>O`<div class="sb-ui-calendar__weekday">${o}</div>`)}
        </div>

        <div class="sb-ui-calendar__days">
          ${i.map((o,r)=>O`
              <button
                class=${this.getDayClasses(o)}
                @click=${()=>this.handleDayClick(o)}
                @keydown=${l=>this.handleKeyDown(l,o,r)}
                ?disabled=${o.isDisabled||o.isOutsideMonth}
                aria-label=${this.getAriaLabel(o)}
                aria-selected=${o.isSelected}
                tabindex=${o.isSelected||r===0&&!this.internalSelectedDates.length?"0":"-1"}
              >
                ${o.day}
              </button>
            `)}
        </div>
      </div>
    `}renderFooter(){if(!this.showFooter)return z;let t=this.getLocaleConfig();return O`
      <div class="sb-ui-calendar__footer">
        <button
          class="sb-ui-button sb-ui-button--secondary sb-ui-button--small"
          @click=${this.handleCancel}
        >
          ${t.cancel}
        </button>
        <button
          class="sb-ui-button sb-ui-button--primary sb-ui-button--fill sb-ui-button--small"
          @click=${this.handleAccept}
        >
          ${t.accept}
        </button>
      </div>
    `}render(){let t=this.size!=="medium"?`sb-ui-calendar--${this.size}`:"",e=this.showDouble&&this.variant==="range"?"sb-ui-calendar--double":"",s=this.inline?"sb-ui-calendar--inline":"",i=this.showFooter?"":"sb-ui-calendar--no-footer",a=["sb-ui-calendar",t,e,s,i].filter(Boolean).join(" ");return O`
      <div class=${a} data-variant=${this.variant}>
        ${this.renderMonth(this.currentMonth,this.currentYear)}
        ${this.showDouble&&this.variant==="range"?this.renderMonth(this.secondMonth,this.secondYear):z}
        ${this.renderFooter()}
      </div>
    `}};P([y({type:String,reflect:!0})],B.prototype,"variant",2);P([y({type:String,reflect:!0})],B.prototype,"size",2);P([y({type:String,attribute:"selected-date"})],B.prototype,"selectedDate",2);P([y({type:String,attribute:"selected-dates"})],B.prototype,"selectedDates",2);P([y({type:String,attribute:"range-start"})],B.prototype,"rangeStart",2);P([y({type:String,attribute:"range-end"})],B.prototype,"rangeEnd",2);P([y({type:String,attribute:"min-date"})],B.prototype,"minDate",2);P([y({type:String,attribute:"max-date"})],B.prototype,"maxDate",2);P([y({type:String,attribute:"disabled-dates"})],B.prototype,"disabledDates",2);P([y({type:String})],B.prototype,"locale",2);P([y({type:Boolean,attribute:"show-footer"})],B.prototype,"showFooter",2);P([y({type:Boolean,attribute:"show-double"})],B.prototype,"showDouble",2);P([y({type:Boolean,reflect:!0})],B.prototype,"inline",2);P([ne()],B.prototype,"currentMonth",2);P([ne()],B.prototype,"currentYear",2);P([ne()],B.prototype,"secondMonth",2);P([ne()],B.prototype,"secondYear",2);P([ne()],B.prototype,"internalSelectedDates",2);P([ne()],B.prototype,"internalRangeStart",2);P([ne()],B.prototype,"internalRangeEnd",2);B=P([Ue("sb-ui-calendar")],B);var As=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,V=(t,e,s,i)=>{for(var a=i>1?void 0:i?Ts(e,s):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&As(e,s,a),a},H=class extends ue{constructor(){super(...arguments),this.variant="single",this.size="medium",this.placeholder="DD/MM/YYYY",this.error=!1,this.disabled=!1,this.readonly=!1,this.locale="es",this.block=!1,this.isOpen=!1,this.handleOutsideClick=t=>{this.contains(t.target)||(this.isOpen=!1)}}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.handleOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.handleOutsideClick)}handleInputClick(t){t.stopPropagation(),!this.disabled&&!this.readonly&&this.toggleDropdown()}handleTriggerClick(t){t.stopPropagation(),this.disabled||this.toggleDropdown()}toggleDropdown(){this.isOpen=!this.isOpen,this.isOpen?this.dispatchEvent(new CustomEvent("datepicker-open",{bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("datepicker-close",{bubbles:!0,composed:!0}))}handleCalendarChange(t){var e,s;let i=t.detail,a="",o=!1;switch(this.variant){case"single":this.value=i.date,a=this.formatDate(i.date),o=!0;break;case"range":i.start&&i.end&&(this.value=`${i.start},${i.end}`,a=`${this.formatDate(i.start)} - ${this.formatDate(i.end)}`,o=!0);break;case"multiple":this.value=(e=i.dates)==null?void 0:e.join(","),a=(s=i.dates)==null?void 0:s.map(r=>this.formatDate(r)).join(", ");break}this.updateInputValue(a),o&&setTimeout(()=>{this.isOpen=!1},300),this.dispatchEvent(new CustomEvent("datepicker-change",{detail:{value:this.value,formattedValue:a,...i},bubbles:!0,composed:!0}))}handleCalendarAccept(t){this.isOpen=!1,this.dispatchEvent(new CustomEvent("datepicker-accept",{detail:t.detail,bubbles:!0,composed:!0}))}handleCalendarCancel(){this.isOpen=!1}updateInputValue(t){this.input&&(this.input.value=t)}formatDate(t){if(!t)return"";let[e,s,i]=t.split("-");return`${i}/${s}/${e}`}getInitialInputValue(){if(!this.value)return"";if(this.variant==="single")return this.formatDate(this.value);if(this.variant==="range"){let[t,e]=this.value.split(",");return t&&e?`${this.formatDate(t)} - ${this.formatDate(e)}`:t?this.formatDate(t):""}else if(this.variant==="multiple")return this.value.split(",").map(t=>this.formatDate(t.trim())).join(", ");return""}renderIcon(){return O`
      <svg class="sb-ui-datepicker__icon" viewBox="0 0 24 24">
        <path
          d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"
        />
      </svg>
    `}render(){var t,e;let s=["sb-ui-datepicker",this.size!=="medium"?`sb-ui-datepicker--${this.size}`:"",this.error?"sb-ui-datepicker--error":"",this.disabled?"sb-ui-datepicker--disabled":"",this.block?"sb-ui-datepicker--block":"",this.isOpen?"sb-ui-datepicker--open":"",this.label?"sb-ui-datepicker--with-label":""].filter(Boolean).join(" ");return O`
      <div class=${s}>
        ${this.label?O`<label class="sb-ui-datepicker__label">${this.label}</label>`:z}

        <div class="sb-ui-datepicker__wrapper">
          <input
            type="text"
            class="sb-ui-input sb-ui-datepicker__input ${this.error?"sb-ui-input--error":""}"
            .value=${this.getInitialInputValue()}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${!0}
            @click=${this.handleInputClick}
          />

          <button
            type="button"
            class="sb-ui-datepicker__trigger"
            ?disabled=${this.disabled}
            @click=${this.handleTriggerClick}
            aria-label="Abrir calendario"
          >
            ${this.renderIcon()}
          </button>

          <div class="sb-ui-datepicker__dropdown">
            <sb-ui-calendar
              .variant=${this.variant}
              .locale=${this.locale}
              .selectedDate=${this.variant==="single"?this.value:void 0}
              .rangeStart=${this.variant==="range"?(t=this.value)==null?void 0:t.split(",")[0]:void 0}
              .rangeEnd=${this.variant==="range"?(e=this.value)==null?void 0:e.split(",")[1]:void 0}
              .selectedDates=${this.variant==="multiple"?this.value:void 0}
              .minDate=${this.minDate}
              .maxDate=${this.maxDate}
              .disabledDates=${this.disabledDates}
              .showFooter=${!0}
              .size=${this.size}
              @date-change=${this.handleCalendarChange}
              @calendar-accept=${this.handleCalendarAccept}
              @calendar-cancel=${this.handleCalendarCancel}
            ></sb-ui-calendar>
          </div>
        </div>

        ${this.helperText&&!this.error?O`<div class="sb-ui-datepicker__helper">${this.helperText}</div>`:z}
        ${this.error&&this.errorMessage?O`<div class="sb-ui-datepicker__error">${this.errorMessage}</div>`:z}
      </div>
    `}};V([y({type:String,reflect:!0})],H.prototype,"variant",2);V([y({type:String,reflect:!0})],H.prototype,"size",2);V([y({type:String})],H.prototype,"value",2);V([y({type:String})],H.prototype,"placeholder",2);V([y({type:String})],H.prototype,"label",2);V([y({type:String,attribute:"helper-text"})],H.prototype,"helperText",2);V([y({type:Boolean,reflect:!0})],H.prototype,"error",2);V([y({type:String,attribute:"error-message"})],H.prototype,"errorMessage",2);V([y({type:Boolean,reflect:!0})],H.prototype,"disabled",2);V([y({type:Boolean,reflect:!0})],H.prototype,"readonly",2);V([y({type:String,attribute:"min-date"})],H.prototype,"minDate",2);V([y({type:String,attribute:"max-date"})],H.prototype,"maxDate",2);V([y({type:String,attribute:"disabled-dates"})],H.prototype,"disabledDates",2);V([y({type:String})],H.prototype,"locale",2);V([y({type:Boolean,reflect:!0})],H.prototype,"block",2);V([ne()],H.prototype,"isOpen",2);V([Ss(".sb-ui-datepicker__input")],H.prototype,"input",2);H=V([Ue("sb-ui-datepicker")],H);var Ls=Object.defineProperty,$s=Object.getOwnPropertyDescriptor,Ce=(t,e,s,i)=>{for(var a=i>1?void 0:i?$s(e,s):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Ls(e,s,a),a},he=class extends ue{constructor(){super(...arguments),this.open=!1,this.title="",this.size="medium",this.closeOnBackdrop=!0,this.showCloseButton=!0}connectedCallback(){super.connectedCallback(),this.open&&this.ft()}disconnectedCallback(){super.disconnectedCallback(),this.vt()}updated(t){t.has("open")&&(this.open?(this.ft(),this.E("sb-ui-modal-open")):(this.vt(),this.E("sb-ui-modal-close"))),t.has("size")&&this.yt()}yt(){let t={small:{maxInline:"min(464px, 90%)",maxBlock:"45dvb"},medium:{maxInline:"min(716px, 90%)",maxBlock:"82dvb"},large:{maxInline:"min(928px, 90%)",maxBlock:"82dvb"}},e=t[this.size]||t.medium;this.style.setProperty("--sb-ui-modal-max-inline-size",e.maxInline),this.style.setProperty("--sb-ui-modal-max-block-size",e.maxBlock)}ft(){document.body.style.overflow="hidden"}vt(){document.body.style.overflow=""}Mt(t){this.closeOnBackdrop&&t.target===t.currentTarget&&this.close()}ot(){this.close()}at(t){t.key==="Escape"&&this.open&&this.close()}E(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}openModal(){this.open=!0,this.yt()}close(){this.open=!1}render(){return this.open?O`
      <div
        class="sb-ui-modal__backdrop"
        part="backdrop"
        @click=${this.Mt}
        @keydown=${this.at}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="sb-ui-modal__dialog" part="dialog" role="document">
          <div class="sb-ui-modal__header" part="header">
            <h2 id="modal-title" class="sb-ui-modal__title">
              <slot name="header">${this.title}</slot>
            </h2>
            ${this.showCloseButton?O`
                  <button
                    class="sb-ui-modal__close"
                    part="close-button"
                    @click=${this.ot}
                    aria-label="Cerrar modal"
                  >
                    &times;
                  </button>
                `:""}
          </div>

          <div class="sb-ui-modal__body" part="body">
            <slot></slot>
          </div>

          <div class="sb-ui-modal__footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `:O``}};he.styles=Mt`
    /* ========================================
       TOKENS - CSS Variables
       ======================================== */
    :host {
      /* Backdrop */
      --sb-ui-modal-backdrop-bg: #00000040;

      /* Dialog */
      --sb-ui-modal-bg: var(--sb-ui-color-grayscale-white, #ffffff);
      --sb-ui-modal-border-radius: clamp(8px, 0.5rem + 0.5vw, 16px);
      --sb-ui-modal-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);

      /* Spacing */
      --sb-ui-modal-padding-inline: clamp(1rem, 0.75rem + 1.5vw, 2rem);
      --sb-ui-modal-padding-block: clamp(0.875rem, 0.7rem + 0.8vw, 1.5rem);
      --sb-ui-modal-gap: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);

      /* Header */
      --sb-ui-modal-title-color: var(--sb-ui-color-primary-D100, #038450);
      --sb-ui-modal-title-font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
      --sb-ui-modal-title-font-weight: 700;
      --sb-ui-modal-header-border: 1px solid var(--sb-ui-color-grayscale-L200, #e1e1e1);

      /* Close button */
      --sb-ui-modal-close-size: 24px;
      --sb-ui-modal-close-color: var(--sb-ui-color-grayscale-base, #9b9b9b);
      --sb-ui-modal-close-color-hover: var(--sb-ui-color-grayscale-D400, #282828);

      /* Footer */
      --sb-ui-modal-footer-border: 1px solid var(--sb-ui-color-grayscale-L200, #e1e1e1);
      --sb-ui-modal-footer-gap: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);

      /* Body */
      --sb-ui-modal-body-color: var(--sb-ui-color-grayscale-D300, #333333);
      --sb-ui-modal-body-font-size: clamp(0.875rem, 0.8rem + 0.3vw, 1rem);
      --sb-ui-modal-body-line-height: 1.5;

      /* Sizes - defaults (medium) */
      --sb-ui-modal-max-inline-size: min(716px, 90%);
      --sb-ui-modal-max-block-size: 82dvb;

      /* Transition */
      --sb-ui-modal-transition: opacity 0.2s ease, transform 0.3s ease;

      display: contents;
    }

    :host([hidden]) {
      display: none;
    }

    /* ========================================
       BACKDROP
       ======================================== */
    .sb-ui-modal__backdrop {
      position: fixed;
      inset: 0;
      background: var(--sb-ui-modal-backdrop-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding-block: clamp(1rem, 0.5rem + 2vw, 2rem);
      padding-inline: clamp(0.5rem, 0.25rem + 1.5vw, 1.5rem);
      animation: sb-ui-modal-fade-in 0.2s ease;
    }

    /* ========================================
       DIALOG
       ======================================== */
    .sb-ui-modal__dialog {
      background: var(--sb-ui-modal-bg);
      inline-size: 100%;
      max-inline-size: var(--sb-ui-modal-max-inline-size);
      max-block-size: var(--sb-ui-modal-max-block-size);
      border-radius: var(--sb-ui-modal-border-radius);
      box-shadow: var(--sb-ui-modal-shadow);
      display: flex;
      flex-direction: column;
      animation: sb-ui-modal-slide-up 0.3s ease;
      overflow: hidden;
    }

    /* ========================================
       HEADER
       ======================================== */
    .sb-ui-modal__header {
      padding-inline: var(--sb-ui-modal-padding-inline);
      padding-block: var(--sb-ui-modal-padding-block);
      border-block-end: var(--sb-ui-modal-header-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--sb-ui-modal-gap);
      flex-shrink: 0;
    }

    .sb-ui-modal__title {
      font-size: var(--sb-ui-modal-title-font-size);
      font-weight: var(--sb-ui-modal-title-font-weight);
      color: var(--sb-ui-modal-title-color);
      margin-block: 0;
      margin-inline: 0;
      line-height: 1.3;
      flex: 1;
    }

    /* ========================================
       CLOSE BUTTON
       ======================================== */
    .sb-ui-modal__close {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--sb-ui-modal-close-size);
      block-size: var(--sb-ui-modal-close-size);
      font-size: calc(var(--sb-ui-modal-close-size) * 0.75);
      cursor: pointer;
      color: var(--sb-ui-modal-close-color);
      line-height: 1;
      transition: color 0.2s ease;
      flex-shrink: 0;
      border-radius: 4px;

      &:hover {
        color: var(--sb-ui-modal-close-color-hover);
      }

      &:focus-visible {
        outline: 2px solid var(--sb-ui-color-secondary-L100, #ffea9a);
        outline-offset: 2px;
      }
    }

    /* ========================================
       BODY
       ======================================== */
    .sb-ui-modal__body {
      padding-inline: var(--sb-ui-modal-padding-inline);
      padding-block: var(--sb-ui-modal-padding-block);
      overflow-y: auto;
      flex: 1;
      color: var(--sb-ui-modal-body-color);
      font-size: var(--sb-ui-modal-body-font-size);
      line-height: var(--sb-ui-modal-body-line-height);
    }

    /* ========================================
       FOOTER
       ======================================== */
    .sb-ui-modal__footer {
      padding-inline: var(--sb-ui-modal-padding-inline);
      padding-block: var(--sb-ui-modal-padding-block);
      border-block-start: var(--sb-ui-modal-footer-border);
      display: flex;
      gap: var(--sb-ui-modal-footer-gap);
      justify-content: center;
      flex-wrap: wrap;
      flex-shrink: 0;
    }

    ::slotted([slot='footer']) {
      display: flex;
      gap: var(--sb-ui-modal-footer-gap, 0.75rem);
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    /* ========================================
       ANIMATIONS
       ======================================== */
    @keyframes sb-ui-modal-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes sb-ui-modal-slide-up {
      from {
        transform: translateY(clamp(20px, 3vw, 50px));
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    /* ========================================
       ACCESSIBILITY
       ======================================== */
    @media (prefers-reduced-motion: reduce) {
      .sb-ui-modal__backdrop,
      .sb-ui-modal__dialog {
        animation: none;
      }
    }

    @media (prefers-contrast: high) {
      .sb-ui-modal__dialog {
        border: 2px solid currentColor;
      }
    }
  `;Ce([y({type:Boolean,reflect:!0})],he.prototype,"open",2);Ce([y({type:String})],he.prototype,"title",2);Ce([y({type:String,reflect:!0})],he.prototype,"size",2);Ce([y({type:Boolean,attribute:"close-on-backdrop"})],he.prototype,"closeOnBackdrop",2);Ce([y({type:Boolean,attribute:"show-close-button"})],he.prototype,"showCloseButton",2);he=Ce([Ue("sb-ui-modal")],he);var Is=class extends HTMLElement{static get observedAttributes(){return["value","label","description","category","icon","disabled"]}constructor(){super(),this.style.display="none"}get value(){return this.getAttribute("value")||""}get label(){var t;return this.getAttribute("label")||((t=this.textContent)==null?void 0:t.trim())||""}get description(){return this.getAttribute("description")||""}get category(){return this.hasAttribute("category")}get icon(){return this.getAttribute("icon")||""}get disabled(){return this.hasAttribute("disabled")}};customElements.get("sb-ui-listbox-item")||customElements.define("sb-ui-listbox-item",Is);var zs=class extends HTMLElement{constructor(){super(),this.c=[],this.W="",this.rt=null,this.attachShadow({mode:"open"})}static get observedAttributes(){return["style-variant","content-search","search-placeholder","empty-title","empty-text"]}connectedCallback(){this.nt(),this.rt=new MutationObserver(()=>this.nt()),this.rt.observe(this,{childList:!0,subtree:!0,attributes:!0})}disconnectedCallback(){var t;(t=this.rt)==null||t.disconnect()}attributeChangedCallback(){this.shadowRoot&&this.nt()}get styleVariant(){return this.getAttribute("style-variant")||"multiselect"}get contentSearch(){return this.hasAttribute("content-search")}get searchPlaceholder(){return this.getAttribute("search-placeholder")||"Buscar"}get emptyTitle(){return this.getAttribute("empty-title")||"¡Ups! lo sentimos"}get emptyText(){return this.getAttribute("empty-text")||"No se encontraron resultados"}At(){return[...this.querySelectorAll("sb-ui-listbox-item")].map(t=>({value:t.value,label:t.label,description:t.description,category:t.category,icon:t.icon,disabled:t.disabled}))}Tt(t){return this.c.includes(t)}wt(t){t.category||t.disabled||(this.styleVariant==="multiselect"?this.c.indexOf(t.value)>=0?this.c=this.c.filter(e=>e!==t.value):this.c=[...this.c,t.value]:this.c=[t.value],this.lt(),this.dispatchEvent(new CustomEvent("sb-ui-listbox-change",{bubbles:!0,composed:!0,detail:{value:this.styleVariant==="multiselect"?this.c:this.c[0],selected:[...this.c]}})))}$t(t){this.W=t.target.value.toLowerCase().trim(),this.lt()}lt(){var t,e;let s=(t=this.shadowRoot)==null?void 0:t.querySelector(".list");if(!s)return;let i=this.At(),a=this.styleVariant,o=this.W,r=!1;s.innerHTML="",i.forEach(d=>{let p=!o||d.label.toLowerCase().includes(o);if(d.category){let w=document.createElement("div");w.className="item item--category",w.setAttribute("role","presentation"),d.icon&&(w.innerHTML+=`<i class="${d.icon} item-icon" aria-hidden="true"></i>`),w.innerHTML+=`<span>${d.label}</span>`,s.appendChild(w);let S=document.createElement("hr");S.className="divider",s.appendChild(S);return}if(!p)return;r=!0;let h=this.Tt(d.value),m=document.createElement("div");m.className=`item${h?" item--selected":""}${a==="semantic"?" item--semantic":""}`,m.setAttribute("role","option"),m.setAttribute("aria-selected",String(h)),m.setAttribute("tabindex","0");let x="";a==="multiselect"&&(x+=`<span class="checkbox${h?" checkbox--checked":""}"></span>`),(a==="semantic"||a==="group")&&d.icon&&(x+=`<i class="${d.icon} item-icon" aria-hidden="true"></i>`),a==="semantic"&&d.description?x+=`<div class="item-text"><span class="item-title">${d.label}</span><span class="item-description">${d.description}</span></div>`:x+=`<span>${d.label}</span>`,m.innerHTML=x,m.addEventListener("click",()=>this.wt(d)),m.addEventListener("keydown",w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),this.wt(d))}),s.appendChild(m)});let l=(e=this.shadowRoot)==null?void 0:e.querySelector(".empty-state-dynamic");l&&l.remove(),!r&&o&&(s.innerHTML=`
        <div class="empty-state empty-state-dynamic">
          <i class="fa-solid fa-magnifying-glass empty-icon" aria-hidden="true"></i>
          <span class="empty-title">${this.emptyTitle}</span>
          <span class="empty-text">"${this.W}" no coincide con ningún resultado</span>
        </div>
      `)}nt(){var t;let e=this.styleVariant,s=e==="empty",i=`listbox${s?" listbox--empty":""}${e==="semantic"?" listbox--semantic":""}`,a="";this.contentSearch&&(a=`
        <div class="search">
          <div class="search-wrapper">
            <span class="search-icon"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></span>
            <input type="text" class="search-input" placeholder="${this.searchPlaceholder}" aria-label="${this.searchPlaceholder}" />
          </div>
        </div>`);let o="";s?o=`
        <div class="empty-state">
          <i class="fa-solid fa-magnifying-glass empty-icon" aria-hidden="true"></i>
          <span class="empty-title">${this.emptyTitle}</span>
          <span class="empty-text">${this.emptyText}</span>
        </div>`:o='<div class="list" role="listbox"></div>',this.shadowRoot.innerHTML=`
      <style>${Ns}</style>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <div class="${i}">
        <div class="content">
          ${a}
          ${o}
        </div>
      </div>
    `;let r=(t=this.shadowRoot)==null?void 0:t.querySelector(".search-input");r&&(r.value=this.W,r.addEventListener("input",l=>this.$t(l))),s||this.lt()}},Ns=`
  :host {
    display: inline-block;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .listbox {
    display: flex;
    align-items: flex-start;
    width: var(--sb-ui-listbox-width, 226px);
    height: var(--sb-ui-listbox-height, 200px);
    background: var(--sb-ui-listbox-bg, var(--sb-ui-color-grayscale-white, #fff));
    border-radius: var(--sb-ui-listbox-border-radius, 8px);
    box-shadow: 2px 8px 8px 0px rgba(115,115,115,0.04), 2px 2px 16px 0px rgba(115,115,115,0.16);
    overflow: hidden;
    padding-block: 4px;
    padding-inline-end: 2px;
    gap: 2px;
  }

  .listbox--empty { padding-inline: 2px; }
  .listbox--semantic { padding-inline: 2px; }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    min-width: 0;
    min-height: 0;
    height: 100%;
    padding-inline-start: 2px;
  }

  .listbox--empty .content,
  .listbox--semantic .content {
    padding-inline-start: 0;
    border-radius: 6px;
    overflow: hidden;
  }

  .search {
    display: flex;
    flex-direction: column;
    padding: 8px;
    flex-shrink: 0;
  }

  .search-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 32px;
    background: var(--sb-ui-listbox-bg, #fff);
    border: 1px solid var(--sb-ui-color-grayscale-L100, #b9b9b9);
    border-radius: 100px;
    padding-inline-end: 16px;
    overflow: hidden;
    box-sizing: border-box;
  }

  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding-inline-start: 8px;
    flex-shrink: 0;
    color: var(--sb-ui-color-grayscale-D100, #757575);
    font-size: 14px;
  }

  .search-input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-family: var(--sb-ui-typography-fontFamily-brand, 'Bolivar', sans-serif);
    font-size: 14px;
    line-height: 1.4;
    color: var(--sb-ui-color-grayscale-D100, #757575);
  }

  .search-input::placeholder {
    color: var(--sb-ui-color-grayscale-base, #9b9b9b);
  }

  .list {
    display: flex;
    flex-direction: column;
    flex: 1 0 0;
    min-height: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--sb-ui-color-grayscale-L100, #b9b9b9) transparent;
  }

  .list::-webkit-scrollbar { width: 6px; }
  .list::-webkit-scrollbar-thumb {
    background: var(--sb-ui-color-grayscale-L100, #b9b9b9);
    border-radius: 50px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background: var(--sb-ui-listbox-bg, #fff);
    cursor: pointer;
    flex-shrink: 0;
    width: 100%;
    font-family: var(--sb-ui-typography-fontFamily-brand, 'Bolivar', sans-serif);
    font-size: 14px;
    line-height: 1.4;
    color: var(--sb-ui-color-grayscale-D100, #757575);
    white-space: nowrap;
    box-sizing: border-box;
  }

  .item:hover { background: var(--sb-ui-color-grayscale-L400, #fafafa); }
  .item--selected { background: var(--sb-ui-color-primary-L400, #f2f9f6); }
  .item--category { cursor: default; }
  .item--semantic { align-items: flex-start; }

  .checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 2px solid var(--sb-ui-color-grayscale-L100, #b9b9b9);
    border-radius: 4px;
    background: #fff;
    flex-shrink: 0;
    transition: background-color 0.15s, border-color 0.15s;
    box-sizing: border-box;
  }

  .checkbox--checked {
    background: var(--sb-ui-color-primary-base, #009056);
    border-color: var(--sb-ui-color-primary-base, #009056);
  }

  .checkbox--checked::after {
    content: '';
    display: block;
    width: 5px;
    height: 9px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-block-end: 2px;
  }

  .item-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .item-title {
    font-weight: 700;
    color: var(--sb-ui-color-grayscale-D200, #5b5b5b);
  }

  .item-description {
    font-weight: 400;
    color: var(--sb-ui-color-grayscale-D100, #757575);
  }

  .item-icon {
    color: var(--sb-ui-color-primary-base, #009056);
    font-size: 16px;
    flex-shrink: 0;
  }

  .divider {
    width: 100%;
    height: 0;
    border: none;
    border-block-start: 1px solid var(--sb-ui-color-grayscale-L200, #e1e1e1);
    flex-shrink: 0;
    margin: 0;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 0 0;
    min-height: 0;
    gap: 4px;
    padding: 8px 16px;
    text-align: center;
  }

  .empty-icon {
    font-size: 40px;
    color: var(--sb-ui-color-grayscale-base, #9b9b9b);
    margin-block-end: 4px;
  }

  .empty-title {
    font-family: var(--sb-ui-typography-fontFamily, 'Roboto', sans-serif);
    font-size: 16px;
    font-weight: 700;
    line-height: 1.4;
    color: var(--sb-ui-color-grayscale-D400, #282828);
  }

  .empty-text {
    font-family: var(--sb-ui-typography-fontFamily, 'Roboto', sans-serif);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--sb-ui-color-grayscale-D400, #282828);
  }
`;customElements.get("sb-ui-listbox")||customElements.define("sb-ui-listbox",zs);var Os=class extends HTMLElement{constructor(){super(...arguments),this.ct=!1,this.a=null}connectedCallback(){if(this.ct)return;let t=this,e=()=>{t.children.length>0?t.zt():setTimeout(e,80)};setTimeout(e,60)}disconnectedCallback(){this.a&&clearInterval(this.a)}kt(){let t=parseInt(this.getAttribute("per-view")||"3",10)||3,e=window.innerWidth;return e<=512?1:e<=768?Math.min(t,2):t}zt(){if(this.ct)return;this.ct=!0;let t=this,e=parseInt(t.getAttribute("gap")||"24",10)||24,s=t.getAttribute("position")==="in",i=t.hasAttribute("controls"),a=t.hasAttribute("indicators"),o=t.hasAttribute("autoplay"),r=parseInt(t.getAttribute("interval")||"5000",10)||5e3,l=0,d=[];for(;t.firstElementChild;)d.push(t.removeChild(t.firstElementChild));let p=d.length;if(!p)return;t.classList.add("sb-ui-carousel");let h=document.createElement("div");h.className="sb-ui-carousel__wrap"+(s?"":" sb-ui-carousel__wrap--out");let m=document.createElement("div");m.className="sb-ui-carousel__viewport";let x=document.createElement("div");x.className="sb-ui-carousel__track",x.style.cssText="display:flex;gap:"+e+"px;transition:transform 0.4s ease";let w=[];for(let U=0;U<p;U++){let q=document.createElement("div");q.className="sb-ui-carousel__slide",q.appendChild(d[U]),w.push(q),x.appendChild(q)}m.appendChild(x),h.appendChild(m);let S=null,C=null;i&&(S=document.createElement("button"),S.className="sb-ui-carousel__arrow sb-ui-carousel__arrow--prev"+(s?" sb-ui-carousel__arrow--in":""),S.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg>',S.setAttribute("aria-label","Anterior"),C=document.createElement("button"),C.className="sb-ui-carousel__arrow sb-ui-carousel__arrow--next"+(s?" sb-ui-carousel__arrow--in":""),C.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M9 18l6-6-6-6"/></svg>',C.setAttribute("aria-label","Siguiente"),h.appendChild(S),h.appendChild(C));let A=null,I=[];if(a){A=document.createElement("div"),A.className="sb-ui-carousel__dots";let U=document.createElement("div");U.className="sb-ui-carousel__dots-bg",A.appendChild(U),h.appendChild(A)}t.appendChild(h);function E(U){let q=t.kt(),oe=Math.max(0,p-q);l=Math.max(0,Math.min(U,oe));let me=m.offsetWidth;if(me>0){let G=(me-e*(q-1))/q;for(let J=0;J<w.length;J++)w[J].style.cssText="flex:0 0 "+G+"px;min-width:0";x.style.transform="translateX(-"+l*(G+e)+"px)"}let $=oe+1;if(A){if(I.length!==$){for(;A.children.length>1;)A.removeChild(A.lastChild);I=[];for(let G=0;G<$;G++){let J=document.createElement("button");J.className="sb-ui-carousel__dot",I.push(J),A.appendChild(J),(De=>{J.onclick=()=>{E(De),t.a&&clearInterval(t.a)}})(G)}}for(let G=0;G<I.length;G++)I[G].className=G===l?"sb-ui-carousel__dot sb-ui-carousel__dot--active":"sb-ui-carousel__dot";A.style.display=$>1?"":"none"}S&&(S.disabled=l<=0),C&&(C.disabled=l>=oe)}S&&(S.onclick=()=>{E(l-1),t.a&&clearInterval(t.a)}),C&&(C.onclick=()=>{E(l+1),t.a&&clearInterval(t.a)});let X=0,L=0,ce=!1;m.addEventListener("touchstart",U=>{X=U.touches[0].clientX,L=0,ce=!0},{passive:!0}),m.addEventListener("touchmove",U=>{ce&&(L=U.touches[0].clientX-X,Math.abs(L)>10&&U.preventDefault())},{passive:!1}),m.addEventListener("touchend",()=>{ce&&(ce=!1,L<-50?(E(l+1),t.a&&clearInterval(t.a)):L>50&&(E(l-1),t.a&&clearInterval(t.a)))},{passive:!0});let Se;window.addEventListener("resize",()=>{clearTimeout(Se),Se=setTimeout(()=>E(l),150)}),E(0),o&&(t.a=setInterval(()=>{let U=Math.max(0,p-t.kt());E(l>=U?0:l+1)},r))}};customElements.get("sb-ui-carousel")||customElements.define("sb-ui-carousel",Os);var Bs=class Te{constructor(){this.toasts=new Map,this.counter=0}static getInstance(){return Te.instance||(Te.instance=new Te),Te.instance}show(e={}){let s=`toast-${++this.counter}-${Date.now()}`,i=e.position||"top-right",a=document.createElement("sb-ui-toast");return e.type&&(a.type=e.type),e.title&&(a.title=e.title),e.message&&(a.message=e.message),a.position=i,e.size&&(a.size=e.size),e.autoDismiss!==void 0&&(a.autoDismiss=e.autoDismiss),e.showClose!==void 0&&(a.showClose=e.showClose),e.showProgress!==void 0&&(a.showProgress=e.showProgress),e.clickable!==void 0&&(a.clickable=e.clickable),document.body.appendChild(a),this.toasts.set(s,{id:s,element:a,container:document.body}),this.setupToastEventListeners(s,a),this.recalculateOffsets(i),requestAnimationFrame(()=>{a.show()}),s}hide(e){let s=this.toasts.get(e);return s?(s.element.hide(),!0):!1}remove(e){let s=this.toasts.get(e);if(!s)return!1;let i=s.element.position;return s.element.remove(),this.toasts.delete(e),this.recalculateOffsets(i),!0}hideAll(){this.toasts.forEach(e=>e.element.hide())}removeAll(){this.toasts.forEach(e=>e.element.remove()),this.toasts.clear()}getActiveToasts(){return Array.from(this.toasts.keys())}getToastCount(e){return e?Array.from(this.toasts.values()).filter(s=>s.element.position===e).length:this.toasts.size}success(e,s={}){return this.show({...s,type:"success",message:e})}error(e,s={}){return this.show({...s,type:"error",message:e})}warning(e,s={}){return this.show({...s,type:"warning",message:e})}info(e,s={}){return this.show({...s,type:"info",message:e})}recalculateOffsets(e){let s=Array.from(this.toasts.values()).filter(r=>r.element.position===e),i=e.startsWith("bottom"),a=e.endsWith("center"),o=16;s.forEach((r,l)=>{let d=r.element,p=d.offsetHeight||72;i?(d.style.bottom=`${o}px`,d.style.top=""):(d.style.top=`${o}px`,d.style.bottom=""),a&&(d.style.left="50%"),l<s.length-1&&(o+=p+8)})}setupToastEventListeners(e,s){s.addEventListener("sb-ui-toast-hide",()=>{setTimeout(()=>{this.remove(e)},300)})}},le=Bs.getInstance(),Ps=t=>le.show(t),Rs=(t,e)=>le.success(t,e),qs=(t,e)=>le.error(t,e),Fs=(t,e)=>le.warning(t,e),Hs=(t,e)=>le.info(t,e),Us=t=>le.hide(t),js=t=>le.remove(t),Vs=()=>le.hideAll(),Ys=()=>le.removeAll(),Ws=Object.defineProperty,Xs=Object.getOwnPropertyDescriptor,se=(t,e,s,i)=>{for(var a=i>1?void 0:i?Xs(e,s):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(i?r(e,s,a):r(a))||a);return i&&a&&Ws(e,s,a),a},Z=class extends ue{constructor(){super(...arguments),this.type="info",this.position="top-right",this.size="medium",this.title="",this.message="",this.visible=!1,this.showClose=!0,this.autoDismiss=0,this.showProgress=!1,this.clickable=!0,this.dt=100}connectedCallback(){super.connectedCallback(),this.visible&&this.X()}disconnectedCallback(){super.disconnectedCallback(),this.J()}updated(t){if(t.has("visible")){let e=t.get("visible");this.visible?(this.E("sb-ui-toast-show"),this.X()):e===!0&&(this.E("sb-ui-toast-hide"),this.J())}t.has("autoDismiss")&&this.visible&&this.X()}X(){this.J(),this.autoDismiss>0&&(this.showProgress&&(this.dt=100,this.requestUpdate(),setTimeout(()=>{this.dt=0,this.requestUpdate()},50)),this.ht=window.setTimeout(()=>{this.hide()},this.autoDismiss))}J(){this.ht&&(clearTimeout(this.ht),this.ht=void 0),this.xt&&(clearTimeout(this.xt),this.xt=void 0)}Pt(){this.clickable&&this.E("sb-ui-toast-click")}ot(t){t.stopPropagation(),this.hide()}at(t){t.key==="Escape"&&this.hide()}E(t,e){this.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}show(){this.visible=!0}hide(){this.visible=!1}toggle(){this.visible=!this.visible}pauseAutoDismiss(){this.J()}resumeAutoDismiss(){this.visible&&this.autoDismiss>0&&this.X()}render(){let t=this.showProgress&&this.autoDismiss>0?`width: ${this.dt}%; transition-duration: ${this.autoDismiss}ms;`:"display: none;";return O`
      <div
        class="toast"
        part="toast"
        @click=${this.Pt}
        @keydown=${this.at}
        @mouseenter=${this.pauseAutoDismiss}
        @mouseleave=${this.resumeAutoDismiss}
        tabindex="0"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <!-- Icon (vacío, el CSS genera el icono automáticamente) -->
        <div class="icon" part="icon" aria-hidden="true"></div>

        <div class="content" part="content">
          ${this.title?O`
                <strong class="title" part="title">
                  <slot name="title">${this.title}</slot>
                </strong>
              `:""}
          ${this.message?O`
                <p class="message" part="message">
                  <slot>${this.message}</slot>
                </p>
              `:O` <slot></slot> `}

          <slot name="actions"></slot>
        </div>

        ${this.showClose?O`
              <button
                class="close"
                part="close"
                @click=${this.ot}
                aria-label="Cerrar notificación"
                type="button"
              ></button>
            `:""}

        <div class="progress" part="progress" style=${t}></div>
      </div>
    `}};Z.styles=Mt`
    :host {
      /* Colores - Background (basado en alert.css tokens) */
      --sb-ui-toast-bg-color: var(--sb-ui-color-grayscale-white, #ffffff);
      --sb-ui-toast-bg-color-success: var(--sb-ui-color-feedback-success-L400, #e9f6ec);
      --sb-ui-toast-bg-color-info: var(--sb-ui-color-feedback-info-L400, #e5f2ff);
      --sb-ui-toast-bg-color-warning: var(--sb-ui-color-feedback-warning-L400, #fff9e5);
      --sb-ui-toast-bg-color-error: var(--sb-ui-color-feedback-error-L400, #fbebec);

      /* Colores - Border (linea izquierda) */
      --sb-ui-toast-border-color: var(--sb-ui-color-grayscale-L200, #edeef0);
      --sb-ui-toast-border-color-success: var(--sb-ui-color-feedback-success-base, #28a745);
      --sb-ui-toast-border-color-info: var(--sb-ui-color-feedback-info-base, #007eff);
      --sb-ui-toast-border-color-warning: var(--sb-ui-color-feedback-warning-base, #ffc100);
      --sb-ui-toast-border-color-error: var(--sb-ui-color-feedback-error-base, #dc3545);

      /* Colores - Text (siempre oscuro) */
      --sb-ui-toast-text-color: var(--sb-ui-color-grayscale-black, #1b1b1b);
      --sb-ui-toast-title-color: var(--sb-ui-color-grayscale-black, #1b1b1b);

      /* Colores - Icon */
      --sb-ui-toast-icon-color: var(--sb-ui-color-grayscale-base, #9b9b9b);
      --sb-ui-toast-icon-color-success: var(--sb-ui-color-feedback-success-base, #28a745);
      --sb-ui-toast-icon-color-info: var(--sb-ui-color-feedback-info-base, #007eff);
      --sb-ui-toast-icon-color-warning: var(--sb-ui-color-feedback-warning-base, #ffc100);
      --sb-ui-toast-icon-color-error: var(--sb-ui-color-feedback-error-base, #dc3545);

      /* Colores - Close button */
      --sb-ui-toast-close-color: var(--sb-ui-color-grayscale-base, #9b9b9b);
      --sb-ui-toast-close-color-hover: var(--sb-ui-color-grayscale-D300, #404040);

      /* Espaciado (según especificación Figma como alert.css) */
      --sb-ui-toast-padding-block: 1rem; /* 16px */
      --sb-ui-toast-padding-inline-start: 2rem;
      --sb-ui-toast-padding-inline-end: 1rem;
      --sb-ui-toast-gap: 0.5rem; /* 8px */
      --sb-ui-toast-content-gap: 0.25rem; /* 4px */

      /* Bordes */
      --sb-ui-toast-border-inline-start-width: 4px;
      --sb-ui-toast-border-radius: 8px;

      /* Tipografia */
      --sb-ui-toast-font-family: var(--sb-ui-typography-fontFamily, 'Bolivar', sans-serif);
      --sb-ui-toast-title-font-size: 0.875rem; /* 14px */
      --sb-ui-toast-title-font-weight: 700;
      --sb-ui-toast-message-font-size: 0.875rem; /* 14px */
      --sb-ui-toast-message-font-weight: 400;
      --sb-ui-toast-line-height: 1.4;

      /* Tamanios */
      --sb-ui-toast-min-block-size: 5rem;
      --sb-ui-toast-icon-size: 1.5rem; /* 24px */
      --sb-ui-toast-close-size: 1.75rem; /* 28px */

      /* Sombra */
      --sb-ui-toast-shadow: var(--sb-ui-shadow-s, 1px 4px 4px 0px rgba(115, 115, 115, 0.04), 1px 1px 8px 0px rgba(115, 115, 115, 0.16));

      /* Transiciones */
      --sb-ui-toast-transition: all 0.2s ease;

      /* Posicionamiento */
      position: fixed;
      z-index: 1000;
      display: block;
      opacity: 0;
      transform: translateX(100%);
      transition: var(--sb-ui-toast-transition);
    }

    :host([visible]) {
      opacity: 1;
      transform: translateX(0);
    }

    :host([position='top-right']) {
      top: 1rem;
      right: 1rem;
    }

    :host([position='top-left']) {
      top: 1rem;
      left: 1rem;
      transform: translateX(-100%);
    }

    :host([position='top-left'][visible]) {
      transform: translateX(0);
    }

    :host([position='top-center']) {
      top: 1rem;
      left: 50%;
      transform: translateX(-50%) translateY(-100%);
    }

    :host([position='top-center'][visible]) {
      transform: translateX(-50%) translateY(0);
    }

    :host([position='bottom-right']) {
      bottom: 1rem;
      right: 1rem;
      transform: translateX(100%) translateY(100%);
    }

    :host([position='bottom-right'][visible]) {
      transform: translateX(0) translateY(0);
    }

    :host([position='bottom-left']) {
      bottom: 1rem;
      left: 1rem;
      transform: translateX(-100%) translateY(100%);
    }

    :host([position='bottom-left'][visible]) {
      transform: translateX(0) translateY(0);
    }

    :host([position='bottom-center']) {
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%) translateY(100%);
    }

    :host([position='bottom-center'][visible]) {
      transform: translateX(-50%) translateY(0);
    }

    .toast {
      /* Layout (igual que alert.css) */
      display: flex;
      align-items: flex-start;
      gap: var(--sb-ui-toast-gap);
      position: relative;
      box-sizing: border-box;
      width: 100%;
      min-width: 300px;
      max-width: 484px;

      /* Spacing */
      padding: var(--sb-ui-toast-padding-block) var(--sb-ui-toast-padding-inline-end)
        var(--sb-ui-toast-padding-block) var(--sb-ui-toast-padding-inline-start);

      /* Sizing */
      min-height: var(--sb-ui-toast-min-block-size);

      /* Appearance */
      background-color: var(--sb-ui-toast-bg-color);
      border: none;
      border-radius: var(--sb-ui-toast-border-radius);
      box-shadow: var(--sb-ui-toast-shadow);

      /* Typography */
      font-family: var(--sb-ui-toast-font-family);
      line-height: var(--sb-ui-toast-line-height);
      color: var(--sb-ui-toast-text-color);

      cursor: pointer;
      transition: var(--sb-ui-toast-transition);
    }

    /* Barra de color izquierda (pseudo-elemento) - según Figma */
    .toast::before {
      content: '';
      position: absolute;
      left: 0.5rem; /* 8px */
      top: 50%;
      transform: translateY(-50%);
      width: var(--sb-ui-toast-border-inline-start-width);
      height: calc(100% - 2rem); /* Altura dinámica con margen */
      background-color: var(--sb-ui-toast-border-color);
      border-radius: 8px;
    }

    .toast:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    /* Icon */
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--sb-ui-toast-icon-size);
      height: var(--sb-ui-toast-icon-size);
      flex-shrink: 0;
      margin-top: 0.125rem;
      position: relative;
    }

    /* Ocultar cualquier contenido dentro del icon container */
    .icon > * {
      display: none;
    }

    /* Content wrapper */
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-toast-content-gap);
      min-width: 0;
    }

    /* Title */
    .title {
      font-size: var(--sb-ui-toast-title-font-size);
      font-weight: var(--sb-ui-toast-title-font-weight);
      line-height: var(--sb-ui-toast-line-height);
      color: var(--sb-ui-toast-title-color);
      margin: 0;
    }

    /* Message */
    .message {
      font-size: var(--sb-ui-toast-message-font-size);
      font-weight: var(--sb-ui-toast-message-font-weight);
      line-height: var(--sb-ui-toast-line-height);
      color: var(--sb-ui-toast-text-color);
      margin: 0;
    }

    /* Close button */
    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--sb-ui-toast-close-size);
      height: var(--sb-ui-toast-close-size);
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 0.25rem; /* 4px */
      transition: color 0.2s ease, background-color 0.2s ease;
      flex-shrink: 0;
      margin-top: 0;
      margin-right: 0;
      padding: 0.25rem;
      position: relative;
    }

    .close:hover {
      background-color: var(--sb-ui-color-grayscale-L400, rgba(247, 247, 247, 0.5));
    }

    .close:focus-visible {
      outline: 3px solid var(--sb-ui-color-secondary-L100);
      outline-offset: 2px;
    }

    /* Ocultar cualquier contenido dentro */
    .close > * {
      display: none;
    }

    /* Icono X con CSS puro usando mask-image (igual que alert.css) */
    .close::before {
      content: '';
      width: 1.125rem;
      height: 1.125rem;
      background-color: var(--sb-ui-toast-close-color);
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cline x1='6' y1='6' x2='18' y2='18' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3Cline x1='18' y1='6' x2='6' y2='18' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cline x1='6' y1='6' x2='18' y2='18' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3Cline x1='18' y1='6' x2='6' y2='18' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
    }

    .close:hover::before {
      background-color: var(--sb-ui-toast-close-color-hover);
    }

    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background-color: var(--sb-ui-color-primary-base, #007acc);
      border-radius: 0 0 var(--sb-ui-toast-border-radius) var(--sb-ui-toast-border-radius);
      transition: width linear;
      opacity: 0.7;
    }

    /* Toast Type Variants - igual que alert.css */
    
    /* Success */
    :host([type='success']) .toast {
      --sb-ui-toast-bg-color: var(--sb-ui-toast-bg-color-success);
      --sb-ui-toast-border-color: var(--sb-ui-toast-border-color-success);
      --sb-ui-toast-icon-color: var(--sb-ui-toast-icon-color-success);
    }

    :host([type='success']) .icon::before {
      content: '';
      width: 1.5rem;
      height: 1.5rem;
      background-color: var(--sb-ui-toast-icon-color);
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Ccircle cx='12' cy='12' r='10' stroke='black' stroke-width='2' fill='none'/%3E%3Cpath d='M7 12l3 3 7-7' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Ccircle cx='12' cy='12' r='10' stroke='black' stroke-width='2' fill='none'/%3E%3Cpath d='M7 12l3 3 7-7' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
    }

    :host([type='success']) .progress {
      background-color: var(--sb-ui-toast-border-color-success);
    }

    /* Info */
    :host([type='info']) .toast {
      --sb-ui-toast-bg-color: var(--sb-ui-toast-bg-color-info);
      --sb-ui-toast-border-color: var(--sb-ui-toast-border-color-info);
      --sb-ui-toast-icon-color: var(--sb-ui-toast-icon-color-info);
    }

    :host([type='info']) .icon::before {
      content: '';
      width: 1.5rem;
      height: 1.5rem;
      background-color: var(--sb-ui-toast-icon-color);
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Ccircle cx='12' cy='12' r='10' stroke='black' stroke-width='2' fill='none'/%3E%3Cline x1='12' y1='11' x2='12' y2='17' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='12' cy='8' r='1' fill='black'/%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Ccircle cx='12' cy='12' r='10' stroke='black' stroke-width='2' fill='none'/%3E%3Cline x1='12' y1='11' x2='12' y2='17' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='12' cy='8' r='1' fill='black'/%3E%3C/svg%3E");
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
    }

    :host([type='info']) .progress {
      background-color: var(--sb-ui-toast-border-color-info);
    }

    /* Warning */
    :host([type='warning']) .toast {
      --sb-ui-toast-bg-color: var(--sb-ui-toast-bg-color-warning);
      --sb-ui-toast-border-color: var(--sb-ui-toast-border-color-warning);
      --sb-ui-toast-icon-color: var(--sb-ui-toast-icon-color-warning);
    }

    :host([type='warning']) .icon::before {
      content: '';
      width: 1.5rem;
      height: 1.5rem;
      background-color: var(--sb-ui-toast-icon-color);
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 2L2 20h20L12 2z' stroke='black' stroke-width='2' stroke-linejoin='round' fill='none'/%3E%3Cline x1='12' y1='9' x2='12' y2='14' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='12' cy='17' r='1' fill='black'/%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M12 2L2 20h20L12 2z' stroke='black' stroke-width='2' stroke-linejoin='round' fill='none'/%3E%3Cline x1='12' y1='9' x2='12' y2='14' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='12' cy='17' r='1' fill='black'/%3E%3C/svg%3E");
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
    }

    :host([type='warning']) .progress {
      background-color: var(--sb-ui-toast-border-color-warning);
    }

    /* Error */
    :host([type='error']) .toast {
      --sb-ui-toast-bg-color: var(--sb-ui-toast-bg-color-error);
      --sb-ui-toast-border-color: var(--sb-ui-toast-border-color-error);
      --sb-ui-toast-icon-color: var(--sb-ui-toast-icon-color-error);
    }

    :host([type='error']) .icon::before {
      content: '';
      width: 1.5rem;
      height: 1.5rem;
      background-color: var(--sb-ui-toast-icon-color);
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Ccircle cx='12' cy='12' r='10' stroke='black' stroke-width='2' fill='none'/%3E%3Cline x1='8' y1='8' x2='16' y2='16' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3Cline x1='16' y1='8' x2='8' y2='16' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Ccircle cx='12' cy='12' r='10' stroke='black' stroke-width='2' fill='none'/%3E%3Cline x1='8' y1='8' x2='16' y2='16' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3Cline x1='16' y1='8' x2='8' y2='16' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
    }

    :host([type='error']) .progress {
      background-color: var(--sb-ui-toast-border-color-error);
    }

    /* Size Variants */
    :host([size='small']) .toast {
      min-height: 2.5rem;
      padding: 0.75rem;
      gap: 0.5rem;
    }

    :host([size='small']) .icon {
      width: 1rem;
      height: 1rem;
      font-size: 1rem;
    }

    :host([size='small']) .title,
    :host([size='small']) .message {
      font-size: 0.8125rem;
    }

    :host([size='small']) .close {
      width: 1.25rem;
      height: 1.25rem;
    }

    :host([size='large']) .toast {
      min-height: 3.5rem;
      padding: 1.25rem;
      gap: 1rem;
    }

    :host([size='large']) .icon {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 1.5rem;
    }

    :host([size='large']) .title {
      font-size: 1rem;
    }

    :host([size='large']) .message {
      font-size: 0.9375rem;
    }

    :host([size='large']) .close {
      width: 1.75rem;
      height: 1.75rem;
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: none;
      }

      .toast {
        transition: none;
      }

      .toast:hover {
        transform: none;
      }
    }

    @media (prefers-contrast: high) {
      .toast {
        border-width: 2px;
        border-left-width: 6px;
      }
    }

    /* Mobile Optimization */
    @media (max-width: 640px) {
      :host([position*='top']) {
        top: 0.5rem;
        left: 0.5rem;
        right: 0.5rem;
        transform: translateY(-100%);
      }

      :host([position*='top'][visible]) {
        transform: translateY(0);
      }

      :host([position*='bottom']) {
        bottom: 0.5rem;
        left: 0.5rem;
        right: 0.5rem;
        transform: translateY(100%);
      }

      :host([position*='bottom'][visible]) {
        transform: translateY(0);
      }

      .toast {
        min-width: auto;
        max-width: none;
      }
    }
  `;se([y({type:String,reflect:!0})],Z.prototype,"type",2);se([y({type:String,reflect:!0})],Z.prototype,"position",2);se([y({type:String,reflect:!0})],Z.prototype,"size",2);se([y({type:String})],Z.prototype,"title",2);se([y({type:String})],Z.prototype,"message",2);se([y({type:Boolean,reflect:!0})],Z.prototype,"visible",2);se([y({type:Boolean,attribute:"show-close"})],Z.prototype,"showClose",2);se([y({type:Number,attribute:"auto-dismiss"})],Z.prototype,"autoDismiss",2);se([y({type:Boolean,attribute:"show-progress"})],Z.prototype,"showProgress",2);se([y({type:Boolean})],Z.prototype,"clickable",2);se([ne()],Z.prototype,"_progressWidth",2);Z=se([Ue("sb-ui-toast")],Z);typeof window<"u"&&(window.showToast=Ps,window.showSuccess=Rs,window.showInfo=Hs,window.showWarning=Fs,window.showError=qs,window.hideToast=Us,window.hideAllToasts=Vs,window.removeToast=js,window.removeAllToasts=Ys);window.self===window.top||Gs();function Gs(){let t=!1,e=null,s=!1,i=[],a=[],o=!1,r={},l=null,d=1e4;const p=5,h=document.createElement("div");h.id="editor-toolbar",h.innerHTML="",h.style.cssText="display:none;position:fixed;z-index:99999;",document.body.appendChild(h);const m=document.createElement("div");m.id="resize-box",m.style.cssText="display:none;position:fixed;z-index:99998;pointer-events:none;border:2px solid #0a6741;",["nw","ne","sw","se","n","s","e","w"].forEach(n=>{const c=document.createElement("div");c.className="resize-handle",c.dataset.dir=n,c.style.cssText=`position:absolute;width:8px;height:8px;background:#0a6741;border-radius:2px;pointer-events:all;cursor:${n}-resize;`;const g={nw:"top:-4px;left:-4px;",ne:"top:-4px;right:-4px;",sw:"bottom:-4px;left:-4px;",se:"bottom:-4px;right:-4px;",n:"top:-4px;left:50%;transform:translateX(-50%);",s:"bottom:-4px;left:50%;transform:translateX(-50%);",e:"top:50%;right:-4px;transform:translateY(-50%);",w:"top:50%;left:-4px;transform:translateY(-50%);"};c.style.cssText+=g[n],m.appendChild(c)}),document.body.appendChild(m);const x=document.createElement("div");x.className="rotate-line",m.appendChild(x);const w=document.createElement("div");w.className="rotate-handle",m.appendChild(w),w.addEventListener("mousedown",n=>{if(!e)return;n.preventDefault(),n.stopPropagation();const c=e.getBoundingClientRect(),g=c.left+c.width/2,u=c.top+c.height/2;parseFloat(e.dataset.rotation||"0");const v=f=>{const T=Math.atan2(f.clientY-u,f.clientX-g)*(180/Math.PI)+90;e.style.transform=`rotate(${Math.round(T)}deg)`,e.dataset.rotation=Math.round(T),q(e)},_=()=>{document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",_),$("changeStyle",e,"transform",e.style.transform)};document.addEventListener("mousemove",v),document.addEventListener("mouseup",_)});const S=document.createElement("div");S.style.cssText="display:none;position:fixed;z-index:99997;background:#E8C916;color:#333;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;pointer-events:none;",document.body.appendChild(S);const C=document.createElement("div");C.id="alignment-guides",C.style.cssText="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99996;",document.body.appendChild(C);const A=document.createElement("div");A.id="text-cursor",A.style.cssText="display:none;position:fixed;z-index:99999;pointer-events:none;",A.innerHTML=`
  <div style="display:flex;align-items:center;gap:4px;">
    <div style="width:2px;height:20px;background:#0a6741;animation:blink 0.8s infinite;"></div>
    <span style="font-size:10px;color:#0a6741;font-weight:600;background:rgba(255,255,255,0.9);padding:1px 6px;border-radius:4px;white-space:nowrap;">Clic para insertar texto</span>
  </div>
`,document.body.appendChild(A);const I=document.createElement("style");I.textContent=`
  #editor-toolbar button { width:30px;height:30px;border:none;background:transparent;border-radius:6px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background 0.1s; }
  #editor-toolbar button:hover { background:#f0f0f0; }
  [contenteditable=true] { outline:1.5px dashed #0a6741 !important; outline-offset:2px; background:rgba(10,103,65,0.02) !important; cursor:text !important; border-radius:4px; }
  .editor-highlight { outline:1.5px solid rgba(10,103,65,0.6) !important; outline-offset:2px; border-radius:4px; }
  .editor-hover { outline:1px solid rgba(10,103,65,0.25) !important; outline-offset:1px; border-radius:3px; }
  .editor-dragging { opacity:0.85; cursor:move !important; outline:1.5px solid #0a6741 !important; }
  .guide-line { position:fixed; background:#ff4081; z-index:99996; pointer-events:none; opacity:0.9; }
  .guide-line-h { height:1px; left:0; right:0; }
  .guide-line-v { width:1px; top:0; bottom:0; }
  .guide-line--center { background:#2196F3; }
  .guide-line--edge { background:#ff4081; }
  .guide-line--viewport { background:#9C27B0; opacity:0.6; }
  .guide-line--cursor { background:rgba(10,103,65,0.3); }
  .guide-distance { position:fixed; background:#ff4081; color:#fff; font-size:9px; padding:1px 4px; border-radius:3px; pointer-events:none; z-index:99997; white-space:nowrap; }
  .guide-distance--center { background:#2196F3; }
  .guide-marker { position:fixed; width:6px; height:6px; background:#ff4081; border-radius:50%; pointer-events:none; z-index:99997; transform:translate(-50%,-50%); }
  .guide-marker--center { background:#2196F3; }
  @keyframes guide-pulse { 0%,100%{opacity:0.9} 50%{opacity:0.5} }
  .guide-line--snapped { animation: guide-pulse 0.6s ease-in-out; box-shadow: 0 0 4px currentColor; }
  .frame-drop-highlight { outline:1.5px dashed #016D38 !important; outline-offset:4px; background:rgba(10,103,65,0.03) !important; border-radius:6px; transition:background 0.15s; }
  .cursor-guide-h { position:fixed; left:0; right:0; height:1px; background:rgba(10,103,65,0.2); pointer-events:none; z-index:99995; }
  .cursor-guide-v { position:fixed; top:0; bottom:0; width:1px; background:rgba(10,103,65,0.2); pointer-events:none; z-index:99995; }
  .rotate-handle { position:absolute; top:-28px; left:50%; transform:translateX(-50%); width:20px; height:20px; background:#0a6741; border-radius:50%; cursor:grab; pointer-events:all; display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; box-shadow:0 2px 6px rgba(0,0,0,0.2); }
  .rotate-handle::before { content:'↻'; }
  .rotate-line { position:absolute; top:-12px; left:50%; width:1px; height:12px; background:#0a6741; pointer-events:none; }
`,document.head.appendChild(I);const E=document.createElement("div");E.className="cursor-guide-h",E.style.display="none",document.body.appendChild(E);const X=document.createElement("div");X.className="cursor-guide-v",X.style.display="none",document.body.appendChild(X);function L(n){if(n.id)return"#"+n.id;if(n.className&&typeof n.className=="string"){const u=n.className.trim().split(/\s+/).filter(v=>v!=="editor-highlight"&&v!=="editor-dragging");if(u.length){const v="."+u.join(".");try{if(document.querySelectorAll(v).length===1)return v}catch{}}}const c=[];let g=n;for(;g&&g!==document.body;){let u=g.tagName.toLowerCase();if(g.id){c.unshift("#"+g.id);break}const v=g.parentElement;if(v){const _=Array.from(v.children).filter(f=>f.tagName===g.tagName);_.length>1&&(u+=":nth-of-type("+(_.indexOf(g)+1)+")")}c.unshift(u),g=g.parentElement}return c.join(" > ")}function ce(n,c,g){i.push({selector:L(n),property:c,oldValue:g,newValue:c==="textContent"?n.textContent:c==="__fullStyle"?n.style.cssText:n.style[c]}),a=[]}function Se(n){i.push({selector:L(n),property:"__fullStyle",oldValue:n.style.cssText,newValue:""}),a=[]}function U(n){i.length>0&&(i[i.length-1].newValue=n.style.cssText)}function q(n){const c=n.getBoundingClientRect();m.style.display="block",m.style.left=c.left+"px",m.style.top=c.top+"px",m.style.width=c.width+"px",m.style.height=c.height+"px"}document.addEventListener("scroll",()=>{e&&!s&&q(e)},!0);function oe(n){e&&(e.classList.remove("editor-highlight"),e.removeAttribute("contenteditable")),e=n,e.classList.add("editor-highlight"),q(n)}function me(){e&&(e.classList.remove("editor-highlight","editor-dragging"),e.removeAttribute("contenteditable")),e=null,h.style.display="none",m.style.display="none",J()}function $(n,c,g,u){window.parent.postMessage({type:n==="info"?"ADMIN_INFO":"ADMIN_CHANGE",action:n,selector:c?L(c):"",property:g,value:u,description:n==="info"?u:`${n}: ${(c==null?void 0:c.tagName)||""}`},"*")}function G(){const n=document.querySelectorAll("body *:not(#editor-toolbar):not(#resize-box):not(#alignment-guides):not(.guide-line):not(.guide-distance):not(.guide-marker):not(#text-cursor):not(script):not(style):not(link)");return Array.from(n).filter(c=>{if(c===e||c.contains(e)||e!=null&&e.contains(c)||c.offsetParent===null&&c.style.position!=="fixed")return!1;const g=c.getBoundingClientRect();return g.width>5&&g.height>5&&g.top<window.innerHeight+50&&g.bottom>-50&&g.left<window.innerWidth+50&&g.right>-50})}function J(){C.innerHTML=""}function De(n){J();const c=G(),g=n.left+n.width/2,u=n.top+n.height/2,v=window.innerWidth/2,_=window.innerHeight/2,f={h:new Set,v:new Set};Math.abs(g-v)<p&&W("v",v,"viewport"),Math.abs(u-_)<p&&W("h",_,"viewport"),Math.abs(n.left)<p&&W("v",0,"viewport"),Math.abs(n.right-window.innerWidth)<p&&W("v",window.innerWidth,"viewport"),Math.abs(n.top)<p&&W("h",0,"viewport"),c.forEach(T=>{const b=T.getBoundingClientRect(),M=b.left+b.width/2,Y=b.top+b.height/2;Math.abs(u-Y)<p&&!f.h.has(Math.round(Y))&&(f.h.add(Math.round(Y)),W("h",Y,"center"),Ne(g,Y),Ne(M,Y)),Math.abs(n.top-b.top)<p&&!f.h.has(Math.round(b.top))&&(f.h.add(Math.round(b.top)),W("h",b.top,"edge")),Math.abs(n.bottom-b.bottom)<p&&!f.h.has(Math.round(b.bottom))&&(f.h.add(Math.round(b.bottom)),W("h",b.bottom,"edge")),Math.abs(n.top-b.bottom)<p&&!f.h.has(Math.round(b.bottom)+1e3)&&(f.h.add(Math.round(b.bottom)+1e3),W("h",b.bottom,"edge"),de(g,b.bottom,0,"h")),Math.abs(n.bottom-b.top)<p&&!f.h.has(Math.round(b.top)+2e3)&&(f.h.add(Math.round(b.top)+2e3),W("h",b.top,"edge"),de(g,b.top,0,"h")),Math.abs(g-M)<p&&!f.v.has(Math.round(M))&&(f.v.add(Math.round(M)),W("v",M,"center"),Ne(M,u),Ne(M,Y)),Math.abs(n.left-b.left)<p&&!f.v.has(Math.round(b.left))&&(f.v.add(Math.round(b.left)),W("v",b.left,"edge")),Math.abs(n.right-b.right)<p&&!f.v.has(Math.round(b.right))&&(f.v.add(Math.round(b.right)),W("v",b.right,"edge")),Math.abs(n.left-b.right)<p&&!f.v.has(Math.round(b.right)+1e3)&&(f.v.add(Math.round(b.right)+1e3),W("v",b.right,"edge"),de(b.right,u,0,"v")),Math.abs(n.right-b.left)<p&&!f.v.has(Math.round(b.left)+2e3)&&(f.v.add(Math.round(b.left)+2e3),W("v",b.left,"edge"),de(b.left,u,0,"v"));const ee=n.top-b.bottom,te=b.top-n.bottom,R=n.left-b.right,Q=b.left-n.right;ee>0&&ee<60&&de(g,b.bottom+ee/2,Math.round(ee),"h"),te>0&&te<60&&de(g,n.bottom+te/2,Math.round(te),"h"),R>0&&R<60&&de(b.right+R/2,u,Math.round(R),"v"),Q>0&&Q<60&&de(n.right+Q/2,u,Math.round(Q),"v")})}function W(n,c,g){const u=document.createElement("div");u.className=`guide-line guide-line-${n} guide-line--${g||"edge"}`,n==="h"?u.style.top=c+"px":u.style.left=c+"px",C.appendChild(u)}function Ne(n,c,g){const u=document.createElement("div");u.className="guide-marker guide-marker--center",u.style.left=n+"px",u.style.top=c+"px",C.appendChild(u)}function de(n,c,g,u){if(g<=0)return;const v=document.createElement("div");v.className="guide-distance",v.textContent=g+"px",v.style.left=n+"px",v.style.top=c+"px",v.style.transform="translate(-50%, -50%)",C.appendChild(v)}function it(n,c,g){const u=n.getBoundingClientRect(),v=u.width,_=u.height,f=G();let T=c,b=g,M=!1;const Y=c,ee=g,te=c+v,R=g+_,Q=c+v/2,N=g+_/2,F=window.innerWidth/2,k=window.innerHeight/2;return Math.abs(Q-F)<p&&(T=F-v/2,M=!0),Math.abs(N-k)<p&&(b=k-_/2,M=!0),Math.abs(Y)<p&&(T=0,M=!0),Math.abs(te-window.innerWidth)<p&&(T=window.innerWidth-v,M=!0),Math.abs(ee)<p&&(b=0,M=!0),f.forEach(K=>{const D=K.getBoundingClientRect(),ve=D.left+D.width/2,j=D.top+D.height/2;Math.abs(N-j)<p&&(b=j-_/2,M=!0),Math.abs(ee-D.top)<p&&(b=D.top,M=!0),Math.abs(R-D.bottom)<p&&(b=D.bottom-_,M=!0),Math.abs(ee-D.bottom)<p&&(b=D.bottom,M=!0),Math.abs(R-D.top)<p&&(b=D.top-_,M=!0),Math.abs(Q-ve)<p&&(T=ve-v/2,M=!0),Math.abs(Y-D.left)<p&&(T=D.left,M=!0),Math.abs(te-D.right)<p&&(T=D.right-v,M=!0),Math.abs(Y-D.right)<p&&(T=D.right,M=!0),Math.abs(te-D.left)<p&&(T=D.left-v,M=!0)}),{left:T,top:b,snapped:M}}let ae=null;document.addEventListener("mouseover",n=>{!t||s||o||n.target===h||h.contains(n.target)||n.target===m||m.contains(n.target)||n.target!==e&&(ae&&ae!==e&&ae.classList.remove("editor-hover"),ae=n.target,ae.classList.add("editor-hover"))}),document.addEventListener("mouseout",n=>{!t||s||n.target!==e&&ae&&(ae.classList.remove("editor-hover"),ae=null)}),document.addEventListener("mousemove",n=>{if(!t){E.style.display="none",X.style.display="none";return}o&&l&&(l.style.display="block",l.style.left=n.clientX+12+"px",l.style.top=n.clientY+12+"px"),s||(E.style.display="block",X.style.display="block",E.style.top=n.clientY+"px",X.style.left=n.clientX+"px")}),document.addEventListener("mousedown",n=>{if(!t||n.target===h||h.contains(n.target)||n.target===m||m.contains(n.target)||o)return;n.preventDefault(),n.stopPropagation();const c=n.target;oe(c),ae&&(ae.classList.remove("editor-hover"),ae=null),E.style.display="none",X.style.display="none";const g=c.getBoundingClientRect();n.clientX-g.left,n.clientY-g.top;const u=n.clientX,v=n.clientY;let _=!1,f=null;(!c.style.position||c.style.position==="static")&&(c.style.position="relative");const T=parseFloat(c.style.left)||0,b=parseFloat(c.style.top)||0,M=c.style.width;c.style.margin,c.style.zIndex;const Y=c.parentElement;Se(c);const ee=R=>{if(_||(Math.abs(R.clientX-u)>3||Math.abs(R.clientY-v)>3)&&(_=!0,s=!0,c.classList.add("editor-dragging"),c.style.zIndex="99999",m.style.display="none"),_){const Q=R.clientX-u,N=R.clientY-v;c.style.left=T+Q+"px",c.style.top=b+N+"px",De(c.getBoundingClientRect()),c.style.visibility="hidden";const F=document.elementFromPoint(R.clientX,R.clientY);c.style.visibility="";let k=F;for(;k&&k!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(k.tagName)&&k.offsetWidth>80&&k.offsetHeight>30&&k!==c);)k=k.parentElement;f&&f!==k&&f.classList.remove("frame-drop-highlight"),k&&k!==document.body&&k!==c?(k.classList.add("frame-drop-highlight"),f=k):(f&&f.classList.remove("frame-drop-highlight"),f=null)}},te=R=>{if(document.removeEventListener("mousemove",ee),document.removeEventListener("mouseup",te),_){s=!1,c.classList.remove("editor-dragging"),J(),f&&f.classList.remove("frame-drop-highlight"),c.style.visibility="hidden";const Q=document.elementFromPoint(R.clientX,R.clientY);c.style.visibility="";let N=Q;for(;N&&N!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(N.tagName)&&N.offsetWidth>80&&N.offsetHeight>30&&N!==c);)N=N.parentElement;let F=N;if((!F||F===document.body)&&(F=Y),F&&F!==Y){const k=c.getBoundingClientRect(),K=F.getBoundingClientRect();F.style.position=F.style.position||"relative",c.style.position="absolute",c.style.left=k.left-K.left+"px",c.style.top=k.top-K.top+"px",c.style.width=M,c.style.margin="0",c.style.zIndex="99999",F.appendChild(c)}else c.style.zIndex="99999";U(c),q(c),$("changeStyle",c,"left",c.style.left),$("changeStyle",c,"top",c.style.top)}else i.pop()};document.addEventListener("mousemove",ee),document.addEventListener("mouseup",te)},!0),document.addEventListener("click",n=>{if(t&&((n.target.closest("a")||n.target.closest("button")||n.target.tagName==="A"||n.target.tagName==="BUTTON")&&(n.preventDefault(),n.stopPropagation()),!!o&&!(n.target===h||h.contains(n.target)||n.target===m||m.contains(n.target))&&(n.preventDefault(),n.stopPropagation(),o))){d++;const c=window.scrollX,g=window.scrollY,u=document.createElement("div");u.textContent=r.text||"Nuevo texto",u.style.cssText=`position:absolute;left:${n.clientX+c}px;top:${n.clientY+g}px;z-index:${d};font-family:${r.fontFamily||"Bolivar, sans-serif"};font-size:${r.fontSize||"16px"};font-weight:${r.fontWeight||"400"};color:${r.color||"#333"};padding:4px 8px;cursor:move;background:${r.backgroundColor||"transparent"};border-radius:4px;`,document.body.appendChild(u),o=!1,document.body.style.cursor="",l&&(l.style.display="none"),oe(u),u.setAttribute("contenteditable","true"),u.focus(),u.addEventListener("blur",()=>{u.removeAttribute("contenteditable")},{once:!0}),$("info",null,"","📝 Texto insertado.")}},!0),document.addEventListener("dblclick",n=>{if(t||(t=!0,window.parent.postMessage({type:"ADMIN_INFO",message:"🎯 Modo edición activado automáticamente."},"*"),window.parent.postMessage({type:"EDIT_MODE_CHANGED",active:!0},"*")),n.target===h||h.contains(n.target)||n.target===m||m.contains(n.target))return;n.preventDefault(),n.stopPropagation();const c=n.target;oe(c);const g=window.getComputedStyle(c),u=c.tagName==="IMG"||c.tagName==="SVG",v=["INPUT","SELECT","TEXTAREA"].includes(c.tagName),_=c.tagName==="BUTTON"||c.tagName==="A"||(c.className||"").includes("btn");window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:c.tagName.toLowerCase(),selector:L(c),textContent:(c.textContent||"").substring(0,200),className:c.className||"",id:c.id||"",src:c.src||"",isImage:u,isFormField:v,isText:!u&&!v&&!_,placeholder:c.placeholder||"",label:"",options:c.tagName==="SELECT"?Array.from(c.options).map(f=>f.textContent):[],styles:{color:g.color,backgroundColor:g.backgroundColor,fontSize:g.fontSize,fontWeight:g.fontWeight,fontFamily:g.fontFamily,width:c.style.width||g.width,height:c.style.height||g.height}},"*")},!0),h.addEventListener("click",n=>{const c=n.target.closest("button");if(!c||!e)return;const g=c.dataset.action;if(g==="edit"){const u=e.textContent;e.setAttribute("contenteditable","true"),e.focus(),e.addEventListener("blur",()=>{e.removeAttribute("contenteditable"),e.textContent!==u&&(ce(e,"textContent",u),$("changeText",e,"textContent",e.textContent))},{once:!0})}if(g==="move"){e.classList.add("editor-dragging"),s=!0;const u=e.getBoundingClientRect(),v=e.parentElement,_=u.width/2,f=u.height/2;let T=null;Se(e),e.style.position;const b=e.style.left,M=e.style.top,Y=e.style.width,ee=e.style.margin,te=e.style.zIndex;e.style.position="fixed",e.style.zIndex="999999",e.style.width=u.width+"px",e.style.left=u.left+"px",e.style.top=u.top+"px",e.style.margin="0";const R=N=>{const F=N.clientX-_,k=N.clientY-f;e.style.left=F+"px",e.style.top=k+"px";const K=e.getBoundingClientRect(),D=it(e,K.left,K.top);D.snapped&&(e.style.left=F+D.left-K.left+"px",e.style.top=k+D.top-K.top+"px"),De(e.getBoundingClientRect()),e.style.visibility="hidden";const ve=document.elementFromPoint(N.clientX,N.clientY);e.style.visibility="";let j=ve;for(;j&&j!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(j.tagName)&&j.offsetWidth>80&&j.offsetHeight>30&&j!==e);)j=j.parentElement;T&&T!==j&&T.classList.remove("frame-drop-highlight"),j&&j!==document.body&&j!==e&&j!==v?(j.classList.add("frame-drop-highlight"),T=j):T=null,q(e)},Q=N=>{s=!1,e.classList.remove("editor-dragging"),J(),document.removeEventListener("mousemove",R),document.removeEventListener("mouseup",Q),T&&T.classList.remove("frame-drop-highlight"),e.style.visibility="hidden";const F=document.elementFromPoint(N.clientX,N.clientY);e.style.visibility="";let k=F;for(;k&&k!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(k.tagName)&&k.offsetWidth>80&&k.offsetHeight>30&&k!==e);)k=k.parentElement;const K=e.getBoundingClientRect();if(k&&k!==document.body&&k!==v){const D=k.getBoundingClientRect();k.style.position=k.style.position||"relative",e.style.position="absolute",e.style.left=K.left-D.left+"px",e.style.top=K.top-D.top+"px",e.style.width=Y,e.style.margin="0",e.style.zIndex="99999",k.appendChild(e)}else{const D=K.left-u.left,ve=K.top-u.top;e.style.position="relative",e.style.width=Y,e.style.margin=ee,e.style.zIndex=te||"",e.style.left=(parseFloat(b)||0)+D+"px",e.style.top=(parseFloat(M)||0)+ve+"px"}q(e),U(e),$("changeStyle",e,"left",e.style.left),$("changeStyle",e,"top",e.style.top),$("info",null,"","↕️ Elemento reubicado.")};document.addEventListener("mousemove",R),document.addEventListener("mouseup",Q)}if(g==="copy"&&(localStorage.setItem("sb_clipboard",e.outerHTML),$("info",null,"","📋 Elemento copiado. Usa Ctrl+V para pegar.")),g==="duplicate"){const u=e.cloneNode(!0);u.classList.remove("editor-highlight"),u.style.position="relative",u.style.top="10px",e.parentNode.insertBefore(u,e.nextSibling),ce(e,"duplicate",""),$("info",null,"","⧉ Elemento duplicado.")}if(g==="delete"){const u=e.style.display;ce(e,"display",u),e.style.display="none",$("changeStyle",e,"display","none"),me()}g==="settings"&&window.parent.postMessage({type:"ELEMENT_SELECTED",tagName:e.tagName.toLowerCase(),selector:L(e),textContent:e.textContent,className:e.className,id:e.id},"*")});let Oe=!1,re="",ie={};m.addEventListener("mousedown",n=>{const c=n.target.closest(".resize-handle");!c||!e||(n.preventDefault(),n.stopPropagation(),Oe=!0,re=c.dataset.dir,e.getBoundingClientRect(),ie={x:n.clientX,y:n.clientY,w:e.offsetWidth,h:e.offsetHeight,left:parseFloat(e.style.left)||0,top:parseFloat(e.style.top)||0})}),document.addEventListener("mousemove",n=>{if(!Oe||!e)return;const c=n.clientX-ie.x,g=n.clientY-ie.y;if(re.includes("e")&&!re.includes("w")&&(e.style.width=Math.max(20,ie.w+c)+"px"),re.includes("w")&&!re.includes("e")){const u=Math.max(20,ie.w-c);e.style.width=u+"px",e.style.position=e.style.position||"relative",e.style.left=ie.left+(ie.w-u)+"px"}if(re.includes("s")&&!re.includes("n")&&(e.style.height=Math.max(20,ie.h+g)+"px"),re.includes("n")&&!re.includes("s")){const u=Math.max(20,ie.h-g);e.style.height=u+"px",e.style.position=e.style.position||"relative",e.style.top=ie.top+(ie.h-u)+"px"}q(e)}),document.addEventListener("mouseup",()=>{Oe&&e&&(Oe=!1,$("changeStyle",e,"width",e.style.width),e.style.height&&$("changeStyle",e,"height",e.style.height),e.style.left&&$("changeStyle",e,"left",e.style.left),e.style.top&&$("changeStyle",e,"top",e.style.top))}),document.addEventListener("keydown",n=>{if(t){if(n.key==="Escape"&&me(),n.key==="Delete"&&e&&!e.hasAttribute("contenteditable")&&(e.style.display="none",$("changeStyle",e,"display","none"),me()),e&&!e.hasAttribute("contenteditable")&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(n.key)){n.preventDefault(),e.style.position="relative";const c=n.shiftKey?10:1;n.key==="ArrowUp"&&(e.style.top=(parseFloat(e.style.top)||0)-c+"px"),n.key==="ArrowDown"&&(e.style.top=(parseFloat(e.style.top)||0)+c+"px"),n.key==="ArrowLeft"&&(e.style.left=(parseFloat(e.style.left)||0)-c+"px"),n.key==="ArrowRight"&&(e.style.left=(parseFloat(e.style.left)||0)+c+"px");const g=e.getBoundingClientRect(),u=it(e,g.left,g.top);if(u.snapped){const v=u.left-g.left,_=u.top-g.top;Math.abs(v)<p*2&&(e.style.left=(parseFloat(e.style.left)||0)+v+"px"),Math.abs(_)<p*2&&(e.style.top=(parseFloat(e.style.top)||0)+_+"px")}q(e),De(e.getBoundingClientRect()),clearTimeout(window._guideTimer),window._guideTimer=setTimeout(J,800)}if(n.ctrlKey&&n.key==="z"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(n.preventDefault(),ot()),n.ctrlKey&&n.key==="y"&&!(e!=null&&e.hasAttribute("contenteditable"))&&(n.preventDefault(),rt()),n.ctrlKey&&n.key==="d"&&e){n.preventDefault();const c=e.cloneNode(!0);c.classList.remove("editor-highlight"),c.style.position="relative",c.style.top="10px",e.parentNode.insertBefore(c,e.nextSibling),$("info",null,"","⧉ Duplicado (Ctrl+D).")}}});function ot(){if(i.length===0)return;const n=i.pop(),c=document.querySelector(n.selector);if(!c){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo deshacer (elemento no encontrado)."},"*");return}const g=n.property==="textContent"?c.textContent:c.style[n.property];a.push({...n,newValue:g}),n.property==="textContent"?c.textContent=n.oldValue:n.property==="__fullStyle"?c.style.cssText=n.oldValue:c.style[n.property]=n.oldValue,e&&q(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↩️ Deshecho."},"*")}function rt(){if(a.length===0)return;const n=a.pop(),c=document.querySelector(n.selector);if(!c){window.parent.postMessage({type:"ADMIN_INFO",message:"⚠️ No se pudo rehacer (elemento no encontrado)."},"*");return}i.push({...n}),n.property==="textContent"?c.textContent=n.newValue:n.property==="__fullStyle"?c.style.cssText=n.newValue:c.style[n.property]=n.newValue,e&&q(e),window.parent.postMessage({type:"ADMIN_INFO",message:"↪️ Rehecho."},"*")}window.addEventListener("message",n=>{if(n.data){if(n.data.type==="ENABLE_EDIT_MODE"&&(t=!0),n.data.type==="DISABLE_EDIT_MODE"&&(t=!1,me()),n.data.type==="UNDO_ACTION"&&ot(),n.data.type==="REDO_ACTION"&&rt(),n.data.type==="DROP_ELEMENT_AT"){t=!0;const{html:c,x:g,y:u}=n.data,v=document.createElement("div");v.innerHTML=c;const _=v.firstElementChild;if(!_)return;_.style.position="absolute",_.style.left=g+"px",_.style.top=u+"px",_.style.zIndex="99999",_.style.cursor="move",_.classList.add("admin-inserted");let f=document.elementFromPoint(g,u);for(;f&&f!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(f.tagName)&&f.offsetWidth>80&&f.offsetHeight>30);)f=f.parentElement;if(f&&f!==document.body){const T=f.getBoundingClientRect();f.style.position=f.style.position||"relative",_.style.left=g-T.left+"px",_.style.top=u-T.top+"px",f.appendChild(_)}else document.body.appendChild(_);oe(_),i.push({selector:L(_),property:"display",oldValue:"none",newValue:""}),a=[],$("info",null,"","✅ Elemento insertado en el frame.")}if(n.data.type==="PASTE_CLIPBOARD"){const c=localStorage.getItem("sb_clipboard");if(!c)return;const g=document.createElement("div");g.innerHTML=c;const u=g.firstElementChild;if(!u)return;u.classList.remove("editor-highlight"),u.style.position="relative",u.style.top="10px",u.style.left="10px",u.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(u,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(u),oe(u),i.push({selector:L(u),property:"display",oldValue:"none",newValue:""}),a=[],$("info",null,"","📌 Elemento pegado.")}n.data.type==="ENTER_TEXT_MODE"&&(t=!0,o=!0,r={text:n.data.text||"Nuevo texto",fontFamily:n.data.fontFamily||"Bolivar, sans-serif",fontSize:n.data.fontSize||"16px",fontWeight:n.data.fontWeight||"400",color:n.data.color||"#333333",backgroundColor:n.data.backgroundColor||"transparent"},document.body.style.cursor="text",l||(l=document.createElement("div"),l.style.cssText="position:fixed;pointer-events:none;z-index:99999;background:rgba(10,103,65,0.1);border:1px dashed #0a6741;border-radius:4px;padding:4px 10px;display:none;",document.body.appendChild(l)),l.textContent=r.text,l.style.fontFamily=r.fontFamily,l.style.fontSize=r.fontSize,l.style.fontWeight=r.fontWeight,l.style.color="#0a6741",window.parent.postMessage({type:"ADMIN_INFO",message:"📝 Haz clic donde quieras colocar el texto."},"*"))}}),document.addEventListener("keydown",n=>{if(n.ctrlKey&&n.key==="v"&&t){n.preventDefault();const c=localStorage.getItem("sb_clipboard");if(!c)return;const g=document.createElement("div");g.innerHTML=c;const u=g.firstElementChild;if(!u)return;u.classList.remove("editor-highlight"),u.style.position="relative",u.style.top="10px",u.style.left="10px",u.style.zIndex="99999",e&&e.parentElement?e.parentElement.insertBefore(u,e.nextSibling):(document.getElementById("app-content")||document.body).appendChild(u),oe(u),i.push({selector:L(u),property:"display",oldValue:"none",newValue:""}),a=[],$("info",null,"","📌 Pegado (Ctrl+V).")}n.ctrlKey&&n.key==="c"&&t&&e&&(n.preventDefault(),localStorage.setItem("sb_clipboard",e.outerHTML),$("info",null,"","📋 Copiado (Ctrl+C)."))})}function Bt(t){t.innerHTML=`
    <!-- HEADER -->
    <header class="plan-header">
      <div class="plan-header__logo-wrap">
        <img src="/APP_NEGOCIOS_DIGITALES/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
      </div>
    </header>

    <!-- HERO PLAN -->
    <section class="plan-hero">
      <!-- Decorations right -->
      <div class="plan-hero__decor-right">
        <img src="/APP_NEGOCIOS_DIGITALES/images/group-4391.png" alt="" class="plan-hero__decor-img">
      </div>
      <!-- Decorations left -->
      <div class="plan-hero__decor-left">
        <img src="/APP_NEGOCIOS_DIGITALES/images/group-4392.png" alt="" class="plan-hero__decor-img">
      </div>
      <!-- Top ellipse with label -->
      <div class="plan-hero__top-ellipse"></div>
      <div class="plan-hero__top-content">
        <p class="plan-hero__label">Seguro de Hogar</p>
        <div class="plan-hero__tag">
          <span class="plan-hero__tag-icon">✨</span>
          <span class="plan-hero__tag-text">Basado en tu conversación en ChatGPT</span>
        </div>
      </div>
      <!-- Content -->
      <div class="plan-hero__content">
        <div class="plan-hero__price-row">
          <h1 class="plan-hero__price" id="home-price">$${sessionStorage.getItem("plan_price")||"41.500"}</h1>
        </div>
        <div class="plan-hero__suggested">
          <span class="plan-hero__suggested-text">Plan Sugerido</span>
        </div>
      </div>
    </section>

    <!-- PLAN DETAILS -->
    <section class="plan-details">
      <h2 class="plan-details__title">¿Qué incluye su plan?</h2>

      <div class="plan-card">
        <div class="plan-card__grid">
          <!-- Row 1 -->
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños por incendio o agua al interior del inmueble</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños causados por lluvias, vientos fuertes, granizadas e inundaciones</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>

          <!-- Row 2 -->
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños en electrodomésticos por fallas eléctricas o de instalación</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Robo al interior de su hogar con violencia o forzamiento</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>

          <!-- Row 3 -->
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños y pérdidas por disturbios sociales como protestas o huelgas</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños a su hogar por impacto de vehículos o caída de árboles</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>

          <!-- Row 4 -->
          <div class="plan-card__item">
            <span class="plan-card__check">✓</span>
            <div class="plan-card__info">
              <p class="plan-card__desc">Daños por terremoto, maremoto o erupción volcánica</p>
              <p class="plan-card__amount">Hasta por <strong>$1.000.000</strong></p>
            </div>
            <span class="plan-card__arrow">→</span>
          </div>
        </div>

        <!-- Consultar coberturas -->
        <a href="/?step=1" class="plan-card__footer">
          <span class="plan-card__footer-text">Conoce y personaliza las coberturas de tu plan</span>
          <span class="plan-card__footer-arrow">›</span>
        </a>
      </div>
    </section>

    <!-- TERMS -->
    <section class="plan-terms">
      <label class="plan-terms__item">
        <input type="checkbox" class="plan-terms__checkbox" checked>
        <span class="plan-terms__text">Acepto la <a href="#">Política de Privacidad</a>, los <a href="#">Términos y Condiciones del Seguro Hogar y la Cobertura Seguridad Digital</a>, el <a href="#">Tratamiento de mis datos personales</a> y los <a href="#">Términos y Condiciones del canal digital</a></span>
      </label>
      <label class="plan-terms__item">
        <input type="checkbox" class="plan-terms__checkbox" checked>
        <span class="plan-terms__text">Autorizo el envío de la <a href="#">Información y ofertas comerciales.</a></span>
      </label>
    </section>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <a href="/?step=2" class="plan-footer__btn" style="text-decoration:none;">Continuar</a>
    </footer>

    <!-- COVERAGE DETAIL DRAWER -->
    <div class="cov-drawer-overlay" id="cov-drawer-overlay">
      <div class="cov-drawer" id="cov-drawer">
        <div class="cov-drawer__header">
          <h2 class="cov-drawer__title" id="cov-drawer-title"></h2>
          <button class="cov-drawer__close" id="cov-drawer-close">✕</button>
        </div>
        <span class="cov-drawer__badge" id="cov-drawer-badge"></span>
        <div class="cov-drawer__body" id="cov-drawer-body"></div>
      </div>
    </div>
  `;const e={incendio:{title:"¿Qué cubrimos por incendio o agua al interior?",badge:"Cobertura inmediata",text:"Cubrimos los daños causados por incendio, explosión o agua al interior de su inmueble, incluyendo daños a la estructura, acabados y contenido. <strong>Hasta por $1.000.000</strong> (por vigencia).",alert:"No aplica para daños causados por humedad o filtraciones previas a la contratación.",subtitle:"¿Qué incluye?",detail:"Incluye reparación de paredes, pisos, techos y pintura afectados. <strong>También cubre el reemplazo de electrodomésticos y muebles dañados directamente por el siniestro.</strong> La cobertura se activa desde el primer día de vigencia de su póliza."},lluvias:{title:"¿Qué cubrimos por lluvias y vientos fuertes?",badge:"Cobertura inmediata",text:"Protegemos su hogar contra daños causados por lluvias torrenciales, vientos fuertes, granizadas e inundaciones naturales. <strong>Hasta por $1.000.000</strong> (por vigencia).",alert:"No aplica si el inmueble se encuentra en zona de riesgo declarada previamente.",subtitle:"¿Cuándo aplica?",detail:"Aplica cuando fenómenos naturales como tormentas, vendavales o granizadas causen daños directos a la estructura o contenido de su vivienda. <strong>Incluye reparación de techos, ventanas y puertas afectadas.</strong>"},electrodomesticos:{title:"¿Qué cubrimos por fallas eléctricas?",badge:"Con periodo de carencia",text:"Cubrimos los daños en sus electrodomésticos causados por sobretensión, cortocircuito o fallas en la red eléctrica. <strong>Hasta por $1.000.000</strong> (por vigencia).",alert:"No aplica para equipos con más de 10 años de antigüedad o sin mantenimiento preventivo.",subtitle:"¿Qué es periodo de carencia?",detail:"Es un tiempo antes de poder usar este beneficio. <strong>Lo incluimos para asegurar que el seguro responda a accidentes genuinos e inesperados, lo que nos permite ofrecer un precio justo a todos los asegurados.</strong> Tu cobertura se activará automáticamente tras 30 días."},robo:{title:"¿Qué cubrimos por robo con violencia?",badge:"Cobertura inmediata",text:"Cubrimos la pérdida de bienes al interior de su hogar cuando el robo se realice con violencia o forzamiento de cerraduras, puertas o ventanas. <strong>Hasta por $1.000.000</strong> (por vigencia).",alert:"Requiere denuncia ante autoridad competente dentro de las 48 horas siguientes al evento.",subtitle:"¿Qué necesita para reclamar?",detail:"Debe presentar la denuncia policial, inventario de bienes sustraídos y evidencia fotográfica del forzamiento. <strong>Nuestro equipo de ajustadores le acompañará en todo el proceso para que su reclamación sea rápida y efectiva.</strong>"},disturbios:{title:"¿Qué cubrimos por disturbios sociales?",badge:"Cobertura inmediata",text:"Protegemos su hogar contra daños y pérdidas ocasionados por protestas, huelgas, asonadas o actos vandálicos. <strong>Hasta por $1.000.000</strong> (por vigencia).",alert:"No aplica si el asegurado participa activamente en los disturbios.",subtitle:"¿Qué tipo de daños cubre?",detail:"Cubre daños a fachadas, ventanas, puertas y contenido del inmueble causados por actos de vandalismo durante manifestaciones. <strong>También incluye gastos de limpieza y restauración de grafitis o pintura.</strong>"},vehiculos:{title:"¿Qué cubrimos por impacto de vehículos?",badge:"Cobertura inmediata",text:"Cubrimos los daños a su hogar causados por el impacto de vehículos terrestres o la caída de árboles sobre la estructura. <strong>Hasta por $1.000.000</strong> (por vigencia).",alert:"No aplica para daños causados por vehículos del mismo asegurado.",subtitle:"¿Qué incluye la reparación?",detail:"Incluye reparación estructural de muros, cercas, fachadas y techos afectados. <strong>También cubre el retiro de escombros y la restauración del área afectada a su estado original.</strong>"},terremoto:{title:"¿Qué cubrimos por terremoto?",badge:"Con periodo de carencia",text:"Protegemos su hogar contra daños causados por terremoto, maremoto, erupción volcánica o movimientos telúricos. <strong>Hasta por $1.000.000</strong> (por vigencia).",alert:"Periodo de carencia de 30 días desde la activación de la póliza.",subtitle:"¿Qué es periodo de carencia?",detail:"Es un tiempo antes de poder usar este beneficio. <strong>Lo incluimos para asegurar que el seguro responda a eventos genuinos e inesperados, lo que nos permite ofrecer un precio justo a todos los propietarios.</strong> Tu cobertura se activará automáticamente tras 30 días."}};setTimeout(()=>{var a,o;const s=t.querySelectorAll(".plan-card__arrow"),i=Object.keys(e);s.forEach((r,l)=>{r.style.cursor="pointer",r.addEventListener("click",d=>{d.stopPropagation();const p=i[l],h=e[p];h&&(document.getElementById("cov-drawer-title").textContent=h.title,document.getElementById("cov-drawer-badge").textContent=h.badge,document.getElementById("cov-drawer-body").innerHTML=`
          <div class="cov-drawer__section">
            <p class="cov-drawer__text">${h.text}</p>
            <div class="cov-drawer__alert">
              <div class="cov-drawer__alert-line"></div>
              <div class="cov-drawer__alert-content">
                <span class="cov-drawer__alert-icon">ⓘ</span>
                <span class="cov-drawer__alert-text">${h.alert}</span>
              </div>
            </div>
          </div>
          <div class="cov-drawer__section">
            <h3 class="cov-drawer__subtitle">${h.subtitle}</h3>
            <p class="cov-drawer__text">${h.detail}</p>
          </div>
        `,document.getElementById("cov-drawer-overlay").classList.add("active"))})}),(a=document.getElementById("cov-drawer-close"))==null||a.addEventListener("click",()=>{document.getElementById("cov-drawer-overlay").classList.remove("active")}),(o=document.getElementById("cov-drawer-overlay"))==null||o.addEventListener("click",r=>{r.target===r.currentTarget&&r.currentTarget.classList.remove("active")})},100)}function Pt(t){var l;const s=[{icon:"/APP_NEGOCIOS_DIGITALES/images/plomeria.png",title:"Plomería",price:2800,items:[{text:"Llaves sanitarias y accesorios",desc:"Nos encargaremos de realizar el arreglo o cambio del kit de descarga del tanque sanitario de su casa y accesorios como empaques, émbolos, pomas, entre otros.",amount:"$1.000.000"},{text:"Griferías sanitarias y accesorios de sobreponer",desc:"Si la llave o mezclador de su lavamanos, lavaplatos o lavadero presenta algún daño, usted podrá solicitar el servicio de plomería para repararlo.",amount:"$1.000.000"},{text:"Conexiones de agua y redes sanitarias",desc:"Realizaremos el arreglo o cambio en conexiones de agua entre las redes y los aparatos sanitarios como acoples, sifones, mangueras, adaptadores o accesorios de las tuberías.",amount:"$1.000.000"},{text:"Redes de agua potable, aguas negras o residuales",desc:"Con este servicio identificaremos dónde se presenta el taponamiento en lavamanos, lavaplatos, lavadero, ducha, baño, cocina o sanitario y de ser necesario desmontaremos el sifón y rejilla.",amount:"$1.000.000"},{text:"Juntas de baldosas",desc:"Reparamos las juntas de acabados en sus pisos, paredes del baño, mesones o muebles y los aparatos sanitarios como lavaplatos, lavamanos y sanitarios.",amount:"$1.000.000"}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/electricidad.png",title:"Electricidad",price:2500,items:[{text:"Tomas eléctricas y salidas de iluminación",desc:"Reemplazamos enchufes o conexiones eléctricas que presenten fallas para restablecer el servicio en su casa.",amount:"$1.000.000"},{text:"Tacos o breakers",desc:"Reactivamos la salida de corriente eléctrica, identificando el taco que presenta intermitencias y sustituyéndolo por un nuevo breaker.",amount:"$1.000.000"},{text:"Cableado de conducción eléctrica",desc:"Reparamos el cableado afectado por corto eléctrico.",amount:"$1.000.000"},{text:"Conexiones de timbres",desc:"Cambiamos el cableado, la caja plástica o el interruptor del timbre de su casa.",amount:"$1.000.000"}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/gas.png",title:"Gas domiciliario",price:1800,items:[{text:"Fuga de gas",desc:"Reparamos las tuberías que presenten fuga de gas por rotura.",amount:"$1.000.000"},{text:"Conexiones de electrodomésticos que utilicen gas",desc:"Arreglamos las conexiones de tuberías de suministro de gas en estufas, calentadores, hornos, secadoras, chimeneas, entre otros.",amount:"$1.000.000"}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/cerrajeria.png",title:"Cerrajería",price:2200,items:[{text:"Cerraduras de puertas exteriores",desc:"Instalación de repuesto en cerraduras que presenten funcionamiento defectuoso.",amount:"$1.000.000"},{text:"Pérdida de llaves y apertura de puertas exteriores",desc:"Nuestros especialistas abrirán la puerta exterior de su vivienda en caso de que no encuentre las llaves o la haya cerrado accidentalmente.",amount:"$1.000.000"},{text:"Apertura de puertas interiores",desc:"Contamos con servicio especializado en apertura de puertas al interior del inmueble.",amount:"$1.000.000"},{text:"Apertura de muebles",desc:"Abrimos por usted los muebles de carpintería interna, tales como alacenas, armarios, entre otros.",amount:"$1.000.000"}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/vidrios.png",title:"Vidrios",price:1900,items:[{text:"Vidrios: ventanas o puertas",desc:"Reponemos los vidrios rotos que formen parte del cerramiento de su vivienda.",amount:"$1.000.000"},{text:"Vidrios de cubierta",desc:"Cambio de vidrios de cubierta rotos como claraboyas, tragaluz o marquesinas que sean parte del cerramiento del inmueble.",amount:"$1.000.000"},{text:"Espejos fijos",desc:"Contamos con servicio especializado en reposición de espejos fijos al interior del inmueble.",amount:"$1.000.000"}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/juridica.png",title:"Orientación jurídica y telefónica",price:1200,items:[{text:"",desc:"Brindamos asesorías en materia familiar, civil, laboral y tributaria en eventos que sucedan en su día a día.",amount:""}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/hospedaje.png",title:"Gastos de hospedaje",price:3500,items:[{text:"",desc:"Si el inmueble asegurado no puede ser habitado por algún siniestro amparado por la póliza, nos encargaremos de prestar el servicio de alojamiento en un hotel. Hasta por (5) noches seguidas con una cuantía por noche de $666.660 y un límite máximo de $3.333.333",amount:""}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/mudanza.png",title:"Gastos de mudanza",price:2800,items:[{text:"",desc:"Si el inmueble asegurado no puede ser habitado por algún siniestro amparado por la póliza, nos encargaremos de brindarle el servicio de mudanza para el traslado de sus pertenencias.",amount:"$1.000.000"}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/vigilancia.png",title:"Servicio de vigilancia",price:2100,items:[{text:"",desc:"Si el cerramiento de su inmueble se ve afectado por algún daño, nos encargaremos de prestarle el servicio de vigilancia para el cuidado y protección de los bienes del asegurado.",amount:"$1.000.000"}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/mascotas.png",title:"Guardería para mascotas",price:1500,items:[{text:"Guardería para mascotas por siniestro",desc:"Si el inmueble asegurado no puede ser habitado por algún siniestro amparado por la póliza, nos encargaremos del cuidado de su mascota.",amount:"$1.000.000"},{text:"Guardería para mascotas por hospitalización del propietario",desc:"Si usted se encuentra hospitalizado, tranquilo, nos encargaremos del cuidado de su mascota durante dicho periodo.",amount:"$1.000.000"}]},{icon:"/APP_NEGOCIOS_DIGITALES/images/muebles.png",title:"Muebles",price:1700,items:[{text:"Ajuste de muebles de carpintería",desc:"Realizaremos el arreglo de los accesorios de sus muebles en madera que se encuentren desprendidos como manijas, rieles, botones y más.",amount:"$1.000.000"},{text:"Ajuste o cambio de bisagras",desc:"Instalamos, desmontamos o ajustamos las bisagras en los muebles de carpintería al interior de su inmueble.",amount:"$1.000.000"}]}],a=17500+s.reduce((d,p)=>d+p.price,0);t.innerHTML=`
    <header class="plan-header">
      <a href="/" class="cob-back">‹ Volver</a>
      <img src="/APP_NEGOCIOS_DIGITALES/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <section class="cob-page">
      <div class="cob-container">
        <div class="cob-title-row">
          <img src="/APP_NEGOCIOS_DIGITALES/images/icon-cobertura.png" alt="" class="cob-title-icon">
          <h1 class="cob-title">Detalle de la cobertura</h1>
        </div>

        <!-- Price summary -->
        <div class="cob-price-bar">
          <div class="cob-price-bar__label">Plan sugerido</div>
          <div class="cob-price-bar__value" id="cob-total-price">$${a.toLocaleString("es-CO")}</div>
          <div class="cob-price-bar__base">Base: $${17500 .toLocaleString("es-CO")} + coberturas adicionales</div>
        </div>

        <div class="cob-card">
          <div class="cob-card__header">
            <p class="cob-card__subtitle">Todo lo que debe conocer del</p>
            <h2 class="cob-card__plan-name">Plan sugerido</h2>
          </div>

          ${s.map((d,p)=>`
            <div class="cob-category">
              <div class="cob-category__header">
                <img src="${d.icon}" alt="${d.title}" class="cob-category__icon">
                <h3 class="cob-category__title">${d.title}</h3>
                <div class="cob-category__right">
                  <span class="cob-category__price">+$${d.price.toLocaleString("es-CO")}</span>
                  <label class="cob-toggle">
                    <input type="checkbox" class="cob-toggle__input" data-index="${p}" data-price="${d.price}" checked>
                    <span class="cob-toggle__slider"></span>
                  </label>
                </div>
              </div>
              <div class="cob-category__items" data-items="${p}">
                ${d.items.map(h=>`
                  <div class="cob-category__item">
                    <span class="cob-category__check">✓</span>
                    <div class="cob-category__text">
                      ${h.text?`<strong>${h.text}</strong> `:""}${h.desc}${h.amount?` <strong>Hasta por ${h.amount}</strong>`:""}
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}

          <a href="#" class="cob-download">
            <span class="cob-download__icon">⬇</span>
            <span class="cob-download__text">Descargar condiciones del seguro</span>
          </a>
        </div>
      </div>
    </section>

    <footer class="plan-footer">
      <a href="/" class="plan-footer__btn" id="btn-confirmar-cob" style="text-decoration:none;">Confirmar</a>
    </footer>
  `;let o=a;const r=document.getElementById("cob-total-price");(l=document.getElementById("btn-confirmar-cob"))==null||l.addEventListener("click",()=>{sessionStorage.setItem("plan_price",o.toLocaleString("es-CO"))}),t.querySelectorAll(".cob-toggle__input").forEach(d=>{d.addEventListener("change",()=>{const p=parseInt(d.dataset.price),h=d.dataset.index,m=t.querySelector(`[data-items="${h}"]`);d.checked?(o+=p,m.style.opacity="1",m.style.maxHeight="1000px"):(o-=p,m.style.opacity="0.4",m.style.maxHeight="0"),r.textContent="$"+o.toLocaleString("es-CO")})})}function Rt(t){t.innerHTML=`
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/" class="cob-back">‹ Volver</a>
      <img src="/APP_NEGOCIOS_DIGITALES/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <!-- MAIN LAYOUT -->
    <div class="datos-layout">
      <!-- STEPPER SIDEBAR -->
      <aside class="datos-stepper">
        <div class="stepper-vertical">
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--active"><div class="stepper-vertical__bull-inner">1</div></div>
            <span class="stepper-vertical__label stepper-vertical__label--active">Datos del titular</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">2</div></div>
            <span class="stepper-vertical__label">Datos del hogar</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">3</div></div>
            <span class="stepper-vertical__label">Confirmar</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">4</div></div>
            <span class="stepper-vertical__label">Pagar</span>
          </div>
        </div>
      </aside>

      <!-- CONTENT -->
      <section class="datos-content">
        <div class="datos-title-row">
          <img src="/APP_NEGOCIOS_DIGITALES/images/icon-datos-titular.png" alt="" class="datos-title-icon">
          <h1 class="datos-title">Datos del titular</h1>
          <img src="/APP_NEGOCIOS_DIGITALES/images/icon-tooltip.png" alt="info" class="datos-tooltip-icon" title="La persona que pagará el seguro">
        </div>

        <div class="datos-card">
          <div class="datos-form">
            <!-- Row 1: Tipo doc + Número doc -->
            <div class="datos-form__row">
              <div class="datos-form__field">
                <label class="datos-form__label">Tipo de documento</label>
                <div class="datos-form__select-wrap">
                  <select class="datos-form__select">
                    <option value="">Seleccione una opción</option>
                    <option>Cédula de ciudadanía</option>
                    <option>Cédula de extranjería</option>
                    <option>Pasaporte</option>
                  </select>
                  <span class="datos-form__select-arrow">▾</span>
                </div>
              </div>
              <div class="datos-form__field">
                <label class="datos-form__label">Número de documento</label>
                <input type="text" class="datos-form__input" placeholder="Ej: 1111111111">
              </div>
            </div>

            <!-- Row 2: Fecha expedición (full width) -->
            <div class="datos-form__field datos-form__field--full">
              <label class="datos-form__label">Fecha de expedición del documento</label>
              <div class="datos-form__input-wrap">
                <input type="text" class="datos-form__input" placeholder="DD/MM/AAAA">
                <span class="datos-form__input-icon">📅</span>
              </div>
            </div>

            <!-- Row 3: Primer Nombre + Segundo Nombre -->
            <div class="datos-form__row">
              <div class="datos-form__field">
                <label class="datos-form__label">Primer Nombre</label>
                <input type="text" class="datos-form__input" placeholder="Ej: Simón">
              </div>
              <div class="datos-form__field">
                <label class="datos-form__label">Segundo Nombre</label>
                <input type="text" class="datos-form__input" placeholder="Ej: Andres">
              </div>
            </div>

            <!-- Row 4: Primer Apellido + Segundo Apellido -->
            <div class="datos-form__row">
              <div class="datos-form__field">
                <label class="datos-form__label">Primer Apellido</label>
                <input type="text" class="datos-form__input" placeholder="Ej: Bolívar">
              </div>
              <div class="datos-form__field">
                <label class="datos-form__label">Segundo Apellido</label>
                <input type="text" class="datos-form__input" placeholder="Ej: Libertad">
              </div>
            </div>

            <!-- Row 5: Número de celular (full width) -->
            <div class="datos-form__field datos-form__field--full">
              <label class="datos-form__label">Número de celular</label>
              <input type="text" class="datos-form__input" placeholder="Ej: 311 000 0000">
            </div>

            <!-- Alert info -->
            <div class="datos-alert">
              <div class="datos-alert__line"></div>
              <div class="datos-alert__content">
                <div class="datos-alert__header">
                  <img src="/APP_NEGOCIOS_DIGITALES/images/icon-tooltip-azul.png" alt="" class="datos-alert__icon">
                  <strong class="datos-alert__title">Validaremos su identidad para continuar de forma segura.</strong>
                </div>
                <p class="datos-alert__text">Así garantizamos que su información esté protegida en todo momento.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <a href="/?step=3" class="plan-footer__btn" id="btn-footer-titular" style="text-decoration:none;">Continuar</a>
    </footer>
  `,setTimeout(()=>{var e;(e=document.getElementById("btn-footer-titular"))==null||e.addEventListener("click",()=>{var i,a,o,r,l,d,p,h;const s={tipoDoc:((i=t.querySelector(".datos-form__select"))==null?void 0:i.value)||"",numDoc:((a=t.querySelectorAll(".datos-form__input")[0])==null?void 0:a.value)||"",fechaExp:((o=t.querySelectorAll(".datos-form__input")[1])==null?void 0:o.value)||"",primerNombre:((r=t.querySelectorAll(".datos-form__input")[2])==null?void 0:r.value)||"",segundoNombre:((l=t.querySelectorAll(".datos-form__input")[3])==null?void 0:l.value)||"",primerApellido:((d=t.querySelectorAll(".datos-form__input")[4])==null?void 0:d.value)||"",segundoApellido:((p=t.querySelectorAll(".datos-form__input")[5])==null?void 0:p.value)||"",celular:((h=t.querySelectorAll(".datos-form__input")[6])==null?void 0:h.value)||""};sessionStorage.setItem("datos_titular",JSON.stringify(s))})},100)}function qt(t){t.innerHTML=`
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/?step=2" class="cob-back">‹ Volver</a>
      <img src="/APP_NEGOCIOS_DIGITALES/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <!-- MAIN LAYOUT -->
    <div class="datos-layout">
      <!-- STEPPER SIDEBAR -->
      <aside class="datos-stepper">
        <div class="stepper-vertical">
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--completed"><div class="stepper-vertical__bull-inner stepper-vertical__bull-inner--completed">✓</div></div>
            <span class="stepper-vertical__label">Datos del titular</span>
          </div>
          <div class="stepper-vertical__line stepper-vertical__line--completed"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--active"><div class="stepper-vertical__bull-inner">2</div></div>
            <span class="stepper-vertical__label stepper-vertical__label--active">Datos del hogar</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">3</div></div>
            <span class="stepper-vertical__label">Confirmar</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">4</div></div>
            <span class="stepper-vertical__label">Pagar</span>
          </div>
        </div>
      </aside>

      <!-- CONTENT -->
      <section class="datos-content">
        <div class="datos-title-row">
          <img src="/APP_NEGOCIOS_DIGITALES/images/icon-cobertura.png" alt="" class="datos-title-icon">
          <h1 class="datos-title">Datos del hogar</h1>
        </div>

        <div class="datos-card">
          <div class="datos-form">
            <!-- Section header -->
            <div class="datos-form__section-header">
              <strong class="datos-form__section-title">Sobre su hogar y sus pertenencias 🏠</strong>
              <p class="datos-form__section-desc">Queremos conocer su espacio para darle el respaldo correcto.</p>
            </div>

            <!-- Valor comercial del inmueble (full width) -->
            <div class="datos-form__field datos-form__field--full">
              <label class="datos-form__label">Valor comercial del inmueble</label>
              <input type="text" class="datos-form__input" placeholder="Ej: 200.000.000">
            </div>

            <!-- Row: Equipos electrónicos + Muebles y enseres -->
            <div class="datos-form__row">
              <div class="datos-form__field">
                <label class="datos-form__label">Valor total de sus equipos electrónicos</label>
                <input type="text" class="datos-form__input" placeholder="Ej: 200.000.000">
                <span class="datos-form__help"><span class="datos-form__help-icon">ⓘ</span> Aseguramos hasta $40.000.000</span>
              </div>
              <div class="datos-form__field">
                <label class="datos-form__label">Valor total de sus muebles y enseres</label>
                <input type="text" class="datos-form__input" placeholder="Ej: 200.000.000">
                <span class="datos-form__help"><span class="datos-form__help-icon">ⓘ</span> Aseguramos hasta $40.000.000</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <button class="plan-footer__btn" id="btn-continuar-hogar">Continuar</button>
    </footer>

    <!-- MODAL OVERLAY -->
    <div class="otp-overlay" id="otp-overlay" style="display:none;">
      <!-- Modal 1: Código enviado -->
      <div class="otp-modal" id="modal-otp" style="display:none;">
        <h2 class="otp-modal__title">¡Código enviado!</h2>
        <p class="otp-modal__subtitle">Enviamos un código a:</p>
        <div class="otp-modal__phone"><span>📱</span> <strong>******6194</strong></div>
        <div class="otp-modal__field">
          <label class="otp-modal__label">Por favor ingrese el código aquí:</label>
          <div class="otp-modal__input-wrap">
            <input type="text" class="otp-modal__input" placeholder="Ej: 111111">
            <span class="otp-modal__input-icon">⌨</span>
          </div>
          <span class="otp-modal__help">El código estará activo por 80 segundos</span>
        </div>
        <p class="otp-modal__resend">¿No recibió el código? <a href="#" id="btn-resend">Reenviar código</a>.</p>
        <div class="otp-modal__actions">
          <button class="otp-modal__btn-link" id="btn-otro-metodo">Intentar otro método</button>
          <button class="otp-modal__btn-secondary" id="btn-validar-codigo" disabled>Validar código</button>
        </div>
      </div>

      <!-- Modal 2: Otro método -->
      <div class="otp-modal" id="modal-otro-metodo" style="display:none;">
        <h2 class="otp-modal__title" style="text-align:left;">Por su seguridad, validaremos su identidad</h2>
        <p class="otp-modal__subtitle" style="text-align:left;">¿Ha tenido tarjeta de crédito con alguno de estos bancos en los últimos 5 años?</p>
        <div class="otp-modal__radios">
          <label class="otp-modal__radio"><input type="radio" name="banco" value="davivienda"><span>Davivienda</span></label>
          <label class="otp-modal__radio"><input type="radio" name="banco" value="colpatria"><span>Colpatria</span></label>
          <label class="otp-modal__radio"><input type="radio" name="banco" value="bbva"><span>BBVA</span></label>
          <label class="otp-modal__radio"><input type="radio" name="banco" value="ninguna"><span>No reconozco ninguna de las entidades</span></label>
        </div>
        <div class="otp-modal__actions" style="justify-content:center;">
          <button class="otp-modal__btn-secondary" id="btn-continuar-metodo" disabled>Continuar</button>
        </div>
      </div>

      <!-- Modal 3: Loader -->
      <div class="otp-modal otp-modal--loader" id="modal-loader" style="display:none;">
        <img src="/APP_NEGOCIOS_DIGITALES/images/protection.png" alt="" class="otp-modal__icon-protection">
        <h2 class="otp-modal__title">Estamos validando su información...</h2>
        <p class="otp-modal__subtitle">Ya casi está listo</p>
        <div class="otp-modal__spinner"></div>
      </div>
    </div>
  `,setTimeout(()=>{var d,p;const e=document.getElementById("otp-overlay"),s=document.getElementById("modal-otp"),i=document.getElementById("modal-otro-metodo"),a=document.getElementById("modal-loader"),o=document.getElementById("btn-validar-codigo"),r=document.querySelector(".otp-modal__input");r==null||r.addEventListener("input",()=>{const h=r.value.replace(/\D/g,"");r.value=h.substring(0,6),h.length>=6?(o.disabled=!1,o.classList.add("otp-modal__btn-secondary--active")):(o.disabled=!0,o.classList.remove("otp-modal__btn-secondary--active"))}),(d=document.getElementById("btn-continuar-hogar"))==null||d.addEventListener("click",()=>{var x,w,S;const h=document.querySelectorAll(".datos-form__input"),m={valorInmueble:((x=h[0])==null?void 0:x.value)||"",valorElectronicos:((w=h[1])==null?void 0:w.value)||"",valorMuebles:((S=h[2])==null?void 0:S.value)||""};sessionStorage.setItem("datos_hogar",JSON.stringify(m)),e.style.display="flex",s.style.display="flex"}),o==null||o.addEventListener("click",()=>{o.disabled||(s.style.display="none",a.style.display="flex",setTimeout(()=>{window.location.href="/?step=4"},3e3))}),(p=document.getElementById("btn-otro-metodo"))==null||p.addEventListener("click",()=>{s.style.display="none",i.style.display="flex"});const l=document.getElementById("btn-continuar-metodo");document.querySelectorAll('input[name="banco"]').forEach(h=>{h.addEventListener("change",()=>{l.disabled=!1,l.classList.add("otp-modal__btn-secondary--active")})}),l==null||l.addEventListener("click",()=>{l.disabled||(i.style.display="none",a.style.display="flex",setTimeout(()=>{window.location.href="/?step=4"},3e3))})},100)}function Ft(t){const e=JSON.parse(sessionStorage.getItem("datos_titular")||"{}"),s=JSON.parse(sessionStorage.getItem("datos_hogar")||"{}"),i=[e.primerNombre,e.segundoNombre,e.primerApellido,e.segundoApellido].filter(Boolean).join(" ")||"Susana Castaño Valencia",a=e.numDoc||"1023874383",o=e.tipoDoc||"Cédula de ciudadanía";e.celular;const r=s.valorInmueble||"$200.000.000",l=s.valorElectronicos||"$54.000.000",d=s.valorMuebles||"$21.000.000";t.innerHTML=`
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/?step=3" class="cob-back">‹ Volver</a>
      <img src="/APP_NEGOCIOS_DIGITALES/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <!-- MAIN LAYOUT -->
    <div class="datos-layout">
      <!-- STEPPER SIDEBAR -->
      <aside class="datos-stepper">
        <div class="stepper-vertical">
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--completed"><div class="stepper-vertical__bull-inner stepper-vertical__bull-inner--completed">✓</div></div>
            <span class="stepper-vertical__label">Datos del titular</span>
          </div>
          <div class="stepper-vertical__line stepper-vertical__line--completed"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--completed"><div class="stepper-vertical__bull-inner stepper-vertical__bull-inner--completed">✓</div></div>
            <span class="stepper-vertical__label">Datos del hogar</span>
          </div>
          <div class="stepper-vertical__line stepper-vertical__line--completed"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--active"><div class="stepper-vertical__bull-inner">3</div></div>
            <span class="stepper-vertical__label stepper-vertical__label--active">Confirmar</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">4</div></div>
            <span class="stepper-vertical__label">Pagar</span>
          </div>
        </div>
      </aside>

      <!-- CONTENT -->
      <section class="datos-content">
        <div class="datos-title-row">
          <img src="/APP_NEGOCIOS_DIGITALES/images/icon-confirme.png" alt="" class="datos-title-icon">
          <h1 class="datos-title">Confirme su compra</h1>
        </div>

        <div class="confirm-cards">
          <!-- Header: Ya casi terminamos -->
          <div class="confirm-header">
            <img src="/APP_NEGOCIOS_DIGITALES/images/icon-casi-terminamos.png" alt="" class="confirm-header__icon">
            <div class="confirm-header__text">
              <h2 class="confirm-header__title">¡Ya casi terminamos!</h2>
              <p class="confirm-header__desc">Verifique que toda la información esté correcta.</p>
            </div>
          </div>

          <!-- Card: Datos del titular -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/APP_NEGOCIOS_DIGITALES/images/icon-datos-titular2.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Datos del titular</h3>
            </div>
            <div class="confirm-card__grid">
              <div class="confirm-card__item">
                <span class="confirm-card__label">Nombre:</span>
                <strong class="confirm-card__value">${i}</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label">${o}:</span>
                <strong class="confirm-card__value">${a}</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label-italic">Enviaremos la póliza al siguiente correo:</span>
                <span class="confirm-card__email">susana.casta@gmail.com <a href="#">✏️</a></span>
              </div>
            </div>
          </div>

          <!-- Card: Datos del hogar -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/APP_NEGOCIOS_DIGITALES/images/icon-datos-hogar.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Datos del hogar</h3>
            </div>
            <div class="confirm-card__grid confirm-card__grid--4">
              <div class="confirm-card__item">
                <span class="confirm-card__label">Dirección:</span>
                <strong class="confirm-card__value">Cra 55b #183-32</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label">Valor vivienda:</span>
                <strong class="confirm-card__value">${r}</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label">Equipos electrónicos:</span>
                <strong class="confirm-card__value">${l}</strong>
              </div>
              <div class="confirm-card__item">
                <span class="confirm-card__label">Muebles y enseres:</span>
                <strong class="confirm-card__value">${d}</strong>
              </div>
            </div>
          </div>

          <!-- Card: Plan sugerido -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/APP_NEGOCIOS_DIGITALES/images/icon-plan-sugerido.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Plan sugerido</h3>
            </div>
            <div class="confirm-card__checklist">
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños por <strong>incendio o agua</strong> al interior del inmueble</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños causados por <strong>lluvias, vientos fuertes</strong>, granizadas e inundaciones</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños en <strong>electrodomésticos</strong> por <strong>fallas eléctricas</strong> o de instalación</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> <strong>Robo</strong> al interior de su hogar con <strong>violencia</strong> o forzamiento</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños y pérdidas por <strong>disturbios sociales</strong> como protestas o huelgas</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños a su hogar por <strong>impacto de vehículos</strong> o caída de árboles</div>
              <div class="confirm-card__check-item"><span class="confirm-card__check">✓</span> Daños por <strong>terremoto, maremoto</strong> o erupción volcánica</div>
            </div>
          </div>

          <!-- Card: Vigencia de la póliza -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/APP_NEGOCIOS_DIGITALES/images/icon-vigencia.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Vigencia de la póliza</h3>
            </div>
            <div class="confirm-card__dates">
              <strong>${(()=>{const p=new Date;return p.setDate(p.getDate()+1),p.toLocaleDateString("es-CO",{day:"numeric",month:"long",year:"numeric"})})()}</strong>
              <span class="confirm-card__arrow">→</span>
              <strong>${(()=>{const p=new Date;return p.setDate(p.getDate()+1),p.setFullYear(p.getFullYear()+1),p.toLocaleDateString("es-CO",{day:"numeric",month:"long",year:"numeric"})})()}</strong>
            </div>
            <p class="confirm-card__note">La cobertura tiene vigencia de un año ininterrumpida hasta que usted decida voluntariamente cancelar el seguro.</p>
          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <a href="/?step=5" class="plan-footer__btn" style="text-decoration:none;">Continuar</a>
    </footer>
  `}function Ht(t){const e=sessionStorage.getItem("plan_price")||"41.500",s=parseInt(e.replace(/\./g,"").replace(/,/g,""))||41500,i=Math.round(s/12).toLocaleString("es-CO");t.innerHTML=`
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/?step=4" class="cob-back">‹ Volver</a>
      <img src="/APP_NEGOCIOS_DIGITALES/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <!-- MAIN LAYOUT -->
    <div class="datos-layout">
      <!-- STEPPER SIDEBAR -->
      <aside class="datos-stepper">
        <div class="stepper-vertical">
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--completed"><div class="stepper-vertical__bull-inner stepper-vertical__bull-inner--completed">✓</div></div>
            <span class="stepper-vertical__label">Datos del titular</span>
          </div>
          <div class="stepper-vertical__line stepper-vertical__line--completed"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--completed"><div class="stepper-vertical__bull-inner stepper-vertical__bull-inner--completed">✓</div></div>
            <span class="stepper-vertical__label">Datos del hogar</span>
          </div>
          <div class="stepper-vertical__line stepper-vertical__line--completed"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull stepper-vertical__bull--active"><div class="stepper-vertical__bull-inner">3</div></div>
            <span class="stepper-vertical__label stepper-vertical__label--active">Confirmar</span>
          </div>
          <div class="stepper-vertical__line"></div>
          <div class="stepper-vertical__step">
            <div class="stepper-vertical__bull"><div class="stepper-vertical__bull-inner">4</div></div>
            <span class="stepper-vertical__label">Pagar</span>
          </div>
        </div>
      </aside>

      <!-- CONTENT -->
      <section class="datos-content">
        <div class="datos-title-row">
          <img src="/APP_NEGOCIOS_DIGITALES/images/icon-confirme.png" alt="" class="datos-title-icon">
          <h1 class="datos-title">Confirme su compra</h1>
        </div>

        <div class="confirm-cards">
          <!-- Frecuencia de pago -->
          <div class="confirm-card">
            <div class="confirm-card__title-row">
              <img src="/APP_NEGOCIOS_DIGITALES/images/icon-calendar.png" alt="" class="confirm-card__icon">
              <h3 class="confirm-card__title">Frecuencia de pago</h3>
            </div>
          </div>

          <div class="confirm-card">
            <div class="freq-options">
              <label class="freq-option">
                <div class="freq-option__tag">⭐ Ahorra pagando de contado</div>
                <div class="freq-option__content">
                  <div class="freq-option__label">
                    <strong>Pago<br>anual</strong>
                  </div>
                  <div class="freq-option__price-wrap">
                    <input type="radio" name="frecuencia" value="anual" class="freq-option__radio">
                    <div class="freq-option__price">
                      <strong class="freq-option__amount">$${e}</strong>
                      <span class="freq-option__iva">IVA incluido</span>
                    </div>
                  </div>
                </div>
              </label>
              <label class="freq-option">
                <div class="freq-option__content">
                  <div class="freq-option__label">
                    <strong>Pago<br>mensual</strong>
                  </div>
                  <div class="freq-option__price-wrap">
                    <input type="radio" name="frecuencia" value="mensual" class="freq-option__radio">
                    <div class="freq-option__price">
                      <strong class="freq-option__amount">$${i}</strong>
                      <span class="freq-option__iva">IVA incluido</span>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Autorizaciones -->
          <div class="freq-auth">
            <label class="freq-auth__item">
              <input type="checkbox" class="freq-auth__checkbox" data-auth="terminos" checked>
              <span class="freq-auth__text">Acepto los <a href="#">Términos y Condiciones</a> del Seguro de Hogar.</span>
            </label>
            <label class="freq-auth__item">
              <input type="checkbox" class="freq-auth__checkbox" data-auth="firma" checked>
              <span class="freq-auth__text">Doy mi consentimiento para firmar electrónicamente la solicitud del seguro.</span>
            </label>
            <label class="freq-auth__item">
              <input type="checkbox" class="freq-auth__checkbox" data-auth="declaracion" checked>
              <span class="freq-auth__text">Declaro que todas las respuestas registradas en los formularios tanto del tomador como de los asegurados son verdaderas y completas. De igual forma confirmo que conozco que la mala fe en la reclamación de este seguro causará la pérdida del derecho al pago.</span>
            </label>
          </div>
        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="plan-footer">
      <button class="plan-footer__btn" disabled id="btn-pagar">Continuar</button>
    </footer>
  `,setTimeout(()=>{const a=document.getElementById("btn-pagar"),o=document.querySelectorAll('input[name="frecuencia"]'),r=document.querySelectorAll(".freq-auth__checkbox");function l(){const d=[...o].some(h=>h.checked),p=[...r].every(h=>h.checked);d&&p?(a.disabled=!1,a.style.background="#FFE16F",a.style.color="#038450",a.style.cursor="pointer"):(a.disabled=!0,a.style.background="",a.style.color="",a.style.cursor="")}o.forEach(d=>d.addEventListener("change",l)),r.forEach(d=>d.addEventListener("change",l)),a.addEventListener("click",()=>{if(!a.disabled){const d=document.createElement("div");d.id="pago-overlay",d.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);z-index:9999;display:flex;align-items:center;justify-content:center;",d.innerHTML=`
          <div class="pago-modal" id="pago-modal">
            <img src="/APP_NEGOCIOS_DIGITALES/images/protection.png" alt="" style="width:56px;height:56px;object-fit:contain;">
            <h2 class="pago-modal__title">Verificando su pago...</h2>
            <p class="pago-modal__subtitle">Estamos procesando su transacción de forma segura</p>
            <div class="pago-modal__spinner"></div>
          </div>
        `,document.body.appendChild(d),setTimeout(()=>{const p=document.getElementById("pago-modal");p&&(p.innerHTML=`
              <img src="/APP_NEGOCIOS_DIGITALES/images/icon-exitoso.png" alt="" style="width:64px;height:64px;object-fit:contain;">
              <h2 class="pago-modal__title" style="color:#009056;">¡Pago exitoso!</h2>
              <p class="pago-modal__subtitle">Su transacción ha sido aprobada correctamente</p>
              <div class="pago-modal__check">✓</div>
            `),setTimeout(()=>{window.location.href="/?step=6"},2e3)},3e3)}})},100)}function Ut(t){const e=JSON.parse(sessionStorage.getItem("datos_titular")||"{}"),i=`${[e.primerNombre,e.primerApellido].filter(Boolean).join(".").toLowerCase()||"susana.casta"}@gmail.com`,a=new Date;a.setDate(a.getDate()+1);const o=new Date(a);o.setFullYear(o.getFullYear()+1);const r=l=>l.toLocaleDateString("es-CO",{day:"numeric",month:"long",year:"numeric"});t.innerHTML=`
    <!-- HEADER -->
    <header class="plan-header">
      <a href="/" class="cob-back">‹ Volver al inicio</a>
      <img src="/APP_NEGOCIOS_DIGITALES/images/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="plan-header__logo">
    </header>

    <!-- BANNER -->
    <section class="bienvenida-banner">
      <div class="bienvenida-banner__decor-left">
        <img src="/APP_NEGOCIOS_DIGITALES/images/group-4392.png" alt="" class="bienvenida-banner__decor-img">
      </div>
      <div class="bienvenida-banner__decor-right">
        <img src="/APP_NEGOCIOS_DIGITALES/images/group-4391.png" alt="" class="bienvenida-banner__decor-img">
      </div>
      <div class="bienvenida-banner__content">
        <p class="bienvenida-banner__subtitle">¡Su compra fue aprobada!</p>
        <h1 class="bienvenida-banner__title">Le damos la bienvenida a Seguros Bolívar</h1>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="bienvenida-content">
      <div class="bienvenida-main">
        <!-- Title row -->
        <div class="bienvenida-title-row">
          <img src="/APP_NEGOCIOS_DIGITALES/images/icon-llave-hogar.png" alt="" class="bienvenida-title-icon">
          <h2 class="bienvenida-title">Su hogar protegido y asegurado ante cualquier eventualidad</h2>
        </div>

        <!-- Vigencia -->
        <p class="bienvenida-vigencia">Puede disfrutar y hacer uso de su póliza desde el <strong>${r(a)}</strong> hasta el <strong>${r(o)}</strong>.</p>

        <!-- Info card -->
        <div class="bienvenida-info-card">
          <p class="bienvenida-info-card__text">En un máximo de 12 horas, enviaremos los detalles de su seguro al correo electrónico <strong>${i}</strong>, allí podrá consultar:</p>
          <div class="bienvenida-info-card__grid">
            <div class="bienvenida-info-card__col">
              <div class="bienvenida-info-card__item">📝 Documentos con firma electrónica.</div>
              <div class="bienvenida-info-card__item">🔍 Términos y condiciones del seguro.</div>
            </div>
            <div class="bienvenida-info-card__col">
              <div class="bienvenida-info-card__item">💰 Factura electrónica de la compra.</div>
              <div class="bienvenida-info-card__item">🎧 Canales de atención.</div>
            </div>
          </div>
        </div>

        <!-- Approval -->
        <div class="bienvenida-approval">
          <img src="/APP_NEGOCIOS_DIGITALES/images/icon-exitoso.png" alt="" class="bienvenida-approval__icon">
          <div class="bienvenida-approval__text">
            <span>Número de aprobación de la compra</span>
            <strong>45454654684</strong>
          </div>
        </div>
      </div>
    </section>
  `}function Js(t){const e=[{id:"home",label:"Home",step:"0",render:Bt},{id:"step1",label:"Coberturas",step:"1",render:Pt},{id:"step2",label:"Datos titular",step:"2",render:Rt},{id:"step3",label:"Datos hogar",step:"3",render:qt},{id:"step4",label:"Confirmar",step:"4",render:Ft},{id:"step5",label:"Pago",step:"5",render:Ht},{id:"step6",label:"Bienvenida",step:"6",render:Ut}];t.innerHTML=`
    <div class="showcase">
      <!-- Vertical stepper fixed on left -->
      <nav class="showcase__stepper" id="showcase-stepper">
        ${e.map((s,i)=>`
          <a href="#screen-${s.id}" class="showcase__step ${i===0?"showcase__step--active":""}" data-target="${s.id}">
            <span class="showcase__step-dot"></span>
            <span class="showcase__step-label">${s.label}</span>
          </a>
          ${i<e.length-1?'<span class="showcase__step-line"></span>':""}
        `).join("")}
      </nav>

      <!-- Screens -->
      <div class="showcase__screens">
        ${e.map(s=>`
          <div class="showcase__screen-wrapper" id="screen-${s.id}">
            <div class="showcase__screen-content" data-screen="${s.id}"></div>
          </div>
        `).join("")}
      </div>
    </div>
  `,e.forEach(s=>{const i=t.querySelector(`[data-screen="${s.id}"]`);i&&s.render(i)}),setTimeout(()=>{const s=t.querySelectorAll(".showcase__step");s.forEach(a=>{a.addEventListener("click",o=>{var l;o.preventDefault();const r=a.dataset.target;(l=document.getElementById(`screen-${r}`))==null||l.scrollIntoView({behavior:"smooth"})})});const i=new IntersectionObserver(a=>{a.forEach(o=>{if(o.isIntersecting){const r=o.target.id.replace("screen-","");s.forEach(d=>d.classList.remove("showcase__step--active"));const l=t.querySelector(`.showcase__step[data-target="${r}"]`);l&&l.classList.add("showcase__step--active")}})},{threshold:.3});e.forEach(a=>{const o=document.getElementById(`screen-${a.id}`);o&&i.observe(o)}),t.querySelectorAll(".showcase__screen-content a").forEach(a=>{a.addEventListener("click",o=>{var d;o.preventDefault();const r=a.getAttribute("href")||"";let l=null;r==="/"||r===""?l="home":r.includes("step=1")?l="step1":r.includes("step=2")?l="step2":r.includes("step=3")?l="step3":r.includes("step=4")?l="step4":r.includes("step=5")?l="step5":r.includes("step=6")&&(l="step6"),l&&((d=document.getElementById(`screen-${l}`))==null||d.scrollIntoView({behavior:"smooth"}))})}),t.querySelectorAll(".showcase__screen-content button").forEach(a=>{a.addEventListener("click",o=>{var r;a.closest(".otp-modal")||a.closest(".freq-option")||a.classList.contains("cob-toggle__input")||a.id==="btn-pagar"&&(o.preventDefault(),o.stopPropagation(),(r=document.getElementById("screen-step6"))==null||r.scrollIntoView({behavior:"smooth"}))})})},300)}function Qs(){const t=document.getElementById("app"),e=new URLSearchParams(window.location.search),s=e.get("step"),i=e.get("mode");t.innerHTML='<main id="app-content" class="app-main"></main>';const a=document.getElementById("app-content");if(i==="showcase"){Js(a);return}s==="6"?Ut(a):s==="5"?Ht(a):s==="4"?Ft(a):s==="3"?qt(a):s==="2"?Rt(a):s==="1"?Pt(a):Bt(a)}function jt(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}window.addEventListener("message",t=>{var e;if(t.data){if(t.data.type==="SAVE_SNAPSHOT"){const s=((e=document.getElementById("app-content"))==null?void 0:e.innerHTML)||document.body.innerHTML;window.parent.postMessage({type:"SNAPSHOT_DATA",html:s,page:t.data.page,projectId:t.data.projectId},"*")}if(t.data.type==="RESTORE_SNAPSHOT"){const s=document.getElementById("app-content");s&&t.data.html&&(s.innerHTML=t.data.html,s.querySelectorAll(".admin-inserted").forEach(i=>{i.style.cursor="move"}))}if(t.data.type==="ADMIN_OVERRIDE"){const{selector:s,property:i,value:a}=t.data;try{if(i==="__appendHTML"){const o=document.createElement("div");o.innerHTML=a;const r=o.firstElementChild;r&&(r.classList.add("admin-inserted"),(document.getElementById("app-content")||document.body).appendChild(r))}else if(i==="__multiStyle"){const o=document.querySelector(s);if(o)try{const r=JSON.parse(a);Object.entries(r).forEach(([l,d])=>{o.style.setProperty(l,d,"important")})}catch{}}else if(i==="style"){const o=document.querySelector(s);o&&(o.style.cssText=a)}else{const o=document.querySelector(s);o&&(i==="textContent"?o.textContent=a:i==="src"?o.src=a:o.style.setProperty(jt(i),a,"important"))}}catch{}}if(t.data.type==="NAVIGATE_TO_STEP"){const s=t.data.step,i=new URL(window.location);s<=1?i.searchParams.delete("step"):i.searchParams.set("step",String(s-1)),i.toString()===window.location.href?window.location.reload():window.location.href=i.toString()}if(t.data.type==="OPEN_MODAL"){const s=t.data.modalId;if(s==="coverage-drawer"){const i=document.getElementById("cov-drawer-overlay");if(i){const a=document.getElementById("cov-drawer-title"),o=document.getElementById("cov-drawer-badge"),r=document.getElementById("cov-drawer-body");a&&(a.textContent="¿Qué cubrimos por incendio o agua al interior?"),o&&(o.textContent="Cobertura inmediata"),r&&(r.innerHTML=`
          <div class="cov-drawer__section">
            <p class="cov-drawer__text">Cubrimos los daños causados por incendio, explosión o agua al interior de su inmueble, incluyendo daños a la estructura, acabados y contenido. <strong>Hasta por $1.000.000</strong> (por vigencia).</p>
            <div class="cov-drawer__alert">
              <div class="cov-drawer__alert-line"></div>
              <div class="cov-drawer__alert-content">
                <span class="cov-drawer__alert-icon">ⓘ</span>
                <span class="cov-drawer__alert-text">No aplica para daños causados por humedad o filtraciones previas a la contratación.</span>
              </div>
            </div>
          </div>
          <div class="cov-drawer__section">
            <h3 class="cov-drawer__subtitle">¿Qué incluye?</h3>
            <p class="cov-drawer__text">Incluye reparación de paredes, pisos, techos y pintura afectados. <strong>También cubre el reemplazo de electrodomésticos y muebles dañados directamente por el siniestro.</strong></p>
          </div>
        `),i.classList.add("active")}}else if(s==="otp-flow"){const i=document.getElementById("otp-overlay"),a=document.getElementById("modal-otp");i&&(i.style.display="flex"),a&&(a.style.display="flex")}else if(s==="otp-method"){const i=document.getElementById("otp-overlay"),a=document.getElementById("modal-otro-metodo");i&&(i.style.display="flex"),a&&(a.style.display="flex")}else if(s==="otp-loader"){const i=document.getElementById("otp-overlay"),a=document.getElementById("modal-loader");i&&(i.style.display="flex"),a&&(a.style.display="flex")}}if(t.data.type==="INSERT_TEXT"){const{text:s,fontSize:i,fontWeight:a,color:o,backgroundColor:r}=t.data,l=document.createElement("div");l.textContent=s||"Nuevo texto",l.style.cssText=`position:relative;margin:12px auto;width:fit-content;font-family:'Roboto Condensed',sans-serif;font-size:${i||"16px"};font-weight:${a||"400"};color:${o||"#1B1B1B"};background:${r||"transparent"};padding:8px 12px;cursor:move;z-index:99999;`,l.classList.add("admin-inserted"),(document.getElementById("app-content")||document.body).appendChild(l),window.parent.postMessage({type:"ADMIN_CHANGE",action:"insertText",selector:"body",property:"__appendHTML",value:l.outerHTML,description:"Texto insertado"},"*")}if(t.data.type==="INSERT_SHAPE"){const s=document.createElement("div");s.classList.add("admin-inserted");const i=t.data.shape;i==="rect"?s.style.cssText="position:relative;margin:12px auto;width:200px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:8px;cursor:move;z-index:99999;":i==="circle"?s.style.cssText="position:relative;margin:12px auto;width:120px;height:120px;background:#FFF;border:1px solid #CCC;border-radius:50%;cursor:move;z-index:99999;":s.style.cssText="position:relative;margin:12px auto;width:80%;max-width:600px;height:2px;background:#CCC;cursor:move;z-index:99999;",(document.getElementById("app-content")||document.body).appendChild(s),window.parent.postMessage({type:"ADMIN_CHANGE",action:"insertShape",selector:"body",property:"__appendHTML",value:s.outerHTML,description:"Figura: "+i},"*")}if(t.data.type==="INSERT_IMAGE"){const s=document.createElement("img");s.src=t.data.src,s.alt=t.data.name||"",s.classList.add("admin-inserted"),s.style.cssText="position:relative;display:block;margin:12px auto;max-width:200px;height:auto;cursor:move;z-index:99999;",(document.getElementById("app-content")||document.body).appendChild(s),window.parent.postMessage({type:"ADMIN_CHANGE",action:"insertImage",selector:"body",property:"__appendHTML",value:s.outerHTML,description:"Imagen insertada"},"*")}if(t.data.type==="INSERT_MODAL"){const s=document.createElement("div");s.classList.add("admin-inserted"),s.style.cssText="position:relative;margin:24px auto;width:500px;max-width:90%;background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);padding:32px;cursor:move;z-index:99999;",s.innerHTML='<h3 style="font-size:20px;color:#016D38;margin-bottom:16px;">Modal</h3><p style="font-size:14px;color:#666;">Contenido del modal.</p>',(document.getElementById("app-content")||document.body).appendChild(s),window.parent.postMessage({type:"ADMIN_CHANGE",action:"insertModal",selector:"body",property:"__appendHTML",value:s.outerHTML,description:"Modal insertado"},"*")}if(t.data.type==="INSERT_FORM_FIELD"){const{title:s,fieldType:i,placeholder:a,options:o,targetSelector:r}=t.data,l=i||"text",d=document.createElement("div");d.classList.add("admin-inserted"),d.style.cssText="position:relative;margin:12px auto;cursor:move;z-index:99999;width:100%;max-width:400px;";let p='<div style="display:flex;flex-direction:column;gap:8px;">';p+=`<label style="font-family:'Bolivar',sans-serif;font-weight:400;font-size:14px;line-height:140%;color:#1B1B1B;">${s||"Campo"}</label>`,l==="select"?p+=`<div style="position:relative;"><select style="width:100%;height:40px;padding:8px 40px 8px 16px;font-family:'Bolivar',sans-serif;font-size:16px;color:#9B9B9B;background:#FFF;border:1px solid #B9B9B9;border-radius:4px;appearance:none;outline:none;">${(o||["Opción 1"]).map(m=>`<option>${m}</option>`).join("")}</select><span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#5B5B5B;font-size:18px;pointer-events:none;">▾</span></div>`:l==="date"?p+=`<div style="position:relative;"><input type="text" style="width:100%;height:40px;padding:8px 16px;font-family:'Bolivar',sans-serif;font-size:16px;color:#1B1B1B;background:#FFF;border:1px solid #B9B9B9;border-radius:4px;outline:none;" placeholder="${a||"DD/MM/AAAA"}"><span style="position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:16px;color:#9B9B9B;pointer-events:none;">📅</span></div>`:l==="toggle"?p+=`<div style="display:flex;align-items:center;gap:12px;"><div style="width:48px;height:26px;background:#009056;border-radius:13px;position:relative;cursor:pointer;"><div style="width:20px;height:20px;background:#fff;border-radius:50%;position:absolute;top:3px;right:3px;box-shadow:0 1px 3px rgba(0,0,0,.2);"></div></div><span style="font-family:'Bolivar',sans-serif;font-size:14px;color:#1B1B1B;">Sí</span></div>`:l==="radio"?(p+='<div style="display:flex;flex-direction:column;gap:12px;">',(o||["Opción 1","Opción 2"]).forEach((m,x)=>{p+=`<label style="display:flex;align-items:center;gap:8px;font-family:'Bolivar',sans-serif;font-size:16px;color:#1B1B1B;cursor:pointer;"><div style="width:20px;height:20px;border-radius:50%;border:2px solid #009056;${x===0?"background:#009056;":""}display:flex;align-items:center;justify-content:center;"></div>${m}</label>`}),p+="</div>"):p+=`<input type="text" style="width:100%;height:40px;padding:8px 16px;font-family:'Bolivar',sans-serif;font-size:16px;color:#1B1B1B;background:#FFF;border:1px solid #B9B9B9;border-radius:4px;outline:none;" placeholder="${a||"Ingrese aquí"}">`,p+="</div>",d.innerHTML=p;let h=null;if(r)try{h=document.querySelector(r)}catch{}h||(h=document.getElementById("app-content")||document.body),h.appendChild(d),window.parent.postMessage({type:"ADMIN_CHANGE",action:"insertFormField",selector:"body",property:"__appendHTML",value:d.outerHTML,description:"Campo: "+(s||"")},"*")}if(t.data.type==="ENTER_FRAME_SELECT_MODE"){document.body.style.cursor="crosshair";const s=document.createElement("div");s.id="frame-select-indicator",s.style.cssText="position:fixed;top:12px;left:50%;transform:translateX(-50%);background:#016D38;color:#fff;font-family:Bolivar,sans-serif;font-size:13px;font-weight:700;padding:8px 20px;border-radius:20px;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.2);pointer-events:none;",s.textContent="👆 Haga clic en el frame donde desea insertar el campo",document.body.appendChild(s);const i=a=>{a.preventDefault(),a.stopPropagation();let o=a.target;for(;o&&o!==document.body&&!(["DIV","SECTION","MAIN","ARTICLE","ASIDE","FORM","HEADER","FOOTER","NAV"].includes(o.tagName)&&o.offsetWidth>80&&o.offsetHeight>30);)o=o.parentElement;document.body.style.cursor="";const r=document.getElementById("frame-select-indicator");if(r&&r.remove(),document.removeEventListener("click",i,!0),o&&o!==document.body){let l="";if(o.id)l="#"+o.id;else if(o.className&&typeof o.className=="string"){const d=o.className.trim().split(/\\s+/).filter(p=>p&&!p.startsWith("editor-")&&!p.startsWith("frame-"));d.length&&(l="."+d.join("."))}if(!l){const d=[];let p=o;for(;p&&p!==document.body;){let h=p.tagName.toLowerCase();const m=p.parentElement;if(m){const x=Array.from(m.children).filter(w=>w.tagName===p.tagName);x.length>1&&(h+=":nth-of-type("+(x.indexOf(p)+1)+")")}d.unshift(h),p=p.parentElement}l=d.join(" > ")}window.parent.postMessage({type:"FRAME_SELECTED",selector:l},"*")}};document.addEventListener("click",i,!0)}}});async function Ks(){const e=new URLSearchParams(window.location.search).get("project");if(e)try{const s=await fetch(`http://localhost:4001/api/projects/${e}/overrides`);if(!s.ok)return;const i=await s.json();if(!Array.isArray(i)||i.length===0)return;setTimeout(()=>{i.forEach(a=>{try{if(a.property==="__appendHTML"){const o=document.createElement("div");o.innerHTML=a.value;const r=o.firstElementChild;r&&(r.classList.add("admin-inserted"),(document.getElementById("app-content")||document.body).appendChild(r))}else if(a.property==="__multiStyle"){const o=document.querySelector(a.selector);if(o)try{const r=JSON.parse(a.value);Object.entries(r).forEach(([l,d])=>{o.style.setProperty(l,d,"important")})}catch{}}else{const o=document.querySelector(a.selector);o&&(a.property==="textContent"?o.textContent=a.value:a.property==="src"?o.src=a.value:o.style.setProperty(jt(a.property),a.value,"important"))}}catch{}})},500)}catch{}}function Ct(){Qs(),window.parent!==window||Ks()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ct):Ct();
