#!/bin/bash

set -e

mkdir -p ./build/
em++ ./src/library.cpp \
  ./external/word-counter/word_counter.cpp \
  -o ./build/wasm.js \
  --bind \
  -s NO_DISABLE_EXCEPTION_CATCHING \
  --no-entry \
  -s ENVIRONMENT=web \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s USE_SDL=2 -s USE_SDL_IMAGE=2 \
  -s SDL2_IMAGE_FORMATS='["jpg", "png", "gif"]' \
  -s EXPORTED_FUNCTIONS="['_malloc', '_free']" \
  -s EXPORTED_RUNTIME_METHODS="['FS', 'allocate', 'intArrayFromString', 'ALLOC_NORMAL']" \
  -s ALLOW_MEMORY_GROWTH=1

mkdir -p ../web/src/wasm/module/
cp ./build/wasm.{wasm,js} ../web/src/wasm/module/

