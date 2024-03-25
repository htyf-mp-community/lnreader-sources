"use strict";var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(n,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}l((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,n,s,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(i=0)),i;)try{if(a=1,r&&(n=2&o[0]?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],r=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,l])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),r=require("@libs/fetch"),n=require("@libs/novelStatus"),s=require("@libs/defaultCover"),i=new(function(){function i(e){var t;this.fetchImage=r.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id,".png"),this.site=e.sourceSite;var a=(null===(t=e.options)||void 0===t?void 0:t.versionIncrements)||0;this.version="1.0.".concat(4+a),this.options=e.options,this.filters=e.filters}return i.prototype.getHostname=function(e){return e.split("/")[2]},i.prototype.getCheerio=function(n,s){return e(this,void 0,void 0,(function(){var e,i,o,l;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(n)];case 1:if(!(e=t.sent()).ok&&1!=s)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return o=a.load,[4,e.text()];case 2:if(i=o.apply(void 0,[t.sent()]),l=i("title").text().trim(),this.getHostname(n)!=this.getHostname(e.url)||"Bot Verification"==l||"You are being redirected..."==l||"Un instant..."==l||"Just a moment..."==l||"Redirecting..."==l)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},i.prototype.parseNovels=function(e){var t=this,a=[];return e("div.listupd > article").each((function(r,n){var i=e(n).find("h2").text(),o=e(n).find("img"),l=e(n).find("a").attr("href");l&&a.push({name:i,cover:o.attr("data-src")||o.attr("src")||s.defaultCover,path:l.replace(t.site,"")})})),a},i.prototype.popularNovels=function(a,r){return e(this,arguments,void 0,(function(e,a){var r,n,s,i,o,l,u=a.filters,c=a.showLatestNovels;return t(this,(function(t){switch(t.label){case 0:for(n in r=this.site+"/series/?page="+e,u||(u={}),c&&(r+="&order=latest"),u)if("object"==typeof u[n].value)for(s=0,i=u[n].value;s<i.length;s++)o=i[s],r+="&".concat(n,"=").concat(o);else u[n].value&&(r+="&".concat(n,"=").concat(u[n].value));return[4,this.getCheerio(r,0)];case 1:return l=t.sent(),[2,this.parseNovels(l)]}}))}))},i.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,r,i,o,l,u,c,p,v,h=this;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:switch(e=t.sent(),(r={path:a.replace(this.site,""),name:"Untitled"}).name=e("h1.entry-title").text().trim(),i=e("img.wp-post-image"),r.cover=i.attr("data-src")||i.attr("src")||s.defaultCover,(null===(p=e("div.sertostat > span").attr("class"))||void 0===p?void 0:p.toLowerCase())||""){case"completed":r.status=n.NovelStatus.Completed;break;case"ongoing":r.status=n.NovelStatus.Ongoing;break;case"hiatus":r.status=n.NovelStatus.OnHiatus;break;default:r.status=n.NovelStatus.Unknown}return(o=e("div.serl")).length||(o=e("div.spe > span")),o.each((function(){var t=e(this).contents().first().text().replace(":","").trim().toLowerCase(),a=e(this).contents().last().text().trim().toLowerCase();switch(t){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":r.author=a;break;case"الحالة":case"status":case"statut":case"estado":case"durum":switch(a){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":r.status=n.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":r.status=n.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":r.status=n.NovelStatus.OnHiatus;break;default:r.status=n.NovelStatus.Unknown}break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":r.artist=a}})),(l=e(".sertogenre")).length||(l=e(".genxed")),r.genres=l.children("a").map((function(t,a){return e(a).text()})).toArray().join(","),(u=e(".sersys > p").map((function(t,a){return e(a).text().trim()})).toArray()).length||(u=e(".entry-content > p").map((function(t,a){return e(a).text().trim()})).toArray()),r.summary=u.join("\n"),c=[],e(".eplister li").each((function(t,a){var r,n=e(a).find(".epl-num").text()+" "+e(a).find(".epl-title").text(),s=e(a).find("a").attr("href")||"",i=e(a).find(".epl-date").text().trim();switch(e(a).find(".epl-price").text().trim().toLowerCase()){case"free":case"gratuit":case"مجاني":case"livre":case"":r=1;break;default:r=0}r&&c.push({name:n,path:s.replace(h.site,""),releaseTime:i})})),(null===(v=this.options)||void 0===v?void 0:v.reverseChapters)&&c.length&&c.reverse(),r.chapters=c,[2,r]}}))}))},i.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e,r,n;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a,0)];case 1:return e=t.sent(),"kolnovel"==this.id&&((r=e("article > style").text().trim().split(",")).push.apply(r,(null===(n=r.pop())||void 0===n?void 0:n.match(/^\.\w+/))||[]),r.map((function(t){return e("p".concat(t)).remove()}))),[2,e(".epcontent p").map((function(t,a){return e(a)})).toArray().join("\n")||""]}}))}))},i.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return e=this.site+"page/"+r+"/?s="+a,[4,this.getCheerio(e,1)];case 1:return n=t.sent(),[2,this.parseNovels(n)]}}))}))},i}())({id:"whitemoonlightnovels",sourceSite:"https://whitemoonlightnovels.com/",sourceName:"White Moonlight Novels",options:{lang:"English",reverseChapters:0},filters:{"genre[]":{type:"Checkbox",label:"Genre",value:[],options:[{label:"Action",value:"action"},{label:"Adventure",value:"adventure"},{label:"Boy's Love",value:"boys-love"},{label:"Business",value:"business"},{label:"Completed",value:"completed"},{label:"Cultivation",value:"cultivation"},{label:"Dropped",value:"dropped"},{label:"Entertainment Industry",value:"entertainment-industry"},{label:"Gaming",value:"gaming"},{label:"Ger",value:"ger"},{label:"Modern",value:"modern"},{label:"Omegaverse",value:"omegaverse"},{label:"Rebirth",value:"rebirth"},{label:"Revenge",value:"revenge"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Supernatural",value:"supernatural"},{label:"Survival",value:"survival"},{label:"System",value:"system"},{label:"Transmigration",value:"transmigration"},{label:"Unlimited Flow",value:"unlimited-flow"},{label:"Variety Show",value:"variety-show"}]},"type[]":{type:"Checkbox",label:"Type",value:[],options:[]},status:{type:"Picker",label:"Status",value:"",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Hiatus",value:"hiatus"},{label:"Completed",value:"completed"}]},order:{type:"Picker",label:"Order by",value:"",options:[{label:"Default",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"},{label:"Rating",value:"rating"}]}}});exports.default=i;