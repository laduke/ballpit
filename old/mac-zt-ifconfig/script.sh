#!/usr/bin/env bash
#
set -o errexit
set -o nounset
set -o pipefail


setup () {
    ZT_ID=$1
    ZT_IF=$(zerotier-cli listnetworks -j | jq -r ".[] | select(.nwid == \"${ZT_ID}\") | .portDeviceName")
    ZT_ADDRESSES=$(zerotier-cli listnetworks -j | jq -r ".[] | select(.nwid == \"${ZT_ID}\") | .assignedAddresses[]" | grep -v ":" )
    ZT_ADDRESSES6=$(zerotier-cli listnetworks -j | jq -r ".[] | select(.nwid == \"${ZT_ID}\") | .assignedAddresses[]" | grep  ":" )

    for value in $ZT_ADDRESSES
    do
        echo sudo ifconfig $ZT_IF add $value
        sudo ifconfig $ZT_IF add $value
    done

    for value in $ZT_ADDRESSES6
    do

        echo sudo ifconfig $ZT_IF inet6 add $value
        sudo ifconfig $ZT_IF inet6 add $value
    done

}

if declare -f "${1}__$2" >/dev/null; then
  func="${1}__$2"
  shift; shift    # pop $1 and $2 off the argument list
  "$func" "$@"    # invoke our named function w/ all remaining arguments
elif declare -f "$1" >/dev/null 2>&1; then
  "$@"
else
  echo "Neither function $1 nor subcommand ${1}__$2 recognized" >&2
  exit 1
fi
