var script = function(){
	jQuery('<div>', {
			id:'toMoyashipan', 
			'data-pixivuser':JSON.stringify(pixiv.user), 
			'data-pixivcontext':JSON.stringify(pixiv.context), 
			style:'display:none;'
		}).appendTo(jQuery('body'));
};
location.href = 'javascript:('+script.toString()+')()';

setTimeout(function(){
	var proxy = $('div#toMoyashipan');
	var pixivUser = proxy.data('pixivuser');
	if (pixivUser == undefined || !pixivUser.loggedIn) return;

	var pixivContext = proxy.data('pixivcontext');
	if (pixivContext == undefined || !pixivContext.illustId || pixivContext.queries.mode == 'medium') return;

	var tpl = '<div id="moyashipan"><div class="items"></div></div>';
	var itemTpl = '<span class="item"><a class="image" href="/"><img src="http://source.pixiv.net/source/images/no_profile_s.png"></a><a class="user_icon ui-tooltip" data-tooltip="ほげユーザー" href="/member.php?id=11"><img src="http://source.pixiv.net/source/images/no_profile_s.png"></a></span>';
	var memberPageUrl = 'http://www.pixiv.net/member.php?id=';

	var items = $(tpl).insertAfter($('.works_display')).find('div.items');
	for (var i = 0; i < 10; i++) {
		var item = $(itemTpl);
		item.appendTo(items);
		getName(item, Math.floor(Math.random()*5000000)); // user_idはひとまずランダムにしておく
	};
	function getName(item, user_id){
		$.get(memberPageUrl+user_id,function(data){
			var name = pixivUser.loggedIn? $(data).find("span.f18b .avatar_m").text() : $(data).find('.user').text();
			var img = pixivUser.loggedIn? $(data).find(".avatar_m img").attr('src') : $(data).find(".user img");
			item.find('.user_icon')
				.attr('data-tooltip', name)
				.attr('href', memberPageUrl+user_id)
				.find('img').attr('src', img)
				;
		});
	}
},100);
