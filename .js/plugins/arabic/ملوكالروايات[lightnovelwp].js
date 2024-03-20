"use strict";var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(r,s){function i(e){try{o(l.next(e))}catch(e){s(e)}}function n(e){try{o(l.throw(e))}catch(e){s(e)}}function o(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,n)}o((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,r,s,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function n(n){return function(o){return function(n){if(a)throw new TypeError("Generator is already executing.");for(;s&&(s=0,n[0]&&(i=0)),i;)try{if(a=1,l&&(r=2&n[0]?l.return:n[0]?l.throw||((r=l.return)&&r.call(l),0):l.next)&&!(r=r.call(l,n[1])).done)return r;switch(l=0,r&&(n=[2&n[0],r.value]),n[0]){case 0:case 1:r=n;break;case 4:return i.label++,{value:n[1],done:0};case 5:i.label++,l=n[1],n=[0];continue;case 7:n=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==n[0]&&2!==n[0])){i=0;continue}if(3===n[0]&&(!r||n[1]>r[0]&&n[1]<r[3])){i.label=n[1];break}if(6===n[0]&&i.label<r[1]){i.label=r[1],r=n;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(n);break}r[2]&&i.ops.pop(),i.trys.pop();continue}n=t.call(e,i)}catch(e){n=[6,e],l=0}finally{a=r=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:1}}([n,o])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),l=require("@libs/fetch"),r=require("@libs/novelStatus"),s=require("@libs/defaultCover"),i=new(function(){function i(e){this.fetchImage=l.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id,".png"),this.site=e.sourceSite,this.version="1.0.4",this.options=e.options,this.filters=e.filters}return i.prototype.getHostname=function(e){return e.split("/")[2]},i.prototype.getCheerio=function(r,s){return e(this,void 0,void 0,(function(){var e,i,n,o;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(r)];case 1:if(!(e=t.sent()).ok&&1!=s)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return n=a.load,[4,e.text()];case 2:if(i=n.apply(void 0,[t.sent()]),o=i("title").text().trim(),this.getHostname(r)!=this.getHostname(e.url)||"Bot Verification"==o||"You are being redirected..."==o||"Un instant..."==o||"Just a moment..."==o||"Redirecting..."==o)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},i.prototype.parseNovels=function(e){var t=this,a=[];return e("div.listupd > article").each((function(l,r){var i=e(r).find("h2").text(),n=e(r).find("img"),o=e(r).find("a").attr("href");o&&a.push({name:i,cover:n.attr("data-src")||n.attr("src")||s.defaultCover,path:o.replace(t.site,"")})})),a},i.prototype.popularNovels=function(a,l){var r=l.filters,s=l.showLatestNovels;return e(this,void 0,void 0,(function(){var e,l,i,n,o,u;return t(this,(function(t){switch(t.label){case 0:for(l in e=this.site+"/series/?page="+a,r||(r={}),s&&(e+="&order=latest"),r)if("object"==typeof r[l].value)for(i=0,n=r[l].value;i<n.length;i++)o=n[i],e+="&".concat(l,"=").concat(o);else r[l].value&&(e+="&".concat(l,"=").concat(r[l].value));return[4,this.getCheerio(e,0)];case 1:return u=t.sent(),[2,this.parseNovels(u)]}}))}))},i.prototype.parseNovel=function(a){var l,i;return e(this,void 0,void 0,(function(){var e,n,o,u,c,v,p,h=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:switch(e=t.sent(),(n={path:a.replace(this.site,""),name:"Untitled"}).name=e("h1.entry-title").text().trim(),o=e("img.wp-post-image"),n.cover=o.attr("data-src")||o.attr("src")||s.defaultCover,(null===(l=e("div.sertostat > span").attr("class"))||void 0===l?void 0:l.toLowerCase())||""){case"completed":n.status=r.NovelStatus.Completed;break;case"ongoing":n.status=r.NovelStatus.Ongoing;break;case"hiatus":n.status=r.NovelStatus.OnHiatus;break;default:n.status=r.NovelStatus.Unknown}return(u=e("div.serl")).length||(u=e("div.spe > span")),u.each((function(){var t=e(this).contents().first().text().replace(":","").trim().toLowerCase(),a=e(this).contents().last().text().trim().toLowerCase();switch(t){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":n.author=a;break;case"الحالة":case"status":case"statut":case"estado":case"durum":switch(a){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":n.status=r.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":n.status=r.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":n.status=r.NovelStatus.OnHiatus;break;default:n.status=r.NovelStatus.Unknown}break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":n.artist=a}})),(c=e(".sertogenre")).length||(c=e(".genxed")),n.genres=c.children("a").map((function(t,a){return e(a).text()})).toArray().join(","),(v=e(".sersys > p").map((function(t,a){return e(a).text().trim()})).toArray()).length||(v=e(".entry-content > p").map((function(t,a){return e(a).text().trim()})).toArray()),n.summary=v.join("\n"),p=[],e(".eplister li").each((function(t,a){var l,r=e(a).find(".epl-num").text()+" "+e(a).find(".epl-title").text(),s=e(a).find("a").attr("href")||"",i=e(a).find(".epl-date").text().trim();switch(e(a).find(".epl-price").text().trim().toLowerCase()){case"free":case"gratuit":case"مجاني":case"livre":case"":l=1;break;default:l=0}l&&p.push({name:r,path:s.replace(h.site,""),releaseTime:i})})),(null===(i=this.options)||void 0===i?void 0:i.reverseChapters)&&p.length&&p.reverse(),n.chapters=p,[2,n]}}))}))},i.prototype.parseChapter=function(a){var l;return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return e=t.sent(),"kolnovel"==this.id&&((r=e("article > style").text().trim().split(",")).push.apply(r,(null===(l=r.pop())||void 0===l?void 0:l.match(/^\.\w+/))||[]),r.map((function(t){return e("p".concat(t)).remove()}))),[2,e(".epcontent p").map((function(t,a){return e(a)})).toArray().join("\n")||""]}}))}))},i.prototype.searchNovels=function(a,l){return e(this,void 0,void 0,(function(){var e,r;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+l+"/?s="+a,[4,this.getCheerio(e,1)];case 1:return r=t.sent(),[2,this.parseNovels(r)]}}))}))},i}())({id:"kolnovel",sourceSite:"https://kolnovel.org/",sourceName:"ملوك الروايات",options:{lang:"Arabic",reverseChapters:1},filters:{"genre[]":{type:"Checkbox",label:"تصنيف",value:[],options:[{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"XUANHUAN",value:"xuanhuan"},{label:"أكشن",value:"action"},{label:"إثارة",value:"excitement"},{label:"إنتقال الى عالم أخر",value:"isekai"},{label:"إيتشي",value:"etchi"},{label:"الخيال العلمي",value:"sci-fi"},{label:"بوليسي",value:"policy"},{label:"تاريخي",value:"historical"},{label:"تحقيقات",value:"تحقيق"},{label:"تقمص شخصيات",value:"rpg"},{label:"جريمة",value:"crime"},{label:"جوسى",value:"josei"},{label:"جوسي",value:"جوسي"},{label:"حريم",value:"harem"},{label:"حياة مدرسية",value:"school-life"},{label:"خيالي(فانتازيا)",value:"fantasy"},{label:"دراما",value:"drama"},{label:"رعب",value:"horror"},{label:"رومانسي",value:"romantic"},{label:"سحر",value:"magic"},{label:"سينن",value:"senen"},{label:"شريحة من الحياة",value:"slice-of-life"},{label:"شوجو",value:"shojo"},{label:"شونين",value:"shonen"},{label:"طبي",value:"medical"},{label:"ظواهر خارقة للطبيعة",value:"supernatural"},{label:"غموض",value:"mysteries"},{label:"فانتازيا",value:"فانتازيا"},{label:"فنون القتال",value:"martial-arts"},{label:"قصة قصيرة",value:"قصة-قصيرة"},{label:"قوى خارقة",value:"superpower"},{label:"كوميدي",value:"comedy"},{label:"مأساوي",value:"tragedy"},{label:"ما بعد الكارثة",value:"after-the-disaster"},{label:"مغامرة",value:"adventure"},{label:"ميكا",value:"mechanical"},{label:"ناضج",value:"mature"},{label:"نفسي",value:"psychological"},{label:"ون شوت",value:"ون-شوت"}]},"type[]":{type:"Checkbox",label:"النوع",value:[],options:[{label:"إنجليزية",value:"english"},{label:"رواية لايت",value:"light-novel"},{label:"رواية ويب",value:"web-novel"},{label:"صينية",value:"chinese"},{label:"عربية",value:"arabic"},{label:"كورية",value:"korean"},{label:"ون شوت",value:"ون-شوت"},{label:"يابانية",value:"japanese"}]},status:{type:"Picker",label:"الحالة",value:"",options:[{label:"الكل",value:""},{label:"Ongoing",value:"ongoing"},{label:"Hiatus",value:"hiatus"},{label:"Completed",value:"completed"}]},order:{type:"Picker",label:"ترتيب حسب",value:"",options:[{label:"الإعداد الأولي",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"أخر التحديثات",value:"update"},{label:"أخر ما تم إضافته",value:"latest"},{label:"الرائجة",value:"popular"}]}}});exports.default=i;