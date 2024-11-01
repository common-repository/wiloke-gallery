;(function($, window, document){

	"use strict"

    if ( !$().pi_awesome_upload )
    {
    	$.fn.pi_awesome_upload  = function()
    	{
    		var _oDefaults = {}, _self, $getData, isMultile = false, file_frame, $insertTo, $insertVal, $parent, $insertUrls;
    	
    		$(this).bind("click",function()
    		{
                _self      = $(this);
                $getData   = _self.data();
                $parent    = _self.closest(".pi-wrap-upload");
                $insertTo  = $parent.find($getData.insertto);
                $insertVal = $parent.find(".pi_insert_val");
                $insertUrls = $parent.find(".pi_insert_urls");

                if ( typeof $getData.multiple != 'undefined' )
                {
                    isMultile = true;
                }
             	
                /* Create the media frame */
                file_frame = wp.media.frames.file_frame = wp.media(
                {
                    title: $(this).data( 'uploader_title' ),
                    button: {
                        text: $(this).data('uploader_button_title'),
                    },
                    multiple: isMultile,

                })

                /* When an image or many images is selected, run a callback */
                file_frame.on("select", function()
                {
                    var selection = file_frame.state().get('selection');

                    switch (isMultile)
                    {
                        case true:
                            var ids = [], urls = [], idsurls = [], _imgs="", _oldids, _oldurls="";

                            selection.map(function(attachment)
                            {
                                attachment 	= attachment.toJSON();
                                ids.push(attachment.id);

                                if (typeof attachment.sizes.thumbnail !== 'undefined')
                                {
                                    urls.push(attachment.sizes.thumbnail.url);
                                }else{
                                    urls.push(attachment.url);
                                }
                            });

                            if ( typeof $insertVal.val() != 'undefined' )
                            {
                                _oldids = $.map($insertVal.val().split(","), function(value)
                                {
                                    if (value != "")
                                        return parseInt(value, 10);
                                });

                                _oldurls = $.map($insertUrls.val().split(","), function(value)
                                {
                                    if (value != "")
                                        return value;
                                });
                            }
                            
                           
                            for (var j = 0; j < ids.length; j++)
                            {
                                if (  typeof _oldids !='undefined' )
                                {
                                    _oldids.push(ids[j]);
                                    _oldurls.push(urls[j]);
                                }

                                _imgs += '<li class="pi-img-item width-300" data-id="'+ids[j]+'">';
                                    _imgs += '<img  src="' + urls[j] + '" />';
                                    _imgs += '<a class="pi-awesome-remove" href="#">';
                                        _imgs += '<i class="dashicons dashicons-no"></i>';
                                    _imgs += '</a>';
                                _imgs += '</li>';
                            }


                            $insertVal.val(_oldids);
                            $insertUrls.val(_oldurls);

                            $insertTo.append(_imgs);

                            break;

                        case false:
                            var _getUrl, _getID;
                            selection.map(function(attachment)
                            {
                                attachment = attachment.toJSON();
                                _getID 	   =  attachment.id;
                                _getUrl    = attachment.url;
                            });

                            if ( typeof $getData.geturl !='undefined' )
                            {
                                $insertVal.val(_getUrl);
                            }else{
                              	$insertVal.val(_getID);  
                            }
                            

                            var img = '<img width="260" height="270" src="'+_getUrl+'">';

                            $insertTo.html(img);
                        break;
                    }
                  
                })

                file_frame.open();
                return false;
            })   
    	}
    }


    var pi_awesome_remove = function()
    {
        $(document).on("click", ".pi-awesome-remove", function(event)
        {
            event.preventDefault();
            var $this = $(this), _getVal="", _index, _oldids, $insertVal, $insertUrl, _getUrl, _oldurls, _oResult;

            $insertVal = $this.closest(".pi-wrap-upload").find(".pi_insert_val");
            _getVal    = $insertVal.val();

            $insertUrl = $this.closest(".pi-wrap-upload").find(".pi_insert_urls");
            _getUrl    = $insertUrl.val();
           
            
            _index = $this.parent().data("id");

            _oldids = $.map(_getVal.split(','), function(value)
            {
                if (value != "")
                    return parseInt(value);
            });

            _oldurls = $.map(_getUrl.split(','), function(value)
            {
                if (value != "")
                    return value;
            });

           
            
            _oResult  = pi_awesome_remove_id(_oldids, _index, _oldurls);
            _oldids   = _oResult.ids;
            _oldurls  = _oResult.urls;

            if ( _oldids !='' )
            {
                $insertVal.val(_oldids.join(","));
                $insertUrl.val(_oldurls.join(","));
            }else{
                $insertVal.val("");
                $insertUrl.val("");
            }
            
           
            $this.parent().fadeOut('slow', function() 
            {
               $this.remove();
            });
           
        });
    }

    var pi_awesome_remove_id = function(arr, id, urls)
    {
        for(var i=0; i<arr.length; i++)
        {
           if (arr[i] == id || typeof arr[i] == id)
           {
              arr.splice(i, 1);
              urls.splice(i, 1);
           }
        }
      
        return {ids: arr, urls: urls};
    }


    $(document).ready(function(){
        $(".pi_awesome_gallery").pi_awesome_upload();
        pi_awesome_remove();
        
        $(".pi_insert_val").change(function(){
            var ids = '', i=1, $this = $(this),
                _length = $(this).siblings(".pi-awesome-gallery").find("li").length;


            $(this).siblings(".pi-awesome-gallery").find("li").each(function()
            {
                if ( ids == '' )
                {
                    ids = $(this).attr('data-id');
                }else{
                    ids = ids + ',' + $(this).attr('data-id');
                }

                if ( _length == i )
                {
                    $this.val(ids);
                }

                i++;
            })
        })

        $(".pi-awesome-gallery").sortable({
            stop: function(event, ui){
                console.log(ui.item);
                $(ui.item).parent('.pi-awesome-gallery').siblings('.pi_insert_val').trigger('change');
            }
        });

        
    })
})(jQuery, window, document)