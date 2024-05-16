var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(n,r){function i(e){try{s(l.next(e))}catch(e){r(e)}}function o(e){try{s(l.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}s((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,n,r,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return r={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(s){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(i=0)),i;)try{if(a=1,l&&(n=2&o[0]?l.return:o[0]?l.throw||((n=l.return)&&n.call(l),0):l.next)&&!(n=n.call(l,o[1])).done)return n;switch(l=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,l=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],l=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,s])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var l=require("@libs/fetch"),n=require("cheerio"),r=require("@libs/defaultCover"),i=require("@libs/novelStatus"),o=a(require("dayjs")),s=function(e,t){return new RegExp(t.join("|")).test(e)},u=new(function(){function a(e){var t;this.fetchImage=l.fetchFile,this.parseData=function(e){var t,a=(0,o.default)(),l=(null===(t=e.match(/\d+/))||void 0===t?void 0:t[0])||"",n=parseInt(l,10);if(!l)return e;if(s(e,["detik","segundo","second","วินาที"]))a.subtract(n,"second");else if(s(e,["menit","dakika","min","minute","minuto","นาที","دقائق"]))a.subtract(n,"minute");else if(s(e,["jam","saat","heure","hora","hour","ชั่วโมง","giờ","ore","ساعة","小时"]))a.subtract(n,"hours");else if(s(e,["hari","gün","jour","día","dia","day","วัน","ngày","giorni","أيام","天"]))a.subtract(n,"days");else if(s(e,["week","semana"]))a.subtract(n,"week");else if(s(e,["month","mes"]))a.subtract(n,"month");else{if(!s(e,["year","año"]))return e;a.subtract(n,"year")}return a.format("LL")},this.id=e.id,this.name=e.sourceName,this.icon="multisrc/madara/".concat(e.id.toLowerCase(),"/icon.png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(1+a),this.options=e.options,this.filters=e.filters}return a.prototype.getHostname=function(e){return e.split("/")[2]},a.prototype.getCheerio=function(a){return e(this,void 0,void 0,(function(){var e,r,i,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(a)];case 1:if(!(e=t.sent()).ok)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return i=n.load,[4,e.text()];case 2:if(r=i.apply(void 0,[t.sent()]),o=r("title").text().trim(),this.getHostname(a)!=this.getHostname(e.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,r]}}))}))},a.prototype.parseNovels=function(e){var t=this,a=[];return e(".manga-title-badges").remove(),e(".page-item-detail, .c-tabs-item__content").each((function(l,n){var r=e(n).find(".post-title").text().trim(),i=e(n).find(".post-title").find("a").attr("href")||"";if(r&&i){var o=e(n).find("img"),s={name:r,cover:o.attr("data-src")||o.attr("src")||o.attr("data-lazy-srcset"),path:i.replace(t.site,"")};a.push(s)}})),a},a.prototype.popularNovels=function(a,l){return e(this,arguments,void 0,(function(e,a){var l,n,r,i,o,s,u=a.filters,c=a.showLatestNovels;return t(this,(function(t){switch(t.label){case 0:for(n in l=this.site+"/page/"+e+"/?s=&post_type=wp-manga",u||(u={}),c&&(l+="&m_orderby=latest"),u)if("object"==typeof u[n].value)for(r=0,i=u[n].value;r<i.length;r++)o=i[r],l+="&".concat(n,"=").concat(o);else u[n].value&&(l+="&".concat(n,"=").concat(u[n].value));return[4,this.getCheerio(l)];case 1:return s=t.sent(),[2,this.parseNovels(s)]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,s,u,c,h,v,p,d,b,m=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),(s=(0,n.load)(e))(".manga-title-badges, #manga-title span").remove(),(u={path:a,name:s(".post-title h1").text().trim()||s("#manga-title h1").text()}).cover=s(".summary_image > a > img").attr("data-lazy-src")||s(".summary_image > a > img").attr("data-src")||s(".summary_image > a > img").attr("src")||r.defaultCover,s(".post-content_item, .post-content").each((function(){var e=s(this).find("h5").text().trim(),t=s(this).find(".summary-content").text().trim();switch(e){case"Genre(s)":case"Género(s)":case"التصنيفات":u.genres=t;break;case"Author(s)":case"Autor(es)":case"المؤلف":case"المؤلف (ين)":u.author=t;break;case"Status":case"Estado":u.status=t.includes("OnGoing")||t.includes("مستمرة")?i.NovelStatus.Ongoing:i.NovelStatus.Completed}})),s("div.summary__content .code-block,script").remove(),u.summary=s("div.summary__content").text().trim()||s("#tab-manga-about").text().trim()||s('.post-content_item h5:contains("Summary")').next().text().trim(),c=[],h="",(null===(b=this.options)||void 0===b?void 0:b.useNewChapterEndpoint)?[4,(0,l.fetchApi)(this.site+a+"ajax/chapters/",{method:"POST"}).then((function(e){return e.text()}))]:[3,3];case 2:return h=t.sent(),[3,5];case 3:return v=s(".rating-post-id").attr("value")||s("#manga-chapters-holder").attr("data-id")||"",(p=new FormData).append("action","manga_get_chapters"),p.append("manga",v),[4,(0,l.fetchApi)(this.site+"wp-admin/admin-ajax.php",{method:"POST",body:p}).then((function(e){return e.text()}))];case 4:h=t.sent(),t.label=5;case 5:return"0"!==h&&(s=(0,n.load)(h)),d=s(".wp-manga-chapter").length,s(".wp-manga-chapter").each((function(e,t){var a=s(t).find("a").text().trim(),l=s(t).find("span.chapter-release-date").text().trim();l=l?m.parseData(l):(0,o.default)().format("LL");var n=s(t).find("a").attr("href")||"";c.push({name:a,path:n.replace(m.site,""),releaseTime:l||null,chapterNumber:d-e})})),u.chapters=c.reverse(),[2,u]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+a).then((function(e){return e.text()}))];case 1:return e=t.sent(),r=(0,n.load)(e),[2,r(".text-left").html()||r(".text-right").html()||r(".entry-content").html()||r(".c-blog-post > div > div:nth-child(2)").html()||""]}}))}))},a.prototype.searchNovels=function(a,l){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+l+"/?s="+a+"&post_type=wp-manga",[4,this.getCheerio(e)];case 1:return n=t.sent(),[2,this.parseNovels(n)]}}))}))},a}())({id:"panchotranslations",sourceSite:"https://panchotranslations.com/",sourceName:"Pancho Translations",options:{useNewChapterEndpoint:1,lang:"Spanish"},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Acción",value:"accion"},{label:"Action",value:"action"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Anime",value:"anime"},{label:"Aventura",value:"aventura"},{label:"Cartoon",value:"cartoon"},{label:"Comedia",value:"comedia"},{label:"Comedy",value:"comedy"},{label:"Comic",value:"comic"},{label:"Cooking",value:"cooking"},{label:"Detective",value:"detective"},{label:"Doujinshi",value:"doujinshi"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Escolar",value:"escolar"},{label:"Fantasía",value:"fantasia"},{label:"Fantasy",value:"fantasy"},{label:"Gender Bender",value:"gender-bender"},{label:"Harem",value:"harem"},{label:"Historical",value:"historical"},{label:"Horror",value:"horror"},{label:"Josei",value:"josei"},{label:"Live action",value:"live-action"},{label:"Magia",value:"magia"},{label:"Malentendidos",value:"malentendidos"},{label:"Manga",value:"manga"},{label:"Manhua",value:"manhua"},{label:"Manhwa",value:"manhwa"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"One shot",value:"one-shot"},{label:"Posesión",value:"posesion"},{label:"Psychological",value:"psychological"},{label:"Reencarnación",value:"reencarnacion"},{label:"Regresión",value:"regresion"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shoujo Ai",value:"shoujo-ai"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Silce of Life",value:"silce-of-life"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"Soft Yaoi",value:"soft-yaoi"},{label:"Soft Yuri",value:"soft-yuri"},{label:"Sports",value:"sports"},{label:"Supernatural",value:"supernatural"},{label:"Tragedy",value:"tragedy"},{label:"Webtoon",value:"webtoon"},{label:"Yaoi",value:"yaoi"},{label:"Yuri",value:"yuri"}]},op:{type:"Switch",label:"teniendo todos los géneros seleccionados",value:0},author:{type:"Text",label:"Autor",value:""},artist:{type:"Text",label:"Artista",value:""},release:{type:"Text",label:"Año de Lanzamiento",value:""},adult:{type:"Picker",label:"Contenido para Adultos",value:"",options:[{label:"Todo",value:""},{label:"Ningún contenido para adultos",value:"0"},{label:"Solo contenido para adultos",value:"1"}]},"status[]":{type:"Checkbox",label:"Estado",value:[],options:[{label:"Terminada",value:"complete"},{label:"En curso",value:"on-going"},{label:"Cancelada",value:"canceled"},{label:"Abandonada por el Traductor",value:"on-hold"}]},m_orderby:{type:"Picker",label:"Ordenar por",value:"",options:[{label:"Importancia",value:""},{label:"Más Reciente",value:"latest"},{label:"A-Z",value:"alphabet"},{label:"Clasificación",value:"rating"},{label:"Tendencias",value:"trending"},{label:"Más vistas",value:"views"},{label:"Nuevo",value:"new-manga"}]}}});exports.default=u;