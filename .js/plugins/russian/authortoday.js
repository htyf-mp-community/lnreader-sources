"use strict";var e=this&&this.__awaiter||function(e,a,l,t){return new(l||(l=Promise))((function(r,o){function i(e){try{u(t.next(e))}catch(e){o(e)}}function n(e){try{u(t.throw(e))}catch(e){o(e)}}function u(e){var a;e.done?r(e.value):(a=e.value,a instanceof l?a:new l((function(e){e(a)}))).then(i,n)}u((t=t.apply(e,a||[])).next())}))},a=this&&this.__generator||function(e,a){var l,t,r,o,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function n(n){return function(u){return function(n){if(l)throw new TypeError("Generator is already executing.");for(;o&&(o=0,n[0]&&(i=0)),i;)try{if(l=1,t&&(r=2&n[0]?t.return:n[0]?t.throw||((r=t.return)&&r.call(t),0):t.next)&&!(r=r.call(t,n[1])).done)return r;switch(t=0,r&&(n=[2&n[0],r.value]),n[0]){case 0:case 1:r=n;break;case 4:return i.label++,{value:n[1],done:0};case 5:i.label++,t=n[1],n=[0];continue;case 7:n=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==n[0]&&2!==n[0])){i=0;continue}if(3===n[0]&&(!r||n[1]>r[0]&&n[1]<r[3])){i.label=n[1];break}if(6===n[0]&&i.label<r[1]){i.label=r[1],r=n;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(n);break}r[2]&&i.ops.pop(),i.trys.pop();continue}n=a.call(e,i)}catch(e){n=[6,e],t=0}finally{l=r=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:1}}([n,u])}}},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var t=require("@libs/filterInputs"),r=require("@libs/defaultCover"),o=require("@libs/fetch"),i=require("@libs/novelStatus"),n=require("cheerio"),u=l(require("dayjs")),s="https://api.author.today/",v="Bearer guest",c=function(){function l(){var e=this;this.id="AT",this.name="Автор Тудей",this.icon="src/ru/authortoday/icon.png",this.site="https://author.today",this.version="1.0.0",this.fetchImage=o.fetchFile,this.resolveUrl=function(a,l){return l?e.site+"/work/"+a:e.site+"/reader/"+a},this.filters={sort:{label:"Сортировка",value:"popular",options:[{label:"По популярности",value:"popular"},{label:"По количеству лайков",value:"likes"},{label:"По комментариям",value:"comments"},{label:"По новизне",value:"recent"},{label:"По просмотрам",value:"views"},{label:"Набирающие популярность",value:"trending"}],type:t.FilterTypes.Picker},genre:{label:"Жанры",value:"",options:[{label:"Все",value:""},{label:"Альтернативная история",value:"sf-history"},{label:"Антиутопия",value:"dystopia"},{label:"Бизнес-литература",value:"biznes-literatura"},{label:"Боевая фантастика",value:"sf-action"},{label:"Боевик",value:"action"},{label:"Боевое фэнтези",value:"fantasy-action"},{label:"Бояръ-Аниме",value:"boyar-anime"},{label:"Героическая фантастика",value:"sf-heroic"},{label:"Героическое фэнтези",value:"heroic-fantasy"},{label:"Городское фэнтези",value:"urban-fantasy"},{label:"Детектив",value:"detective"},{label:"Детская литература",value:"detskaya-literatura"},{label:"Документальная проза",value:"non-fiction"},{label:"Историческая проза",value:"historical-fiction"},{label:"Исторические приключения",value:"historical-adventure"},{label:"Исторический детектив",value:"historical-mystery"},{label:"Исторический любовный роман",value:"historical-romance"},{label:"Историческое фэнтези",value:"historical-fantasy"},{label:"Киберпанк",value:"cyberpunk"},{label:"Короткий любовный роман",value:"short-romance"},{label:"Космическая фантастика",value:"sf-space"},{label:"ЛитРПГ",value:"litrpg"},{label:"Любовное фэнтези",value:"love-fantasy"},{label:"Любовные романы",value:"romance"},{label:"Мистика",value:"paranormal"},{label:"Назад в СССР",value:"back-to-ussr"},{label:"Научная фантастика",value:"science-fiction"},{label:"Подростковая проза",value:"teen-prose"},{label:"Политический роман",value:"political-fiction"},{label:"Попаданцы",value:"popadantsy"},{label:"Попаданцы в космос",value:"popadantsy-v-kosmos"},{label:"Попаданцы в магические миры",value:"popadantsy-v-magicheskie-miry"},{label:"Попаданцы во времени",value:"popadantsy-vo-vremeni"},{label:"Постапокалипсис",value:"postapocalyptic"},{label:"Поэзия",value:"poetry"},{label:"Приключения",value:"adventure"},{label:"Публицистика",value:"publicism"},{label:"Развитие личности",value:"razvitie-lichnosti"},{label:"Разное",value:"other"},{label:"РеалРПГ",value:"realrpg"},{label:"Романтическая эротика",value:"romantic-erotika"},{label:"Сказка",value:"fairy-tale"},{label:"Современная проза",value:"modern-prose"},{label:"Современный любовный роман",value:"contemporary-romance"},{label:"Социальная фантастика",value:"sf-social"},{label:"Стимпанк",value:"steampunk"},{label:"Темное фэнтези",value:"dark-fantasy"},{label:"Триллер",value:"thriller"},{label:"Ужасы",value:"horror"},{label:"Фантастика",value:"sci-fi"},{label:"Фантастический детектив",value:"detective-science-fiction"},{label:"Фанфик",value:"fanfiction"},{label:"Фэнтези",value:"fantasy"},{label:"Шпионский детектив",value:"spy-mystery"},{label:"Эпическое фэнтези",value:"epic-fantasy"},{label:"Эротика",value:"erotica"},{label:"Эротическая фантастика",value:"sf-erotika"},{label:"Эротический фанфик",value:"fanfiction-erotika"},{label:"Эротическое фэнтези",value:"fantasy-erotika"},{label:"Юмор",value:"humor"},{label:"Юмористическая фантастика",value:"sf-humor"},{label:"Юмористическое фэнтези",value:"ironical-fantasy"}],type:t.FilterTypes.Picker},form:{label:"Форма произведения",value:"any",options:[{label:"Любой",value:"any"},{label:"Перевод",value:"translation"},{label:"Повесть",value:"tale"},{label:"Рассказ",value:"story"},{label:"Роман",value:"novel"},{label:"Сборник поэзии",value:"poetry"},{label:"Сборник рассказов",value:"story-book"}],type:t.FilterTypes.Picker},state:{label:"Статус произведения",value:"any",options:[{label:"Любой статус",value:"any"},{label:"В процессе",value:"in-progress"},{label:"Завершено",value:"finished"}],type:t.FilterTypes.Picker},series:{label:"Статус цикла",value:"any",options:[{label:"Не важно",value:"any"},{label:"Вне цикла",value:"out"},{label:"Цикл завершен",value:"finished"},{label:"Цикл не завершен",value:"unfinished"}],type:t.FilterTypes.Picker},access:{label:"Тип доступа",value:"any",options:[{label:"Любой",value:"any"},{label:"Платный",value:"paid"},{label:"Бесплатный",value:"free"}],type:t.FilterTypes.Picker},promo:{label:"Промо-фрагмент",value:"hide",options:[{label:"Скрывать",value:"hide"},{label:"Показывать",value:"show"}],type:t.FilterTypes.Picker}}}return l.prototype.popularNovels=function(l,t){return e(this,arguments,void 0,(function(e,l){var t,i,n,u,c,h,b,p,f,d,y,m=l.showLatestNovels,g=l.filters;return a(this,(function(a){switch(a.label){case 0:return t=s+"v1/catalog/search?page="+e,(null===(u=null==g?void 0:g.genre)||void 0===u?void 0:u.value)&&(t+="&genre="+g.genre.value),t+="&sorting="+(m?"recent":(null===(c=null==g?void 0:g.sort)||void 0===c?void 0:c.value)||"popular"),t+="&form="+((null===(h=null==g?void 0:g.form)||void 0===h?void 0:h.value)||"any"),t+="&state="+((null===(b=null==g?void 0:g.state)||void 0===b?void 0:b.value)||"any"),t+="&series="+((null===(p=null==g?void 0:g.series)||void 0===p?void 0:p.value)||"any"),t+="&access="+((null===(f=null==g?void 0:g.access)||void 0===f?void 0:f.value)||"any"),t+="&promo="+((null===(d=null==g?void 0:g.promo)||void 0===d?void 0:d.value)||"hide"),[4,(0,o.fetchApi)(t,{headers:{Authorization:v}})];case 1:return[4,a.sent().json()];case 2:return i=a.sent(),n=[],"NotFound"===i.code?[2,n]:(null===(y=null==i?void 0:i.searchResults)||void 0===y||y.forEach((function(e){return n.push({name:e.title,cover:e.coverUrl?"https://cm.author.today/content/"+e.coverUrl:r.defaultCover,path:e.id.toString()})})),[2,n])}}))}))},l.prototype.parseNovel=function(l){return e(this,void 0,void 0,(function(){var e,t,n,c,h;return a(this,(function(a){switch(a.label){case 0:return[4,(0,o.fetchApi)("".concat(s,"v1/work/").concat(l,"/details"),{headers:{Authorization:v}})];case 1:return[4,a.sent().json()];case 2:return e=a.sent(),t={path:l,name:e.title,cover:e.coverUrl?e.coverUrl.split("?")[0]:r.defaultCover,genres:null===(h=e.tags)||void 0===h?void 0:h.join(", "),summary:"",author:e.originalAuthor||e.authorFIO||e.coAuthorFIO||e.secondCoAuthorFIO||e.translator||"",status:e.isFinished?i.NovelStatus.Completed:i.NovelStatus.Ongoing},e.annotation&&(t.summary+=e.annotation+"\n"),e.authorNotes&&(t.summary+="Примечания автора:\n"+e.authorNotes),[4,(0,o.fetchApi)("".concat(s,"v1/work/").concat(l,"/content"),{headers:{Authorization:v}})];case 3:return[4,a.sent().json()];case 4:return n=a.sent(),c=[],n.forEach((function(e,a){e.isAvailable&&!e.isDraft&&c.push({name:e.title||"Глава "+(a+1),path:l+"/"+e.id,releaseTime:(0,u.default)(e.publishTime||e.lastModificationTime).format("LLL"),chapterNumber:(e.sortOrder||a)+1})})),t.chapters=c,[2,t]}}))}))},l.prototype.parseChapter=function(l){return e(this,void 0,void 0,(function(){var e,t,r,i,u,c,h,b,p=this;return a(this,(function(a){switch(a.label){case 0:return e=l.split("/"),t=e[0],r=e[1],[4,(0,o.fetchApi)(s+"v1/work/".concat(t,"/chapter/").concat(r,"/text"),{headers:{Authorization:v}})];case 1:return[4,a.sent().json()];case 2:if((i=a.sent()).code)return[2,i.code+"\n"+(null==i?void 0:i.message)];for(u=i.key.split("").reverse().join("")+"@_@",c="",h=0;h<i.text.length;h++)c+=String.fromCharCode(i.text.charCodeAt(h)^u.charCodeAt(Math.floor(h%u.length)));return(b=(0,n.load)(c))("img").each((function(e,a){var l;if(!(null===(l=b(a).attr("src"))||void 0===l?void 0:l.startsWith("http"))){var t=b(a).attr("src");b(a).attr("src",p.site+t)}})),[2,b.html()]}}))}))},l.prototype.searchNovels=function(l){return e(this,arguments,void 0,(function(e,l){var t,i,u,s;return void 0===l&&(l=1),a(this,(function(a){switch(a.label){case 0:return t=this.site+"/search?category=works&q="+e+"&page="+l,[4,(0,o.fetchApi)(t).then((function(e){return e.text()}))];case 1:return i=a.sent(),u=(0,n.load)(i),s=[],u("a.work-row").each((function(e,a){var l=u(a).find('h4[class="work-title"]').text().trim(),t=u(a).find("img").attr("data-src"),o=u(a).attr("href");t=t?t.split("?")[0]:r.defaultCover,o&&s.push({name:l,cover:t,path:o.replace("/work/","")})})),[2,s]}}))}))},l}();exports.default=new c;