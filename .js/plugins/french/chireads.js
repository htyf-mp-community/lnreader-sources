var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(i,l){function n(e){try{u(r.next(e))}catch(e){l(e)}}function s(e){try{u(r.throw(e))}catch(e){l(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(n,s)}u((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,i,l,n={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return l={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function s(s){return function(u){return function(s){if(a)throw new TypeError("Generator is already executing.");for(;l&&(l=0,s[0]&&(n=0)),n;)try{if(a=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return n.label++,{value:s[1],done:0};case 5:n.label++,r=s[1],s=[0];continue;case 7:s=n.ops.pop(),n.trys.pop();continue;default:if(!(i=n.trys,(i=i.length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){n=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){n.label=s[1];break}if(6===s[0]&&n.label<i[1]){n.label=i[1],i=s;break}if(i&&n.label<i[2]){n.label=i[2],n.ops.push(s);break}i[2]&&n.ops.pop(),n.trys.pop();continue}s=t.call(e,n)}catch(e){s=[6,e],r=0}finally{a=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:1}}([s,u])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("cheerio"),i=require("@libs/fetch"),l=require("@libs/filterInputs"),n=a(require("dayjs")),s=require("@libs/defaultCover"),u=require("@libs/novelStatus"),o=function(){function a(){this.id="chireads",this.name="Chireads",this.icon="src/fr/chireads/icon.png",this.site="https://chireads.com",this.version="1.0.2",this.fetchImage=i.fetchFile,this.filters={tag:{type:l.FilterTypes.Picker,label:"Tag",value:"all",options:[{label:"Tous",value:"all"},{label:"Arts martiaux",value:"arts-martiaux"},{label:"De faible à fort",value:"de-faible-a-fort"},{label:"Adapté en manhua",value:"adapte-en-manhua"},{label:"Cultivation",value:"cultivation"},{label:"Action",value:"action"},{label:"Aventure",value:"aventure"},{label:"Monstres",value:"monstres"},{label:"Xuanhuan",value:"xuanhuan"},{label:"Fantastique",value:"fantastique"},{label:"Adapté en Animé",value:"adapte-en-anime"},{label:"Alchimie",value:"alchimie"},{label:"Éléments de jeux",value:"elements-de-jeux"},{label:"Calme Protagoniste",value:"calme-protagoniste"},{label:"Protagoniste intelligent",value:"protagoniste-intelligent"},{label:"Polygamie",value:"polygamie"},{label:"Belle femelle Lea",value:"belle-femelle-lea"},{label:"Personnages arrogants",value:"personnages-arrogants"},{label:"Système de niveau",value:"systeme-de-niveau"},{label:"Cheat",value:"cheat"},{label:"Protagoniste génie",value:"protagoniste-genie"},{label:"Comédie",value:"comedie"},{label:"Gamer",value:"gamer"},{label:"Mariage",value:"mariage"},{label:"seeking Protag",value:"seeking-protag"},{label:"Romance précoce",value:"romance-precoce"},{label:"Croissance accélérée",value:"croissance-acceleree"},{label:"Artefacts",value:"artefacts"},{label:"Intelligence artificielle",value:"intelligence-artificielle"},{label:"Mariage arrangé",value:"mariage-arrange"},{label:"Mature",value:"mature"},{label:"Adulte",value:"adulte"},{label:"Administrateur de système",value:"administrateur-de-systeme"},{label:"Beau protagoniste",value:"beau-protagoniste"},{label:"Protagoniste charismatique",value:"protagoniste-charismatique"},{label:"Protagoniste masculin",value:"protagoniste-masculin"},{label:"Démons",value:"demons"},{label:"Reincarnation",value:"reincarnation"},{label:"Académie",value:"academie"},{label:"Cacher les vraies capacités",value:"cacher-les-vraies-capacites"},{label:"Protagoniste surpuissant",value:"protagoniste-surpuissant"},{label:"Joueur",value:"joueur"},{label:"Protagoniste fort dès le départ",value:"protagoniste-fort-des-le-depart"},{label:"Immortels",value:"immortels"},{label:"Cultivation rapide",value:"cultivation-rapide"},{label:"Harem",value:"harem"},{label:"Assasins",value:"assasins"},{label:"De pauvre à riche",value:"de-pauvre-a-riche"},{label:"Système de classement de jeux",value:"systeme-de-classement-de-jeux"},{label:"Capacités spéciales",value:"capacites-speciales"},{label:"Vengeance",value:"vengeance"}]}}}return a.prototype.getCheerio=function(a){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return[4,(0,i.fetchApi)(a,{headers:{"Accept-Encoding":"deflate"}})];case 1:return[4,t.sent().text()];case 2:return e=t.sent(),[2,(0,r.load)(e)]}}))}))},a.prototype.popularNovels=function(a,r){return e(this,arguments,void 0,(function(e,a){var r,i,l,n,u,o,c,f,v,h,p,d,m,b=this,g=a.filters,x=a.showLatestNovels;return t(this,(function(t){switch(t.label){case 0:if(r=this.site,i="all",x)r+="/category/translatedtales/page/"+e;else if(g&&"string"==typeof g.tag.value&&"all"!==g.tag.value&&(i=g.tag.value),"all"!==i)r+="/tag/"+i+"/page/"+e;else if(e>1)return[2,[]];return[4,this.getCheerio(r)];case 1:if(l=t.sent(),n=[],!x&&"all"===i)return[3,7];o=1,x&&(o=2),c=0,t.label=2;case 2:return c<o?1!==c?[3,4]:[4,this.getCheerio(this.site+"/category/original/page/"+e)]:[3,6];case 3:l=t.sent(),t.label=4;case 4:(f=l(".romans-content li")).length||(f=l("#content li")),f.each((function(e,t){var a=l(t).contents().find("div").first().text().trim(),r=l(t).find("div").first().find("img").attr("src"),i=l(t).find("div").first().find("a").attr("href");i&&(u={name:a,cover:r,path:i.replace(b.site,"")},n.push(u))})),t.label=5;case 5:return c++,[3,2];case 6:return[3,8];case 7:12===(v=l(':contains("Populaire")').last().parent().next().find("li > div")).length?v.each((function(e,t){if(e%2==0)h=l(t).find("img").attr("src");else{if(p=l(t).text().trim(),!(d=l(t).find("a").attr("href")))return;u={name:p,cover:h||s.defaultCover,path:d.replace(b.site,"")},n.push(u)}})):(m=v.find("div.popular-list-img img"),v.find("div.popular-list-name").each((function(e,t){var a=l(t).text().trim(),r=l(m[e]).attr("src"),i=l(t).find("a").attr("href");i&&(u={name:a,cover:r,path:i.replace(b.site,"")},n.push(u))}))),t.label=8;case 8:return[2,n]}}))}))},a.prototype.parseNovel=function(a){return e(this,void 0,void 0,(function(){var e,r,i,l,o,c=this;return t(this,(function(t){switch(t.label){case 0:return e={path:a,name:"Sans titre"},[4,this.getCheerio(this.site+a)];case 1:switch(r=t.sent(),e.name=r(".inform-product-txt").first().text().trim()||r(".inform-title").text().trim(),e.cover=r(".inform-product img").attr("src")||r(".inform-product-img img").attr("src")||s.defaultCover,e.summary=r(".inform-inform-txt").text().trim()||r(".inform-intr-txt").text().trim(),(i=r("div.inform-product-txt > div.inform-intr-col").text().trim()||r("div.inform-inform-data > h6").text().trim()).includes("Auteur : ")?e.author=i.substring(i.indexOf("Auteur : ")+9,i.indexOf("Statut de Parution : ")).trim():i.includes("Fantrad : ")?e.author=i.substring(i.indexOf("Fantrad : ")+10,i.indexOf("Statut de Parution : ")).trim():e.author="Inconnu",i.substring(i.indexOf("Statut de Parution : ")+21).toLowerCase()){case"en pause":e.status=u.NovelStatus.OnHiatus;break;case"complet":e.status=u.NovelStatus.Completed;break;default:e.status=u.NovelStatus.Ongoing}return l=[],(o=r(".chapitre-table a")).length||(r("div.inform-annexe-list").first().remove(),o=r(".inform-annexe-list").find("a")),o.each((function(e,t){var a=r(t).text().trim(),i=r(t).attr("href"),s=(0,n.default)(null==i?void 0:i.substring(i.length-11,i.length-1)).format("DD MMMM YYYY");i&&l.push({name:a,releaseTime:s,path:i.replace(c.site,"")})})),e.chapters=l,[2,e]}}))}))},a.prototype.parseChapter=function(a){return e(this,void 0,void 0,(function(){var e;return t(this,(function(t){switch(t.label){case 0:return[4,this.getCheerio(this.site+a)];case 1:return e=t.sent(),[2,e("#content").html()||""]}}))}))},a.prototype.searchNovels=function(a,r){return e(this,void 0,void 0,(function(){var e,i,l;return t(this,(function(t){switch(t.label){case 0:if(1!==r)return[2,[]];e=[],i=1,l=0,t.label=1;case 1:return l?[3,3]:[4,this.popularNovels(i,{showLatestNovels:1,filters:void 0}).then((function(t){0===t.length&&(l=1),e.push.apply(e,t)}))];case 2:return t.sent(),i++,[3,1];case 3:return[2,e=e.filter((function(e){return e.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").includes(a.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""))}))]}}))}))},a}();exports.default=new o;