"use strict";var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,s){function a(t){try{c(r.next(t))}catch(t){s(t)}}function o(t){try{c(r.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,o)}c((r=r.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var n,r,i,s,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(a=0)),a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:0};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:1}}([o,c])}}};Object.defineProperty(exports,"__esModule",{value:1});var n=require("cheerio"),r=require("@libs/fetch"),i=function(){function i(){this.id="ranobes",this.name="Ranobes",this.icon="src/en/ranobes/icon.png",this.site="https://ranobes.top",this.version="1.0.0"}return i.prototype.sleep=function(n){return t(this,void 0,void 0,(function(){return e(this,(function(t){return[2,new Promise((function(t){return setTimeout(t,n)}))]}))}))},i.prototype.parseNovels=function(t){var e=this,n=[];return t(".short-cont").each((function(r,i){var s,a=t(i).find("h2.title").text(),o=t(i).find("h2.title a").attr("href"),c=null===(s=t(i).find("figure").attr("style"))||void 0===s?void 0:s.replace(/.*url\((.*?)\)./g,"$1");if(o){var u={name:a,cover:c,path:null==o?void 0:o.replace(e.site,"")};n.push(u)}})),n},i.prototype.parseChapters=function(t){var e=this,n=[];return t.chapters.map((function(t){n.push({name:t.title,releaseTime:new Date(t.date).toISOString(),path:t.link.replace(e.site,"")})})),n.reverse()},i.prototype.popularNovels=function(i,s){s.showLatestNovels,s.filters;return t(this,void 0,void 0,(function(){var t,s,a;return e(this,(function(e){switch(e.label){case 0:return t="".concat(this.site,"/novels/page/").concat(i,"/"),[4,(0,r.fetchApi)(t).then((function(t){return t.text()}))];case 1:return s=e.sent(),a=(0,n.load)(s),[2,this.parseNovels(a)]}}))}))},i.prototype.parseNovel=function(i){return t(this,void 0,void 0,(function(){var t,s,a,o,c,u,l,h,p;return e(this,(function(e){switch(e.label){case 0:return t=this.site+i,[4,(0,r.fetchApi)(t)];case 1:return[4,e.sent().text()];case 2:return s=e.sent(),a=(0,n.load)(s),(o={path:i,name:a(".poster img").attr("alt")||"Untitled",cover:this.site+a(".poster img").attr("src"),author:a('[itemprop="creator"]').text(),chapters:[],totalPages:1}).summary=a(".moreless").find("br").replaceWith("\n").end().text().trim(),o.status="Ongoing"===a('li:contains("Status") span').text()?"Ongoing":"Completed",o.genres=a("div#mc-fs-genre").text().trim(),(null==(c=a(".read-continue:last").attr("href"))?void 0:c.startsWith("http"))||(c=this.site+c),[4,(0,r.fetchApi)(c).then((function(t){return t.text()}))];case 3:return u=e.sent(),l=(0,n.load)(u),h=l("#dle-content main").next().html(),p=JSON.parse(h.replace("window.__DATA__ =","")),o.totalPages=Number(p.pages_count),o.chapters=this.parseChapters(p),[2,o]}}))}))},i.prototype.parsePage=function(i,s){return t(this,void 0,void 0,(function(){var t,a,o,c,u,l,h,p,f,d,v,m;return e(this,(function(e){switch(e.label){case 0:return t=i.split("-")[0],a=this.site+"/chapters"+t.replace("novels/",""),o=a+"/page/"+s,[4,(0,r.fetchApi)(a).then((function(t){return t.text()}))];case 1:return c=e.sent(),u=(0,n.load)(c),l=u("#dle-content main").next().html(),h=JSON.parse(l.replace("window.__DATA__ =","")),p=h.chapters[0].link,f=h.chapters[0].title,d=h.chapters[0].date,v=p?{path:p.replace(this.site,""),name:f,releaseTime:new Date(d).toISOString()}:void 0,[4,this.sleep(1e3)];case 2:return e.sent(),[4,(0,r.fetchApi)(o).then((function(t){return t.text()}))];case 3:return m=e.sent(),u=(0,n.load)(m),l=u("#dle-content main").next().html(),h=JSON.parse(l.replace("window.__DATA__ =","")),[2,{chapters:this.parseChapters(h),latestChapter:v}]}}))}))},i.prototype.parseChapter=function(i){return t(this,void 0,void 0,(function(){var t,s;return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchApi)(this.site+i)];case 1:return[4,e.sent().text()];case 2:return t=e.sent(),s=(0,n.load)(t),[2,s("#arrticle").html()||""]}}))}))},i.prototype.searchNovels=function(i,s){return t(this,void 0,void 0,(function(){var t,a,o;return e(this,(function(e){switch(e.label){case 0:return t="".concat(this.site,"/search/").concat(i,"/page/").concat(s),[4,(0,r.fetchApi)(t).then((function(t){return t.text()}))];case 1:return a=e.sent(),o=(0,n.load)(a),[2,this.parseNovels(o)]}}))}))},i.prototype.fetchImage=function(n){return t(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,(0,r.fetchFile)(n)];case 1:return[2,t.sent()]}}))}))},i}();exports.default=new i;