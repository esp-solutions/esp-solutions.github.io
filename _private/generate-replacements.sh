#!/bin/bash

cd "$(dirname "$0")"

while read WORD REPLACEMENT; do
    echo "| replace: \"$WORD\", \"$(echo $REPLACEMENT | sed 's/-/\&shy;/g')\""
    echo "| replace: \"$WORD\", \"$(echo $REPLACEMENT | sed 's/-/\&shy;/g')\"" | tr '[:upper:]' '[:lower:]'
    echo "| replace: \"$(tr '[:lower:]' '[:upper:]' <<< ${WORD:0:1})${WORD:1}\", \"$(tr '[:lower:]' '[:upper:]' <<< ${REPLACEMENT:0:1})$(echo ${REPLACEMENT:1} | sed 's/-/\&shy;/g')\""
done < ./word-list | sort -ru
