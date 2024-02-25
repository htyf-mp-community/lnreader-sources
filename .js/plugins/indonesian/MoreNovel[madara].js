"use strict";var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(n,i){function l(e){try{s(r.next(e))}catch(e){i(e)}}function o(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(l,o)}s((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,n,i,l={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(o){return function(s){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,o[0]&&(l=0)),l;)try{if(a=1,r&&(n=2&o[0]?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return l.label++,{value:o[1],done:0};case 5:l.label++,r=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!(n=l.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){l=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){l.label=o[1];break}if(6===o[0]&&l.label<n[1]){l.label=n[1],n=o;break}if(n&&l.label<n[2]){l.label=n[2],l.ops.push(o);break}n[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(e){o=[6,e],r=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,s])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("@libs/fetch"),n=require("@libs/filterInputs"),i=require("cheerio"),l=require("@libs/defaultCover"),o=require("@libs/novelStatus"),s=a(require("dayjs")),u=function(e,t){return new RegExp(t.join("|")).test(e)},c="novel-genre",h="novel",v=new(function(){function a(e){this.fetchImage=r.fetchFile,this.parseData=function(e){var t,a=(0,s.default)(),r=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",n=parseInt(r,10);if(!r)return e;if(u(e,["detik","segundo","second","วินาที"]))a.subtract(n,"second");else if(u(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(n,"minute");else if(u(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(n,"hours");else if(u(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(n,"days");else if(u(e,["week","semana"]))a.subtract(n,"week");else if(u(e,["month","mes"]))a.subtract(n,"month");else{if(!u(e,["year","año"]))return e;a.subtract(n,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName;var t=e.sourceName.replace(/\s+/g,"").toLowerCase();this.icon="multisrc/madara/icons/".concat(t,".png"),this.site=e.sourceSite,this.version="1.0.0",this.options=e.options,this.filters=e.filters}return a.prototype.popularNovels=function(a,n){var l,o,s,u,v,d,p=n.filters,f=n.showLatestNovels;return e(this,void 0,void 0,(function(){var e,n,m,b,g=this;return t(this,(function(t){switch(t.label){case 0:return e=[],n=this.site,(null===(l=null==p?void 0:p.genres)||void 0===l?void 0:l.value)?n+=((null===(s=null===(o=this.options)||void 0===o?void 0:o.path)||void 0===s?void 0:s.genres)||c)+"/"+p.genres.value:n+=(null===(v=null===(u=this.options)||void 0===u?void 0:u.path)||void 0===v?void 0:v.novels)||h,n+="/page/"+a+"/?m_orderby="+(f?"latest":(null===(d=null==p?void 0:p.sort)||void 0===d?void 0:d.value)||"rating"),[4,(0,r.fetchApi)(n).then((function(e){return e.text()}))];case 1:return m=t.sent(),(b=(0,i.load)(m))(".manga-title-badges").remove(),b(".page-item-detail").each((function(t,a){var r=b(a).find(".post-title").text().trim(),n=b(a).find(".post-title").find("a").attr("href")||"";if(r&&n){var i=b(a).find("img"),l={name:r,cover:i.attr("data-src")||i.attr("src"),path:n.replace(g.site,"")};e.push(l)}})),[2,e]}}))}))},a.prototype.parseNovel=function(a){var n;return e(this,void 0,void 0,(function(){var e,u,c,h,v,d,p,f,m=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),(u=(0,i.load)(e))(".manga-title-badges, #manga-title span").remove(),(c={path:a,name:u(".post-title h1").text().trim()||u("#manga-title h1").text()}).cover=u(".summary_image > a > img").attr("data-lazy-src")||u(".summary_image > a > img").attr("data-src")||u(".summary_image > a > img").attr("src")||u(".summary_image > a > img").attr("src")||l.defaultCover,u(".post-content_item, .post-content").each((function(){var e=u(this).find("h5").text().trim(),t=u(this).find(".summary-content").text().trim();switch(e){case"Genre(s)":case"Género(s)":case"التصنيفات":c.genres=t;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":c.author=t;break;case"Status":case"Estado":c.status=t.includes("OnGoing")||t.includes("مستمرة")?o.NovelStatus.Ongoing:o.NovelStatus.Completed}})),u("div.summary__content .code-block,script").remove(),c.summary=u("div.summary__content").text().trim()||u("#tab-manga-about").text().trim()||u('.post-content_item h5:contains("Summary")').next().text().trim(),h=[],v="",(null===(n=this.options)||void 0===n?void 0:n.useNewChapterEndpoint)?[4,(0,r.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return v=t.sent(),[3,5];case 3:return d=u(".rating-post-id").attr("value")||u("#manga-chapters-holder").attr("data-id")||"",(p=new FormData).append("action","manga_get_chapters"),p.append("manga",d),[4,(0,r.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:p}).then((function(e){return e.text()}))];case 4:v=t.sent(),t.label=5;case 5:return"0"!==v&&(u=(0,i.load)(v)),f=u(".wp-manga-chapter").length,u(".wp-manga-chapter").each((function(e,t){var a=u(t).find("a").text().trim(),r=u(t).find("span.chapter-release-date").text().trim();r=r?m.parseData(r):(0,s.default)().format("LL");var n=u(t).find("a").attr("href")||"";h.push({name:a,path:n.replace(m.site,""),releaseTime:r||null,chapterNumber:f-e})})),c.chapters=h.reverse(),[2,c]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),n=(0,i.load)(e),[2,n(".text-left").html()||n(".text-right").html()||n(".entry-content").html()||n(".c-blog-post > div > div:nth-child(2)").html()||""]}}))}))},a.prototype.searchNovels=function(a,n){return e(this,void 0,void 0,(function(){var e,n,l,o,s=this;return t(this,(function(t){switch(t.label){case 0:return e=[],n=this.site+"?s="+a+"&post_type=wp-manga",[4,(0,r.fetchApi)(n).then((function(e){return e.text()}))];case 1:return l=t.sent(),(o=(0,i.load)(l))(".c-tabs-item__content").each((function(t,a){var r=o(a).find(".post-title").text().trim(),n=o(a).find(".post-title").find("a").attr("href")||"";if(r&&n){var i=o(a).find("img"),l={name:r,cover:i.attr("data-src")||i.attr("src"),path:n.replace(s.site,"")};e.push(l)}})),[2,e]}}))}))},a}())({id:"morenovel",sourceSite:"https://morenovel.net/",sourceName:"MoreNovel",filters:{sort:{label:"Order by",value:"",options:[{label:"Rating",value:"rating"},{label:"A-Z",value:"alphabet"},{label:"Latest",value:"latest"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"},{label:"Trending",value:"trending"}],type:n.FilterTypes.Picker},genres:{label:"GENRES",value:"",options:[{label:"NONE",value:""},{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Fantasy",value:"fantasy"},{label:"Gender Bender",value:"gender-bender"},{label:"Harem",value:"harem"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Josei",value:"josei"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shoujo Ai",value:"shoujo-ai"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Slice of Life",value:"slice-of-life"},{label:"Sports",value:"sports"},{label:"Supernatural",value:"supernatural"},{label:"Tragedy",value:"tragedy"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Yaoi",value:"yaoi"},{label:"Yuri",value:"yuri"}],type:n.FilterTypes.Picker}},options:{useNewChapterEndpoint:1,lang:"Indonesian"}});exports.default=v;