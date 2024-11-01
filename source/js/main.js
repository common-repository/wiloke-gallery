;(function($, window, document, undefined){
	"use strict"

	if ( typeof wilokeInitPhotoSwipeFromDOM == 'undefined' )
    {
        window.wilokeInitPhotoSwipeFromDOM = function(gallerySelector) {

            // parse slide data (url, title, size ...) from DOM elements
            // (children of gallerySelector)
            var parseThumbnailElements = function(el) {
                var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    linkEl,
                    size,
                    item;

                for(var i = 0; i < numNodes; i++) {

                    if ( thumbElements[i].tagName.toUpperCase() === 'A' )
                    {
                        linkEl = thumbElements[i]; // <a> element

                        // include only element nodes
                        if(linkEl.nodeType !== 1) {
                            continue;
                        }

                        size = linkEl.getAttribute('data-size').split('x');

                        // create slide object
                        item = {
                            src: linkEl.getAttribute('href'),
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10)
                        };

                        if(linkEl.children.length > 0) {
                            item.msrc = linkEl.children[0].getAttribute('src');
                        }

                        if(linkEl.getAttribute('data-caption') && linkEl.getAttribute('data-link'))
                        {
                            item.title = '<a href="'+linkEl.getAttribute('data-link')+'" target="_blank">'+linkEl.getAttribute('data-caption') + '</a>';
                        }else{
                            item.title = linkEl.getAttribute('data-caption');
                        }

                        item.el = linkEl; // save link to element for getThumbBoundsFn
                        items.push(item);
                    }
                }

                return items;
            };

            // find nearest parent element
            var closest = function closest(el, fn) {
                return el && ( fn(el) ? el : closest(el.parentNode, fn) );
            };

            // triggers when user clicks on thumbnail
            var onThumbnailsClick = function(e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

                var eTarget = e.target || e.srcElement;

                // find root element of slide
                var clickedListItem = closest(eTarget, function(el) {
                    return (el.tagName && el.tagName.toUpperCase() === 'A');
                });

                if(!clickedListItem) {
                    return;
                }

                // find index of clicked item by looping through all child nodes
                // alternatively, you may define index via data- attribute
                var clickedGallery = clickedListItem.parentNode,
                    childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;

                for (var i = 0; i < numChildNodes; i++) {
                    if(childNodes[i].nodeType !== 1) {
                        continue;
                    }

                    if(childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }

                if(index >= 0) {
                    // open PhotoSwipe if valid index found
                    openPhotoSwipe( index, clickedGallery );
                }
                return false;
            };

            // parse picture index and gallery index from URL (#&pid=1&gid=2)
            var photoswipeParseHash = function() {
                var hash = window.location.hash.substring(1),
                    params = {};

                if(hash.length < 5) {
                    return params;
                }

                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if(!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');
                    if(pair.length < 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }

                if(params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }

                return params;
            };

            var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll('.wiloke-pswp-ui')[0],
                    gallery,
                    options,
                    items;

                items = parseThumbnailElements(galleryElement);

                // define options (if needed)
                options = {

                    // define gallery index (for URL)
                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                    getThumbBoundsFn: function(index)
                    {
                        //console.log();
                        // See Options -> getThumbBoundsFn section of documentation for more info
                        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();
                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    }

                };

                // PhotoSwipe opened from URL
                if(fromURL) {
                    if(options.galleryPIDs) {
                        // parse real index when custom PIDs are used
                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                        for(var j = 0; j < items.length; j++) {
                            if(items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        // in URL indexes start from 1
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                // exit if index not found
                if( isNaN(options.index) ) {
                    return;
                }

                if(disableAnimation) {
                    options.showAnimationDuration = 0;
                }


                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            };

            // loop through all gallery elements and bind events
            var galleryElements = document.querySelectorAll( gallerySelector );

            for(var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i+1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            // Parse URL and open gallery if it contains #&pid=3&gid=1
            var hashData = photoswipeParseHash();
            if(hashData.pid && hashData.gid) {
                openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
            }
        };
    }

	function pi_run_justified_gallery($this, $settings)
	{
		var oPutSettings = {
			rowHeight    :  $settings.pi_rowheight ? $settings.pi_rowheight : 120,
			maxRowHeight :  $settings.pi_maxrowheight ? $settings.pi_maxrowheight : '200%',
			lastRow      :  $settings.pi_lastrow,
			fixedHeight  :  $settings.pi_fixedheight == 'false' ? false : true,
			captions	 : 	$settings.pi_showcaption == 'false' ? false : true,
			randomize	 :  $settings.pi_randomize   == 'false' ? false : true,
			margins		 : 	$settings.pi_margin
		};

		
		$this.justifiedGallery(oPutSettings);
	}

	function pi_run_owl($this, $settings)
	{
		$settings.pi_slideshow_single_item 			= $settings.pi_slideshow_single_item == '1' ? true : false;
		$settings.pi_slideshow_autoplay 			= $settings.pi_slideshow_autoplay == 0 ? false : $settings.pi_slideshow_autoplay;
        $this.addClass('owl-carousel owl-theme');

        var oArgs = {
            lazyLoad: true,
            nav: false,
            loop: true,
            dots: true,
            autoHeight: $settings.pi_slideshow_auto_height,
            items: $settings.pi_slideshow_items,
            
            autoPlay: $settings.pi_slideshow_autoplay
        }

        if ( !$settings.pi_slideshow_single_item ) {
            oArgs = $.extend(oArgs, { 0 : {
                    nav: false,
                    dots: true,
                    items: $settings.pi_slideshow_items_mobile
                },
                480: {
                    nav: false,
                    dots: true,
                    items: $settings.pi_slideshow_items_tablet
                },
                769: {
                    nav: false,
                    dots: true,
                    items: $settings.pi_slideshow_items_desktop
                }
            });
        }else{
            oArgs.items = 1;
        }

		$this.owlCarousel(oArgs);
	}

    $.fn.wilokeSetImageSize = function()
    {
        var $this = $(this),
        srcImage = $this.attr('src'),
        oDetectSize = {},
        image = new Image();

        image.src = srcImage;
        image.onload = function () {
            var width = this.width,
                height = this.height;
            
            $this.parent().attr('data-size', width + 'x' + height);
           
        };

        return oDetectSize;
    }

	$.fn.piGetFlickr = function(_oOptions)
	{
		var _oDefault = {
					limit		  : 5,
					id 			  : '',
					itemTemplate  : '',
					callback 	  : '',
					settings	  : {}
				},
				$self = $(this);

		_oOptions = $.extend({}, _oDefault, _oOptions);

		$self.jflickrfeed({
			limit: _oOptions.limit,
			qstrings: {
				id: _oOptions.id
			},
			itemTemplate: _oOptions.item_template
		}, function(func) {
            
            $self.find('img').each(function(){
                $(this).wilokeSetImageSize();
            })

			if ( _oOptions.callback == 'tiled_gallery')
			{
				pi_run_justified_gallery($self, _oOptions.settings);
			}else{
				pi_run_owl($self, _oOptions.settings);
			}
		});
	}

    if ( !$().imageCover )
    {
        $.fn.imageCover = function() {
            $(this).each(function() {
                var self = $(this),
                    image = self.find('img'),
                    heightWrap = self.outerHeight(),
                    widthImage = image.outerWidth(),
                    heightImage = image.outerHeight();
                if (heightImage < heightWrap) {
                    image.css({
                        'height': '400px',
                        'width': 'auto'
                    });
                }
            });
        }
    }

	/*Instagram*/
	function pi_get_instagram($this, $data)
	{
		var url = "";

		switch ( $data.pi_instagram_get )
		{
			case 'tag':
				url = 'https://api.instagram.com/v1/tags/'+$data.pi_instagram_tagname+'/media/recent?access_token='+$data.pi_instagram_access_token;
				//url = 'https://api.instagram.com/v1/tags/search?q='+$data.pi_instagram_tagname+'&amp;access_token='+$data.pi_instagram_access_token;
				break;

			case 'users':
				url = "https://api.instagram.com/v1/users/"+$data.pi_instagram_user_id+"/media/recent/?access_token="+$data.pi_instagram_access_token+'&amp;limit=5';
				break;

			default:
				url = 'https://api.instagram.com/v1/media/popular?client_id='+$data.pi_instagram_client_id;
				break;
		}

		var piLoading = setTimeout(function(){
			alert("Request timeout");
		}, 60000);

		$.ajax({
			dataType: "jsonp",
			cache: false,
			crossDomain: true,
			url: url,
			success: function(data)
			{

				clearTimeout(piLoading);

				if ( data.meta.code == 200 )
				{

					var _length = 0, parsedLimit=20;
					_length = data.data.length;

					if ( $data.pi_style == 'tiled_gallery' )
					{
						parsedLimit = parseInt($data.pi_tiled_gallery_limit, 10);
						if (($data.pi_tiled_gallery_limit != null) && _length > parsedLimit)
						{
							_length = parsedLimit;
						}
					}else{
						parsedLimit = parseInt($data.pi_slideshow_limit, 10);
						if (($data.pi_slideshow_limit != null) && _length > parsedLimit)
						{
							_length = parsedLimit;
						}
					}

					for ( var i=0; i<_length; i++ )
					{
						var _size = '', text='';
                        _size = data['data'][i]['images']['standard_resolution']['width'] + 'x' + data['data'][i]['images']['standard_resolution']['height'];
                        
                        if ( data['data'][i]['caption'] === null )
                        {
                            text = '';
                        }else{
                            text = data['data'][i]['caption']['text'];
                        }
                        
						if ( $data.pi_style == 'tiled_gallery' )
						{
							$this.append('<a class="item" href="'+data['data'][i]['images']['standard_resolution']['url'] + '" data-caption="'+text+'" data-size="'+_size+'" data-link="'+data['data'][i]['link']+'"><img src="' + data['data'][i]['images']['thumbnail']['url'] + '"  alt="' + text + '" /></a>');
						}else {
							$this.append('<div class="wiloke-gallery-image-cover"><a class="item" data-caption="'+text+'" href="' + data['data'][i]['images']['standard_resolution']['url'] + '" data-size="'+_size+'" data-link="'+data['data'][i]['link']+'"><img src="' + data['data'][i]['images']['standard_resolution']['url'] + '" alt="'+text+'"  /></a></div>');
						}
					}

					if ( $data.pi_style != 'tiled_gallery' ) {
						pi_run_owl($this, $data);
					}else{
						pi_run_justified_gallery($this, $data);
					}
				}else{
					alert(data.meta.error_message);
				}

			}
		});

	}

	$(document).ready(function(){
		var $piFlickrJustifiedGallery = $(".pi_wiloke_gallery"),  template='';

		/*Flickr and picasa*/
		$piFlickrJustifiedGallery.each(function()
		{
			var $this = $(this), $settings;
			$settings = $this.data("settings");

			if ( $settings != "" && typeof $settings != 'undefined' )
			{

				$this.parent().css({width: $settings.pi_maximun_width});

				if ( $settings.pi_style != 'tiled_gallery' )
				{
					template = '<div class="item wiloke-gallery-image-cover" data-caption="{{title}}"><a href="{{image_b}}" data-link="{{link}}"><img src="{{image}}" alt="{{title}}" /></a></div>';
				}else{
					template = '<a href="{{image_b}}" data-caption="{{title}}" data-link="{{link}}"><img src="{{image}}" alt="{{title}}" /></a>';
				}

				if ($this.hasClass("flickr")) {

					$this.piGetFlickr({
						limit: $settings.limit,
						id: $settings.pi_user_id,
						item_template: template,
						settings: $settings,
						callback: $settings.pi_style
					});

				} else if ($this.hasClass("instagram")) {
					pi_get_instagram($this, $settings);
				}else{

					if ( $settings.pi_style == 'tiled_gallery' )
					{
						pi_run_justified_gallery($this, $settings);
					}else{
						pi_run_owl($this, $settings);
					}
				}

			}else{
				$this.remove();
			}
		});
		
		if ( $('.wiloke-is-wiloke-gallery.pswp') )
		{
			wilokeInitPhotoSwipeFromDOM('.pi-pswp');
		}

		// $('.wiloke-gallery-image-cover').imageCover();

	})

})(jQuery, window, document);
