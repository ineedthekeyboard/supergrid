!function($){function t(t){return t.offset().top-(o+i)}function e(e){function n(){var e=t(a);window.scrollTo(window.pageXOffset||window.scrollX,e)}var o=location.hash.replace(/^#/,""),a;o&&(a=$(document.getElementById(o)),a.length||(a=$(document.getElementsByName(o))),a.length&&(e?$(window).one("scroll",function(){setTimeout(n,100)}):setTimeout(n,0)))}function n(t){a||(a=!0,o=$(".navbar").height(),i=t.navbarOffset,$(window).on("hashchange",e.bind(null,!1)),$(e.bind(null,!0)))}var o,a=!1,i;$.catchAnchorLinks=function(t){var e=$.extend({},jQuery.fn.toc.defaults,t);n(e)},$.fn.toc=function(e){var a=this,i=$.extend({},jQuery.fn.toc.defaults,e),r=$(i.container),c=[],s=$(i.selectors,r),l=[],h="active",f="__anchor",u,d,g=10;n();var m=function(e){e.preventDefault();var n=$(e.target);"a"!==n.prop("tagName").toLowerCase()&&(n=n.parent());var o=n.attr("href").replace(/^#/,"")+f,i=$(document.getElementById(o)),r=Math.min(u,t(i));$("body,html").animate({scrollTop:r},400,"swing",function(){location.hash="#"+o}),$("a",a).removeClass(h),n.addClass(h)},p=function(){u=$("body").height()-$(window).height(),d=$(window).height()-o,l=[],s.each(function(e,n){var o=$(n).prev("span"),a=0;o.length&&(a=t(o)),l.push(a>0?a:0)})},w,v=function(t){c.length&&(w&&clearTimeout(w),w=setTimeout(function(){for(var t=$(window).scrollTop(),e,n=l.length-1;n>=0;n--){var o=c[n].hasClass(h);if(o&&l[n]>=u&&t>=u)return;if(0===n||l[n]+g>=t&&l[n-1]+g<=t){n>0&&l[n]-d>=t&&n--,$("a",a).removeClass(h),n>=0&&(e=c[n].addClass(h),i.onHighlight(e));break}}},50))};return i.highlightOnScroll&&($(window).bind("scroll",v),$(window).bind("load resize",function(){p(),v()})),this.each(function(){var t=$(this),e=$('<div class="list-group">');s.each(function(n,o){var a=$(o),r=$("<span/>").attr("id",i.anchorName(n,o,i.prefix)+f).insertBefore(a),s=$("<span/>").text(i.headerText(n,o,a)),l=$('<a class="list-group-item"/>').append(s).attr("href","#"+i.anchorName(n,o,i.prefix)).bind("click",function(e){m(e),t.trigger("selected",$(this).attr("href"))});s.addClass(i.itemClass(n,o,a,i.prefix)),c.push(l),e.append(l)}),t.html(e),p()})},jQuery.fn.toc.defaults={container:"body",selectors:"h1,h2,h3",smoothScrolling:!0,prefix:"toc",onHighlight:function(){},highlightOnScroll:!0,navbarOffset:0,anchorName:function(t,e,n){return n+t},headerText:function(t,e,n){return n.text()},itemClass:function(t,e,n,o){return o+"-"+n[0].tagName.toLowerCase()}}}(jQuery);