var e=this&&this.__awaiter||function(e,l,a,t){return new(a||(a=Promise))((function(r,n){function i(e){try{u(t.next(e))}catch(e){n(e)}}function o(e){try{u(t.throw(e))}catch(e){n(e)}}function u(e){var l;e.done?r(e.value):(l=e.value,l instanceof a?l:new a((function(e){e(l)}))).then(i,o)}u((t=t.apply(e,l||[])).next())}))},l=this&&this.__generator||function(e,l){var a,t,r,n,i={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return n={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(n[Symbol.iterator]=function(){return this}),n;function o(o){return function(u){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;n&&(n=0,o[0]&&(i=0)),i;)try{if(a=1,t&&(r=2&o[0]?t.return:o[0]?t.throw||((r=t.return)&&r.call(t),0):t.next)&&!(r=r.call(t,o[1])).done)return r;switch(t=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,t=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(r=i.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){i.label=o[1];break}if(6===o[0]&&i.label<r[1]){i.label=r[1],r=o;break}if(r&&i.label<r[2]){i.label=r[2],i.ops.push(o);break}r[2]&&i.ops.pop(),i.trys.pop();continue}o=l.call(e,i)}catch(e){o=[6,e],t=0}finally{a=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,u])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),t=require("@libs/defaultCover"),r=require("@libs/fetch"),n=require("@libs/novelStatus"),i=require("@libs/filterInputs"),o=function(){function o(){this.id="BLN",this.name="BestLightNovel",this.icon="src/en/bestlightnovel/icon.png",this.site="https://bestlightnovel.com/",this.version="1.0.0",this.filters={status:{label:"Status",value:"all",options:[{label:"ALL",value:"all"},{label:"Completed",value:"completed"},{label:"Ongoing",value:"ongoing"}],type:i.FilterTypes.Picker},type:{value:"topview",label:"Type",options:[{label:"Recently updated",value:"latest"},{label:"Newest",value:"newest"},{label:"Top view",value:"topview"}],type:i.FilterTypes.Picker},category:{label:"Category",value:"all",options:[{label:"ALL",value:"all"},{label:"Action",value:"1"},{label:"Adventure",value:"2"},{label:"Animals",value:"65"},{label:"Arts",value:"40"},{label:"Biographies",value:"41"},{label:"Business",value:"42"},{label:"Chinese",value:"3"},{label:"Comedy",value:"4"},{label:"Computers",value:"43"},{label:"Crafts, Hobbies",value:"45"},{label:"Drama",value:"5"},{label:"Education",value:"46"},{label:"English",value:"6"},{label:"Entertainment",value:"47"},{label:"Fantasy",value:"7"},{label:"Fiction",value:"48"},{label:"Gender Bender",value:"8"},{label:"Harem",value:"9"},{label:"Historical",value:"10"},{label:"History",value:"49"},{label:"Home",value:"50"},{label:"Horror",value:"11"},{label:"Humor",value:"51"},{label:"Investing",value:"52"},{label:"Josei",value:"12"},{label:"Korean",value:"13"},{label:"Literature",value:"53"},{label:"Lolicon",value:"14"},{label:"Martial Arts",value:"15"},{label:"Mature",value:"16"},{label:"Mecha",value:"17"},{label:"Memoirs",value:"54"},{label:"Mystery",value:"18"},{label:"Original",value:"19"},{label:"Other Books",value:"66"},{label:"Philosophy",value:"55"},{label:"Photography",value:"56"},{label:"Politics",value:"57"},{label:"Professional",value:"58"},{label:"Psychological",value:"20"},{label:"Reference",value:"59"},{label:"Reincarnation",value:"21"},{label:"Religion",value:"60"},{label:"Romance",value:"22"},{label:"School Life",value:"23"},{label:"School Stories",value:"67"},{label:"Sci-Fi",value:"24"},{label:"Seinen",value:"25"},{label:"Short Stories",value:"68"},{label:"Shotacon",value:"26"},{label:"Shoujo",value:"27"},{label:"Shoujo Ai",value:"28"},{label:"Shounen",value:"29"},{label:"Shounen Ai",value:"30"},{label:"Slice Of Life",value:"31"},{label:"Smut",value:"32"},{label:"Social Science",value:"61"},{label:"Spirituality",value:"62"},{label:"Sports",value:"33"},{label:"Supernatural",value:"34"},{label:"Teaser",value:"69"},{label:"Technical",value:"63"},{label:"Technology",value:"64"},{label:"Tragedy",value:"35"},{label:"Virtual Reality",value:"36"},{label:"Wuxia",value:"37"},{label:"Xianxia",value:"38"},{label:"Xuanhuan",value:"39"}],type:i.FilterTypes.Picker}}}return o.prototype.parseNovels=function(e){var l=this,a=[];return e(".update_item.list_category").each((function(t,r){var n=e(r).find("h3 > a").attr("href");if(n){var i=e(r).find("h3 > a").text(),o=e(r).find("img").attr("src"),u={name:i,path:n.replace(l.site,""),cover:o};a.push(u)}else console.error("No novel url!")})),a},o.prototype.popularNovels=function(t,r){return e(this,arguments,void 0,(function(e,t){var r,n,i,o,u,s,c=t.filters;return l(this,(function(l){switch(l.label){case 0:return r=this.site+"novel_list?",r+="type="+c.type.value,r+="&category="+c.category.value,r+="&state="+c.status.value,r+="&page="+e,[4,fetch(r)];case 1:return(n=l.sent()).ok?[3,3]:(o=(i=console).error,[4,n.text()]);case 2:return o.apply(i,[l.sent()]),[2,[]];case 3:return[4,n.text()];case 4:return u=l.sent(),s=(0,a.load)(u),[2,this.parseNovels(s)]}}))}))},o.prototype.parseNovel=function(r){return e(this,void 0,void 0,(function(){var e,i,o,u,s,c=this;return l(this,(function(l){switch(l.label){case 0:return[4,fetch(this.site+r)];case 1:return[4,l.sent().text()];case 2:return e=l.sent(),i=(0,a.load)(e),o={path:r,name:i(".truyen_info_right  h1").text().trim()||"",cover:i(".info_image img").attr("src")||t.defaultCover,summary:(null===(s=i("#noidungm").text())||void 0===s?void 0:s.trim())||"",chapters:[]},i("ul.truyen_info_right > li").each((function(){var e=i(this).find("span").text(),l=i(this).find("a").map((function(e,l){return i(l).text()})).toArray().join(", ");switch(e){case"Author(s): ":o.author=l;break;case"GENRES: ":o.genres=l;break;case"STATUS : ":o.status="Ongoing"===l?n.NovelStatus.Ongoing:"Completed"===l?n.NovelStatus.Completed:n.NovelStatus.Unknown}})),u=[],i(".chapter-list div.row").each((function(e,l){var a=i(l).find("a").text().trim(),t=i(l).find("span:last").text().trim(),r=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"].join("|"),n=new RegExp("(".concat(r,")-(\\d{1,2})-(\\d{2})"),"i").exec(t);if(n){var o=+n[3]+2e3,s=r.indexOf(n[1].toLowerCase()),v=+n[2],b=i(l).find("a").attr("href");b?u.push({name:a,releaseTime:new Date(o,s,v).toISOString(),path:b.replace(c.site,"")}):console.error("No chapter url!")}})),o.chapters=u.reverse(),[2,o]}}))}))},o.prototype.parseChapter=function(t){return e(this,void 0,void 0,(function(){var e,r;return l(this,(function(l){switch(l.label){case 0:return[4,fetch(this.site+t)];case 1:return[4,l.sent().text()];case 2:return e=l.sent(),r=(0,a.load)(e),[2,r("#vung_doc").html()||""]}}))}))},o.prototype.searchNovels=function(t,r){return e(this,void 0,void 0,(function(){var e,n,i;return l(this,(function(l){switch(l.label){case 0:return e="".concat(this.site,"search_novels/").concat(t,"?page=").concat(r),[4,fetch(e)];case 1:return[4,l.sent().text()];case 2:return n=l.sent(),i=(0,a.load)(n),[2,this.parseNovels(i)]}}))}))},o.prototype.fetchImage=function(a){return e(this,void 0,void 0,(function(){return l(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchFile)(a)];case 1:return[2,e.sent()]}}))}))},o}();exports.default=new o;