"use strict";var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function s(t){try{u(r.next(t))}catch(t){o(t)}}function a(t){try{u(r.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,a)}u((r=r.apply(t,e||[])).next())}))},e=this&&this.__generator||function(t,e){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return s.label++,{value:a[1],done:0};case 5:s.label++,r=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==a[0]&&2!==a[0])){s=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){s.label=a[1];break}if(6===a[0]&&s.label<i[1]){s.label=i[1],i=a;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(a);break}i[2]&&s.ops.pop(),s.trys.pop();continue}a=e.call(t,s)}catch(t){a=[6,t],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:1}}([a,u])}}},n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:1});var r=require("@libs/fetch"),i=require("cheerio"),o=n(require("qs")),s=function(){function n(){var t=this;this.id="agit.xyz",this.name="Agitoon",this.icon="src/kr/agitoon/agit.png",this.site="https://agit501.xyz",this.version="1.0.0",this.fetchImage=r.fetchFile,this.resolveUrl=function(e,n){return t.site+(n?"/novel/list/":"/novel/view/")+e}}return n.prototype.popularNovels=function(n,i){return t(this,arguments,void 0,(function(t,n){var i,s,a,u=this,l=(n.filters,n.showLatestNovels);return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchApi)(this.site+"/novel/index.update.php",{headers:{"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},method:"POST",body:o.default.stringify({mode:"get_data_novel_list_p",novel_menu:l?"1":"3",np_day:(new Date).getDay(),np_rank:"1",np_distributor:"0",np_genre:"00",np_order:"1",np_genre_ex_1:"00",np_genre_ex_2:"00",list_limit:20*(t-1),is_query_first:1==t})})];case 1:return[4,e.sent().json()];case 2:return i=e.sent(),s=[],null===(a=null==i?void 0:i.list)||void 0===a||a.forEach((function(t){return s.push({name:t.wr_subject,cover:u.site+t.np_dir+"/thumbnail/"+t.np_thumbnail,path:t.wr_id})})),[2,s]}}))}))},n.prototype.parseNovel=function(n){return t(this,void 0,void 0,(function(){var t,s,a,u,l,c,h;return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchApi)(this.resolveUrl(n,1)).then((function(t){return t.text()}))];case 1:return t=e.sent(),s=(0,i.load)(t,{decodeEntities:0}),(a={path:n,name:s("h5.pt-2").text(),cover:this.site+s("div.col-5.pr-0.pl-0 img").attr("src"),summary:s(".pt-1.mt-1.pb-1.mb-1").text()}).author=s(".post-item-list-cate-v").first().text().split(" : ")[1],(u=s(".col-7 > .post-item-list-cate > span").map((function(t,e){return s(e).text().trim()})).get()).length&&(a.genres=u.join(", ")),l=[],[4,(0,r.fetchApi)(this.site+"/novel/list.update.php",{headers:{"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},method:"POST",body:o.default.stringify({mode:"get_data_novel_list_c",wr_id_p:n,page_no:"1",cnt_list:"10000",order_type:"Asc"})})];case 2:return[4,e.sent().json()];case 3:return c=e.sent(),null===(h=null==c?void 0:c.list)||void 0===h||h.forEach((function(t){return l.push({name:t.wr_subject,path:t.wr_id+"/2",releaseTime:t.wr_datetime})})),a.chapters=l,[2,a]}}))}))},n.prototype.parseChapter=function(n){return t(this,void 0,void 0,(function(){var t,o;return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchApi)(this.resolveUrl(n)).then((function(t){return t.text()}))];case 1:return t=e.sent(),o=(0,i.load)(t),[2,(o("#id_wr_content").html()||"").replace("팝업메뉴는 빈공간을 더치하거나 스크룰시 사라집니다","").trim()]}}))}))},n.prototype.searchNovels=function(n){return t(this,void 0,void 0,(function(){var t,i,s,a=this;return e(this,(function(e){switch(e.label){case 0:return[4,(0,r.fetchApi)("https://agit501.xyz/novel/search.php",{headers:{"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},method:"POST",body:o.default.stringify({mode:"get_data_novel_list_p_sch",search_novel:n,list_limit:0})})];case 1:return[4,e.sent().json()];case 2:return t=e.sent(),i=[],null===(s=null==t?void 0:t.list)||void 0===s||s.forEach((function(t){return i.push({name:t.wr_subject,cover:a.site+"/"+t.np_dir+"/thumbnail/"+t.np_thumbnail,path:t.wr_id})})),[2,i]}}))}))},n}();exports.default=new s;