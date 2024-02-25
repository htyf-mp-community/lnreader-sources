"use strict";var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(a,i){function s(t){try{u(r.next(t))}catch(t){i(t)}}function o(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,o)}u((r=r.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var n,r,a,i,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(o){return function(u){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,o[0]&&(s=0)),s;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return s.label++,{value:o[1],done:0};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(a=s.trys,(a=a.length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){s.label=o[1];break}if(6===o[0]&&s.label<a[1]){s.label=a[1],a=o;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(o);break}a[2]&&s.ops.pop(),s.trys.pop();continue}o=e.call(t,s)}catch(t){o=[6,t],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,u])}}},n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("@libs/fetch"),a=require("cheerio"),i=require("@libs/defaultCover"),s=require("@libs/novelStatus"),o=n(require("dayjs")),u=function(t,e){return new RegExp(e.join("|")).test(t)},c="novel-genre",l="novel",h=new(function(){function n(t){this.fetchImage=r.fetchFile,this.parseData=function(t){var e,n=(0,o.default)(),r=(null===(e=t.match(/\d+/))||void 0===e?void 0:e[0])||"",a=parseInt(r,10);if(!r)return t;if(u(t,["detik","segundo","second","วินาที"]))n.subtract(a,"second");else if(u(t,["menit","dakika","min","minute","minuto","นาที","دقائق"]))n.subtract(a,"minute");else if(u(t,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))n.subtract(a,"hours");else if(u(t,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))n.subtract(a,"days");else if(u(t,["week","semana"]))n.subtract(a,"week");else if(u(t,["month","mes"]))n.subtract(a,"month");else{if(!u(t,["year","año"]))return t;n.subtract(a,"year")}return n.format("LL")},this.id=t.id,this.name=t.sourceName;var e=t.sourceName.replace(/\s+/g,"").toLowerCase();this.icon="multisrc/madara/icons/".concat(e,".png"),this.site=t.sourceSite,this.version="1.0.0",this.options=t.options,this.filters=t.filters}return n.prototype.popularNovels=function(n,i){var s,o,u,h,d,p,f=i.filters,m=i.showLatestNovels;return t(this,void 0,void 0,(function(){var t,i,v,g,b=this;return e(this,(function(e){switch(e.label){case 0:return t=[],i=this.site,(null===(s=null==f?void 0:f.genres)||void 0===s?void 0:s.value)?i+=((null===(u=null===(o=this.options)||void 0===o?void 0:o.path)||void 0===u?void 0:u.genres)||c)+"/"+f.genres.value:i+=(null===(d=null===(h=this.options)||void 0===h?void 0:h.path)||void 0===d?void 0:d.novels)||l,i+="/page/"+n+"/?m_orderby="+(m?"latest":(null===(p=null==f?void 0:f.sort)||void 0===p?void 0:p.value)||"rating"),[4,(0,r.fetchApi)(i).then((function(t){return t.text()}))];case 1:return v=e.sent(),(g=(0,a.load)(v))(".manga-title-badges").remove(),g(".page-item-detail").each((function(e,n){var r=g(n).find(".post-title").text().trim(),a=g(n).find(".post-title").find("a").attr("href")||"";if(r&&a){var i=g(n).find("img"),s={name:r,cover:i.attr("data-src")||i.attr("src"),path:a.replace(b.site,"")};t.push(s)}})),[2,t]}}))}))},n.prototype.parseNovel=function(n){var u;return t(this,void 0,void 0,(function(){var t,c,l,h,d,p,f,m,v=this;return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchApi)(this.site+n).then((function(t){return t.text()}))];case 1:return t=e.sent(),(c=(0,a.load)(t))(".manga-title-badges, #manga-title span").remove(),(l={path:n,name:c(".post-title h1").text().trim()||c("#manga-title h1").text()}).cover=c(".summary_image > a > img").attr("data-lazy-src")||c(".summary_image > a > img").attr("data-src")||c(".summary_image > a > img").attr("src")||c(".summary_image > a > img").attr("src")||i.defaultCover,c(".post-content_item, .post-content").each((function(){var t=c(this).find("h5").text().trim(),e=c(this).find(".summary-content").text().trim();switch(t){case"Genre(s)":case"Género(s)":case"التصنيفات":l.genres=e;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":l.author=e;break;case"Status":case"Estado":l.status=e.includes("OnGoing")||e.includes("مستمرة")?s.NovelStatus.Ongoing:s.NovelStatus.Completed}})),c("div.summary__content .code-block,script").remove(),l.summary=c("div.summary__content").text().trim()||c("#tab-manga-about").text().trim()||c('.post-content_item h5:contains("Summary")').next().text().trim(),h=[],d="",(null===(u=this.options)||void 0===u?void 0:u.useNewChapterEndpoint)?[4,(0,r.fetchApi)(this.site+n+"ajax/chapters/",{method:"POST"}).then((function(t){return t.text()}))]:[3,3];case 2:return d=e.sent(),[3,5];case 3:return p=c(".rating-post-id").attr("value")||c("#manga-chapters-holder").attr("data-id")||"",(f=new FormData).append("action","manga_get_chapters"),f.append("manga",p),[4,(0,r.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:f}).then((function(t){return t.text()}))];case 4:d=e.sent(),e.label=5;case 5:return"0"!==d&&(c=(0,a.load)(d)),m=c(".wp-manga-chapter").length,c(".wp-manga-chapter").each((function(t,e){var n=c(e).find("a").text().trim(),r=c(e).find("span.chapter-release-date").text().trim();r=r?v.parseData(r):(0,o.default)().format("LL");var a=c(e).find("a").attr("href")||"";h.push({name:n,path:a.replace(v.site,""),releaseTime:r||null,chapterNumber:m-t})})),l.chapters=h.reverse(),[2,l]}}))}))},n.prototype.parseChapter=function(n){return t(this,void 0,void 0,(function(){var t,i;return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchApi)(this.site+n).then((function(t){return t.text()}))];case 1:return t=e.sent(),i=(0,a.load)(t),[2,i(".text-left").html()||i(".text-right").html()||i(".entry-content").html()||i(".c-blog-post > div > div:nth-child(2)").html()||""]}}))}))},n.prototype.searchNovels=function(n,i){return t(this,void 0,void 0,(function(){var t,i,s,o,u=this;return e(this,(function(e){switch(e.label){case 0:return t=[],i=this.site+"?s="+n+"&post_type=wp-manga",[4,(0,r.fetchApi)(i).then((function(t){return t.text()}))];case 1:return s=e.sent(),(o=(0,a.load)(s))(".c-tabs-item__content").each((function(e,n){var r=o(n).find(".post-title").text().trim(),a=o(n).find(".post-title").find("a").attr("href")||"";if(r&&a){var i=o(n).find("img"),s={name:r,cover:i.attr("data-src")||i.attr("src"),path:a.replace(u.site,"")};t.push(s)}})),[2,t]}}))}))},n}())({id:"novelstic",sourceSite:"https://novelstic.com/",sourceName:"Novelstic",options:{useNewChapterEndpoint:1},filters:{}});exports.default=h;