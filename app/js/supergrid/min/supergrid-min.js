"use strict";$.widget("custom.SuperGrid",{options:{paginate:!0,pageSize:25,_grid:[],_header:[]},_create:function(){$.each(this.options.columns,function(t,i){i.width||(i.width=25)}),this.options._grid=[],this.options.pagination={currentPage:1,numberOfPages:1,pageSize:this.options.pageSize>0?this.options.pageSize:1},this._renderGrid(),this._bindListeners()},_bindListeners:function(){var t=this,i=!1,e;this.element.off("click",'.supergrid_header .supergrid_cell[data-sortable="true"]'),this.element.on("click",'.supergrid_header .supergrid_cell[data-sortable="true"]',function(i){var e=$(this),s=e.attr("data-sort"),n=e.attr("data-id"),a=t.options.columns,r;switch(t.element.find(".supergrid_header .supergrid_row").removeAttr("data-sort"),s){case"asc":r="desc";break;case"desc":default:r="asc"}$.each(a,function(t,i){return i.id===n?(i.sort=r,!0):void delete i.sort}),e.attr("data-sort",r),t._trigger("-sorted",i,{columns:t.options.columns}),t._renderGrid()}),this.element.off("mousedown",".supergrid_header .resize-handle"),this.element.on("mousedown",".supergrid_header .resize-handle",function(s){s.preventDefault(),e=this,i=!0,t.element.find(".supergrid_header .supergrid_cell").css("transition","linear"),t.element.find(".supergrid_header").addClass("resizing"),$(document).mousemove(function(i){$(e).css("left",i.pageX+2),t.element.find('.supergrid_header .supergrid_cell[data-id="'+$(e).data("id")+'"]').css("width",i.pageX-$(e).data("diff"))})}),this.element.off("click",".supergrid_footer button.left"),this.element.on("click",".supergrid_footer button.left",function(i){var e=$(this);"disabled"!==e.attr("data-state")&&(t.options.pagination.currentPage-=1,t._renderGrid())}),this.element.off("click",".supergrid_footer button.right"),this.element.on("click",".supergrid_footer button.right",function(i){var e=$(this);"disabled"!==e.attr("data-state")&&(t.options.pagination.currentPage+=1,t._renderGrid())}),$(document).mouseup(function(s){if(i){$(document).unbind("mousemove");var n=s.pageX-$(e).data("diff"),a=$(e).data("id");t.element.find('.supergrid_body .supergrid_cell[data-id="'+a+'"]').css("width",n),t.element.find(".supergrid_header .supergrid_cell").css("transition",".2s ease-in"),t._updateHeader(a,n),t.element.find(".supergrid_header").removeClass("resizing"),$(e).css("left","auto"),i=!1}})},_renderGrid:function(){this._sortData(),this._pagination(),this._buildGrid(),this.element.html(this.options._grid.join("")),this.options._grid=[],this._updatePages(this.options.pagination.currentPage),this._addMetaData(),this.element.find(".supergrid_header").sortable({start:function(t,i){i.item.startPos=i.item.index()},stop:function(t,i){var e=this.options.columns,s=0,n=[],a={};$.each($(".supergrid_header .supergrid_cell"),function(t,i){s=$(i).data("id"),a=e.filter(function(t){return t.id==s})[0]||{id:"",width:25},n.push(a)}),this.updateGrid(null,n)}.bind(this)}),this._trigger("supergrid-rendered")},_sortData:function(){function t(i,e,s,n,a){for(var r=e,d=s,o,u=(e+s)/2,h=i[u.toFixed()][n];d>=r;){if(a){for(;i[r][n]<h;)r++;for(;i[d][n]>h;)d--}else{for(;i[r][n]>h;)r++;for(;i[d][n]<h;)d--}d>=r&&(o=i[r],i[r]=i[d],i[d]=o,r++,d--)}return d>e&&t(i,e,d,n,a),s>r&&t(i,r,s,n,a),i}var i=this._getColumnToSortBy(),e,s,n,a;return $.isEmptyObject(i)?!1:(e="asc"===i.sort,a=i.field,$.each(this.options.columns,function(t,i){return i.id===a?(s=i.getSortValue,n=i.sortFunc,!1):void 0}),n?void this.options.data.sort(function(t,i){return n(t,i,e)}):void $.extend(this.options.data,t(this.options.data,0,this.options.data.length-1,a,e)))},_getColumnToSortBy:function(){var t={};return $.each(this.options.columns,function(i,e){return e.sort?(t.field=e.id,t.sort=e.sort,!1):void 0}),t},_pagination:function(){var t=this.options.pagination;return this.options.paginate?(t.numberOfPages=Math.ceil(this.options.data.length/t.pageSize),t.currentPage<1&&(t.currentPage=1),t.currentPage>t.numberOfPages&&(t.currentPage=t.numberOfPages),t.startIndex=(t.currentPage-1)*t.pageSize,t.startIndex>this.options.data.length-1&&(t.startIndex=this.options.data.length-1),t.endIndex=t.startIndex+t.pageSize,void(t.numberOfPages=Math.ceil(this.options.data.length/t.pageSize))):(t.pageSize=this.options.data.length>0?this.options.data.length:0,t.currentPage=1,t.numberOfPages=1,t.startIndex=0,t.endIndex=t.pageSize,void console.log(t))},_buildGrid:function(){this.options._grid.push('<div class="supergrid">'),this._buildHeader(),this._buildBody(),this.options.paginate&&this._buildFooter(),this.options._grid.push("</div>")},_buildHeader:function(){var t=0;this.options._grid.push(' <div class="supergrid_header">'),$.each(this.options.columns,function(i,e){var s=e.cellClass||"",n=e.width||"",a=e.id||"",r=e.name||"",d=e.sort||"",o=e.sortable||"",u="";u+='<div style="width:'+e.width+'px;" scope="col" class="supergrid_cell '+s+'" data-id="'+a+'" tabIndex="0" ',d&&(u+='data-sort="'+d+'" '),u+='data-sortable="'+o+'">',u+="<div>",u+=r,d&&(u+='<div class="sort-icon"></div>'),u+="</div>",u+="</div>",u+='<div class="resize-handle" data-id="'+a+'"data-diff="'+t+'"></div>',t+=n,this.options._grid.push(u)}.bind(this)),this.options._grid.push("</div>")},_updateHeader:function(t,i){var e=this,s=0;$.each(this.options.columns,function(n,a){var r=a.cellClass||"",d=t===a.id?a.width=i:a.width||"",o=a.id||"",u=a.name||"",h=a.sort||"",p=a.sortable||"",c="";c+='<div style="width:'+a.width+'px;" scope="col" class="supergrid_cell '+r+'" data-id="'+o+'" tabIndex="0" ',h&&(c+='data-sort="'+h+'" '),c+='data-sortable="'+p+'">',c+="<div>",c+=u,h&&(c+='<div class="sort-icon"></div>'),c+="</div>",c+="</div>",c+='<div class="resize-handle" data-id="'+o+'"data-diff="'+s+'"></div>',s+=d,e.options._header.push(c)}),e.element.find(".supergrid_header").html(this.options._header.join("")),e.options._header=[]},_buildBody:function(){function t(t,e){var a=e.id||"",r="";r+='<div class="supergrid_row section" data-id="'+a+'">',$.each(s,function(t,s){var n=s.cellClass||"";r+='<div style="width:'+s.width+'px;" class="supergrid_cell '+n+'" tabIndex="0"data-id="'+s.id+'">',r+="<div>",r+=i(e,s),r+="</div>",r+="</div>"}),r+="</div>",n.options._grid.push(r)}function i(t,i){var e=[],s=/\#(.*?)\#/,n=i.formatter,a=n,r=s.exec(n),d=this;if(!t)return"";if("function"==typeof n)return n(t);if("object"==typeof n&&(n=i.formatter),a=n,r=s.exec(n),a){for(;r;)e.push(r[0]),a=a.replace(r[0],""),r=s.exec(a);return $.each(e,function(i,e){var s=e.replace(/#|_/g,"");n=n.replace(e,t[s])}),n}return t[i.id]}var e=this.options.data,s=this.options.columns,n=this,a="";this.options._grid.push('<div class="supergrid_body">'),$.each(e.slice(this.options.pagination.startIndex,this.options.pagination.endIndex),t),this.options._grid.push("</div>")},_buildFooter:function(){var t=this.options._grid;t.push('<div class="supergrid_footer">'),t.push('<div class="pager">'),t.push(' <button class="paginate left" tabindex="0"><i></i><i></i></button>'),t.push(' <div class="counter"></div>'),t.push(' <button class="paginate right" tabindex="0"><i></i><i></i></button>'),t.push("</div>"),t.push("</div>")},_updatePages:function(t){var i=this.element.find(".counter"),e=this.element.find(".paginate.left"),s=this.element.find(".paginate.right");1>=t&&e.attr("data-state","disabled"),t===this.options.pagination.numberOfPages&&s.attr("data-state","disabled"),i.html(t+"/"+this.options.pagination.numberOfPages)},_addMetaData:function(){var t=this;$.each(this.options.data,function(i,e){t.element.find('supergrid_row[data-id="'+e.id+'"]').data(e)})},updateGrid:function(t,i){t&&(this.options.data=$.extend([],t)),i&&(this.options.columns=$.extend([],i)),this.element.empty(),this._renderGrid()}});