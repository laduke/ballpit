#!/usr/bin/env bash
set -euo pipefail

SUFF=$1
OUT=$2


ADDR()
{
    ip -j addr show scope global
}

mkdir -p $OUT

ADDR | jq . > "$OUT/addr-$SUFF.json"
ip -j route | jq . > "$OUT/route-$SUFF.json"
