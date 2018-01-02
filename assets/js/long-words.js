$(function() {
    function addSpans(element) {
        $(element).contents().each(function() {
            if (this.nodeType === Node.TEXT_NODE) {
                var unprocessed = this.textContent;
                if (unprocessed.match(/^\s*$/)) {
                    return;
                }
                var replacement = "";
                while (unprocessed.length > 0) {
                    var pos = unprocessed.search(/(\s|—|-)/);
                    if (pos < 0) {
                        replacement += "<span>" + unprocessed + "</span>";
                        unprocessed = "";
                    } else if (pos > 0) {
                        replacement += "<span>" + unprocessed.substr(0, pos) + "</span>";
                        unprocessed = unprocessed.substr(pos);
                    } else {
                        var char = unprocessed.substr(0, 1);
                        unprocessed = unprocessed.substr(1);
                        if (unprocessed.length === 0 || replacement.length === 0) {
                            replacement += "<span>" + char + "</span>";
                        } else {
                            replacement += char;
                        }
                    }
                }
                if (replacement !== unprocessed) {
                    $(this).replaceWith($(replacement));
                }
            } else {
                addSpans(this);
            }
        });
    }

    var rem = parseFloat($('html').css('font-size'));

    $('p').each(function() {
        addSpans(this);
        $(this).find('span').each(function() {
            var $span = $(this);
            if ($span.innerWidth() >= 3.8 * rem && $span[0].textContent.search(/\u00AD/) < 0) {
                $(this).css('background-color', '#fea');
            }
        });
    });
});
