#!/bin/bash

cd "$(dirname "$0")"

(
    echo "{{content"
    ./generate-replacements.sh
    echo "}}"
) > ../_includes/hyphenated-content.html
