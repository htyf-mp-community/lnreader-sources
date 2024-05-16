var e=this&&this.__awaiter||function(e,t,a,n){return new(a||(a=Promise))((function(r,l){function i(e){try{s(n.next(e))}catch(e){l(e)}}function o(e){try{s(n.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}s((n=n.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,n,r,l,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return l={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function o(o){return function(s){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;l&&(l=0,o[0]&&(i=0)),i;)try{if(a=1,n&&(r=2&o[0]?n.return:o[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,o[1])).done)return r;switch(n=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,n=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){i.label=o[1];break}if(6===o[0]&&i.label<r[1]){i.label=r[1],r=o;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(o);break}r[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],n=0}finally{a=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,s])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var n=require("@libs/fetch"),r=require("cheerio"),l=require("@libs/defaultCover"),i=require("@libs/novelStatus"),o=a(require("dayjs")),s=function(e,t){return new RegExp(t.join("|")).test(e)},u=new(function(){function a(e){var t;this.fetchImage=n.fetchFile,this.parseData=function(e){var t,a=(0,o.default)(),n=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",r=parseInt(n,10);if(!n)return e;if(s(e,["detik","segundo","second","วินาที"]))a.subtract(r,"second");else if(s(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(r,"minute");else if(s(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(r,"hours");else if(s(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(r,"days");else if(s(e,["week","semana"]))a.subtract(r,"week");else if(s(e,["month","mes"]))a.subtract(r,"month");else{if(!s(e,["year","año"]))return e;a.subtract(r,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(1+a),this.options=e.options,this.filters=e.filters}return a.prototype.getHostname=function(e){return e.split("/")[2]},a.prototype.getCheerio=function(a){return e(this,void 0,void 0,(function(){var e,l,i,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,n.fetchApi)(a)];case 1:if(!(e=t.sent()).ok)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return i=r.load,[4,e.text()];case 2:if(l=i.apply(void 0,[t.sent()]),o=l("title").text().trim(),this.getHostname(a)!=this.getHostname(e.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,l]}}))}))},a.prototype.parseNovels=function(e){var t=this,a=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(n,r){var l=e(r).find(".post-title").text().trim(),i=e(r).find(".post-title").find("a").attr("href")||"";if(l&&i){var o=e(r).find("img"),s={name:l,cover:o.attr("data-src")||o.attr("src")||o.attr("data-lazy-srcset"),path:i.replace(t.site,"")};a.push(s)}})),a},a.prototype.popularNovels=function(a,n){return e(this,arguments,void 0,(function(e,a){var n,r,l,i,o,s,u=a.filters,c=a.showLatestNovels;return t(this,(function(t){switch(t.label){case 0:for(r in n=this.site+"/page/"+e+"/?s=&post_type=wp-manga",u||(u={}),c&&(n+="&m_orderby=latest"),u)if("object"==typeof u[r].value)for(l=0,i=u[r].value;l<i.length;l++)o=i[l],n+="&".concat(r,"=").concat(o);else u[r].value&&(n+="&".concat(r,"=").concat(u[r].value));return[4,this.getCheerio(n)];case 1:return s=t.sent(),[2,this.parseNovels(s)]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,s,u,c,h,p,v,d,m,f=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,n.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),(s=(0,r.load)(e))(".manga-title-badges, #manga-title span").remove(),(u={path:a,name:s(".post-title h1").text().trim()||s("#manga-title h1").text()}).cover=s(".summary_image > a > img").attr("data-lazy-src")||s(".summary_image > a > img").attr("data-src")||s(".summary_image > a > img").attr("src")||l.defaultCover,s(".post-content_item, .post-content").each((function(){var e=s(this).find("h5").text().trim(),t=s(this).find(".summary-content").text().trim();switch(e){case"Genre(s)":case"Género(s)":case"التصنيفات":u.genres=t;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":u.author=t;break;case"Status":case"Estado":u.status=t.includes("OnGoing")||t.includes("مستمرة")?i.NovelStatus.Ongoing:i.NovelStatus.Completed}})),s("div.summary__content .code-block,script").remove(),u.summary=s("div.summary__content").text().trim()||s("#tab-manga-about").text().trim()||s('.post-content_item h5:contains("Summary")').next().text().trim(),c=[],h="",(null===(m=this.options)||void 0===m?void 0:m.useNewChapterEndpoint)?[4,(0,n.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return h=t.sent(),[3,5];case 3:return p=s(".rating-post-id").attr("value")||s("#manga-chapters-holder").attr("data-id")||"",(v=new FormData).append("action","manga_get_chapters"),v.append("manga",p),[4,(0,n.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:v}).then((function(e){return e.text()}))];case 4:h=t.sent(),t.label=5;case 5:return"0"!==h&&(s=(0,r.load)(h)),d=s(".wp-manga-chapter").length,s(".wp-manga-chapter").each((function(e,t){var a=s(t).find("a").text().trim(),n=s(t).find("span.chapter-release-date").text().trim();n=n?f.parseData(n):(0,o.default)().format("LL");var r=s(t).find("a").attr("href")||"";c.push({name:a,path:r.replace(f.site,""),releaseTime:n||null,chapterNumber:d-e})})),u.chapters=c.reverse(),[2,u]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,l;return t(this,(function(t){switch(t.label){case 0:return[4,(0,n.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),l=(0,r.load)(e),[2,l(".text-left").html()||l(".text-right").html()||l(".entry-content").html()||l(".c-blog-post > div > div:nth-child(2)").html()||""]}}))}))},a.prototype.searchNovels=function(a,n){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+n+"/?s="+a+"&post_type=wp-manga",[4,this.getCheerio(e)];case 1:return r=t.sent(),[2,this.parseNovels(r)]}}))}))},a}())({id:"boxnovel",sourceSite:"https://boxnovel.com/",sourceName:"BoxNovel",options:{useNewChapterEndpoint:1},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Drama",value:"drama"},{label:"Eastern",value:"eastern"},{label:"Ecchi",value:"ecchi"},{label:"Fantasy",value:"fantasy"},{label:"Gender Bender",value:"gender-bender"},{label:"Harem",value:"harem"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Josei",value:"josei"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shounen",value:"shounen"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"Sports",value:"sports"},{label:"Supernatural",value:"supernatural"},{label:"Tragedy",value:"tragedy"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Yaoi",value:"yaoi"}]},op:{type:"Switch",label:"having all selected genres",value:0},author:{type:"Text",label:"Author",value:""},artist:{type:"Text",label:"Artist",value:""},release:{type:"Text",label:"Year of Released",value:""},adult:{type:"Picker",label:"Adult content",value:"",options:[{label:"All",value:""},{label:"None adult content",value:"0"},{label:"Only adult content",value:"1"}]},"status[]":{type:"Checkbox",label:"Status",value:[],options:[{label:"OnGoing",value:"on-going"},{label:"Completed",value:"end"},{label:"Canceled",value:"canceled"},{label:"On Hold",value:"on-hold"},{label:"Upcoming",value:"upcoming"}]},m_orderby:{type:"Picker",label:"Order by",value:"",options:[{label:"Relevance",value:""},{label:"Latest",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Rating",value:"rating"},{label:"Trending",value:"trending"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"}]}}});exports.default=u;