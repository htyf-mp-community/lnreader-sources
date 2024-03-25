"use strict";var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(n,r){function i(e){try{u(l.next(e))}catch(e){r(e)}}function o(e){try{u(l.throw(e))}catch(e){r(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}u((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,n,r,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return r={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(u){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(i=0)),i;)try{if(a=1,l&&(n=2&o[0]?l.return:o[0]?l.throw||((n=l.return)&&n.call(l),0):l.next)&&!(n=n.call(l,o[1])).done)return n;switch(l=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,l=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],l=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var l=require("@libs/fetch"),n=require("cheerio"),r=require("@libs/defaultCover"),i=require("@libs/novelStatus"),o=a(require("dayjs")),u=function(e,t){return new RegExp(t.join("|")).test(e)},s=new(function(){function a(e){var t;this.fetchImage=l.fetchFile,this.parseData=function(e){var t,a=(0,o.default)(),l=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",n=parseInt(l,10);if(!l)return e;if(u(e,["detik","segundo","second","วินาที"]))a.subtract(n,"second");else if(u(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(n,"minute");else if(u(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(n,"hours");else if(u(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(n,"days");else if(u(e,["week","semana"]))a.subtract(n,"week");else if(u(e,["month","mes"]))a.subtract(n,"month");else{if(!u(e,["year","año"]))return e;a.subtract(n,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),".png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(1+a),this.options=e.options,this.filters=e.filters}return a.prototype.getHostname=function(e){return e.split("/")[2]},a.prototype.getCheerio=function(a){return e(this,void 0,void 0,(function(){var e,r,i,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(a)];case 1:if(!(e=t.sent()).ok)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return i=n.load,[4,e.text()];case 2:if(r=i.apply(void 0,[t.sent()]),o=r("title").text().trim(),this.getHostname(a)!=this.getHostname(e.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,r]}}))}))},a.prototype.parseNovels=function(e){var t=this,a=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(l,n){var r=e(n).find(".post-title").text().trim(),i=e(n).find(".post-title").find("a").attr("href")||"";if(r&&i){var o=e(n).find("img"),u={name:r,cover:o.attr("data-src")||o.attr("src"),path:i.replace(t.site,"")};a.push(u)}})),a},a.prototype.popularNovels=function(a,l){return e(this,arguments,void 0,(function(e,a){var l,n,r,i,o,u,s=a.filters,c=a.showLatestNovels;return t(this,(function(t){switch(t.label){case 0:for(n in l=this.site+"/page/"+e+"/?s=&post_type=wp-manga",s||(s={}),c&&(l+="&m_orderby=latest"),s)if("object"==typeof s[n].value)for(r=0,i=s[n].value;r<i.length;r++)o=i[r],l+="&".concat(n,"=").concat(o);else s[n].value&&(l+="&".concat(n,"=").concat(s[n].value));return[4,this.getCheerio(l)];case 1:return u=t.sent(),[2,this.parseNovels(u)]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,u,s,c,h,v,b,p,m,d=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),(u=(0,n.load)(e))(".manga-title-badges, #manga-title span").remove(),(s={path:a,name:u(".post-title h1").text().trim()||u("#manga-title h1").text()}).cover=u(".summary_image > a > img").attr("data-lazy-src")||u(".summary_image > a > img").attr("data-src")||u(".summary_image > a > img").attr("src")||u(".summary_image > a > img").attr("src")||r.defaultCover,u(".post-content_item, .post-content").each((function(){var e=u(this).find("h5").text().trim(),t=u(this).find(".summary-content").text().trim();switch(e){case"Genre(s)":case"Género(s)":case"التصنيفات":s.genres=t;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":s.author=t;break;case"Status":case"Estado":s.status=t.includes("OnGoing")||t.includes("مستمرة")?i.NovelStatus.Ongoing:i.NovelStatus.Completed}})),u("div.summary__content .code-block,script").remove(),s.summary=u("div.summary__content").text().trim()||u("#tab-manga-about").text().trim()||u('.post-content_item h5:contains("Summary")').next().text().trim(),c=[],h="",(null===(m=this.options)||void 0===m?void 0:m.useNewChapterEndpoint)?[4,(0,l.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return h=t.sent(),[3,5];case 3:return v=u(".rating-post-id").attr("value")||u("#manga-chapters-holder").attr("data-id")||"",(b=new FormData).append("action","manga_get_chapters"),b.append("manga",v),[4,(0,l.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:b}).then((function(e){return e.text()}))];case 4:h=t.sent(),t.label=5;case 5:return"0"!==h&&(u=(0,n.load)(h)),p=u(".wp-manga-chapter").length,u(".wp-manga-chapter").each((function(e,t){var a=u(t).find("a").text().trim(),l=u(t).find("span.chapter-release-date").text().trim();l=l?d.parseData(l):(0,o.default)().format("LL");var n=u(t).find("a").attr("href")||"";c.push({name:a,path:n.replace(d.site,""),releaseTime:l||null,chapterNumber:p-e})})),s.chapters=c.reverse(),[2,s]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),r=(0,n.load)(e),[2,r(".text-left").html()||r(".text-right").html()||r(".entry-content").html()||r(".c-blog-post > div > div:nth-child(2)").html()||""]}}))}))},a.prototype.searchNovels=function(a,l){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+l+"/?s="+a+"&post_type=wp-manga",[4,this.getCheerio(e)];case 1:return n=t.sent(),[2,this.parseNovels(n)]}}))}))},a}())({id:"novelTL",sourceSite:"https://noveltranslate.com/",sourceName:"NovelTranslate",options:{},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Bleach",value:"bleach"},{label:"Chinese",value:"chinese"},{label:"Comedy",value:"comedy"},{label:"Conan",value:"conan"},{label:"cooking",value:"cooking"},{label:"Dragon Ball",value:"dragon-ball"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Erciyuan",value:"erciyuan"},{label:"Fairy Tail",value:"fairy-tail"},{label:"Faloo",value:"faloo"},{label:"Fan-Fiction",value:"fan-fiction"},{label:"Fantasy",value:"fantasy"},{label:"FoodWars!",value:"foodwars"},{label:"Game",value:"game"},{label:"Gender Bender",value:"gender-bender"},{label:"Harem",value:"harem"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Hunter x Hunter",value:"hunter-x-hunter"},{label:"Isekai",value:"isekai"},{label:"Japanese",value:"japanese"},{label:"Jojo",value:"jojo"},{label:"Josei",value:"josei"},{label:"Korean",value:"korean"},{label:"Martial Arts",value:"martial-arts"},{label:"Marvel",value:"marvel"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Military",value:"military"},{label:"Mystery",value:"mystery"},{label:"Naruto",value:"naruto"},{label:"One piece",value:"one-piece"},{label:"Pokemon",value:"pokemon"},{label:"Political",value:"political"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shoujo Ai",value:"shoujo-ai"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"Sport",value:"sport"},{label:"Sports",value:"sports"},{label:"Supernatural",value:"supernatural"},{label:"System",value:"system"},{label:"Toriko",value:"toriko"},{label:"Tragedy",value:"tragedy"},{label:"Urban",value:"urban"},{label:"Urban Life",value:"urban-life"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Yaoi",value:"yaoi"},{label:"Yuri",value:"yuri"}]},op:{type:"Switch",label:"having all selected genres",value:0},author:{type:"Text",label:"Author",value:""},artist:{type:"Text",label:"Artist",value:""},release:{type:"Text",label:"Year of Released",value:""},adult:{type:"Picker",label:"Adult content",value:"",options:[{label:"All",value:""},{label:"None adult content",value:"0"},{label:"Only adult content",value:"1"}]},"status[]":{type:"Checkbox",label:"Status",value:[],options:[{label:"OnGoing",value:"on-going"},{label:"Completed",value:"end"},{label:"Canceled",value:"canceled"},{label:"On Hold",value:"on-hold"},{label:"Upcoming",value:"upcoming"}]},m_orderby:{type:"Picker",label:"Order by",value:"",options:[{label:"Relevance",value:""},{label:"Latest",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Rating",value:"rating"},{label:"Trending",value:"trending"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"}]}}});exports.default=s;