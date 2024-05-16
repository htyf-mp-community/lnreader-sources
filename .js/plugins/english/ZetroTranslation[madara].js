var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(n,i){function l(e){try{s(r.next(e))}catch(e){i(e)}}function o(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(l,o)}s((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,n,i,l={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(o){return function(s){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,o[0]&&(l=0)),l;)try{if(a=1,r&&(n=2&o[0]?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return l.label++,{value:o[1],done:0};case 5:l.label++,r=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!(n=l.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){l=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){l.label=o[1];break}if(6===o[0]&&l.label<n[1]){l.label=n[1],n=o;break}if(n&&l.label<n[2]){l.label=n[2],l.ops.push(o);break}n[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(e){o=[6,e],r=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,s])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("@libs/fetch"),n=require("cheerio"),i=require("@libs/defaultCover"),l=require("@libs/novelStatus"),o=a(require("dayjs")),s=function(e,t){return new RegExp(t.join("|")).test(e)},u=new(function(){function a(e){var t;this.fetchImage=r.fetchFile,this.parseData=function(e){var t,a=(0,o.default)(),r=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",n=parseInt(r,10);if(!r)return e;if(s(e,["detik","segundo","second","วินาที"]))a.subtract(n,"second");else if(s(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(n,"minute");else if(s(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(n,"hours");else if(s(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(n,"days");else if(s(e,["week","semana"]))a.subtract(n,"week");else if(s(e,["month","mes"]))a.subtract(n,"month");else{if(!s(e,["year","año"]))return e;a.subtract(n,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(1+a),this.options=e.options,this.filters=e.filters}return a.prototype.getHostname=function(e){return e.split("/")[2]},a.prototype.getCheerio=function(a){return e(this,void 0,void 0,(function(){var e,i,l,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(a)];case 1:if(!(e=t.sent()).ok)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return l=n.load,[4,e.text()];case 2:if(i=l.apply(void 0,[t.sent()]),o=i("title").text().trim(),this.getHostname(a)!=this.getHostname(e.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},a.prototype.parseNovels=function(e){var t=this,a=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(r,n){var i=e(n).find(".post-title").text().trim(),l=e(n).find(".post-title").find("a").attr("href")||"";if(i&&l){var o=e(n).find("img"),s={name:i,cover:o.attr("data-src")||o.attr("src")||o.attr("data-lazy-srcset"),path:l.replace(t.site,"")};a.push(s)}})),a},a.prototype.popularNovels=function(a,r){return e(this,arguments,void 0,(function(e,a){var r,n,i,l,o,s,u=a.filters,c=a.showLatestNovels;return t(this,(function(t){switch(t.label){case 0:for(n in r=this.site+"/page/"+e+"/?s=&post_type=wp-manga",u||(u={}),c&&(r+="&m_orderby=latest"),u)if("object"==typeof u[n].value)for(i=0,l=u[n].value;i<l.length;i++)o=l[i],r+="&".concat(n,"=").concat(o);else u[n].value&&(r+="&".concat(n,"=").concat(u[n].value));return[4,this.getCheerio(r)];case 1:return s=t.sent(),[2,this.parseNovels(s)]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,s,u,c,h,p,v,d,m,f=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),(s=(0,n.load)(e))(".manga-title-badges, #manga-title span").remove(),(u={path:a,name:s(".post-title h1").text().trim()||s("#manga-title h1").text()}).cover=s(".summary_image > a > img").attr("data-lazy-src")||s(".summary_image > a > img").attr("data-src")||s(".summary_image > a > img").attr("src")||i.defaultCover,s(".post-content_item, .post-content").each((function(){var e=s(this).find("h5").text().trim(),t=s(this).find(".summary-content").text().trim();switch(e){case"Genre(s)":case"Género(s)":case"التصنيفات":u.genres=t;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":u.author=t;break;case"Status":case"Estado":u.status=t.includes("OnGoing")||t.includes("مستمرة")?l.NovelStatus.Ongoing:l.NovelStatus.Completed}})),s("div.summary__content .code-block,script").remove(),u.summary=s("div.summary__content").text().trim()||s("#tab-manga-about").text().trim()||s('.post-content_item h5:contains("Summary")').next().text().trim(),c=[],h="",(null===(m=this.options)||void 0===m?void 0:m.useNewChapterEndpoint)?[4,(0,r.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return h=t.sent(),[3,5];case 3:return p=s(".rating-post-id").attr("value")||s("#manga-chapters-holder").attr("data-id")||"",(v=new FormData).append("action","manga_get_chapters"),v.append("manga",p),[4,(0,r.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:v}).then((function(e){return e.text()}))];case 4:h=t.sent(),t.label=5;case 5:return"0"!==h&&(s=(0,n.load)(h)),d=s(".wp-manga-chapter").length,s(".wp-manga-chapter").each((function(e,t){var a=s(t).find("a").text().trim(),r=s(t).find("span.chapter-release-date").text().trim();r=r?f.parseData(r):(0,o.default)().format("LL");var n=s(t).find("a").attr("href")||"";c.push({name:a,path:n.replace(f.site,""),releaseTime:r||null,chapterNumber:d-e})})),u.chapters=c.reverse(),[2,u]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,i;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),i=(0,n.load)(e),[2,i(".text-left").html()||i(".text-right").html()||i(".entry-content").html()||i(".c-blog-post > div > div:nth-child(2)").html()||""]}}))}))},a.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+r+"/?s="+a+"&post_type=wp-manga",[4,this.getCheerio(e)];case 1:return n=t.sent(),[2,this.parseNovels(n)]}}))}))},a}())({id:"zetroTL",sourceSite:"https://zetrotranslation.com/",sourceName:"Zetro Translation",options:{},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Dark Elf",value:"dark-elf"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Fantasy",value:"fantasy"},{label:"Harem",value:"harem"},{label:"Horror",value:"horror"},{label:"Isekai",value:"isekai"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"NTR",value:"ntr"},{label:"Original Works",value:"original-works"},{label:"Rom-Com",value:"rom-com"},{label:"Romance",value:"romance"},{label:"School",value:"school"},{label:"Shoujo",value:"shoujo"},{label:"Slice of Life",value:"slice-of-life"},{label:"Villain",value:"villain"},{label:"Yuri",value:"yuri"}]},op:{type:"Switch",label:"having all selected genres",value:0},author:{type:"Text",label:"Author",value:""},artist:{type:"Text",label:"Artist",value:""},release:{type:"Text",label:"Year of Released",value:""},adult:{type:"Picker",label:"Adult content",value:"",options:[{label:"All",value:""},{label:"None adult content",value:"0"},{label:"Only adult content",value:"1"}]},"status[]":{type:"Checkbox",label:"Status",value:[],options:[{label:"Completed",value:"complete"},{label:"Ongoing",value:"on-going"},{label:"Canceled",value:"canceled"},{label:"On Hold",value:"on-hold"}]},m_orderby:{type:"Picker",label:"Order by",value:"",options:[{label:"Relevance",value:""},{label:"Latest",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Rating",value:"rating"},{label:"Trending",value:"trending"},{label:"Most Views",value:"views"},{label:"New",value:"new-manga"}]}}});exports.default=u;