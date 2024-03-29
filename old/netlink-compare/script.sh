#!/usr/bin/env bash
set -euo pipefail

OUT=${1:-$(mktemp -d)}
NWID=${2:-"c7c8172af150e770"}

## clean up
mkdir -p /var/lib/zerotier-one/networks.d/
rm -f /var/lib/zerotier-one/networks.d/*

## prejoin the network
touch /var/lib/zerotier-one/networks.d/$NWID.conf

## collect addresses and routes before installing zerotier
./collect.sh step0 $OUT

## install current release
curl -s https://install.zerotier.com | bash
echo "here1"

## network status after joining
sleep 5;
echo "hi"
sleep 5;
echo "hi"
zerotier-cli info | grep ONLINE
./collect.sh step1 $OUT
! ./compare.sh $OUT step0 step1

## allow stuff
zerotier-cli set $NWID allowGlobal=1 > /dev/null
zerotier-cli set $NWID allowDefault=1 > /dev/null
echo "hi"
sleep 8;
./collect.sh step2 $OUT
! ./compare.sh $OUT step1 step2

## disable stuff
zerotier-cli set $NWID allowGlobal=0 > /dev/null
zerotier-cli set $NWID allowDefault=0 > /dev/null
echo "hi"
sleep 8;
./collect.sh step3 $OUT

./compare.sh $OUT step1 step3

zerotier-cli set $NWID allowManaged=0 > /dev/null
echo "hi"
sleep 8;
./collect.sh step4 $OUT
! ./compare.sh $OUT step3 step4

zerotier-cli leave $NWID
echo "hi"
sleep 8;
./collect.sh step5 $OUT
./compare.sh $OUT step0 step5
