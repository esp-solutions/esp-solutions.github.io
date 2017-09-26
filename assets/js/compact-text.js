(function() {

    function main() {
        var targets = [];

        document.querySelectorAll('.compact-text').forEach(function(element) {
            var target = {
                element: element,
                initialStyle: element.getAttribute('style') || ''
            };
            if (target.initialStyle) {
                target.initialStyle += ';';
            }
            targets.push(target);
        });

        function makePadding(elementWidth, padding) {
            var newWidth = elementWidth - padding;
            return 'width:' + newWidth + 'px;padding-right:' + padding + 'px';
        }

        function updateElementPaddingAmounts() {
            targets.forEach(function(target) {
                target.element.setAttribute('style', target.initialStyle);

                var originalWidth = target.element.offsetWidth;
                var originalHeight = target.element.offsetHeight;

                var knownGoodPadding = 0;
                var knownBadPadding = Math.ceil(target.element.offsetWidth);

                while (knownBadPadding - knownGoodPadding > 1) {
                    var testPadding = Math.floor((knownGoodPadding + knownBadPadding) / 2);

                    var testStyle = target.initialStyle + makePadding(originalWidth, testPadding);
                    target.element.setAttribute('style', testStyle);

                    if (target.element.offsetHeight > originalHeight) {
                        knownBadPadding = testPadding;
                    } else {
                        knownGoodPadding = testPadding;
                    }
                }

                var style = target.initialStyle + makePadding(originalWidth, knownGoodPadding);
                target.element.setAttribute('style', style);
            });
        }

        updateElementPaddingAmounts();
        window.addEventListener('resize', updateElementPaddingAmounts);
        window.addEventListener('load', updateElementPaddingAmounts);
    }

    document.addEventListener('DOMContentLoaded', main);

})();
