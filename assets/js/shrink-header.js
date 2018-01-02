$(function() {
    var $window = $(window);
    var $html = $("html");
    var $header = $("header");

    var remSize;
    function updateRemSize() {
        remSize = parseFloat($html.css('font-size'))
    }
    $window.on('resize', updateRemSize);
    updateRemSize();

    var fullHeight = parseFloat($header.css('height')) / remSize;
    var minHeight = fullHeight * 2 / 3;

    var fullHeightOffset = $window.scrollTop();
    var lastHeight = fullHeight;

    function updateHeaderHeight() {
        var currentOffset = $window.scrollTop();
        var offsetsDelta = remSize * (fullHeight - minHeight) * 3;
        var minHeightOffset = fullHeightOffset + offsetsDelta;

        var nextHeight;
        if (currentOffset <= fullHeightOffset) {
            nextHeight = fullHeight;
            fullHeightOffset = currentOffset;
        } else if (currentOffset >= minHeightOffset) {
            nextHeight = minHeight;
            fullHeightOffset = currentOffset - offsetsDelta;
        } else {
            nextHeight = (minHeightOffset - currentOffset) / offsetsDelta * (fullHeight - minHeight) + minHeight;
        }

        if (nextHeight !== lastHeight) {
            lastHeight = nextHeight;
            $header.css('height', nextHeight + 'rem');
        }
    }

    $window.on('scroll', updateHeaderHeight);
    updateHeaderHeight();
});
