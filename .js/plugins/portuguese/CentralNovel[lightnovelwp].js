"use strict";var e=this&&this.__awaiter||function(e,a,t,l){return new(t||(t=Promise))((function(r,o){function i(e){try{s(l.next(e))}catch(e){o(e)}}function n(e){try{s(l.throw(e))}catch(e){o(e)}}function s(e){var a;e.done?r(e.value):(a=e.value,a instanceof t?a:new t((function(e){e(a)}))).then(i,n)}s((l=l.apply(e,a||[])).next())}))},a=this&&this.__generator||function(e,a){var t,l,r,o,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function n(n){return function(s){return function(n){if(t)throw new TypeError("Generator is already executing.");for(;o&&(o=0,n[0]&&(i=0)),i;)try{if(t=1,l&&(r=2&n[0]?l.return:n[0]?l.throw||((r=l.return)&&r.call(l),0):l.next)&&!(r=r.call(l,n[1])).done)return r;switch(l=0,r&&(n=[2&n[0],r.value]),n[0]){case 0:case 1:r=n;break;case 4:return i.label++,{value:n[1],done:0};case 5:i.label++,l=n[1],n=[0];continue;case 7:n=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==n[0]&&2!==n[0])){i=0;continue}if(3===n[0]&&(!r||n[1]>r[0]&&n[1]<r[3])){i.label=n[1];break}if(6===n[0]&&i.label<r[1]){i.label=r[1],r=n;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(n);break}r[2]&&i.ops.pop(),i.trys.pop();continue}n=a.call(e,i)}catch(e){n=[6,e],l=0}finally{t=r=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:1}}([n,s])}}};Object.defineProperty(exports,"__esModule",{value:1});var t=require("cheerio"),l=require("@libs/fetch"),r=require("@libs/novelStatus"),o=require("@libs/defaultCover"),i=new(function(){function i(e){this.fetchImage=l.fetchFile,this.id=e.id,this.name=e.sourceName,this.icon="multisrc/lightnovelwp/".concat(e.id,".png"),this.site=e.sourceSite,this.version="1.0.3",this.options=e.options,this.filters=e.filters}return i.prototype.getHostname=function(e){return e.split("/")[2]},i.prototype.getCheerio=function(r,o){return e(this,void 0,void 0,(function(){var e,i,n,s;return a(this,(function(a){switch(a.label){case 0:return[4,(0,l.fetchApi)(r)];case 1:if(!(e=a.sent()).ok&&1!=o)throw new Error("Could not reach site ("+e.status+") try to open in webview.");return n=t.load,[4,e.text()];case 2:if(i=n.apply(void 0,[a.sent()]),s=i("title").text().trim(),this.getHostname(r)!=this.getHostname(e.url)||"Bot Verification"==s||"You are being redirected..."==s)throw new Error("Captcha error, please open in webview");return[2,i]}}))}))},i.prototype.parseNovels=function(e){var a=this,t=[];return e("div.listupd > article").each((function(l,r){var i=e(r).find("h2").text(),n=e(r).find("img"),s=e(r).find("a").attr("href");s&&t.push({name:i,cover:n.attr("data-src")||n.attr("src")||o.defaultCover,path:s.replace(a.site,"")})})),t},i.prototype.popularNovels=function(t,l){var r=l.filters,o=l.showLatestNovels;return e(this,void 0,void 0,(function(){var e,l,i,n,s,u;return a(this,(function(a){switch(a.label){case 0:for(l in e=this.site+"/series/?page="+t,r||(r={}),o&&(e+="&order=latest"),r)if("object"==typeof r[l].value)for(i=0,n=r[l].value;i<n.length;i++)s=n[i],e+="&".concat(l,"=").concat(s);else r[l].value&&(e+="&".concat(l,"=").concat(r[l].value));return[4,this.getCheerio(e,0)];case 1:return u=a.sent(),[2,this.parseNovels(u)]}}))}))},i.prototype.parseNovel=function(t){var l,i;return e(this,void 0,void 0,(function(){var e,n,s,u,c,v,p,h=this;return a(this,(function(a){switch(a.label){case 0:return[4,this.getCheerio(this.site+t,0)];case 1:switch(e=a.sent(),(n={path:t.replace(this.site,""),name:"Untitled"}).name=e("h1.entry-title").text().trim(),s=e("img.wp-post-image"),n.cover=s.attr("data-src")||s.attr("src")||o.defaultCover,(null===(l=e("div.sertostat > span").attr("class"))||void 0===l?void 0:l.toLowerCase())||""){case"completed":n.status=r.NovelStatus.Completed;break;case"ongoing":n.status=r.NovelStatus.Ongoing;break;case"hiatus":n.status=r.NovelStatus.OnHiatus;break;default:n.status=r.NovelStatus.Unknown}return(u=e("div.serl")).length||(u=e("div.spe > span")),u.each((function(){var a=e(this).contents().first().text().replace(":","").trim().toLowerCase(),t=e(this).contents().last().text().trim().toLowerCase();switch(a){case"الكاتب":case"author":case"auteur":case"autor":case"yazar":n.author=t;break;case"الحالة":case"status":case"statut":case"estado":case"durum":switch(t){case"مكتملة":case"completed":case"complété":case"completo":case"completado":case"tamamlandı":n.status=r.NovelStatus.Completed;break;case"مستمرة":case"ongoing":case"en cours":case"em andamento":case"en progreso":case"devam ediyor":n.status=r.NovelStatus.Ongoing;break;case"متوقفة":case"hiatus":case"en pause":case"hiato":case"pausa":case"pausado":case"duraklatıldı":n.status=r.NovelStatus.OnHiatus;break;default:n.status=r.NovelStatus.Unknown}break;case"الفنان":case"artist":case"artiste":case"artista":case"çizer":n.artist=t}})),(c=e(".sertogenre")).length||(c=e(".genxed")),n.genres=c.children("a").map((function(a,t){return e(t).text()})).toArray().join(","),(v=e(".sersys > p").map((function(a,t){return e(t).text().trim()})).toArray()).length||(v=e(".entry-content > p").map((function(a,t){return e(t).text().trim()})).toArray()),n.summary=v.join("\n"),p=[],e(".eplister li").each((function(a,t){var l,r=e(t).find(".epl-num").text()+" "+e(t).find(".epl-title").text(),o=e(t).find("a").attr("href")||"",i=e(t).find(".epl-date").text().trim();switch(e(t).find(".epl-price").text().trim().toLowerCase()){case"free":case"gratuit":case"مجاني":case"livre":case"":l=1;break;default:l=0}l&&p.push({name:r,path:o.replace(h.site,""),releaseTime:i})})),(null===(i=this.options)||void 0===i?void 0:i.reverseChapters)&&p.length&&p.reverse(),n.chapters=p,[2,n]}}))}))},i.prototype.parseChapter=function(t){var l;return e(this,void 0,void 0,(function(){var e,r;return a(this,(function(a){switch(a.label){case 0:return[4,this.getCheerio(this.site+t,0)];case 1:return e=a.sent(),"kolnovel"==this.id&&((r=e("article > style").text().trim().split(",")).push.apply(r,(null===(l=r.pop())||void 0===l?void 0:l.match(/^\.\w+/))||[]),r.map((function(a){return e("p".concat(a)).remove()}))),[2,e(".epcontent p").map((function(a,t){return e(t)})).toArray().join("\n")||""]}}))}))},i.prototype.searchNovels=function(t,l){return e(this,void 0,void 0,(function(){var e,r;return a(this,(function(a){switch(a.label){case 0:return e=this.site+"page/"+l+"/?s="+t,[4,this.getCheerio(e,1)];case 1:return r=a.sent(),[2,this.parseNovels(r)]}}))}))},i}())({id:"centralnovel",sourceSite:"https://centralnovel.com/",sourceName:"Central Novel",options:{lang:"Portuguese",reverseChapters:1},filters:{"genre[]":{type:"Checkbox",label:"Gênero",value:[],options:[{label:"Ação",value:"acao"},{label:"Action",value:"action"},{label:"Adulto",value:"adulto"},{label:"Adventure",value:"adventure"},{label:"Artes Marciais",value:"artes-marciais"},{label:"Aventura",value:"aventura"},{label:"Comédia",value:"comedia"},{label:"Cotidiano",value:"cotidiano"},{label:"Cultivo",value:"cultivo"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Escolar",value:"escolar"},{label:"Esportes",value:"esportes"},{label:"Evolução",value:"evolucao"},{label:"Fantasia",value:"fantasia"},{label:"Fantasy",value:"fantasy"},{label:"Ficção Científica",value:"ficcao-cientifica"},{label:"Gender Bender",value:"gender-bender"},{label:"Harém",value:"harem"},{label:"Histórico",value:"historico"},{label:"Isekai",value:"isekai"},{label:"Josei",value:"josei"},{label:"Magia",value:"magia"},{label:"Mecha",value:"mecha"},{label:"Medieval",value:"medieval"},{label:"Mistério",value:"misterio"},{label:"Mitologia",value:"mitologia"},{label:"Monstros",value:"monstros"},{label:"Pet",value:"pet"},{label:"Protagonista Feminina",value:"protagonista-feminina"},{label:"Protagonista Maligno",value:"protagonista-maligno"},{label:"Psicológico",value:"psicologico"},{label:"Psychological",value:"psychological"},{label:"Reencarnação",value:"reencarnacao"},{label:"Romance",value:"romance"},{label:"Seinen",value:"seinen"},{label:"Shounen",value:"shounen"},{label:"Shounen BL",value:"shounen-bl"},{label:"Sistema",value:"sistema"},{label:"Sistema de Jogo",value:"sistema-de-jogo"},{label:"Slice of Life",value:"slice-of-life"},{label:"Sobrenatural",value:"sobrenatural"},{label:"Supernatural",value:"supernatural"},{label:"Terror",value:"terror"},{label:"Tragédia",value:"tragedia"},{label:"Transmigração",value:"transmigracao"},{label:"Vida Escolar",value:"vida-escolar"},{label:"VRMMO",value:"vrmmo"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"}]},"type[]":{type:"Checkbox",label:"Tipo",value:[],options:[{label:"Light Novel",value:"light-novel"},{label:"Novel Chinesa",value:"novel-chinesa"},{label:"Novel Coreana",value:"novel-coreana"},{label:"Novel Japonesa",value:"novel-japonesa"},{label:"Novel Ocidental",value:"novel-ocidental"},{label:"Webnovel",value:"webnovel"}]},status:{type:"Picker",label:"Status",value:"",options:[{label:"Todos",value:""},{label:"Em andamento",value:"em andamento"},{label:"Hiato",value:"hiato"},{label:"Completo",value:"completo"}]},order:{type:"Picker",label:"Ordenar por",value:"",options:[{label:"Padrão",value:""},{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Últ. Att",value:"update"},{label:"Últ. Add",value:"latest"},{label:"Populares",value:"popular"}]}}});exports.default=i;