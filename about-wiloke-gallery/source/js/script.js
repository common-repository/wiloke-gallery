;(function($){
    "use strict";

    function wilokeTabs(event)
    {
        $(event).parent().addClass("active");
        $(event).parent().siblings().removeClass("active");
        var tab = jQuery(event).attr("href");
        $(".wiloke-tab-pane").not(tab).css("display", "none");
        $(tab).fadeIn();
    }

    $(document).ready(function () {
        $(".wiloke-nav-tabs a").on('click', function(event) {
            event.preventDefault();
            wilokeTabs(this);
        });
    })

})(jQuery);