var e=this&&this.__awaiter||function(e,t,a,n){return new(a||(a=Promise))((function(l,r){function i(e){try{u(n.next(e))}catch(e){r(e)}}function o(e){try{u(n.throw(e))}catch(e){r(e)}}function u(e){var t;e.done?l(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}u((n=n.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,n,l,r,i={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]};return r={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(u){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(i=0)),i;)try{if(a=1,n&&(l=2&o[0]?n.return:o[0]?n.throw||((l=n.return)&&l.call(n),0):n.next)&&!(l=l.call(n,o[1])).done)return l;switch(n=0,l&&(o=[2&o[0],l.value]),o[0]){case 0:case 1:l=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(l=i.trys,(l=l.length>0&&l[l.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!l||o[1]>l[0]&&o[1]<l[3])){i.label=o[1];break}if(6===o[0]&&i.label<l[1]){i.label=l[1],l=o;break}if(l&&i.label<l[2]){i.label=l[2],i.ops.push(o);break}l[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{a=l=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var n=require("htmlparser2"),l=require("@libs/fetch"),r=require("@libs/filterInputs"),i=a(require("dayjs")),o=function(){function a(){this.id="lightnovelpub",this.name="LightNovelPub",this.version="2.0.0",this.icon="src/en/lightnovelpub/icon.png",this.site="https://www.lightnovelpub.com/",this.headers={Accept:"application/json","Content-Type":"application/json"},this.filters={order:{value:"popular",label:"Order by",options:[{label:"New",value:"new"},{label:"Popular",value:"popular"},{label:"Updates",value:"updated"}],type:r.FilterTypes.Picker},status:{value:"all",label:"Status",options:[{label:"All",value:"all"},{label:"Completed",value:"completed"},{label:"Ongoing",value:"ongoing"}],type:r.FilterTypes.Picker},genres:{value:"all",label:"Genre",options:[{label:"All",value:"all"},{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Drama",value:"drama"},{label:"Fantasy",value:"fantasy"},{label:"Harem",value:"harem"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Romance",value:"romance"},{label:"Tragedy",value:"tragedy"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Ecchi",value:"ecchi"},{label:"Comedy",value:"comedy"},{label:"Slice of Life",value:"slice-of-life"},{label:"Mystery",value:"mystery"},{label:"Supernatural",value:"supernatural"},{label:"Psychological",value:"psychological"},{label:"Sci-fi",value:"sci-fi"},{label:"Xianxia",value:"xianxia"},{label:"School Life",value:"school-life"},{label:"Josei",value:"josei"},{label:"Wuxia",value:"wuxia"},{label:"Shounen",value:"shounen"},{label:"Horror",value:"horror"},{label:"Mecha",value:"mecha"},{label:"Historical",value:"historical"},{label:"Shoujo",value:"shoujo"},{label:"Adult",value:"adult"},{label:"Seinen",value:"seinen"},{label:"Sports",value:"sports"},{label:"Lolicon",value:"lolicon"},{label:"Gender Bender",value:"gender-bender"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Yaoi",value:"yaoi"},{label:"Video Games",value:"video-games"},{label:"Smut",value:"smut"},{label:"Magical Realism",value:"magical-realism"},{label:"Eastern Fantasy",value:"eastern-fantasy"},{label:"Contemporary Romance",value:"contemporary-romance"},{label:"Fantasy Romance",value:"fantasy-romance"},{label:"Shoujo Ai",value:"shoujo-ai"},{label:"Yuri",value:"yuri"}],type:r.FilterTypes.Picker}}}return a.prototype.parseNovels=function(e){var t=[],a={},l=0,r=new n.Parser({onopentag:function(e,n){l&&("a"===e&&(a.path=n.href.slice(1),a.name=n.title),"img"===e&&(a.cover=n["data-src"]||n.src),a.path&&a.cover&&(t.push(a),a={}))},onattribute:function(e,t){"class"===e&&"novel-item"===t&&(l=1)},onclosetag:function(e){"li"===e&&(l=0)}});return r.write(e),r.end(),t},a.prototype.popularNovels=function(a,n){return e(this,arguments,void 0,(function(e,a){var n,r,i=a.filters;return t(this,(function(t){switch(t.label){case 0:return n="".concat(this.site,"browse/"),n+="".concat(i.genres.value,"/"),n+="".concat(i.order.value,"/"),n+="".concat(i.status.value,"/"),n+=e,[4,(0,l.fetchApi)(n).then((function(e){return e.text()}))];case 1:return r=t.sent(),[2,this.parseNovels(r)]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,r,i,o,u,s,c,h,v,p,f,b,d;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),r={path:a,name:"",summary:"",totalPages:1,chapters:[]},i=0,o=0,u=0,s=0,c=0,h=0,v=0,p=0,f=[],b=0,d=new n.Parser({onopentag:function(e,t){var a,n;"h1"===e&&(null===(a=t.class)||void 0===a?void 0:a.includes("novel-title"))&&(s=1),"div"===e&&(null===(n=t.class)||void 0===n?void 0:n.includes("content"))&&(h=1),"figure"===e&&"cover"===t.class&&(b=1),b&&"img"===e&&(r.cover=t["data-src"]||t.src)},onopentagname:function(e){i&&"strong"===e&&(o=1),h&&"br"===e&&(r.summary+="\n"),v&&"a"===e&&(p=1)},onattribute:function(e,t){"class"===e&&"header-stats"===t&&(u=1,i=1),"itemprop"===e&&"author"===t&&(c=1),"class"===e&&"categories"===t&&(v=1)},ontext:function(e){u&&(r.totalPages=Math.ceil(parseInt(e,10)/100)),o&&(r.status=e.trim()),s&&(r.name+=e.trim()),c&&(r.author=e),h&&(r.summary+=e),p&&f.push(e)},onclosetag:function(e){"strong"===e&&(u=0,o=0),"i"===e&&(o=0),"h1"===e&&(s=0),"span"===e&&(c=0),"div"===e&&(i=0,h=0,v=0),"a"===e&&(p=0),"figure"===e&&(b=0)}}),d.write(e),d.end(),r.genres=f.join(", "),[2,r]}}))}))},a.prototype.parsePage=function(a,r){return e(this,void 0,void 0,(function(){var e,o,u,s,c,h,v;return t(this,(function(t){switch(t.label){case 0:return e=this.site+a+"/chapters/page-"+r,[4,(0,l.fetchApi)(e).then((function(e){return e.text()}))];case 1:return o=t.sent(),u=[],s={},c=0,h=0,(v=new n.Parser({onopentag:function(e,t){h&&("li"===e&&(c=1,s.chapterNumber=Number(t["data-orderno"])),c&&("a"===e&&(s.name=t.title,s.path=t.href.slice(1)),"time"===e&&(s.releaseTime=(0,i.default)(t.datetime).toISOString()),s.chapterNumber&&s.path&&s.releaseTime&&(u.push(s),s={})))},onattribute:function(e,t){"class"===e&&"chapter-list"===t&&(h=1)},onclosetag:function(e){"a"===e&&(c=0),"ul"===e&&(h=0)}})).write(o),v.end(),[2,{chapters:u}]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,r,i,o,u,s;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),r="",i=0,o=0,u=0,(s=new n.Parser({onopentag:function(e,t){if(i&&"div"===e){var a=t.style;a?(r+='<div style="'.concat(a,'">'),u=1):r+="<div>"}if(i&&"table"===e){var n=t.width;r+=n?'<table width="'.concat(n,'">'):"<table>"}if(i&&"tbody"===e&&(r+="<tbody>"),i&&"tr"===e&&(r+="<tr>"),i&&"td"===e){var l=t.width;r+=l?'<td width="'.concat(l,'">'):"<td>"}},onattribute:function(e,t){"id"===e&&"chapter-container"===t&&(i=1),"class"===e&&(null==t?void 0:t.includes("chapternav"))&&(i=0,o=0)},onopentagname:function(e){i&&"p"===e&&(r+="<p>",o=1,u&&(u=0)),i&&"br"===e&&(r+="<br>")},ontext:function(e){o&&(r+=e),u&&(r+=e)},onclosetag:function(e){"p"===e&&(o=0,r+="</p>"),i&&"td"===e&&(r+="</td>"),i&&"tr"===e&&(r+="</tr>"),i&&"tbody"===e&&(r+="</tbody>"),i&&"table"===e&&(r+="</table>"),i&&"div"===e&&(u=0,r+="</div>")}})).write(e),s.end(),[2,r]}}))}))},a.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,r,i,o,u,s,c;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site,"lnsearchlive"),r="".concat(this.site,"search"),[4,(0,l.fetchApi)(r).then((function(e){return e.text()}))];case 1:return i=t.sent(),o="",u=new n.Parser({onopentag:function(e,t){var a;"input"===e&&(null===(a=t.name)||void 0===a?void 0:a.includes("LNRequestVerifyToken"))&&(o=t.value)}}),u.write(i),u.end(),(s=new FormData).append("inputContent",a),[4,(0,l.fetchApi)(e,{method:"POST",headers:{LNRequestVerifyToken:o},body:s}).then((function(e){return e.json()}))];case 2:return c=t.sent(),[2,this.parseNovels(c.resultview)]}}))}))},a.prototype.fetchImage=function(a){return e(this,void 0,void 0,(function(){return t(this,(function(e){return[2,(0,l.fetchFile)(a,{headers:this.headers})]}))}))},a}();exports.default=new o;