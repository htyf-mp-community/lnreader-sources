var e=this&&this.__awaiter||function(e,t,a,r){return new(a||(a=Promise))((function(n,l){function i(e){try{s(r.next(e))}catch(e){l(e)}}function o(e){try{s(r.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?n(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,o)}s((r=r.apply(e,t||[])).next())}))},t=this&&this.__generator||function(e,t){var a,r,n,l,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return l={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function o(o){return function(s){return function(o){if(a)throw new TypeError("Generator is already executing.");for(;l&&(l=0,o[0]&&(i=0)),i;)try{if(a=1,r&&(n=2&o[0]?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return i.label++,{value:o[1],done:0};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!(n=i.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){i.label=o[1];break}if(6===o[0]&&i.label<n[1]){i.label=n[1],n=o;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(o);break}n[2]&&i.ops.pop(),i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e],r=0}finally{a=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,s])}}};Object.defineProperty(exports,"__esModule",{value:1});var a=require("cheerio"),r=require("@libs/fetch"),n=require("@libs/defaultCover"),l=require("@libs/filterInputs"),i=function(){function i(){this.id="yomou.syosetu",this.name="Syosetu",this.icon="src/jp/syosetu/icon.png",this.site="https://yomou.syosetu.com/",this.novelPrefix="https://ncode.syosetu.com",this.version="1.1.0",this.headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"},this.searchUrl=function(e,t){return"https://yomou.syosetu.com/search.php?order=".concat(t||"hyoka").concat(void 0!==e?"&p=".concat(e<=1||e>100?"1":e):"")},this.filters={ranking:{type:l.FilterTypes.Picker,label:"Ranked by",options:[{label:"日間",value:"daily"},{label:"週間",value:"weekly"},{label:"月間",value:"monthly"},{label:"四半期",value:"quarter"},{label:"年間",value:"yearly"},{label:"累計",value:"total"}],value:"total"},genre:{type:l.FilterTypes.Picker,label:"Ranking Genre",options:[{label:"総ジャンル",value:""},{label:"異世界転生/転移〔恋愛〕〕",value:"1"},{label:"異世界転生/転移〔ファンタジー〕",value:"2"},{label:"異世界転生/転移〔文芸・SF・その他〕",value:"o"},{label:"異世界〔恋愛〕",value:"101"},{label:"現実世界〔恋愛〕",value:"102"},{label:"ハイファンタジー〔ファンタジー〕",value:"201"},{label:"ローファンタジー〔ファンタジー〕",value:"202"},{label:"純文学〔文芸〕",value:"301"},{label:"ヒューマンドラマ〔文芸〕",value:"302"},{label:"歴史〔文芸〕",value:"303"},{label:"推理〔文芸〕",value:"304"},{label:"ホラー〔文芸〕",value:"305"},{label:"アクション〔文芸〕",value:"306"},{label:"コメディー〔文芸〕",value:"307"},{label:"VRゲーム〔SF〕",value:"401"},{label:"宇宙〔SF〕",value:"402"},{label:"空想科学〔SF〕",value:"403"},{label:"パニック〔SF〕",value:"404"},{label:"童話〔その他〕",value:"9901"},{label:"詩〔その他〕",value:"9902"},{label:"エッセイ〔その他〕",value:"9903"},{label:"その他〔その他〕",value:"9999"}],value:""},modifier:{type:l.FilterTypes.Picker,label:"Modifier",options:[{label:"すべて",value:"total"},{label:"連載中",value:"r"},{label:"完結済",value:"er"},{label:"短編",value:"t"}],value:"total"}}}return i.prototype.popularNovels=function(l,i){return e(this,arguments,void 0,(function(l,i){var o,s=this,u=i.filters;return t(this,(function(i){switch(i.label){case 0:return o=function(l){return e(s,void 0,void 0,(function(){var e,i,o,s,c=this;return t(this,(function(t){switch(t.label){case 0:return e=this.site,u.genre.value?e+="rank/".concat(1===u.genre.value.length?"isekailist":"genrelist","/type/").concat(u.ranking.value,"_").concat(u.genre.value).concat("total"===u.modifier.value?"":"_".concat(u.modifier.value),"/?p=").concat(l):e+="rank/list/type/".concat(u.ranking.value,"_").concat(u.modifier.value,"/?p=").concat(l),[4,(0,r.fetchApi)(e)];case 1:return[4,t.sent().text()];case 2:return i=t.sent(),o=(0,a.load)(i,{decodeEntities:0}),parseInt(o(".is-current").html()||"1")!==l?[2,[]]:(s=[],o(".c-card").each((function(e,t){var a=o(t).find(".p-ranklist-item__title a"),r=a.attr("href");if(r){var l=a.text(),i={path:r.replace(c.novelPrefix,""),name:l,cover:n.defaultCover};s.push(i)}})),[2,s])}}))}))},[4,o(l)];case 1:return[2,i.sent()]}}))}))},i.prototype.parseNovel=function(r){return e(this,void 0,void 0,(function(){var e,l,i,o,s,u,c,h;return t(this,(function(t){switch(t.label){case 0:return e=[],[4,fetch(this.novelPrefix+r,{headers:this.headers})];case 1:return[4,t.sent().text()];case 2:return l=t.sent(),i=(0,a.load)(l,{decodeEntities:0}),o={path:r,name:i(".novel_title").text(),author:i(".novel_writername").text().replace("作者：",""),cover:n.defaultCover},0===(s=i(".novel_sublist2")).length?[3,3]:(o.summary=i("#novel_ex").text().replace(/<\s*br.*?>/g,"\n"),s.each((function(t,a){var r=i(this).find("a"),n=[r.text(),i(this).find("dt").text().replace(/（.）/g,"").trim(),r.attr("href")],l=n[0],o=n[1],s=n[2];s&&e.push({name:l,releaseTime:o,path:s})})),[3,6]);case 3:return[4,fetch(this.searchUrl()+"&word=".concat(o.name),{headers:this.headers})];case 4:return[4,t.sent().text()];case 5:u=t.sent(),c=(0,a.load)(u,{decodeEntities:0}),h=c(".searchkekka_box").first().find(".ex").text().replace(/\s{2,}/g,"\n"),o.summary=h,e.push({name:"Oneshot",releaseTime:i("head").find("meta[name='WWWC']").attr("content"),path:r}),t.label=6;case 6:return o.chapters=e,[2,o]}}))}))},i.prototype.parseChapter=function(r){return e(this,void 0,void 0,(function(){var e,n;return t(this,(function(t){switch(t.label){case 0:return[4,fetch(this.novelPrefix+r,{headers:this.headers})];case 1:return[4,t.sent().text()];case 2:return e=t.sent(),n=(0,a.load)(e,{decodeEntities:0}),[2,n("#novel_honbun").html()||""]}}))}))},i.prototype.searchNovels=function(r,l){return e(this,void 0,void 0,(function(){var i,o=this;return t(this,(function(s){switch(s.label){case 0:return[],i=function(l){return e(o,void 0,void 0,(function(){var e,i,o,s,u=this;return t(this,(function(t){switch(t.label){case 0:return e=this.searchUrl(l)+"&word=".concat(r),[4,fetch(e,{headers:this.headers})];case 1:return[4,t.sent().text()];case 2:return i=t.sent(),o=(0,a.load)(i,{decodeEntities:0}),s=[],o(".searchkekka_box").each((function(e,t){var a=o(t).find(".novel_h"),r=a.children()[0].attribs.href.replace(u.novelPrefix,"");r&&s.push({name:a.text(),path:r,cover:n.defaultCover})})),[2,s]}}))}))},[4,i(l)];case 1:return[2,s.sent()]}}))}))},i.prototype.fetchImage=function(a){return e(this,void 0,void 0,(function(){return t(this,(function(e){return[2,(0,r.fetchFile)(a)]}))}))},i.prototype.resolveUrl=function(e,t){return this.novelPrefix+e},i}();exports.default=new i;