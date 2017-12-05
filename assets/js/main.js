requirejs(["syllable/index", "flesch/index"], function(syllable, flesch) {

    var content = document.querySelector('#main .content').textContent;
    var sentences = content.split(/[.!?]/);
    var words = content.trim().split(/\s+/);

    var stats = {
        sentence: sentences.length,
        word: words.length,
        syllable: words.reduce(function(count, word) { return count + syllable(word); }, 0)
    };

    console.log(stats);
    var result = flesch(stats);

    var element = document.getElementById('reading-level');
    if (element) {
        element.textContent = Math.round(result);
    }

});
