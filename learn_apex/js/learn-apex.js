
// for thumbs navigation behavior
(function ($) {
    var defaults =
    {
        // the selector of pagination container
        psel: ".pagination",

        // the items' amount of showing in one time
        show: 3,

        // the width of one thumb item, in pixel
        itemWidth: 198,

        // add this class for the active thumb item
        activeClass: "active",

        // add this class for the last visible item ( with a radius border)
        radiusClass: "radius-bg",

        // add this class if visible items < 3
        rightAlignClass: "right-align",

        // pagination active class name
        pacls: "current"
    };

    $.fn.thumbsNavigation = function (option) {
        var settings = $.extend(!0, {}, defaults, option);
        return this.each(function () {

            var $container = $(this);

            // get the thumb items amount
            var num = $(".thumbs ul li", $container).length;

            // set the width for ul tag
            $(".thumbs ul", $container).width(num * settings.itemWidth);

            // add the right align class, if the num is smaller than show items amount
            if (num <= settings.show)
            {
                // add right align class
                $(".thumbs", $container).addClass(settings.rightAlignClass);

                // add radius class for the last visible item
                $(".thumbs ul li", $container).removeClass(settings.radiusClass);
                $(".thumbs ul li", $container).eq(num - 1).addClass(settings.radiusClass);

                $(settings.psel, $container).html("");
            }

            // only add the pagination if num is larger then one time show amount
            if( num > settings.show)
            {
                // add radius class for the last visible item
                for (var j = 1; j <= num; j++)
                {
                    if( j % settings.show == 0)
                    {
                        $(".thumbs ul li", $container).eq(j - 1).addClass(settings.radiusClass);
                    }
                }

                var count = Math.ceil(num / settings.show);

                // generate the dom of the pagination
                var paginationdom = "<ul>";
                for (var i = 0; i < count; i++)
                {
                    paginationdom += "<li><span>&nbsp;</span></li>";
                }
                paginationdom += "</ul>";

                $(settings.psel, $container).html(paginationdom);

                // set the active pagination item
                var index = $(".thumbs ul li.active", $container).index();

                $(".thumbs ul", $container).css("margin-left", 0 - Math.floor(index / settings.show) * settings.show * settings.itemWidth + "px");
                $(settings.psel + " ul li", $container).eq(Math.floor(index / settings.show)).addClass(settings.pacls);

                // bind click for pagination switch
                $(settings.psel + " ul li", $container).click(function () {

                    // switch the active class
                    $(settings.psel + " ul li", $container).removeClass(settings.pacls);
                    $(this).addClass(settings.pacls);

                    // sliding to corresponding items
                    var index2 = $(this).index();
                    $(".thumbs ul", $container).animate({ "margin-left": 0 - index2 * settings.show * settings.itemWidth + "px" });
                });
            }

            // bind click behavior for the thumb navigation item
            $(".thumbs ul li", $container).click(function () {
                var destination = $(this).find("a").attr("href");
                window.location.href = destination;
            });
        });
    }
})(jQuery);



// initialize and bind thumbs navigation behavior
$(function () {

    // set the selected thumb item for "asme_game_lp.html"
    var id = request("id");
    if (id != "")
    {
        $(".thumb-nav .thumbs ul li").removeClass("active");
        $(".thumb-nav .thumbs ul li").eq(parseInt(id) - 1).addClass("active");
    }

    // bind thumbs navigation behavior
    $(".thumb-nav").thumbsNavigation();

    // get the parameter function
    function request(paras)
    {
        var url = location.href;
		
		// get the parameters array
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
		
		// convert to jason format
        for (var i = 0; i < paraString.length; i++)
        {
            var j = paraString[i];
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
		
		// get the parameter value
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof (returnValue) == "undefined")
        {
            return "";
        }
        else
        {
            return returnValue;
        }
    }

});