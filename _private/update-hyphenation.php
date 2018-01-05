#!/usr/bin/env php
<?php

$referenceDictionaryFile = __DIR__ . '/moby/mhyph.txt';
$referenceDictionary = [];
foreach (explode("\n", file_get_contents($referenceDictionaryFile)) as $line) {
    $line = trim($line);

    if (empty($line)) continue;
    if (strpos($line, ' ')) continue;
    if (strpos($line, '-')) continue;

    $line = preg_replace('/\xA5/', '-', $line);

    if (preg_match('/[\x80-\xFF]/', $line)) continue;

    $chunks = preg_split('/-/', $line);

    $referenceDictionary[implode('', $chunks)] = implode('-', $chunks);
}

$hyphenationDictionaryFile = __DIR__ . '/hyphenation.dic';
$hyphenationDictionaryContent = trim(file_get_contents($hyphenationDictionaryFile));
$hyphenationDictionary = [];
foreach (explode("\n", $hyphenationDictionaryContent) as $line) {
    list($word, $replacement) = explode(' ', $line, 2);
    $hyphenationDictionary[$word] = $replacement;
}

$unvalidatedDictionaryFile = __DIR__ . '/unvalidated.dic';
$unvalidatedDictionaryContent = trim(file_get_contents($unvalidatedDictionaryFile));
$unvalidatedDictionary = [];
foreach (explode("\n", $unvalidatedDictionaryContent) as $line) {
    list($word, $replacement) = explode(' ', $line, 2);
    $unvalidatedDictionary[$word] = $replacement;
}

$hyphenateCmd = __DIR__ . '/hyphenate.py';

function listFiles($path)
{
    if (is_file($path)) return [$path];

    $files = [];
    foreach (scandir($path) as $entry) {
        if ($entry == '.' || $entry == '..') continue;

        $file = "$path/$entry";
        if (is_dir($file)) {
            $files = array_merge($files, listFiles($file));
        } else {
            $files[] = $file;
        }
    }

    return $files;
}

$searchPaths = [
    __DIR__ . '/../_drafts',
    __DIR__ . '/../_posts',
    __DIR__ . '/../resources',
    __DIR__ . '/../under-construction.md',
];

$files = [];
foreach ($searchPaths as $searchPath) {
    $files = array_merge($files, listFiles($searchPath));
}

$mapping = [];

foreach ($files as $file) {
    $content = file_get_contents($file);
    $content = preg_replace('/<[^>]>/', '', $content);
    preg_match_all('/[a-z]{5,}+/i', $content, $matches);
    foreach ($matches[0] as $word) {
        if (isset($hyphenationDictionary[$word])) {
            $mapping[$word] = $hyphenationDictionary[$word];
        } else if (isset($hyphenationDictionary[strtolower($word)])) {
            $mapping[strtolower($word)] = $hyphenationDictionary[strtolower($word)];
        } else if (!isset($unvalidatedDictionary[$word]) && !isset($unvalidatedDictionary[strtolower($word)])) {
            if (isset($referenceDictionary[$word])) {
                $referenceReplacement = $referenceDictionary[$word];
            } else if (isset($referenceDictionary[strtolower($word)])) {
                $word = strtolower($word);
                $referenceReplacement = $referenceDictionary[$word];
            } else {
                $referenceReplacement = '';
            }
            $generatedReplacement = trim(`$hyphenateCmd $word`);
            $unvalidatedDictionary[$word] = trim("$generatedReplacement $referenceReplacement");
        }
    }
}

function save($dictionary, $dictionaryFile, $original)
{
    $keys = array_keys($dictionary);
    usort($keys, function($a, $b) use ($dictionary) {
        $cmp = substr_count($dictionary[$b], ' ') - substr_count($dictionary[$a], ' ');
        if ($cmp == 0) {
            $cmp = strcmp(strtolower($a), strtolower($b));
        }
        if ($cmp == 0) {
            $cmp = strcmp($a, $b);
        }
        return $cmp;
    });

    $content = trim(implode("\n", array_map(function($key) use ($dictionary) {
       return "$key {$dictionary[$key]}";
    }, $keys)));

    if ($content != $original) {
        echo "Writing $dictionaryFile\n";
        file_put_contents($dictionaryFile, $content);
    }
}

save($hyphenationDictionary, $hyphenationDictionaryFile, $hyphenationDictionaryContent);
save($unvalidatedDictionary, $unvalidatedDictionaryFile, $unvalidatedDictionaryContent);

krsort($mapping);

$replacements = ["| replace: \"/\", \"/&#x200b;\""];
foreach ($mapping as $word => $replacement) {
    if ($word == $replacement) continue;

    $encoded = str_replace('-', '&shy;', $replacement);
    $extended_mapping = [
        $word => $encoded,
        strtolower($word) => strtolower($encoded),
        ucfirst($word) => ucfirst($encoded)
    ];

    foreach ($extended_mapping as $word => $encoded) {
        $replacements[] = "| replace: \"$word\", \"$encoded\"";
        $replacements[] = "| replace: \"-$encoded\", \"-$word\"";
        $replacements[] = "| replace: \"$encoded-\", \"$word-\"";
    }
}
$replacements[] = "| replace: \"-\", \"-<wbr>\"";

$replacements = implode("\n", $replacements);

$commands = [
    "{% assign content_chunks = content | split: '<' %}",
    "{% for chunk in content_chunks %}",
    "{% assign first_chunk = forloop.first %}",
    "{% assign content_inner_chunks = chunk | split: '>' %}",
    "{% unless first_chunk %}",
    "<",
    "{% endunless %}",
    "{% for inner_chunk in content_inner_chunks %}",
    "{% unless first_chunk or forloop.index0 > 0 %}",
    "{{ inner_chunk }}>",
    "{% else %}",
    "{{ inner_chunk {$replacements} }}",
    "{% unless forloop.last %}>{% endunless %}",
    "{% endunless %}",
    "{% endfor %}",
    "{% endfor %}",
];

file_put_contents(__DIR__ . '/../_includes/hyphenated-content.html', implode('', $commands));
