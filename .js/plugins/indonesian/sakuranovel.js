var e=this&&this.__awaiter||function(e,t,a,l){return new(a||(a=Promise))((function(n,r){function i(e){try{u(l.next(e))}catch(e){r(e)}}function o(e){try{u(l.throw(e))}catch(e){r(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}u((l=l.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,l,n,r,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return r={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function o(o){return function(u){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;r&&(r=0,o[0]&&(i=0)),i;)try{if(a=1,l&&(n=2&o[0]?l.return:o[0]?l.throw||((n=l.return)&&n.call(l),0):l.next)&&!(n=n.call(l,o[1])).done)return n;switch(l=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,l=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],l=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,u])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),l=require("@libs/fetch"),n=require("@libs/filterInputs"),r=function(){function r(){this.id="sakura.id",this.name="SakuraNovel",this.icon="src/id/sakuranovel/icon.png",this.site="https://sakuranovel.id/",this.version="1.0.1",this.filters={status:{value:"",label:"Status",options:[{label:"All",value:""},{label:"Ongoing",value:"ongoing"},{label:"Completed",value:"completed"}],type:n.FilterTypes.Picker},type:{value:"",label:"Type",options:[{label:"All",value:""},{label:"Web Novel",value:"Web+Novel"},{label:"Light Novel",value:"Light+Novel"}],type:n.FilterTypes.Picker},sort:{value:"rating",label:"Order By",options:[{label:"A-Z",value:"title"},{label:"Z-A",value:"titlereverse"},{label:"Latest Update",value:"update"},{label:"Latest Added",value:"latest"},{label:"Popular",value:"popular"},{label:"Rating",value:"rating"}],type:n.FilterTypes.Picker},lang:{value:["china","jepang","korea","unknown"],label:"Country",options:[{label:"China",value:"china"},{label:"Jepang",value:"jepang"},{label:"Korea",value:"korea"},{label:"Unknown",value:"unknown"}],type:n.FilterTypes.CheckboxGroup},genre:{value:[],label:"Genres",options:[{label:"Action",value:"action"},{label:"Adult",value:"adult"},{label:"Adventure",value:"adventure"},{label:"Comedy",value:"comedy"},{label:"Drama",value:"drama"},{label:"Ecchi",value:"ecchi"},{label:"Fantasy",value:"fantasy"},{label:"Gender Bender",value:"gender-bender"},{label:"Harem",value:"harem"},{label:"Horror",value:"horror"},{label:"Josei",value:"josei"},{label:"Josei",value:"josei"},{label:"Martial Arts",value:"martial-arts"},{label:"Mature",value:"mature"},{label:"Mecha",value:"mecha"},{label:"Mystery",value:"mystery"},{label:"Psychological",value:"psychological"},{label:"Romance",value:"romance"},{label:"School Life",value:"school-life"},{label:"Sci-fi",value:"sci-fi"},{label:"Seinen",value:"seinen"},{label:"Shoujo",value:"shoujo"},{label:"Shounen",value:"shounen"},{label:"Slice of Life",value:"slice-of-life"},{label:"Smut",value:"smut"},{label:"Supernatural",value:"supernatural"},{label:"Tragedy",value:"tragedy"},{label:"Wuxia",value:"wuxia"},{label:"Xianxia",value:"xianxia"},{label:"Xuanhuan",value:"xuanhuan"}],type:n.FilterTypes.CheckboxGroup}}}return r.prototype.parseNovels=function(e){var t=this,a=[];return e(".flexbox2-item").each((function(l,n){var r=e(n).find(".flexbox2-title span").first().text(),i=e(n).find("img").attr("src"),o=e(n).find(".flexbox2-content > a").attr("href");o&&a.push({name:r,cover:i,path:o.replace(t.site,"")})})),a},r.prototype.popularNovels=function(n,r){return e(this,arguments,void 0,(function(e,n){var r,i,o,u=n.filters;return t(this,(function(t){switch(t.label){case 0:return r="".concat(this.site,"advanced-search/page/").concat(e,"/?title&author&yearx"),r+="&status=".concat(u.status.value),r+="&type=".concat(u.type.value),r+="&order=".concat(u.sort.value),u.lang.value.length&&(r+=u.lang.value.map((function(e){return"&country[]=".concat(e)})).join("")),u.genre.value.length&&(r+=u.genre.value.map((function(e){return"&genre[]=".concat(e)})).join("")),[4,(0,l.fetchApi)(r)];case 1:return[4,t.sent().text()];case 2:return i=t.sent(),o=(0,a.load)(i),[2,this.parseNovels(o)]}}))}))},r.prototype.parseNovel=function(n){return e(this,void 0,void 0,(function(){var e,r,i,o,u,s,c,v,p=this;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+n)];case 1:return[4,t.sent().text()];case 2:return e=t.sent(),(r=(0,a.load)(e))(".series-synops div").remove(),(i={path:n,name:r(".series-title h2").text().trim()||"Untitled",cover:r(".series-thumb img").attr("src"),author:r(".series-infolist > li b:contains('Author') +").text().trim(),status:r(".status").text().trim(),summary:r(".series-synops").text().trim(),chapters:[]}).genres=r(".series-genres").children("a").map((function(e,t){return r(t).text()})).toArray().join(","),o=null===(v=null===(c=i.cover)||void 0===c?void 0:c.split("/").pop())||void 0===v?void 0:v.split("-").join(" ").split(".")[0],u=i.name.replace(/\(LN\)|\(WN\)/,"").split(",")[0].trim(),s=[],r(".series-flexright li").each((function(e,t){var a=r(t).find("a span").first().text().replace(u,"").replace(o,"").replace(/Bahasa Indonesia/,"").replace(/\s+/g," ").trim(),l=r(t).find(".date").text().trim().split("/").map((function(e){return Number(e)})),n=r(t).find("a").attr("href");n&&s.push({name:a,releaseTime:new Date(l[2],l[1],l[0]).toISOString(),path:n.replace(p.site,"")})})),i.chapters=s.reverse(),[2,i]}}))}))},r.prototype.parseChapter=function(n){return e(this,void 0,void 0,(function(){var e,r,i;return t(this,(function(t){switch(t.label){case 0:return[4,(0,l.fetchApi)(this.site+n)];case 1:return[4,t.sent().text()];case 2:return e=t.sent(),r=(0,a.load)(e),i=r("div:contains('Daftar Isi') +").find("div:first").attr("class"),r(".".concat(i)).remove(),[2,r("div:contains('Daftar Isi') +").html()||""]}}))}))},r.prototype.searchNovels=function(n,r){return e(this,void 0,void 0,(function(){var e,i,o;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site,"page/").concat(r,"/?s=").concat(n),[4,(0,l.fetchApi)(e)];case 1:return[4,t.sent().text()];case 2:return i=t.sent(),o=(0,a.load)(i),[2,this.parseNovels(o)]}}))}))},r.prototype.fetchImage=function(a){return e(this,void 0,void 0,(function(){return t(this,(function(e){return[2,(0,l.fetchFile)(a)]}))}))},r}();exports.default=new r;