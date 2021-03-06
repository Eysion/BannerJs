/**基于Jquery的图片轮播组件**/
(function($) {
	$.fn.bannerjs = function(options) {
		/*------
		*options的默认属性说明
		*loading  		//加载banner模块
		*bannerBox		//包含轮播块的块状模型
		*bannerList 		//轮播的块状模型
		*bannerItem 		//单个轮播元素的模型
		*bannerShow		//一次展示的元素个数
		*gonext		//加载下一张图片的元素
		*goprev		//加载上一张图片的元素
		*goDisk 		//焦点模块模型
		*ItemPadding		//单个轮播元素间的补白
		*goDiskWidth 		//单个焦点元素的宽度
		*bannerDisk 		//是否开启焦点
		*bannerwheel		//鼠标滚轮事件
		*bannerauto		//是否开启自动轮播
		*autoTime		//自动轮播的时间
		-----*/
		var defaults = {
			loading: $('.banner-load'),
			bannerBox: $(this),
			bannerList: $('.banner-list'),
			bannerItem: $('.banner-item'),
			goNext: $('span.gonext'),
			goPrev: $('span.goprev'),
			goDisk: $('.banner-disk'),
			bannerShow: 1,
			ItemPadding: 5,
			goDiskWidth: 25,
			bannerDisk: true,
			bannerwheel: true,
			bannerauto: false,
			autoTime: 5000
		};
		var options = $.extend(defaults, options),
			bannerType = 1,
			bannergo = options.bannerShow,
			bannerbox = options.bannerBox,
			bannerlist = options.bannerList,
			devellen = bannerlist.find(options.bannerItem).length,
			subit =[devellen/options.bannerShow];
		$(window).load(function() {
			// Loading
			options.loading.hide();
			for (var i = 0; i < subit; i++) {
				options.goDisk.append('<span></span>');
			};
			options.bannerBox.fadeIn(400).find(options.bannerItem).each(function(i) {
				$(this).addClass('item-' + [i]).css({
					'width': [options.bannerBox.width() / options.bannerShow - (options.ItemPadding * 2)],
					'margin': options.ItemPadding
				});
			});

			var develwit = [bannerlist.find(options.bannerItem).width() + (options.ItemPadding * 2)],
				diskWidth = [options.goDisk.find('span').length] * options.goDiskWidth,
				mousenum = Math.ceil(devellen / bannergo);

			bannerlist.width(devellen * develwit);
			options.goDisk.width(diskWidth).css('margin-left', -(diskWidth / 2)).find('span').eq(0).addClass('active');
			if(options.bannerShow == 1){
				bannerlist.height(options.bannerItem.eq(0).height());
			};

			function GoNext() {
				if (!bannerlist.is(':animated')) {
					if (bannerType == mousenum) {
						bannerType = 1;
						var itemH = bannerlist.find(options.bannerItem).eq(bannerType-1).height();
						if(options.bannerShow == 1){
							bannerlist.animate({left: '0px' , height: itemH + (options.ItemPadding * 2)}, 600);
						}else{
							bannerlist.animate({left: '0px' , height: 'auto'}, 600);
						}
						bannerlist.find(options.bannerItem).removeClass('active').eq(bannerType - 1).addClass('active');
						options.goDisk.find('span').removeClass('active').eq(bannerType - 1).addClass('active');
					} else {
						bannerType++;
						var itemH = bannerlist.find(options.bannerItem).eq(bannerType-1).height();
						if(options.bannerShow == 1){
							bannerlist.animate({left: '-=' + develwit * bannergo , height : itemH + (options.ItemPadding * 2)}, 600);
						}else{
							bannerlist.animate({left: '-=' + develwit * bannergo , height : 'auto'}, 600);
						}
						bannerlist.find(options.bannerItem).removeClass('active').eq(bannerType - 1).addClass('active');
						options.goDisk.find('span').removeClass('active').eq(bannerType - 1).addClass('active');
					}
				}
			};

			function GoPrev() {
				if (!bannerlist.is(':animated')) {
					if (bannerType == 1) {
						bannerType = mousenum;
						var itemH = bannerlist.find(options.bannerItem).eq(bannerType-1).height();
						if(options.bannerShow == 1){
							bannerlist.animate({left: -develwit * (mousenum - 1) * bannergo , height: itemH + (options.ItemPadding * 2)}, 600);
						}else{
							bannerlist.animate({left: -develwit * (mousenum - 1) * bannergo , height: 'auto'}, 600);
						}
						bannerlist.find(options.bannerItem).removeClass('active').eq(bannerType - 1).addClass('active');
						options.goDisk.find('span').removeClass('active').eq(bannerType - 1).addClass('active');
					} else {
						bannerType--;
						var itemH = bannerlist.find(options.bannerItem).eq(bannerType-1).height();
						if(options.bannerShow == 1){
							bannerlist.animate({left: '+=' + develwit * bannergo , height : itemH + (options.ItemPadding * 2)}, 600);
						}else{
							bannerlist.animate({left: '+=' + develwit * bannergo , height : 'auto'}, 600);
						}
						bannerlist.find(options.bannerItem).removeClass('active').eq(bannerType - 1).addClass('active');
						options.goDisk.find('span').removeClass('active').eq(bannerType - 1).addClass('active');
					}
				}
			};

			if (options.bannerauto == true) {
				setInterval(function() {
					GoNext()
				}, options.autoTime);
			} else {};

			if (options.bannerwheel == true) {
				bannerbox.mousewheel(function(event, delta) {
					event.stopPropagation();
					event.preventDefault();
					if (delta === 1) {
						GoPrev();
					} else {
						GoNext();
					}
				});
			} else {};

			bannerbox.hover(function() {
				options.goNext.stop(true, false).fadeIn();
				options.goPrev.stop(true, false).fadeIn();
			}, function() {
				options.goNext.stop(true, false).fadeOut();
				options.goPrev.stop(true, false).fadeOut();
			});
			options.goNext.click(function(event) {
				GoNext();
			});
			options.goPrev.click(function(event) {
				GoPrev();
			});

			if (options.bannerDisk == true) {
				options.goDisk.find('span').click(function(event) {
					var diskline = $(this).index();
					options.goDisk.find('span').removeClass('active');
					$(this).addClass('active');
					bannerlist.find(options.bannerItem).removeClass('active').eq(diskline).addClass('active');
					bannerType = [diskline + 1];
					bannerlist.animate({
						left: -  diskline * develwit
					}, 600);
				});

			} else {
				options.goDisk.hide();
			};

		});
	};
})(jQuery);
