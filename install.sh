#!/bin/sh
set -eu
if ! command -v node >/dev/null 2>&1; then
  echo '需要 Node.js 22 或更新版本。请先安装 Node.js，再运行此脚本。' >&2
  exit 1
fi
moyu_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
exec node "$moyu_dir/dist/install.mjs" "$@"
