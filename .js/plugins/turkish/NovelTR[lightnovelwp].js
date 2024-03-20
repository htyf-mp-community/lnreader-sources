"use strict";var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(r,i){function s(e){try{o(l.next(e))}catch(e){i(e)}}function n(e){try{o(l.throw(e))}catch(e){i(e)}}function o(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(s,n)}o((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,r,i,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function n(n){return function(o){return function(n){if(a)throw new TypeError("Generator is already executing.");for(;i&&(i=0,n[0]&&(s=0)),s;)try{if(a=1,l&&(r=2&n[0]?l.return:n[0]?l.throw||((r=l.return)&&r.call(l),0):l.next)&&!(r=r.call(l,n[1])).done)return r;switch(l=0,r&&(n=[2&n[0],r.value]),n[0]){case 0:case 1:r=n;break;case 4:return s.label++,{value:n[1],done:0};case 5:s.label++,l=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(!(r=s.trys,(r=r.length>0&&r[r.length-1])||6!==n[0]&&2!==n[0])){s=0;continue}if(3===n[0]&&(!r||n[1]>r[0]&&n[1]<r[3])){s.label=n[1];break}if(6===n[0]&&s.label<r[1]){s.label=r[1],r=n;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(n);break}r[2]&&s.ops.pop(),s.trys.pop();continue}n=t.call(e,s)}catch(e){n=[6,e],l=0}finally{a=r=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:1}}([n,o])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),l=require("@libs/fetch"),r=require("@libs/novelStatus"),i=require("@libs/defaultCover"),s=new(function(){function s(e){this.fetchImage=l.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id,".png"),this.site=e.sourceSite,this.version="1.0.4",this.options=e.options,this.filters=e.filters}return s.prototype.getHostname=function(e){return e.split("/")[2]},s.prototype.getCheerio=function(r,i){return e(this,void 0,void 0,(function(){var e,s,n,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(r)];case 1:if(!(e=t.sent()).ok&&1!=i)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return n=a.load,[4,e.text()];case 2:if(s=n.apply(void 0,[t.sent()]),o=s("title").text().trim(),this.getHostname(r)!=this.getHostname(e.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,s]}}))}))},s.prototype.parseNovels=function(e){var t=this,a=[];return e("div.listupd > article").each((function(l,r){var s=e(r).find("h2").text(),n=e(r).find("img"),o=e(r).find("a").attr("href");o&&a.push({name:s,cover:n.attr("data-src")||n.attr("src")||i.defaultCover,path:o.replace(t.site,"")})})),a},s.prototype.popularNovels=function(a,l){var r=l.filters,i=l.showLatestNovels;return e(this,void 0,void 0,(function(){var e,l,s,n,o,u;return t(this,(function(t){switch(t.label){case 0:for(l in e=this.site+"/series/?page="+a,r||(r={}),i&&(e+="&order=latest"),r)if("object"==typeof r[l].value)for(s=0,n=r[l].value;s<n.length;s++)o=n[s],e+="&".concat(l,"=").concat(o);else r[l].value&&(e+="&".concat(l,"=").concat(r[l].value));return[4,this.getCheerio(e,0)];case 1:return u=t.sent(),[2,this.parseNovels(u)]}}))}))},s.prototype.parseNovel=function(a){var l,s;return e(this,void 0,void 0,(function(){var e,n,o,u,c,v,h,p=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:switch(e=t.sent(),(n={path:a.replace(this.site,""),name:"Untitled"}).name=e("h1.entry-title").text().trim(),o=e("img.wp-post-image"),n.cover=o.attr("data-src")||o.attr("src")||i.defaultCover,(null===(l=e("div.sertostat > span").attr("class"))||void 0===l?void 0:l.toLowerCase())||""){case"completed":n.status=r.NovelStatus.Completed;break;case"ongoing":n.status=r.NovelStatus.Ongoing;break;case"hiatus":n.status=r.NovelStatus.OnHiatus;break;default:n.status=r.NovelStatus.Unknown}return(u=e("div.serl")).length||(u=e("div.spe > span")),u.each((function(){var t=e(this).contents().first().text().replace(":","").trim().toLowerCase(),a=e(this).contents().last().text().trim().toLowerCase();switch(t){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":n.author=a;break;case"الحالة":case"status":case"statut":case"estado":case"durum":switch(a){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":n.status=r.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":n.status=r.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":n.status=r.NovelStatus.OnHiatus;break;default:n.status=r.NovelStatus.Unknown}break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":n.artist=a}})),(c=e(".sertogenre")).length||(c=e(".genxed")),n.genres=c.children("a").map((function(t,a){return e(a).text()})).toArray().join(","),(v=e(".sersys > p").map((function(t,a){return e(a).text().trim()})).toArray()).length||(v=e(".entry-content > p").map((function(t,a){return e(a).text().trim()})).toArray()),n.summary=v.join("\n"),h=[],e(".eplister li").each((function(t,a){var l,r=e(a).find(".epl-num").text()+" "+e(a).find(".epl-title").text(),i=e(a).find("a").attr("href")||"",s=e(a).find(".epl-date").text().trim();switch(e(a).find(".epl-price").text().trim().toLowerCase()){case"free":case"gratuit":case"مجاني":case"livre":case"":l=1;break;default:l=0}l&&h.push({name:r,path:i.replace(p.site,""),releaseTime:s})})),(null===(s=this.options)||void 0===s?void 0:s.reverseChapters)&&h.length&&h.reverse(),n.chapters=h,[2,n]}}))}))},s.prototype.parseChapter=function(a){var l;return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return e=t.sent(),"kolnovel"==this.id&&((r=e("article > style").text().trim().split(",")).push.apply(r,(null===(l=r.pop())||void 0===l?void 0:l.match(/^\.\w+/))||[]),r.map((function(t){return e("p".concat(t)).remove()}))),[2,e(".epcontent p").map((function(t,a){return e(a)})).toArray().join("\n")||""]}}))}))},s.prototype.searchNovels=function(a,l){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+l+"/?s="+a,[4,this.getCheerio(e,1)];case 1:return r=t.sent(),[2,this.parseNovels(r)]}}))}))},s}())({id:"noveltr",sourceSite:"https://noveltr.com/",sourceName:"NovelTR",options:{lang:"Turkish",reverseChapters:1},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Aksiyon",value:"aksiyon"},{label:"Bilim Kurgu",value:"bilim-kurgu"},{label:"Büyü",value:"buyu"},{label:"Comedy",value:"comedy"},{label:"Doğaüstü",value:"dogaustu"},{label:"dövüş sanatları",value:"dovus-sanatlari"},{label:"Dram",value:"dram"},{label:"Drama",value:"drama"},{label:"ecchi",value:"ecchi"},{label:"fantastik",value:"fantastik"},{label:"Fantasy",value:"fantasy"},{label:"gizem",value:"gizem"},{label:"Harem",value:"harem"},{label:"isekai",value:"isekai"},{label:"Josei",value:"josei"},{label:"Komedi",value:"komedi"},{label:"korku",value:"korku"},{label:"macera",value:"macera"},{label:"Mecha",value:"mecha"},{label:"okul",value:"okul"},{label:"oyun",value:"oyun"},{label:"psikoloji",value:"psikoloji"},{label:"Psychological",value:"psychological"},{label:"reenkarnasyon",value:"reenkarnasyon"},{label:"Romance",value:"romance"},{label:"Romantik",value:"romantik"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shounen",value:"shounen"},{label:"Shounen Ai",value:"shounen-ai"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"süper kahraman",value:"super-kahraman"},{label:"Supernatural",value:"supernatural"},{label:"tarih",value:"tarih"},{label:"trajedi",value:"trajedi"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Yaoi",value:"yaoi"},{label:"yetişkin",value:"yetiskin"},{label:"Yuri",value:"yuri"}]},"type[]":{type:"Checkbox",label:"Tür",value:[],options:[{label:"Web Novel",value:"web-novel"}]},status:{type:"Picker",label:"Durum",value:"",options:[{label:"Hepsi",value:""},{label:"Devam Ediyor",value:"ongoing"},{label:"Askıda",value:"hiatus"},{label:"Tamamlanmış",value:"completed"}]},order:{type:"Picker",label:"Sıralama",value:"",options:[{label:"Varsayılan",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"}]}}});exports.default=s;