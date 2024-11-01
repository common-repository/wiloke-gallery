;(function($, window, document, undefined)
{
	"use strict";

	$(document).ready(function(){

		var _oFormControl = {
			flickr: "#pi-ifg-form-flicrk",
			instagram: "#pi-ifg-form-instagram",
			//picasa: "#pi-ifg-form-picasa",
			custom: "#pi-ifg-form-custom",
            form_style: "#pi-ifg-form-style",
            slideshow_settings: "#pi-ifg-slideshow-general"
		},
		_popupID = "pi-ifg-popup-wrapper";

		tinymce.PluginManager.add('pi_ifg', function( editor, url )
		{
			editor.addButton('pi_ifg',
			{
			 	text: 'Wiloke Gallery',
		       	icon: false,
		       	type: 'menubutton',
		       	menu:
		       	[
		       		{
						text: 'Flickr',
						onclick: function()
						{
							$(".pi_general").slideUp('fast');
							tb_show("Settings", "#TB_inline?height=800&amp;width=1000&amp;inlineId="+_popupID);
							$(".pi_form_setting").removeClass("active");
							$(".pi_only_one").addClass("hidden");
							$("#pi-ifg-form-flicrk").addClass("active").removeClass("hidden");
                            $("#pi-ifg-save").removeClass("is-edit");
						},
					},

					{
						text: 'Instagram',
						onclick: function()
						{
							$(".pi_general").slideUp('fast');
							tb_show("Settings", "#TB_inline?height=800&amp;width=1000&amp;inlineId="+_popupID);
							$(".pi_form_setting").removeClass("active");
							$(".pi_only_one").addClass("hidden");
							$("#pi-ifg-form-instagram").addClass("active").removeClass("hidden");
							pi_instagram_switcher();
                            $("#pi-ifg-save").removeClass("is-edit");
						},
					},
					//{
					//	text: 'Picasa',
					//	onclick: function()
					//	{
					//		$(".pi_general").slideUp('fast');
					//		tb_show("Settings", "#TB_inline?height=800&amp;width=1000&amp;inlineId="+_popupID);
					//		$(".pi_form_setting").removeClass("active");
					//		$(".pi_only_one").addClass("hidden");
					//		$("#pi-ifg-form-picasa").addClass("active").removeClass("hidden");
                     //       $("#pi-ifg-save").removeClass("is-edit");
					//	},
					//},
					{
						text: 'Self Hosted Images',
						onclick: function()
						{
							$(".pi_general").slideUp('fast');
							tb_show("Settings", "#TB_inline?height=800&amp;width=1000&amp;inlineId="+_popupID);
							$(".pi_form_setting").removeClass("active");
							$(".pi_only_one").addClass("hidden");
							$("#pi-ifg-form-custom").addClass("active").removeClass("hidden");
                            $("#pi-ifg-save").removeClass("is-edit");
						}
					}
		       	]
			})

			editor.onBeforeSetContent.add(function(ed, o)
			{
				o.content = piReplaceShortcodeWithImg(o.content, ed);
			})

			editor.onPostProcess.add(function(ed, o)
			{
				if (o.get)
				{
					o.content = piReplaceImgWithShortcode(o.content);
				}
			});

			editor.onExecCommand.add( function(ed, cmd)
			{
				if (cmd === 'mceInsertContent')
				{
					var _getContent = tinyMCE.activeEditor.getContent();
					tinyMCE.activeEditor.setContent( piReplaceShortcodeWithImg(_getContent, ed) );
				}
			})

			editor.onInit.add(function(ed)
			{
				piEditShortcode(ed);
			})
		});

        function piStyle()
        {
            $("#pi_style").change(function(){
                if ( $(this).val() == 'tiled_gallery' )
                {
                    $(".pi_is_slideshow").fadeOut();
                    $(".pi_tiled_gallery").fadeIn();
                }else{
                    $(".pi_is_slideshow").fadeIn();
                    $(".pi_tiled_gallery").fadeOut();
                }
            }).trigger("change");
        }
        piStyle();

        function piSlideshowSingleItem()
        {
            $("#pi_slideshow_single_item").change(function(){

                if ( $(this).val() == '0' )
                {
                    $(this).closest('.form-group').nextAll().fadeIn();
                }else{
                    $(this).closest('.form-group').nextAll().fadeOut();
                }
            }).trigger("change");
        }
        piSlideshowSingleItem();

		function piReplaceShortcodeWithImg(co, ed)
		{
			var reg, image;

			reg = new RegExp('\\[(pi_ifg)([^\\]]*)\\]', 'g');
			return co.replace( reg, function(match, shortcode, attr)
			{
				if ( match.search('flickr') != -1 )
				{
					image = 'flickr.png';
				}else if ( match.search('instagram') != -1 )
				{
					image = 'instagram.png';
				}else if (match.search('custom') != -1){
					image = 'custom.png';
				}

				return "<img data-shortcodeid='pi_ifg' data-mce-placeholder='true' src='"+PIFIPIURL+image+"' class=\'pi-edit-ifg-gallery data-mce-placeholder mceItem\'  data-shortcodes='"+tinymce.DOM.encode(attr)+"' data-command=\'pi-ifg-edit\'>";
			})
		}

		function piEditShortcode(ed)
		{

			var _self = this, $oInfo = {}, _params = ['pi_style', 'pi_slideshow_autoplay', 'pi_slideshow_single_item', 'pi_slideshow_items', 'pi_slideshow_items_desktop', 'pi_slideshow_items_tablet', 'pi_slideshow_items_mobile', 'pi_theme', 'pi_instagram_get', 'pi_instagram_tagname', 'pi_thumbnail_label', 'pi_thumbnail_label_alignment', 'pi_thumbnail_label_position', 'pi_instagram_client_id', 'pi_instagram_user_id', 'pi_instagram_access_token', 'pi_user_id', 'pi_type', 'pi_photo_set', 'pi_color_scheme', 'pi_item_selectable', 'thumbnail_width', 'thumbnail_height', 'pagination_max_thumbnail_lines_per_page', 'thumbnail_gutter_height', 'max_item_per_line', 'pi_breadcrumb', 'pi_insert_urls', 'pi_thumbnail_alignment', 'pi_thumbnail_lazyload', 'pi_thumbnail_hover_effect', 'pi_image_ids', 'pi_album_id', 'pi_sort_album', 'pi_slideshow_limit', 'pi_maximun_width', 'pi_tiled_gallery_limit', 'pi_rowheight', 'pi_maxrowheight', 'pi_fixedheight', 'pi_lastrow', 'pi_showcaption', 'pi_randomize', 'pi_margin', 'pi_slideshow_auto_height'];
			ed.on( 'mousedown', function( event )
			{
				var _target,  _getData, $shortcodeId, parseData, _regex, $control = $("#"+_popupID), $formControl="", _aImgs = [], _imgs="", _aIds=[];
				_target = event.target;
				if ( _target && $(_target).data("shortcodeid") == "pi_ifg"  )
				{

					parseData = function(s, n)
					{
						n = new RegExp(n + '=[\"\']([^\"\']+)[\'\"]', 'g').exec(s);
						return n ? tinymce.DOM.decode(n[1]) : '';
					}

				 	if($(_target).attr("data-mce-selected") == 1)
					{
						_getData = $(_target).data("shortcodes");
						$shortcodeId = parseData(_getData, 'data_shortcodeid');

						for ( var i in _params )
						{

							_regex 	= new RegExp(_params[i]+"=\"([^\"]*)", 'g');
							_target = _regex.exec(_getData);

							_target = _target ? _target[1] : "";

							/*=========================================*/
							/*	Hidden Other Setting
							/*=========================================*/
							if ( _params[i] == 'pi_type' )
							{
								$(".pi_form_setting").addClass("hidden");
								$(_oFormControl[_target]).addClass("active").removeClass("hidden");

								if ( _target == 'instagram' )
								{
									pi_instagram_switcher();
								}
							}

							if ( _params[i] == 'pi_insert_urls' )
							{
								if ( _target !='' )
								{
									_aImgs = _target.split(",");

									for ( var _i=0, _max=_aImgs.length; _i<_max; _i++ )
									{
										_imgs += '<li class="pi-img-item width-300" data-id="">';
		                                    _imgs += '<img  src="' + _aImgs[_i] + '" />';
		                                    _imgs += '<a class="pi-awesome-remove" href="#">';
		                                        _imgs += '<i class="dashicons dashicons-no"></i>';
		                                    _imgs += '</a>';
		                                _imgs += '</li>';
									}

									$("#pi-ifg-popup-wrapper").find(".pi-awesome-gallery").html(_imgs);
								}
							}

							if ( _params[i] == 'pi_image_ids' )
							{
								if ( _target !='' )
								{
									_aIds = _target.split(",");

									for ( var _i=0, _max=_aIds.length; _i<_max; _i++ )
									{
										$("#pi-ifg-popup-wrapper .pi-awesome-gallery li:eq("+_i+")").attr("data-id", _aIds[_i]);
									}
								}
							}

							$control.find("[name='"+_params[i]+"']").val(_target);
						}
						tb_show("Settings", "#TB_inline?height=800&amp;width=1000&amp;inlineId="+_popupID);
					}

                    piStyle();
                    piSlideshowSingleItem();
                    $("#pi-ifg-save").addClass("is-edit");
				}
			})
		}

		function piReplaceImgWithShortcode(co)
		{
			var _gAttrs, _shortcode;
			function getAttrs(s, n)
			{
				n = new RegExp(n + '=\"([^\"]+)\"', 'g').exec(s);
				if ( n )
				{
					return tinymce.DOM.decode(n[1]);
				}else{
					return '';
				}
			};

			function getShortcode(s, n)
			{
				n = new RegExp(n + '=[\"\']([^\"\']+)[\'\"]', 'g').exec(s);
				return n  ? tinymce.DOM.decode(n[1]) : '';
			}

			return co.replace(/(?:<div[^>]+>)*(<img[^>]+>)(?:<\/div>)*/g, function(match, img)
			{
			 	_gAttrs      = getAttrs(img, 'data-shortcodes');
			 	_shortcode   = getShortcode(img, 'data-shortcodeid');

				if ( _shortcode == 'pi_ifg' )
				{
					return '<div class="pi_wrap_fipg">[pi_ifg data_shortcodeid=\'pi_ifg\' '+tinymce.trim(_gAttrs)+']</div>';
				}
				return match;
			})
		}

		function pi_instagram_switcher()
		{
			$(".pi_instagram_get").change(function()
			{
				var _val = $(this).val();
				$(".pi_instagram_setting").fadeOut();
				switch (_val)
				{
					case 'users':
						$(".pi_users").fadeIn();
						break;

					case 'tag':
						$(".pi_tag").fadeIn();
						break;

					default:
						$(".pi_popular").fadeIn();
						break;
				}
			}).trigger("change");
		}


		$.fn.pi_fig_toggle = function()
		{
			var _class = "";
			$(this).click(function()
			{
				_class = $(this).data("pattern");
				if ( typeof _class !='undefined' )
				{
					$(this).nextUntil(_class).slideToggle();
				}else{
					$(this).nextAll().slideToggle();
				}

				return false;
			});
		}


		$(".pi_fig_toggle").pi_fig_toggle();
		$(".pi_fig_click_toggle").pi_fig_toggle();


		$("#pi-ifg-save").click(function()
		{
			var _settings = "", _generalSettings="", _currentHandle, _allow=true, _style="", _slideshowSettings="";

			_currentHandle = $(".pi_form_setting.active").data("form");

			switch ( _currentHandle )
			{
				case 'flickr':
					if ( $("[name='flickr_id']").val() == "" )
					{
						_allow = false;
					}
				break;

				case 'custom':
					if ( $("[name='pi_image_ids']").val() == "" )
					{
						_allow = false;
					}
				break;
			}

			if ( _allow == true )
			{
                _style              = $("#pi-ifg-form-style").getAwesomeContent();
                _slideshowSettings  = $("#pi-ifg-slideshow-general").getAwesomeContent();
				_settings           = $(".pi_form_setting.active").getAwesomeContent();
				_generalSettings    = $("#pi-ifg-form-general").getAwesomeContent();

                if ( $("#pi-ifg-save").hasClass("is-edit") )
                {
                    _settings           ='[pi_ifg ' + _settings + ' ' + _style + ' ' + _slideshowSettings + ' ' +_generalSettings+']';
                }else{
                    _settings           = '<div class="pi_wrap_fipg">[pi_ifg ' + _settings + ' ' + _style + ' ' + _slideshowSettings + ' ' +_generalSettings+']</div>&nbsp;';
                }


				tinyMCE.activeEditor.execCommand('mceInsertContent', 0, _settings);
				pi_reset();
				tb_remove();
				_allow = true;
			}else{
				alert("Please fill all requires");
			}
			return false;
		})

		$("#pi-ifg-cancel").click(function(){
			pi_reset();
			tb_remove();
		})


		function pi_reset()
		{
			document.getElementById("pi-ifg-form-flicrk").reset();
			document.getElementById("pi-ifg-form-general").reset();
			document.getElementById("pi-ifg-form-custom").reset();
			document.getElementById("pi-ifg-form-instagram").reset();
			//document.getElementById("pi-ifg-form-picasa").reset();

			$(".pi-awesome-gallery").empty();
		}


		if ( !$().getAwesomeContent )
		{
			$.fn.getAwesomeContent = function()
			{
				var $items = $(this).find(".pi_item"), _aSettings = [], _setting, _val="";

				$items.each(function()
				{

					_setting  = $(this).attr("name") + '="' + $(this).val() + '"';
					_aSettings.push(_setting);
				})

				_setting = _aSettings.join(" ");
				_setting = _setting.trim();

				return _setting;
			}
		}

	})

})(jQuery, window, document);