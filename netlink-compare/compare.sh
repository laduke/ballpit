#!/usr/bin/env bash
set -euo pipefail

DIR=$1
STEPA=$2
STEPB=$3

JQAddr(){
 jq '.[] | select(.ifname|test("zt."))' $1
}

if ! res=$(diff <(JQAddr $DIR/addr-$STEPA.json) <(JQAddr $DIR/addr-$STEPB.json)); then
    echo "error: $DIR/addr-$STEPA.json $DIR/addr-$STEPB.json "
    echo
    echo "$res"
    exit 1;
fi

if ! res=$(diff $DIR/route-$STEPA.json $DIR/route-$STEPB.json); then
    echo "error: $DIR/route-$STEPA.json $DIR/route-$STEPB.json"
    echo
    echo "$res"
    exit 1;
fi
