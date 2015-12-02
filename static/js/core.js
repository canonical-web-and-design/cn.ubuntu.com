/**
 * Ubuntu Core Front-End Framework
 *
 * Core javascript file part of Ubuntu Core Front-End Framework
 *
 * This file containes the classes required by ubuntu.com to interact.
 *
 * @project		Ubuntu Core Front-End Framework
 * @author		Web Team at Canonical Ltd
 * @copyright	2012 Canonical Ltd
 *
 */

/**
 * Table of contents
 *
 * Core
 * - setEqualHeight
 * - hashBang
 * - getPullQuotes
 * - setupTooltips
 *
 */

if(!core){ var core = {}; }
YUI().use('node', 'anim', function(Y) {
	core.setEqualHeight = function($className) {
	  	var maxHeight = 0;
	    var heightArray = Array();
	    var collection = Y.all('.'+$className);
	    collection.each(function(node) {
	    	node.all(' > div, > ul li').each(function(node) {
		    	if(node.get('clientHeight') > maxHeight){
		    		maxHeight = node.get('clientHeight');
		    	}
	    	});
	    	node.all('> div, > ul li').setStyle('height', maxHeight);
	    	maxHeight = 0;
	    });
	}

	core.qualifyURL = function($url) {
	    var img = document.createElement('img');
	    img.src = $url;
	    $url = img.src;
	    //img.src = null;
	    img = null;
	    return $url;
	}

	core.checkForSession = function() {
		var session = window.name;
		if(session){
			if(session.charAt(0) == '¬'){
				core.jumpToAnchor(session.substring(1));
			}
		}
	}

	core.slideToAnchor = function($name) {
		var target;
			var destination = 0;
			if($name != ''){
				destination = Y.one('#'+$name).getXY()[1] - 20;
			}
			var webkitAnim = new Y.Anim({
			    node: Y.one('html'),
			    to: { scroll: [0, destination]},
			    easing: 'easeOut',
			    duration: 1,
			});
			var ffAnim = new Y.Anim({
			    node: Y.one('body'),
			    to: { scroll: [0, destination]},
			    easing: 'easeOut',
			    duration: 1,
			});
			webkitAnim.run(1000);
			ffAnim.run(1000);

	}

	core.jumpToAnchor = function($name) {
		if(document.getElementById($name)){
			document.getElementById($name).scrollIntoView();
		}else{
			window.name = null;
		}
	}

	core.getPullQuotes = function() {
	    Y.all('span.pullquote').each(function (node) {
	       var item = Y.Node.create('<div class="pull-quote js">&ldquo;'+node.getContent()+'&rdquo;</div>');
	       node.get('parentNode').get('parentNode').get('parentNode').append(item);
	    });
	}

	core.setupTooltips = function() {
		if(Y.one('.tooltip') != null) {
			Y.all('.tooltip').each(function (node) {
				node.get('parentNode').prepend('<p class="tooltip-label">'+node.get('title')+'</p>');
				var title = this.get('title');
				node.on('mouseover', function(e){
					this.set('title','');
					this.get('parentNode').one('.tooltip-label').setStyle('display', 'inline');
				});
				node.on('mouseout', function(e){
					this.set('title',title);
					this.get('parentNode').one('.tooltip-label').setStyle('display', 'none');
				});
			});
		}
	}

	core.sectionTabs = function() {

		if(Y.one('.tabbed-content')) {
			var p = Y.one('.tabbed-menu a.active');
			var s = p.get('href').split('#')[1];
			var a = Y.one('.arrow');
			var w = (p.get('clientWidth') / 2) - 7;
			var x = (p.get('parentNode').getXY()[0] - p.get('parentNode').get('parentNode').getXY()[0]) + w;
			Y.all('.tabbed-content').each(function() {
			  	if(this.get('id') != s){
			  		this.setStyle('opacity', '0');
			  	}
			  }
			);
			a.setStyle('left',x+'px').setStyle('display', 'inline');
			Y.all('.tabbed-menu a').on('click',function(e) {
				e.preventDefault();
				Y.all('.tabbed-menu a').removeClass('active');
				e.currentTarget.addClass('active');
				Y.all('.tabbed-content').addClass('hide').setStyle('opacity','0');
				s = e.currentTarget.getAttribute('data-hash');
				Y.one('#'+s).removeClass('hide');
				new Y.Anim({ node: '#'+s, to: { opacity: 1 } }).run();
				x = (e.currentTarget.get('parentNode').getXY()[0] - e.currentTarget.get('parentNode').get('parentNode').getXY()[0]) + w;
				new Y.Anim({ node: a, to: { left: x+'px' } }).run();
			});
		}

	}

	core.svgFallback = function() {
		if(Modernizr){
			if (!Modernizr.svg || !Modernizr.backgroundsize) {
				Y.all("img[src$='.svg']").each(function(node) {
					node.setAttribute("src", node.getAttribute('src').toString().match(/.*\/(.+?)\./)[0]+'png');
				});
			}
		}
	};

	core.sectionTabs();
	core.setEqualHeight('equal-height');
	core.getPullQuotes();
	core.setupTooltips();
	core.svgFallback();
});
