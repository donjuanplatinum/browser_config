var x={120:"超清4K",112:"高清1080P+",80:"高清1080P",74:"高清720P60",64:"高清720P",48:"高清720P",32:"清晰480P",16:"流畅360P"},B="bilibili-helper-host",L="bilibili-helper-ext-content-script",Q="ffmpeg.worker.js",Y="ffmpeg-core.js",S="ffmpeg-core.wasm",$="ffmpeg-core.worker.js",P="//api.bilibili.com/x/player/wbi/playurl";var X={credentials:"include"},E={OK:0,FAILED_TO_FETCH:-1,INVALID_RESPONSE:-2,VIP_ONLY:-10403,UNKNOWN:-99999};var g=(...e)=>{},V=()=>location.hostname==="www.bilibili.com"||location.hostname==="bilibili.com",O=window.navigator.userAgent.indexOf("Edg/")!==-1,w=()=>/\/video\/(av|bv)[0-9a-zA-Z]+/i.test(window.location.pathname),y=()=>/\/bangumi\/play\/\S+/i.test(window.location.pathname),C=e=>{if(!e)return"未知大小";let i=1024*1024*1024,d=1024*1024,o=1024;return e>=i?`${(e/i).toFixed(2)}GB`:e>=d?`${(e/d).toFixed(2)}MB`:e>=o?`${(e/o).toFixed(2)}KB`:e+"B"},M=()=>localStorage.bilibili_helper_download_mode!=="normal",k=()=>localStorage.bilibili_helper_merge_mode!=="off",h=()=>localStorage.bilibili_helper_show==="hide",F=()=>{let{manifest:e,baseUrl:i}=JSON.parse(document.getElementById(L).dataset.internals);return{...e,baseUrl:i}};var A=e=>new Promise(i=>{let d=0,o=setInterval(()=>{d++;let a=document.querySelector(e);(a||d>100)&&(clearInterval(o),o=null,i(a))},300)}),j=async e=>{await A("#bilibili-player .squirtle-quality-wrap, #bilibili-player .bpx-player-ctrl-quality")&&e()},H=e=>{e.customElements.define(B,class extends HTMLDivElement{constructor(){super()}},{extends:"div"})},I=()=>{let e=document.getElementById(B);if(e){let i=e.shadowRoot.querySelector("#bilibliHelperLogs");i&&(i.innerHTML="")}},b=(...e)=>{g("[B站下载助手]",...e);let i=document.getElementById(B);if(i){let d=i.shadowRoot.querySelector("#bilibliHelperLogs");if(d){let o=`<p>${e.map(a=>{if(a.message)return a.message;if(typeof a=="object")try{return JSON.stringify(a)}catch{return a}return a}).join(" ")}</p>`;d.innerHTML+=o}}},m0=async()=>{let e=await A(".squirtle-quality-select-list li.active, .bpx-player-ctrl-quality-menu .bpx-state-active");if(!e)return null;let i=+e.dataset.value;if(i===0){let d=e.parentElement.querySelector("li:first-child");d&&(i=+(d.dataset.value||0))}return g("quality from player is",i),i};var z=async()=>{let e=localStorage.bilibili_player_settings&&`${localStorage.bilibili_player_settings}`!="undefined"&&+JSON.parse(localStorage.bilibili_player_settings).setting_config.defquality||120;return e=await m0()||e,e};var u0="0.12.1",I0=`https://unpkg.com/@ffmpeg/core@${u0}/dist/umd/ffmpeg-core.js`,u;(function(e){e.LOAD="LOAD",e.EXEC="EXEC",e.WRITE_FILE="WRITE_FILE",e.READ_FILE="READ_FILE",e.DELETE_FILE="DELETE_FILE",e.RENAME="RENAME",e.CREATE_DIR="CREATE_DIR",e.LIST_DIR="LIST_DIR",e.DELETE_DIR="DELETE_DIR",e.ERROR="ERROR",e.DOWNLOAD="DOWNLOAD",e.PROGRESS="PROGRESS",e.LOG="LOG"})(u||(u={}));var b0=(()=>{let e=0;return()=>e++})(),z0=new Error("unknown message type"),v0=new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"),g0=new Error("called FFmpeg.terminate()"),D0=new Error("failed to import ffmpeg-core.js"),e0=class{#e=null;#a={};#d={};#o=[];#t=[];loaded=!1;constructor({worker:e}){this.#e=e,this.#r()}#r=()=>{this.#e&&(this.#e.onmessage=({data:{id:e,type:i,data:d}})=>{switch(i){case u.LOAD:this.loaded=!0,this.#a[e](d);break;case u.EXEC:case u.WRITE_FILE:case u.READ_FILE:case u.DELETE_FILE:case u.RENAME:case u.CREATE_DIR:case u.LIST_DIR:case u.DELETE_DIR:this.#a[e](d);break;case u.LOG:this.#o.forEach(o=>o(d));break;case u.PROGRESS:this.#t.forEach(o=>o(d));break;case u.ERROR:this.#d[e](d);break}delete this.#a[e],delete this.#d[e]})};#i=({type:e,data:i},d=[])=>this.#e?new Promise((o,a)=>{let r=b0();this.#e&&this.#e.postMessage({id:r,type:e,data:i},d),this.#a[r]=o,this.#d[r]=a}):Promise.reject(v0);on(e,i){e==="log"?this.#o.push(i):e==="progress"&&this.#t.push(i)}off(e,i){e==="log"?this.#o=this.#o.filter(d=>d!==i):e==="progress"&&(this.#t=this.#t.filter(d=>d!==i))}load=(e={})=>(this.#e||(this.#e=new Worker(new URL("./worker.js",import.meta.url),{type:"module"}),this.#r()),this.#i({type:u.LOAD,data:e}));exec=(e,i=-1)=>this.#i({type:u.EXEC,data:{args:e,timeout:i}});terminate=()=>{let e=Object.keys(this.#d);for(let i of e)this.#d[i](g0),delete this.#d[i],delete this.#a[i];this.#e&&(this.#e.terminate(),this.#e=null,this.loaded=!1)};writeFile=(e,i)=>{let d=[];return i instanceof Uint8Array&&d.push(i.buffer),this.#i({type:u.WRITE_FILE,data:{path:e,data:i}},d)};readFile=(e,i="binary")=>this.#i({type:u.READ_FILE,data:{path:e,encoding:i}});deleteFile=e=>this.#i({type:u.DELETE_FILE,data:{path:e}});rename=(e,i)=>this.#i({type:u.RENAME,data:{oldPath:e,newPath:i}});createDir=e=>this.#i({type:u.CREATE_DIR,data:{path:e}});listDir=e=>this.#i({type:u.LIST_DIR,data:{path:e}});deleteDir=e=>this.#i({type:u.DELETE_DIR,data:{path:e}})},f0=new Error("failed to get response body reader"),E0=new Error("failed to complete download"),B0="Content-Length",x0=e=>new Promise((i,d)=>{let o=new FileReader;o.onload=()=>{let{result:a}=o;a instanceof ArrayBuffer?i(new Uint8Array(a)):i(new Uint8Array)},o.onerror=a=>{d(Error(`File could not be read! Code=${a?.target?.error?.code||-1}`))},o.readAsArrayBuffer(e)}),D=async e=>{let i;if(typeof e=="string")/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(e)?i=atob(e.split(",")[1]).split("").map(d=>d.charCodeAt(0)):i=await(await fetch(e)).arrayBuffer();else if(e instanceof URL)i=await(await fetch(e)).arrayBuffer();else if(e instanceof File||e instanceof Blob)i=await x0(e);else return new Uint8Array;return new Uint8Array(i)};var C0=async(e,i)=>{let d=await fetch(e),o;try{let a=parseInt(d.headers.get(B0)||"-1"),r=d.body?.getReader();if(!r)throw f0;let N=[],t=0;for(;;){let{done:c,value:p}=await r.read(),m=p?p.length:0;if(c){if(a!=-1&&a!==t)throw E0;i&&i({url:e,total:a,received:t,delta:m,done:c});break}N.push(p),t+=m,i&&i({url:e,total:a,received:t,delta:m,done:c})}let n=new Uint8Array(t),l=0;for(let c of N)n.set(c,l),l+=c.length;o=n.buffer}catch(a){console.log("failed to send download progress event: ",a),o=await d.arrayBuffer(),i&&i({url:e,total:o.byteLength,received:o.byteLength,delta:0,done:!0})}return o},J=async(e,i,d=!1,o)=>{let a=d?await C0(e,o):await(await fetch(e)).arrayBuffer(),r=new Blob([a],{type:i});return URL.createObjectURL(r)};var W=async e=>{try{let d=await(await window.fetch(window.location.href,X)).text(),o=d.match(/<script>window.__INITIAL_STATE__=(.+?)<\/script>/);if(o&&o[1]){let N=JSON.parse(o[1].replace(";(function(){var s;(s=document.currentScript||document.scripts[document.scripts.length-1]).parentNode.removeChild(s);}());",""));return g("initial state:",N),{code:E.OK,data:N}}let a=d.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/);if(a&&a[1]){let t=JSON.parse(a[1]).props.pageProps.dehydratedState.queries[0].state;return t.status==="success"&&(t.code=E.OK),g("initial state:",t),t}return{code:E.INVALID_RESPONSE,message:"获取视频信息失败，可以尝试清除浏览器cookies和缓存后重试"}}catch(i){return g("获取视频信息失败：",i),await networkErrorHandler()}},q={ffmpegInstance:null,ffmpegUsedFiles:new Set,blobUrls:new Set},q0=e=>{q.blobUrls.add(e)},T0=async e=>{if(q.ffmpegInstance)return q.ffmpegInstance;let i=new e0({worker:new Worker(await J(`${e}/${Q}`,"text/javascript"),{type:"module"})});i.on("log",({message:d})=>{g("ffmpeg log:",d)});try{await i.load({coreURL:await J(`${e}/${Y}`,"text/javascript"),wasmURL:await J(`${e}/${S}`,"application/wasm"),workerURL:await J(`${e}/${$}`,"text/javascript")})}catch(d){g("ffmpeg load error:",d)}return q.ffmpegInstance=i,i},_0=async(e,i,d)=>{let o=`${Date.now()}${Math.random()}`,a=await T0(e),r=`${o}_audio.mp4`,N=`${o}_video.mp4`,t=`${o}_merged.mp4`;await a.writeFile(r,await D(i)),await a.writeFile(N,await D(d)),await a.exec(`-i ${N} -i ${r} -vcodec copy -acodec copy ${t}`.split(" "));let n=await a.readFile(t),l=()=>{a.deleteFile(r).catch(c=>g(c)),a.deleteFile(N).catch(c=>g(c))};return q.ffmpegUsedFiles.add(t),[n.buffer,l]};var U=(e,i,d)=>{let o=i,a=i;if(o.dash||a.durl){let{dash:r,accept_description:N,accept_quality:t,video_codecid:n,support_formats:l}=o,{durl:c}=a;t&&t.forEach((s,v)=>{x[s]=N?.[v]||x[s]}),Object.values(l).forEach(s=>{x[s.quality]=s.new_description||s.display_desc||x[s.quality]}),b("下载链接:");let p=r?.video?.find(s=>`${s.codecid}`==`${n}`&&`${s.id}`==`${d}`)??r?.video?.[0],m=r?.audio?.[0];return m&&(b("-".repeat(20)),b("音频："),b("&nbsp;&nbsp;&nbsp;&nbsp;主链接：",m.base_url),m.backup_url&&m.backup_url.length&&m.backup_url.forEach((s,v)=>{b(`&nbsp;&nbsp;&nbsp;&nbsp;备用链接 ${v+1}：`,s)})),p&&(b("-".repeat(20)),b("视频："),b("&nbsp;&nbsp;&nbsp;&nbsp;主链接：",p.base_url),p.backup_url&&p.backup_url.length&&p.backup_url.forEach((s,v)=>{b(`&nbsp;&nbsp;&nbsp;&nbsp;备用链接 ${v+1}：`,s)})),c?.length&&(b("-".repeat(20)),c.forEach((s,v)=>{b(`视频分段${v+1}：`),b("&nbsp;&nbsp;&nbsp;&nbsp;主链接：",s.url),s.backup_url&&s.backup_url.length&&s.backup_url.forEach((f,_)=>{b(`&nbsp;&nbsp;&nbsp;&nbsp;备用链接 ${_+1}：`,f)})})),{code:E.OK,dash:m&&p?{audio:m,video:p}:void 0,durl:a.durl,qualityDescription:x[p?.id??d]}}else return e?e.code===E.VIP_ONLY?(e.message="该视频只能登陆大会员账号之后下载，如登录后仍然报错，可以尝试清除浏览器cookies和缓存后重试",e):typeof e.code<"u"?e:{code:E.INVALID_RESPONSE,message:"该视频暂时不支持下载，可以尝试清除浏览器cookies和缓存后重试"}:(g("params:",[e,i,d]),{code:E.UNKNOWN,message:"未知错误"})},i0=async(e=120,i)=>U(null,i,e),d0=async(e,i,d,o=120)=>{let a=`${P}?qn=${o}&fnver=0&fnval=4048&fourk=1&avid=${e}&bvid=${i}&cid=${d}`,N=await(await window.fetch(a,X)).json();if(g("视频信息",N),N.code!==E.OK)return U({code:N.code,message:N.message},null,o);let t=N.data;return U(null,t,o)},a0=(e,i,d,o)=>{let a=new Blob([e],{type:"application/octet-stream"}),r=document.createElement("a"),N=URL.createObjectURL(a);q0(N),r.setAttribute("href",N),r.setAttribute("download",i),r.setAttribute("style","margin-left:10px"),r.innerHTML="（如果没有弹出下载，请点击这里保存）",d.appendChild(r);let t=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window});r.dispatchEvent(t),a=null,o?.()},o0=async(e,i,d)=>{let o=null;try{let a=await window.fetch(e),r=a.headers.get("content-length"),N=i||parseInt(r,10),t=0;return o=setInterval(()=>{d(t,N)},1e3),await new Response(new ReadableStream({start(l){let c=a.body.getReader(),p=()=>{c.read().then(({done:m,value:s})=>{if(m){l.close();return}t+=s.byteLength,l.enqueue(s),p()}).catch(m=>{l.error(m)})};p()}})).blob()}finally{o&&(clearInterval(o),o=null)}},R=async(e,{url:i,size:d},o,a)=>{e.classList.add("disabled");try{let r=await o0(i,d,(t,n)=>{let l=Math.ceil(t/n*100);a.innerHTML=` 正在下载 - ${t}/${n} - ${l}%`});a.innerHTML=" 已下载完成";let N=new URL(i).pathname.toLowerCase().match(/\.[a-z0-9]+?$/)[0];N==".m4s"&&(N=".mp4"),a0(r,o+N,a,()=>{r=null})}finally{e.classList.remove("disabled")}},t0=async(e=!0,i,d,o,a)=>{if(d.length===1)return R(i,d[0],o,a);i.classList.add("disabled");let r=d.map(async({url:N,size:t},n)=>{let l=t,c=e?`${n===0?"音频":"视频"}`:`分段${n+1}`,p=document.createElement("li");p.innerHTML=`${c} (${C(t)}) 正在下载`,a.appendChild(p);let m=await o0(N,t,(s,v)=>{let f=Math.ceil(s/v*100);p.innerHTML=`${c} (${C(t||v)}) 正在下载 - ${s}/${v} - ${f}%`,l=v});return p.innerHTML=`${c} (${C(l)}) 已下载完成，等待合并`,m});try{let[N,t]=await Promise.all(r);a.innerHTML="正在合并，所需时间取决于视频大小...";let{baseUrl:n}=F(),[l,c]=await _0(n,N,t);a.innerHTML="已完成",a0(l,o+".mp4",a),c(),N=null,t=null,l=null}finally{i.classList.remove("disabled")}};window.addEventListener("beforeunload",async()=>{await Promise.all([...Array.from(q.ffmpegUsedFiles).map(e=>ffmpeg.deleteFile(e).catch(i=>(g(i),Promise.resolve()))),...Array.from(q.blobUrls).map(e=>{try{URL.revokeObjectURL(e)}catch(i){g(i)}return Promise.resolve()}),new Promise(e=>{try{q.ffmpegInstance.terminate()}catch(i){g(i)}e()})])},!0);var r0=(e,i)=>{window.XMLHttpRequest=class extends i{constructor(){super(),this.addEventListener("load",()=>{if(this.responseURL.includes("/playurl")){let o=new URLSearchParams(this.responseURL),a=o.get("avid"),r=o.get("cid"),N=o.get("bvid"),t=o.get("ep_id"),n=JSON.parse(this.responseText),l=n.result?n.result.video_info||n.result:n.data;l.avid=+a,l.cid=+r,l.bvid=N?+N:void 0,l.ep_id=t?+t:void 0,g("视频信息:",l),e(l)}},{capture:!0,passive:!0})}}};var N0=`p,
a,
div,
span,
li,
i,
b,
strong,
input,
button,
label {
  font-size: inherit;
}
li {
  margin-bottom: 5px;
}
p {
  margin: 0;
  line-height: 1.5;
}
h1 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
h3 {
  font-size: 16px;
  margin: 1em 0;
}
#title {
  font-size: 16px;
  font-weight: normal;
}
#content {
  display: flex;
  width: 100%;
  font-size: 14px;
  position: relative;
}
a {
  color: #00a1d6 !important;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
a.disabled {
  color: #666 !important;
}
a.disabled:hover {
  text-decoration: none;
  cursor: not-allowed;
}
#side-bar {
  flex: 3;
  padding: 20px;
  border-right: 1px solid #ccc;
  margin-right: -1px;
}
#main {
  flex: 7;
  padding: 20px;
  border-left: 1px solid #ccc;
}
#notice-frame {
  width: 100%;
  padding: 0;
}
.donate {
  border-top: 1px solid #ccc;
  padding-top: 10px;
}
#zanshang {
  width: 80%;
}
.setting-item {
  margin-bottom: 8px;
}
.setting-item .label {
  font-weight: bold;
  width: 6em;
  display: inline-block;
  text-align: right;
}
.desc {
  padding-left: 6em;
}
#actions {
  position: absolute;
  right: 0;
  top: 0;
}
.btn-large {
  border: 0 none;
  background: #f45a8d;
  border-radius: 6px;
  color: #fff;
  padding: 10px 20px;
}
#toggle {
  border-radius: 0 0 0 6px;
  outline: none;
  cursor: pointer;
}
.hide #side-bar {
  display: none;
}
.hide #main {
  display: none;
}
.hide #toggle {
  border-radius: 6px 0 0 0;
}
.hide #actions {
  position: static;
}

a.btn {
  border: 0 none;
  background: #f45a8d;
  text-decoration: none !important;
  color: #fff !important;
  border-radius: 3px;
  padding: 5px 10px;
  display: inline-block;
}
.settings {
  border-left: 5px solid #ccc;
  background: #eee;
  padding: 16px 16px 8px 0;
}
.size {
  margin: 0 5px;
}
#bilibliHelperLogs {
  margin-top: 10px;
  max-width: 600px;
  max-height: 400px;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  line-height: 1.2;
  background: rgb(50, 50, 50);
  color: rgb(154, 180, 90);
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 11px;
}
`;var n0=`<h1 style="margin-top: 0;">B站下载助手</h1>
<p style="margin-bottom: 10px;"><a target="_blank" href="https://docs.qq.com/doc/DQ2lhaWRpS0tubVVF">使用教程及常见问题解答</a></p>
<div class="settings">
  <div class="setting-item">
    <span class="label">清晰度：</span>
    <span>请在页面中B站自己的播放器内切换清晰度</span>
  </div>
  <div class="setting-item">
    <span class="label">下载模式：</span>
    <label><input id="setting-download-mode-advanced" checked name="setting-download-mode" type="radio" /> 高级</label>
    <label><input id="setting-download-mode-normal" name="setting-download-mode" type="radio" /> 兼容</label>
    <p class="desc">高级模式支持自动重命名和合并下载，但会占用较大的系统运行内存<br />兼容模式直接使用浏览器的默认下载，资源占用很小，但不支持自动重命名和合并下载</p>
  </div>
  <div class="setting-item" id="setting-advanced">
    <span class="label">合并下载：</span>
    <label><input id="setting-merge-on" checked name="setting-merge" type="radio"> 开</label>
    <label><input id="setting-merge-off" name="setting-merge" type="radio"> 关</label>
    <p class="desc">高级模式下载过程中请<strong style="color: red;">不要</strong>刷新或关闭页面，也<strong
        style="color: red;">不要</strong>切换分集和清晰度</p>
  </div>
</div>`;var l0=({title:e,code:i,message:d,quality:o,dash:a,durl:r})=>{if(i!==E.OK)return`<strong>${d}</strong>`;let N=o?`[${o}] `:"";return a||r?`${N}<strong>${e}</strong> 的下载地址：`:`<strong>出错了:( ${d}</strong>`},K=({title:e,code:i,dash:d,durl:o})=>{if(i!==E.OK)return"";let a=!!d,r=[];if(a?r=[{url:d.audio.base_url,size:d.audio.size},{url:d.video.base_url,size:d.video.size}]:r=o,!M())return r.map((N,t)=>{let n=a?`${e}_${t===0?"音频":"视频"}`:`${e}_分段${t+1}`,l=a?`${t===0?"音频":"视频"}`:`分段${t+1}`;return`
          <li>
            <a title="${n}" download="${n}.mp4" href="${N.url}">${l}（请点右键选择链接另存为，直接点击无法下载）</a>
            <span class="size">(${C(N.size)})</span>
          </li>
        `}).join("");if(M()&&(!k()||!a))return r.map((N,t)=>{let n=encodeURIComponent(JSON.stringify(N)),l=a?`${e}_${t===0?"音频":"视频"}`:`${e}_分段${t+1}`,c=a?`${t===0?"音频":"视频"}`:`分段${t+1}`;return`
          <li>
            <a title="${l}" mode="advanced" merge="off" href="#nogo" durl="${n}">${c}</a>
            <span class="size">(${C(N.size)})</span>
            <span durl="${n}" class="progress"></span>
          </li>
        `}).join("");if(M()&&a&&k()){let N=encodeURIComponent(JSON.stringify(r)),t=0;return r.forEach(n=>t+=n.size),`
      <li>
        <a title="${e}" durls="${N}" mode="advanced" type="${a?"a+v":"v"}" merge="on" href="#nogo">合并下载</a>
        <span class="size">(共${C(t)})</span>
        <ul style="margin-top: 8px;" durls="${N}" class="progress"></ul>
      </li>
    `}},J0=e=>{let i=e.getElementById("notice-frame");i.onload=()=>{i.contentWindow.postMessage({action:"getHeight"},"https://csser.top");let d=F();i.contentWindow.postMessage({action:"setVersion",version:{name:d.version,code:parseInt(d.version.replace(/\./g,""),10)}},"https://csser.top"),i.contentWindow.postMessage({action:"setTheme",theme:"null"},"https://csser.top")},window.addEventListener("message",d=>{if(d.origin==="https://csser.top"&&d.data&&d.data.action==="reportHeight"&&(i.style.height=d.data.height+10+"px"),d.origin==="https://csser.top"&&d.data&&d.data.action==="showBilibilihelperindooorsmanNoticeDialog"){let o=d.data.notices;o&&o.length>0&&o.forEach(a=>{})}}),i.src=`https://csser.top/bilibili/notice.html?t=${Date.now()}`,window.addEventListener("resize",()=>{i.contentWindow.postMessage({action:"getHeight"},"https://csser.top")})},Z0=e=>{let i=e.getElementById("setting-download-mode-advanced"),d=e.getElementById("setting-download-mode-normal"),o=e.getElementById("setting-merge-on"),a=e.getElementById("setting-merge-off"),r=e.getElementById("setting-advanced"),N=e.getElementById("durls"),t=e.getElementById("toggle"),n=e.getElementById("actions"),l=e.getElementById("content"),c=document.getElementById(B),p=()=>{i.disabled=!0,d.disabled=!0,o.disabled=!0,a.disabled=!0},m=()=>{i.disabled=!1,d.disabled=!1,o.disabled=!1,a.disabled=!1};M()?(i.checked=!0,d.checked=!1,r.style.display="block"):(i.checked=!1,d.checked=!0,r.style.display="none"),k()?(o.checked=!0,a.checked=!1):(o.checked=!1,a.checked=!0);let s=()=>{e.buildDownloadLinks()};i.addEventListener("change",()=>{i.checked?(localStorage.bilibili_helper_download_mode="advanced",r.style.display="block"):(localStorage.bilibili_helper_download_mode="normal",r.style.display="none"),s()}),d.addEventListener("change",()=>{d.checked?(localStorage.bilibili_helper_download_mode="normal",r.style.display="none"):(localStorage.bilibili_helper_download_mode="advanced",r.style.display="block"),s()}),o.addEventListener("change",()=>{localStorage.bilibili_helper_merge_mode=o.checked?"on":"off",s()}),a.addEventListener("change",()=>{localStorage.bilibili_helper_merge_mode=a.checked?"off":"on",s()}),N.addEventListener("click",v=>{let f=v.target;if(f.tagName.toLowerCase()==="a"&&f.getAttribute("mode")==="advanced"){if(v.preventDefault(),v.stopPropagation(),f.classList.contains("disabled"))return;let _=null,G=f.getAttribute("title");f.getAttribute("merge")==="on"?(_=e.querySelector(`ul[durls="${f.getAttribute("durls")}"]`),p(),t0(!0,f,JSON.parse(decodeURIComponent(f.getAttribute("durls"))),G,_).then(m)):(_=e.querySelector(`span[durl="${f.getAttribute("durl")}"]`),p(),R(f,JSON.parse(decodeURIComponent(f.getAttribute("durl"))),G,_).then(m))}}),t.addEventListener("click",()=>{h()?(localStorage.bilibili_helper_show="show",l.classList.remove("hide"),t.innerHTML="收起",c.classList.remove("hide"),n.style.top="0",e.getElementById("notice-frame").contentWindow.postMessage({action:"getHeight"},"https://csser.top")):(localStorage.bilibili_helper_show="hide",l.classList.add("hide"),c.classList.add("hide"),t.innerHTML="打开B站下载助手",n.style.top="0")}),c.addEventListener("scroll",()=>{n.style.top=c.scrollTop+"px"})},T=({code:e,title:i,dash:d,quality:o,message:a,loading:r,durl:N})=>{let t=document.getElementById(B),n=null,l=' <svg style="vertical-align: middle" width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-pacman"><g ng-attr-style="display:{{config.showBean}}" style="display:block"><circle cx="62.0973" cy="50" r="4" ng-attr-fill="{{config.c2}}" fill="#00a1d6"><animate attributeName="cx" calcMode="linear" values="95;35" keyTimes="0;1" dur="1" begin="-0.67s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" calcMode="linear" values="0;1;1" keyTimes="0;0.2;1" dur="1" begin="-0.67s" repeatCount="indefinite"></animate></circle><circle cx="82.4973" cy="50" r="4" ng-attr-fill="{{config.c2}}" fill="#00a1d6"><animate attributeName="cx" calcMode="linear" values="95;35" keyTimes="0;1" dur="1" begin="-0.33s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" calcMode="linear" values="0;1;1" keyTimes="0;0.2;1" dur="1" begin="-0.33s" repeatCount="indefinite"></animate></circle><circle cx="42.2973" cy="50" r="4" ng-attr-fill="{{config.c2}}" fill="#00a1d6"><animate attributeName="cx" calcMode="linear" values="95;35" keyTimes="0;1" dur="1" begin="0s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" calcMode="linear" values="0;1;1" keyTimes="0;0.2;1" dur="1" begin="0s" repeatCount="indefinite"></animate></circle></g><g ng-attr-transform="translate({{config.showBeanOffset}} 0)" transform="translate(-15 0)"><path d="M50 50L20 50A30 30 0 0 0 80 50Z" ng-attr-fill="{{config.c1}}" fill="#f45a8d" transform="rotate(10.946 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;45 50 50;0 50 50" keyTimes="0;0.5;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path><path d="M50 50L20 50A30 30 0 0 1 80 50Z" ng-attr-fill="{{config.c1}}" fill="#f45a8d" transform="rotate(-10.946 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-45 50 50;0 50 50" keyTimes="0;0.5;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path></g></svg>';t?(n=t.shadowRoot,n.getElementById("title").innerHTML=r?"加载中"+l:l0({title:i,code:e,message:a,quality:o,dash:d,durl:N}),n.getElementById("durls").innerHTML=r?"":K({title:i,code:e,dash:d,durl:N}),n.getElementById("d-style").textContent=!d&&N?"#setting-advanced{display:none!important}":""):(t=document.createElement(B),t.id=B,t.style.cssText=`display:block;overflow:auto;position:fixed;z-index:${Number.MAX_SAFE_INTEGER};bottom:0;left:0;right:0;max-height:50%;width:100%;background: #fff;border-top: 1px solid #ccc;box-shadow: rgba(0, 0, 0, 0.2) 0 -5px 10px;`,h()?t.classList.add("hide"):t.classList.remove("hide"),t.innerHTML=`<style>
      #${B}.hide{
        width:auto!important;
        left:auto!important;
        background:transparent!important;
        border:0 none!important;
        border-radius: 6px 0 0 0;
        box-shadow: rgba(0, 0, 0, 0.2) -5px -5px 10px!important;
      }
      .player-fullscreen-fix #${B} {
        z-index: 9!important;
      }
    </style>`,document.body.appendChild(t),n=t.attachShadow({mode:"open"}),n.innerHTML=`
      <style>${N0}</style>
      <div id="content" ${h()?'class="hide"':""}>
        <div id="side-bar">
          <div class="notice">
            <iframe id="notice-frame" frameborder="0"></iframe>
          </div>
        </div>
        <div id="main">
          <style id="d-style">${!d&&N?"#setting-advanced{display:none!important}":""}</style>
          ${n0}
          <h3 id="title">${r?"加载中"+l:l0({title:i,code:e,message:a,quality:o,dash:d,durl:N})}</h3>
          <ul id="durls">
            ${r?"":K({title:i,code:e,dash:d,durl:N})}
          </ul>
          <div class="beg">
            <p>
              如果这个工具确实帮到了您，烦请给个五星好评，谢谢😊
              <a class="btn" href="${O?"https://microsoftedge.microsoft.com/addons/detail/cagicamgdlbdmonbclkpgiabbldodgae":"https://chromewebstore.google.com/detail/bfcbfobhcjbkilcbehlnlchiinokiijp"}" target="_blank">去评价</a>
            </p>
          </div>
          <div id="bilibliHelperLogs">
            <h4>解析日志：</h4>
          </div>
        </div>
        <div id="actions">
          <button id="toggle" class="btn-large">${h()?"打开B站下载助手":"收起"}</button>
        </div>
      </div>
    `,Z0(n),J0(n)),n.buildDownloadLinks=()=>{n.getElementById("durls").innerHTML=K({title:i,code:e,dash:d,durl:N})}},s0=async()=>{let e=await W(),i=await z();if(e.code)return T({code:e.code,quality:x[i],title:e.data.videoData.title});let d=e.data.videoData,o=d.aid,a=d.bvid,r=d.cid;b("av:",o,"bvid:",a,"cid:",r);let N,t;if(d.pages.length>1){let m=location.search.match(/p=(\d+)/),s=d.pages[0];m&&m[1]&&(s=d.pages.find(v=>""+v.page==""+m[1])),N=s.page,t=s.part,r=s.cid}let{code:n,dash:l,qualityDescription:c,message:p}=await d0(o,a,r,i);if(n===E.OK){let m=`${d.title}`;N&&t&&(m=`${d.title}_P${N}_${t}`),T({code:n,title:m,quality:c,dash:l,message:p})}else T({code:n,message:p})},c0=async e=>{let i=await W("next"),d=await z();if(i.code)return T({code:i.code,quality:x[d],title:i.data.seasonInfo.mediaInfo.title});let o=i.data.seasonInfo.mediaInfo.episodes,a=e.ep_id,r=o.find(p=>a===p.ep_id);b("ep id:",a,"quality:",x[d]);let{code:N,dash:t,qualityDescription:n,message:l,durl:c}=await i0(d,e);if(t||c){let p=`${i.data.seasonInfo.mediaInfo.title}_${r.titleFormat||r.title||""}_${r.long_title||""}`;T({code:N,title:p,dash:t,message:l,quality:n,durl:c})}else T({code:N,message:l})},p0=(e,i)=>{let d=""+window.location.href,o=!1;(async()=>{let a=await A(".bpx-player-ctrl-quality-result");if(a){let r=a.textContent;new MutationObserver(t=>{if(t[0]?.type==="childList"){let n=t[0]?.addedNodes?.[0]?.textContent??r;r!==n&&(r=n,I(),o=!0,e())}}).observe(a,{childList:!0})}})(),i.interval=window.setInterval(()=>{let a=window.location.href;d!==a?(d=a,I(),o=!0,e()):o||(o=!0,e())},1e3)};var Z={videoInfo:null,interval:0},y0=async e=>{let i=XMLHttpRequest;H(e);let d=async()=>{if(Z.interval&&e.clearInterval(Z.interval),!V()||!w()&&!y())return;p0(async()=>{V()&&(T({loading:!0}),w()&&(b("这是一个投稿视频"),s0()),y()&&(b("这是一个番剧"),c0(Z.videoInfo)))},Z)};y()?r0(o=>{Z.videoInfo=o,j(d)},i):j(d)};y0(window);
