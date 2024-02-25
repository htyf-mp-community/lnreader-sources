"use strict";var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(n,i){function d(e){try{s(r.next(e))}catch(e){i(e)}}function l(e){try{s(r.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(d,l)}s((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,n,i,d={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(l){return function(s){return function(l){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,l[0]&&(d=0)),d;)try{if(a=1,r&&(n=2&l[0]?r.return:l[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,l[1])).done)return n;switch(r=0,n&&(l=[2&l[0],n.value]),l[0]){case 0:case 1:n=l;break;case 4:return d.label++,{value:l[1],done:0};case 5:d.label++,r=l[1],l=[0];continue;case 7:l=d.ops.pop(),d.trys.pop();continue;default:if(!(n=d.trys,(n=n.length>0&&n[n.length-1])||6!==l[0]&&2!==l[0])){d=0;continue}if(3===l[0]&&(!n||l[1]>n[0]&&l[1]<n[3])){d.label=l[1];break}if(6===l[0]&&d.label<n[1]){d.label=n[1],n=l;break}if(n&&d.label<n[2]){d.label=n[2],d.ops.push(l);break}n[2]&&d.ops.pop(),d.trys.pop();continue}l=t.call(e,d)}catch(e){l=[6,e],r=0}finally{a=n=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:1}}([l,s])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("@libs/fetch"),n=require("@libs/filterInputs"),i=require("cheerio"),d=require("@libs/defaultCover"),l=require("@libs/novelStatus"),s=a(require("dayjs")),o=function(e,t){return new RegExp(t.join("|")).test(e)},u="novel-genre",c="novel",h=new(function(){function a(e){this.fetchImage=r.fetchFile,this.parseData=function(e){var t,a=(0,s.default)(),r=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",n=parseInt(r,10);if(!r)return e;if(o(e,["detik","segundo","second","วินาที"]))a.subtract(n,"second");else if(o(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(n,"minute");else if(o(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(n,"hours");else if(o(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(n,"days");else if(o(e,["week","semana"]))a.subtract(n,"week");else if(o(e,["month","mes"]))a.subtract(n,"month");else{if(!o(e,["year","año"]))return e;a.subtract(n,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName;var t=e.sourceName.replace(/\s+/g,"").toLowerCase();this.icon="multisrc/madara/icons/".concat(t,".png"),this.site=e.sourceSite,this.version="1.0.0",this.options=e.options,this.filters=e.filters}return a.prototype.popularNovels=function(a,n){var d,l,s,o,h,v,p=n.filters,b=n.showLatestNovels;return e(this,void 0,void 0,(function(){var e,n,f,m,g=this;return t(this,(function(t){switch(t.label){case 0:return e=[],n=this.site,(null===(d=null==p?void 0:p.genres)||void 0===d?void 0:d.value)?n+=((null===(s=null===(l=this.options)||void 0===l?void 0:l.path)||void 0===s?void 0:s.genres)||u)+"/"+p.genres.value:n+=(null===(h=null===(o=this.options)||void 0===o?void 0:o.path)||void 0===h?void 0:h.novels)||c,n+="/page/"+a+"/?m_orderby="+(b?"latest":(null===(v=null==p?void 0:p.sort)||void 0===v?void 0:v.value)||"rating"),[4,(0,r.fetchApi)(n).then((function(e){return e.text()}))];case 1:return f=t.sent(),(m=(0,i.load)(f))(".manga-title-badges").remove(),m(".page-item-detail").each((function(t,a){var r=m(a).find(".post-title").text().trim(),n=m(a).find(".post-title").find("a").attr("href")||"";if(r&&n){var i=m(a).find("img"),d={name:r,cover:i.attr("data-src")||i.attr("src"),path:n.replace(g.site,"")};e.push(d)}})),[2,e]}}))}))},a.prototype.parseNovel=function(a){var n;return e(this,void 0,void 0,(function(){var e,o,u,c,h,v,p,b,f=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),(o=(0,i.load)(e))(".manga-title-badges, #manga-title span").remove(),(u={path:a,name:o(".post-title h1").text().trim()||o("#manga-title h1").text()}).cover=o(".summary_image > a > img").attr("data-lazy-src")||o(".summary_image > a > img").attr("data-src")||o(".summary_image > a > img").attr("src")||o(".summary_image > a > img").attr("src")||d.defaultCover,o(".post-content_item, .post-content").each((function(){var e=o(this).find("h5").text().trim(),t=o(this).find(".summary-content").text().trim();switch(e){case"Genre(s)":case"Género(s)":case"التصنيفات":u.genres=t;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":u.author=t;break;case"Status":case"Estado":u.status=t.includes("OnGoing")||t.includes("مستمرة")?l.NovelStatus.Ongoing:l.NovelStatus.Completed}})),o("div.summary__content .code-block,script").remove(),u.summary=o("div.summary__content").text().trim()||o("#tab-manga-about").text().trim()||o('.post-content_item h5:contains("Summary")').next().text().trim(),c=[],h="",(null===(n=this.options)||void 0===n?void 0:n.useNewChapterEndpoint)?[4,(0,r.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return h=t.sent(),[3,5];case 3:return v=o(".rating-post-id").attr("value")||o("#manga-chapters-holder").attr("data-id")||"",(p=new FormData).append("action","manga_get_chapters"),p.append("manga",v),[4,(0,r.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:p}).then((function(e){return e.text()}))];case 4:h=t.sent(),t.label=5;case 5:return"0"!==h&&(o=(0,i.load)(h)),b=o(".wp-manga-chapter").length,o(".wp-manga-chapter").each((function(e,t){var a=o(t).find("a").text().trim(),r=o(t).find("span.chapter-release-date").text().trim();r=r?f.parseData(r):(0,s.default)().format("LL");var n=o(t).find("a").attr("href")||"";c.push({name:a,path:n.replace(f.site,""),releaseTime:r||null,chapterNumber:b-e})})),u.chapters=c.reverse(),[2,u]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),n=(0,i.load)(e),[2,n(".text-left").html()||n(".text-right").html()||n(".entry-content").html()||n(".c-blog-post > div > div:nth-child(2)").html()||""]}}))}))},a.prototype.searchNovels=function(a,n){return e(this,void 0,void 0,(function(){var e,n,d,l,s=this;return t(this,(function(t){switch(t.label){case 0:return e=[],n=this.site+"?s="+a+"&post_type=wp-manga",[4,(0,r.fetchApi)(n).then((function(e){return e.text()}))];case 1:return d=t.sent(),(l=(0,i.load)(d))(".c-tabs-item__content").each((function(t,a){var r=l(a).find(".post-title").text().trim(),n=l(a).find(".post-title").find("a").attr("href")||"";if(r&&n){var i=l(a).find("img"),d={name:r,cover:i.attr("data-src")||i.attr("src"),path:n.replace(s.site,"")};e.push(d)}})),[2,e]}}))}))},a}())({id:"arnovel",sourceSite:"https://arnovel.me/",sourceName:"ArNovel",filters:{sort:{label:"الترتيب حسب",value:"",options:[{label:"A-Z",value:"alphabet"},{label:"الآخير",value:"latest"},{label:"الأكثر مشاهدة",value:"views"},{label:"التقييم",value:"rating"},{label:"جديد",value:"new-manga"},{label:"شائع",value:"trending"}],type:n.FilterTypes.Picker},genres:{label:"التصنيفات",value:"",options:[{label:"NONE",value:""},{label:"أكشن",value:"%d8%a3%d9%83%d8%b4%d9%86"},{label:"إتشي",value:"%d8%a5%d8%aa%d8%b4%d9%80%d9%8a"},{label:"بالغ",value:"%d8%a8%d8%a7%d9%84%d8%ba"},{label:"تاريخي",value:"%d8%aa%d8%a7%d8%b1%d9%8a%d8%ae%d9%8a"},{label:"تراجدي",value:"%d8%aa%d8%b1%d8%a7%d8%ac%d8%af%d9%8a"},{label:"جوسي",value:"%d8%ac%d9%88%d8%b3%d9%8a"},{label:"حريم",value:"%d8%ad%d8%b1%d9%8a%d9%85"},{label:"حياة مدرسية",value:"%d8%ad%d9%8a%d8%a7%d8%a9-%d9%85%d8%af%d8%b1%d8%b3%d9%8a%d8%a9"},{label:"خارق لطبيعية",value:"%d8%ae%d8%a7%d8%b1%d9%82-%d9%84%d8%b7%d8%a8%d9%8a%d8%b9%d9%8a%d8%a9"},{label:"خيال",value:"%d8%ae%d9%8a%d8%a7%d9%84"},{label:"خيال علمي",value:"%d8%ae%d9%8a%d8%a7%d9%84-%d8%b9%d9%84%d9%85%d9%8a"},{label:"دراما",value:"%d8%af%d8%b1%d8%a7%d9%85%d8%a7"},{label:"راشد",value:"%d8%b1%d8%a7%d8%b4%d8%af"},{label:"رعب",value:"%d8%b1%d8%b9%d8%a8"},{label:"رومنسي",value:"%d8%b1%d9%88%d9%85%d9%86%d8%b3%d9%8a"},{label:"رياضي",value:"%d8%b1%d9%8a%d8%a7%d8%b6%d9%8a"},{label:"سينين",value:"%d8%b3%d9%8a%d9%86%d9%8a%d9%86"},{label:"شريحة من الحياة",value:"%d8%b4%d8%b1%d9%8a%d8%ad%d8%a9-%d9%85%d9%86-%d8%a7%d9%84%d8%ad%d9%8a%d8%a7%d8%a9"},{label:"شوجو",value:"%d8%b4%d9%88%d8%ac%d9%88"},{label:"شونين",value:"%d8%b4%d9%88%d9%86%d9%8a%d9%86"},{label:"غموض",value:"%d8%ba%d9%85%d9%88%d8%b6"},{label:"فنون قتال",value:"%d9%81%d9%86%d9%88%d9%86-%d9%82%d8%aa%d8%a7%d9%84"},{label:"كوميديا",value:"%d9%83%d9%88%d9%85%d9%8a%d8%af%d9%8a%d8%a7"},{label:"مغامرات",value:"%d9%85%d8%ba%d8%a7%d9%85%d8%b1%d8%a7%d8%aa"},{label:"منتهية",value:"%d9%85%d9%86%d8%aa%d9%87%d9%8a%d8%a9"},{label:"ميكا",value:"%d9%85%d9%8a%d9%83%d8%a7"},{label:"نفسي",value:"%d9%86%d9%81%d8%b3%d9%8a"}],type:n.FilterTypes.Picker}},options:{path:{genres:"home/novel-genre"},useNewChapterEndpoint:1,lang:"Arabic"}});exports.default=h;