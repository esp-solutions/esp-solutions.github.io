#!/bin/bash

cd "$(dirname "$0")"

WORD="$1"

grep -i "^$WORD " ./word-list && exit

HYPHENATED=$(./hyphenate.py "$WORD")

BREAK_COUNT=$(echo -n $HYPHENATED | tr -cd '-' | wc -c)
if [[ $BREAK_COUNT -le 1 ]]; then
    echo "$WORD $HYPHENATED"
    echo "$WORD $HYPHENATED" >> ./word-list
    sort -u ./word-list > ./word-list.tmp && mv ./word-list.tmp ./word-list
    exit
fi

echo $BREAK_COUNT

REPLACEMENT=${HYPHENATED%%-*}
REMAINDER=${HYPHENATED#*-}
while : ; do
    echo
    printf "%20s\n" "${REPLACEMENT//-/}-"
    echo "   ${REMAINDER//-/}"
    echo

    read -n1 -p 'Okay?'
    if [[ $REPLY == 'y' ]]; then
        REPLACEMENT="${REPLACEMENT}-${REMAINDER%%-*}"
    else
        REPLACEMENT="${REPLACEMENT}${REMAINDER%%-*}"
    fi

    [[ $REMAINDER == ${REMAINDER#*-} ]] && break
    REMAINDER="${REMAINDER#*-}"
done

echo "$WORD $REPLACEMENT"

read -n1 -p 'Save?'
if [[ $REPLY == 'y' ]]; then
    echo "$WORD $REPLACEMENT" >> ./word-list
    sort -u ./word-list > ./word-list.tmp && mv ./word-list.tmp ./word-list
fi
