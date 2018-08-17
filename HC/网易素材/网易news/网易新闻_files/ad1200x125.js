var _r = [], _f = function() {
	return true;
};
Function.prototype._$bind = function() {
	var _args = arguments, _object = arguments[0], _function = this;
	return function() {
		// not use slice for chrome 10 beta and Array.apply for android
		var _argc = _r.slice.call(_args, 1);
		_r.push.apply(_argc, arguments);
		return _function.apply(_object || null, _argc);
	};
};
var op = {
	box : '.m-goodsList',
	imgLists : '.goods a',
	indicatorLists : '.list a',
	indicatorBox : '.list',
	curIndex : 0,
	animate : true,
	mouseOver : true,
	indicatorCss : 'current'
}

if ($.browser.msie && ($.browser.version == "6.0")) {
	op.animate = false;
}

var groupsElem = $(op.box), groups = [], timer = [];
// 遍历三个box
groupsElem
		.each(function(index, element) {
			var pindex = index, box = $(groupsElem[index]), gimgs = $(
					op.imgLists, box), gindicators = $(op.indicatorLists, box);

			var group = {
				'gimgs' : gimgs,
				'gindicators' : gindicators,
				'curIndex' : op.curIndex
			}
			groups.push(group);
			$(op.indicatorBox, box).attr('index', pindex);

			gindicators.each(function(index, element) {
				var index = index;

				$(element).mouseover(
						mouseOverChange._$bind(this, element, index, box))
			})
			$(box).mouseleave(
					mouseLeaveChange._$bind(this, element, index, box))
			$(box).mouseover(clearTimer._$bind(this, index))
			// 每个box启一个定时器，3秒做一次切换
			timer[index] = setInterval(doBoxChange._$bind(this, box, index),
					3000);

		})
function clearTimer(index) {
	clearInterval(timer[index]);
}
function mouseOverChange(element, index, box) {
	var flagnum = $(element).parent().attr('index');
	if (isNaN(flagnum))
		return false;
	clearInterval(timer[flagnum]);
	doChange(index, groups[flagnum]);
	return false;
}
function mouseLeaveChange(element, index, box) {
	clearInterval(timer[index]);
	timer[index] = setInterval(doBoxChange._$bind(this, box, index), 3000);
}
function doBoxChange(box, index) {
	if (index == 2) {
		// debugger;
	}
	var to = groups[index].curIndex;
	to++
	doChange(to, groups[index]);
};

doChange = function(to, group) {
	var imgs = group.gimgs, indicators = group.gindicators;
	if (group.curIndex == to) {
		return;
	}
	if (to == 3) {
		to = 0;
	}
	if (!!op.animate) {
		$(imgs[group.curIndex]).fadeOut();
		$(imgs[to]).fadeIn();
	} else {
		$(imgs[group.curIndex]).hide();
		$(imgs[to]).show();
	}
	$(indicators[group.curIndex]).removeClass(op.indicatorCss);
	$(indicators[to]).addClass(op.indicatorCss);

	group.curIndex = to;
}