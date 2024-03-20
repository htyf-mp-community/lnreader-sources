"use strict";var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(s,n){function i(e){try{l(r.next(e))}catch(e){n(e)}}function o(e){try{l(r.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?s(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}l((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,s,n,i={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return n={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function o(o){return function(l){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;n&&(n=0,o[0]&&(i=0)),i;)try{if(a=1,r&&(s=2&o[0]?r.return:o[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,o[1])).done)return s;switch(r=0,s&&(o=[2&o[0],s.value]),o[0]){case 0:case 1:s=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(s=i.trys,(s=s.length>0&&s[s.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(6===o[0]&&i.label<s[1]){i.label=s[1],s=o;break}if(s&&i.label<s[2]){i.label=s[2],i.ops.push(o);break}s[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],r=0}finally{a=s=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,l])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),r=require("@libs/fetch"),s=require("@libs/novelStatus"),n=require("@libs/defaultCover"),i=new(function(){function i(e){this.fetchImage=r.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id,".png"),this.site=e.sourceSite,this.version="1.0.4",this.options=e.options,this.filters=e.filters}return i.prototype.getHostname=function(e){return e.split("/")[2]},i.prototype.getCheerio=function(s,n){return e(this,void 0,void 0,(function(){var e,i,o,l;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(s)];case 1:if(!(e=t.sent()).ok&&1!=n)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return o=a.load,[4,e.text()];case 2:if(i=o.apply(void 0,[t.sent()]),l=i("title").text().trim(),this.getHostname(s)!=this.getHostname(e.url)||"Bot Verification"==l||"You are being redirected..."==l||"Un instant..."==l||"Just a moment..."==l||"Redirecting..."==l)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},i.prototype.parseNovels=function(e){var t=this,a=[];return e("div.listupd > article").each((function(r,s){var i=e(s).find("h2").text(),o=e(s).find("img"),l=e(s).find("a").attr("href");l&&a.push({name:i,cover:o.attr("data-src")||o.attr("src")||n.defaultCover,path:l.replace(t.site,"")})})),a},i.prototype.popularNovels=function(a,r){var s=r.filters,n=r.showLatestNovels;return e(this,void 0,void 0,(function(){var e,r,i,o,l,u;return t(this,(function(t){switch(t.label){case 0:for(r in e=this.site+"/series/?page="+a,s||(s={}),n&&(e+="&order=latest"),s)if("object"==typeof s[r].value)for(i=0,o=s[r].value;i<o.length;i++)l=o[i],e+="&".concat(r,"=").concat(l);else s[r].value&&(e+="&".concat(r,"=").concat(s[r].value));return[4,this.getCheerio(e,0)];case 1:return u=t.sent(),[2,this.parseNovels(u)]}}))}))},i.prototype.parseNovel=function(a){var r,i;return e(this,void 0,void 0,(function(){var e,o,l,u,c,p,v,h=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:switch(e=t.sent(),(o={path:a.replace(this.site,""),name:"Untitled"}).name=e("h1.entry-title").text().trim(),l=e("img.wp-post-image"),o.cover=l.attr("data-src")||l.attr("src")||n.defaultCover,(null===(r=e("div.sertostat > span").attr("class"))||void 0===r?void 0:r.toLowerCase())||""){case"completed":o.status=s.NovelStatus.Completed;break;case"ongoing":o.status=s.NovelStatus.Ongoing;break;case"hiatus":o.status=s.NovelStatus.OnHiatus;break;default:o.status=s.NovelStatus.Unknown}return(u=e("div.serl")).length||(u=e("div.spe > span")),u.each((function(){var t=e(this).contents().first().text().replace(":","").trim().toLowerCase(),a=e(this).contents().last().text().trim().toLowerCase();switch(t){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":o.author=a;break;case"الحالة":case"status":case"statut":case"estado":case"durum":switch(a){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":o.status=s.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":o.status=s.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":o.status=s.NovelStatus.OnHiatus;break;default:o.status=s.NovelStatus.Unknown}break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":o.artist=a}})),(c=e(".sertogenre")).length||(c=e(".genxed")),o.genres=c.children("a").map((function(t,a){return e(a).text()})).toArray().join(","),(p=e(".sersys > p").map((function(t,a){return e(a).text().trim()})).toArray()).length||(p=e(".entry-content > p").map((function(t,a){return e(a).text().trim()})).toArray()),o.summary=p.join("\n"),v=[],e(".eplister li").each((function(t,a){var r,s=e(a).find(".epl-num").text()+" "+e(a).find(".epl-title").text(),n=e(a).find("a").attr("href")||"",i=e(a).find(".epl-date").text().trim();switch(e(a).find(".epl-price").text().trim().toLowerCase()){case"free":case"gratuit":case"مجاني":case"livre":case"":r=1;break;default:r=0}r&&v.push({name:s,path:n.replace(h.site,""),releaseTime:i})})),(null===(i=this.options)||void 0===i?void 0:i.reverseChapters)&&v.length&&v.reverse(),o.chapters=v,[2,o]}}))}))},i.prototype.parseChapter=function(a){var r;return e(this,void 0,void 0,(function(){var e,s;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return e=t.sent(),"kolnovel"==this.id&&((s=e("article > style").text().trim().split(",")).push.apply(s,(null===(r=s.pop())||void 0===r?void 0:r.match(/^\.\w+/))||[]),s.map((function(t){return e("p".concat(t)).remove()}))),[2,e(".epcontent p").map((function(t,a){return e(a)})).toArray().join("\n")||""]}}))}))},i.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,s;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+r+"/?s="+a,[4,this.getCheerio(e,1)];case 1:return s=t.sent(),[2,this.parseNovels(s)]}}))}))},i}())({id:"whitemoonlightnovels",sourceSite:"https://whitemoonlightnovels.com/",sourceName:"White Moonlight Novels",options:{lang:"English",reverseChapters:0},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Boy's Love",value:"boys-love"},{label:"Business",value:"business"},{label:"Completed",value:"completed"},{label:"Cultivation",value:"cultivation"},{label:"Dropped",value:"dropped"},{label:"Entertainment Industry",value:"entertainment-industry"},{label:"Gaming",value:"gaming"},{label:"Ger",value:"ger"},{label:"Modern",value:"modern"},{label:"Omegaverse",value:"omegaverse"},{label:"Rebirth",value:"rebirth"},{label:"Revenge",value:"revenge"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Supernatural",value:"supernatural"},{label:"Survival",value:"survival"},{label:"System",value:"system"},{label:"Transmigration",value:"transmigration"},{label:"Unlimited Flow",value:"unlimited-flow"},{label:"Variety Show",value:"variety-show"}]},"type[]":{type:"Checkbox",label:"Type",value:[],options:[]},status:{type:"Picker",label:"Status",value:"",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Hiatus",value:"hiatus"},{label:"Completed",value:"completed"}]},order:{type:"Picker",label:"Order by",value:"",options:[{label:"Default",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"},{label:"Rating",value:"rating"}]}}});exports.default=i;