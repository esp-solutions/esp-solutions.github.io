$(function() {
    var $targets = [];

    function addSpans(element) {
        $(element).contents().each(function() {
            if (this.nodeType === Node.TEXT_NODE) {
                var unprocessed = this.textContent;
                var replacement = "";
                while (unprocessed.length > 0) {
                    var pos = unprocessed.search(/\s/);
                    if (pos < 0) {
                        replacement += "<span>" + unprocessed + "</span>";
                        unprocessed = "";
                    } else if (pos > 0) {
                        replacement += "<span>" + unprocessed.substr(0, pos) + "</span>";
                        unprocessed = unprocessed.substr(pos);
                    } else {
                        replacement += unprocessed.substr(0, 1);
                        unprocessed = unprocessed.substr(1);
                    }
                }
                $(this).replaceWith($(replacement));
            } else {
                addSpans(this);
            }
        });
    }

    $('h1, h2, h3, h4, h5, h6, [data-compact]').each(function() {
        addSpans(this);
        $targets.push($(this));
    });

    function elementRelativePosition($element, $parent) {
        var elementOffset = $element.offset();
        var parentOffset = $parent.offset();

        return {
            left: elementOffset.left - parentOffset.left - parseFloat($parent.css("padding-left")),
            top: elementOffset.top - parentOffset.top - parseFloat($parent.css("padding-top"))
        };
    }

    function sortedUnique(arr) {
        var sorted = arr.slice();
        sorted.sort(function(a, b) { return a - b; });
        unique = [];
        $(sorted).each(function(index, value) {
            if (unique.length === 0 || unique[unique.length - 1] !== value) {
                unique.push(value);
            }
        });
        return unique;
    }

    function updatePadding() {
        $($targets).each(function() {
            $target = this;
            $target.css("padding-right", "");
            var currentPadding = parseFloat($target.css("padding-right"));

            var availableWidth = $target.innerWidth();
            var targetLineCount = null;
            var $spans = $target.find('span');

            var optimalPadding = currentPadding;

            for (var retry = 0; retry < 100; retry++) {
                if ($spans.length <= 1) {
                    break;
                }

                var rightOffsets = [];
                var bottomOffsets = [];
                $spans.each(function() {
                    var $span = $(this);
                    var offset = elementRelativePosition($span, $target);
                    rightOffsets.push(offset.left + $span.innerWidth());
                    bottomOffsets.push(offset.top + $span.innerHeight());
                });

                rightOffsets = sortedUnique(rightOffsets);
                bottomOffsets = sortedUnique(bottomOffsets);

                if (bottomOffsets.length <= 1) {
                    break;
                }

                if (targetLineCount === null) {
                    targetLineCount = Math.max($target.data('compact') || 1, bottomOffsets.length);
                }

                if (bottomOffsets.length === targetLineCount) {
                    optimalPadding = currentPadding;
                } else if (bottomOffsets.length > targetLineCount) {
                    break;
                } else if (rightOffsets.length === bottomOffsets.length) {
                    break
                }

                currentPadding = availableWidth - rightOffsets[rightOffsets.length - 1] + 1;
                $target.css("padding-right", currentPadding);
            }

            $target.css("padding-right", optimalPadding);
        });
    }

    $(window).on('resize', updatePadding);
    updatePadding();
});
