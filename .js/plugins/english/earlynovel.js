"use strict";var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(n,l){function i(e){try{u(r.next(e))}catch(e){l(e)}}function o(e){try{u(r.throw(e))}catch(e){l(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}u((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,n,l,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return l={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function o(o){return function(u){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;l&&(l=0,o[0]&&(i=0)),i;)try{if(a=1,r&&(n=2&o[0]?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],r=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,u])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),r=require("@libs/fetch"),n=require("@libs/filterInputs"),l=function(){function l(){this.id="earlynovel",this.name="Early Novel",this.version="1.0.0",this.icon="multisrc/madara/latestnovel.png",this.site="https://earlynovel.net/",this.filters={order:{value:"/most-popular",label:"Order by",options:[{label:"Latest Release",value:"/latest-release-novel"},{label:"Hot Novel",value:"/hot-novel"},{label:"Completed Novel",value:"/completed-novel"},{label:"Most Popular",value:"/most-popular"}],type:n.FilterTypes.Picker},genres:{value:"",label:"Genre",options:[{label:"None",value:""},{label:"Action",value:"/genre/action-1"},{label:"Adult",value:"/genre/adult-2"},{label:"Adventure",value:"/genre/adventure-3"},{label:"Comedy",value:"/genre/comedy-4"},{label:"Drama",value:"/genre/drama-5"},{label:"Ecchi",value:"/genre/ecchi-6"},{label:"Fantasy",value:"/genre/fantasy-7"},{label:"Gender Bender",value:"/genre/gender-bender-8"},{label:"Harem",value:"/genre/harem-9"},{label:"Historical",value:"/genre/historical-10"},{label:"Horror",value:"/genre/horror-11"},{label:"Josei",value:"/genre/josei-12"},{label:"Martial Arts",value:"/genre/martial-arts-13"},{label:"Mature",value:"/genre/mature-14"},{label:"Mecha",value:"/genre/mecha-15"},{label:"Mystery",value:"/genre/mystery-16"},{label:"Psychological",value:"/genre/psychological-17"},{label:"Romance",value:"/genre/romance-18"},{label:"School Life",value:"/genre/school-life-19"},{label:"Sci-fi",value:"/genre/sci-fi-20"},{label:"Seinen",value:"/genre/seinen-21"},{label:"Shoujo",value:"/genre/shoujo-22"},{label:"Shoujo Ai",value:"/genre/shoujo-ai-23"},{label:"Shounen",value:"/genre/shounen-24"},{label:"Shounen Ai",value:"/genre/shounen-ai-25"},{label:"Slice of Life",value:"/genre/slice-of-life-26"},{label:"Smut",value:"/genre/smut-27"},{label:"Sports",value:"/genre/sports-28"},{label:"Supernatural",value:"/genre/supernatural-29"},{label:"Tragedy",value:"/genre/tragedy-30"},{label:"Wuxia",value:"/genre/wuxia-31"},{label:"Xianxia",value:"/genre/xianxia-32"},{label:"Xuanhuan",value:"/genre/xuanhuan-33"},{label:"Yaoi",value:"/genre/yaoi-34"},{label:"Yuri",value:"/genre/yuri-35"},{label:"Video Games",value:"/genre/video-games-36"},{label:"Magical Realism",value:"/genre/magical-realism-37"}],type:n.FilterTypes.Picker}}}return l.prototype.parseNovels=function(e){var t=[];return e(".col-truyen-main > .list-truyen > .row").each((function(a,r){var n=e(r).find("h3.truyen-title > a").attr("href"),l=e(r).find("h3.truyen-title > a").text(),i=e(r).find(".lazyimg").attr("data-image");n&&t.push({path:n,name:l,cover:i})})),t},l.prototype.parseChapters=function(e){var t=[];return e("ul.list-chapter > li").each((function(a,r){var n,l=e(r).find(".chapter-text").text().trim(),i=null===(n=e(r).find("a").attr("href"))||void 0===n?void 0:n.slice(1);i&&t.push({name:l,path:i})})),t},l.prototype.popularNovels=function(n,l){return e(this,arguments,void 0,(function(e,n){var l,i,o,u=n.filters;return t(this,(function(t){switch(t.label){case 0:return l=this.site,u.genres.value.length?l+=u.genres.value:l+=u.order.value,l+="?page=".concat(e),[4,(0,r.fetchApi)(l).then((function(e){return e.text()}))];case 1:return i=t.sent(),o=(0,a.load)(i),[2,this.parseNovels(o)]}}))}))},l.prototype.parseNovel=function(n){return e(this,void 0,void 0,(function(){var e,l,i,o,u,s,c;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+n)];case 1:return[4,t.sent().text()];case 2:return e=t.sent(),(l=(0,a.load)(e))(".glyphicon-menu-right").closest("li").remove(),i=l(".page-nav").prev().find("a"),o=null===(c=i.attr("title"))||void 0===c?void 0:c.match(/(\d+)/),u=Number((null==o?void 0:o[1])||"0"),s={path:n,name:l(".book > img").attr("alt")||"Untitled",cover:l(".book > img").attr("src"),summary:l(".desc-text").text().trim(),chapters:[],totalPages:u},l(".info > div > h3").each((function(){var e=l(this).text(),t=l(this).siblings().map((function(e,t){return l(t).text()})).toArray().join(",");switch(e){case"Author:":s.author=t;break;case"Status:":s.status=t;break;case"Genre:":s.genres=t}})),s.chapters=this.parseChapters(l),[2,s]}}))}))},l.prototype.parsePage=function(n,l){return e(this,void 0,void 0,(function(){var e,i,o;return t(this,(function(t){switch(t.label){case 0:return e=this.site+n+"?page="+l,[4,(0,r.fetchApi)(e).then((function(e){return e.text()}))];case 1:return i=t.sent(),o=(0,a.load)(i),[2,{chapters:this.parseChapters(o)}]}}))}))},l.prototype.parseChapter=function(n){return e(this,void 0,void 0,(function(){var e,l;return t(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchApi)(this.site+n)];case 1:return[4,t.sent().text()];case 2:return e=t.sent(),l=(0,a.load)(e),[2,l("#chapter-c").html()||""]}}))}))},l.prototype.searchNovels=function(n,l){return e(this,void 0,void 0,(function(){var e,l,i;return t(this,(function(t){switch(t.label){case 0:return e="".concat(this.site,"search?keyword=").concat(n),[4,(0,r.fetchApi)(e)];case 1:return[4,t.sent().text()];case 2:return l=t.sent(),i=(0,a.load)(l),[2,this.parseNovels(i)]}}))}))},l.prototype.fetchImage=function(a){return e(this,void 0,void 0,(function(){return t(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchFile)(a)];case 1:return[2,e.sent()]}}))}))},l}();exports.default=new l;