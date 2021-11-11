#!/usr/bin/env bash
set -euo pipefail

OUT=$1
SUFF=$2

ADDR()
{
    ip -j addr show scope global
}

ADDR | jq . > "$OUT/addr-$SUFF.json"
ip -j route | jq . > "$OUT/route-$SUFF.json"
