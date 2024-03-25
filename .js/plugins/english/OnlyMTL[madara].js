"use strict";var t=this&&this.__awaiter||function(t,e,r,n){return new(r||(r=Promise))((function(a,i){function s(t){try{c(n.next(t))}catch(t){i(t)}}function o(t){try{c(n.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,o)}c((n=n.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var r,n,a,i,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(o){return function(c){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;i&&(i=0,o[0]&&(s=0)),s;)try{if(r=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return s.label++,{value:o[1],done:0};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(a=s.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){s.label=o[1];break}if(6===o[0]&&s.label<a[1]){s.label=a[1],a=o;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(o);break}a[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],n=0}finally{r=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,c])}}},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:1});var n=require("@libs/fetch"),a=require("cheerio"),i=require("@libs/defaultCover"),s=require("@libs/novelStatus"),o=r(require("dayjs")),c=function(t,e){return new RegExp(e.join("|")).test(t)},u=new(function(){function r(t){var e;this.fetchImage=n.fetchFile,this.parseData=function(t){var e,r=(0,o.default)(),n=(null===(e=t.match(/\d+/))||void 0===e?void 0:e[0])||"",a=parseInt(n,10);if(!n)return t;if(c(t,["detik","segundo","second","วินาที"]))r.subtract(a,"second");else if(c(t,["menit","dakika","min","minute","minuto","นาที","دقائق"]))r.subtract(a,"minute");else if(c(t,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))r.subtract(a,"hours");else if(c(t,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))r.subtract(a,"days");else if(c(t,["week","semana"]))r.subtract(a,"week");else if(c(t,["month","mes"]))r.subtract(a,"month");else{if(!c(t,["year","año"]))return t;r.subtract(a,"year")}return r.format("LL")},this.id=t.id,this.name=t.sourceName,this.icon="multisrc/madara/".concat(t.id.toLowerCase(),".png"),this.site=t.sourceSite;var r=(null===(e=t.options)||void 0===e?void 0:e.versionIncrements)||0;this.version="1.0.".concat(1+r),this.options=t.options,this.filters=t.filters}return r.prototype.getHostname=function(t){return t.split("/")[2]},r.prototype.getCheerio=function(r){return t(this,void 0,void 0,(function(){var t,i,s,o;return e(this,(function(e){switch(e.label){case 0:return[4,(0,n.fetchApi)(r)];case 1:if(!(t=e.sent()).ok)throw new Error("Could not reach site ("+t.status+") try to open in webview.");return s=a.load,[4,t.text()];case 2:if(i=s.apply(void 0,[e.sent()]),o=i("title").text().trim(),this.getHostname(r)!=this.getHostname(t.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},r.prototype.parseNovels=function(t){var e=this,r=[];return t(".manga-title-badges").remove(),t(".page-item-detail, .c-tabs-item__content").each((function(n,a){var i=t(a).find(".post-title").text().trim(),s=t(a).find(".post-title").find("a").attr("href")||"";if(i&&s){var o=t(a).find("img"),c={name:i,cover:o.attr("data-src")||o.attr("src"),path:s.replace(e.site,"")};r.push(c)}})),r},r.prototype.popularNovels=function(r,n){return t(this,arguments,void 0,(function(t,r){var n,a,i,s,o,c,u=r.filters,l=r.showLatestNovels;return e(this,(function(e){switch(e.label){case 0:for(a in n=this.site+"/page/"+t+"/?s=&post_type=wp-manga",u||(u={}),l&&(n+="&m_orderby=latest"),u)if("object"==typeof u[a].value)for(i=0,s=u[a].value;i<s.length;i++)o=s[i],n+="&".concat(a,"=").concat(o);else u[a].value&&(n+="&".concat(a,"=").concat(u[a].value));return[4,this.getCheerio(n)];case 1:return c=e.sent(),[2,this.parseNovels(c)]}}))}))},r.prototype.parseNovel=function(r){return t(this,void 0,void 0,(function(){var t,c,u,l,h,p,f,m,d,v=this;return e(this,(function(e){switch(e.label){case 0:return[4,(0,n.fetchApi)(this.site+r).then((function(t){return t.text()}))];case 1:return t=e.sent(),(c=(0,a.load)(t))(".manga-title-badges, #manga-title span").remove(),(u={path:r,name:c(".post-title h1").text().trim()||c("#manga-title h1").text()}).cover=c(".summary_image > a > img").attr("data-lazy-src")||c(".summary_image > a > img").attr("data-src")||c(".summary_image > a > img").attr("src")||c(".summary_image > a > img").attr("src")||i.defaultCover,c(".post-content_item, .post-content").each((function(){var t=c(this).find("h5").text().trim(),e=c(this).find(".summary-content").text().trim();switch(t){case"Genre(s)":case"Género(s)":case"التصنيفات":u.genres=e;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":u.author=e;break;case"Status":case"Estado":u.status=e.includes("OnGoing")||e.includes("مستمرة")?s.NovelStatus.Ongoing:s.NovelStatus.Completed}})),c("div.summary__content .code-block,script").remove(),u.summary=c("div.summary__content").text().trim()||c("#tab-manga-about").text().trim()||c('.post-content_item h5:contains("Summary")').next().text().trim(),l=[],h="",(null===(d=this.options)||void 0===d?void 0:d.useNewChapterEndpoint)?[4,(0,n.fetchApi)(this.site+r+"ajax/chapters/",{method:"POST"}).then((function(t){return t.text()}))]:[3,3];case 2:return h=e.sent(),[3,5];case 3:return p=c(".rating-post-id").attr("value")||c("#manga-chapters-holder").attr("data-id")||"",(f=new FormData).append("action","manga_get_chapters"),f.append("manga",p),[4,(0,n.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:f}).then((function(t){return t.text()}))];case 4:h=e.sent(),e.label=5;case 5:return"0"!==h&&(c=(0,a.load)(h)),m=c(".wp-manga-chapter").length,c(".wp-manga-chapter").each((function(t,e){var r=c(e).find("a").text().trim(),n=c(e).find("span.chapter-release-date").text().trim();n=n?v.parseData(n):(0,o.default)().format("LL");var a=c(e).find("a").attr("href")||"";l.push({name:r,path:a.replace(v.site,""),releaseTime:n||null,chapterNumber:m-t})})),u.chapters=l.reverse(),[2,u]}}))}))},r.prototype.parseChapter=function(r){return t(this,void 0,void 0,(function(){var t,i;return e(this,(function(e){switch(e.label){case 0:return[4,(0,n.fetchApi)(this.site+r).then((function(t){return t.text()}))];case 1:return t=e.sent(),i=(0,a.load)(t),[2,i(".text-left").html()||i(".text-right").html()||i(".entry-content").html()||i(".c-blog-post > div > div:nth-child(2)").html()||""]}}))}))},r.prototype.searchNovels=function(r,n){return t(this,void 0,void 0,(function(){var t,a;return e(this,(function(e){switch(e.label){case 0:return t=this.site+"page/"+n+"/?s="+r+"&post_type=wp-manga",[4,this.getCheerio(t)];case 1:return a=e.sent(),[2,this.parseNovels(a)]}}))}))},r}())({id:"onlymtl",sourceSite:"https://www.onlymtl.com/",sourceName:"OnlyMTL",options:{useNewChapterEndpoint:1}});exports.default=u;