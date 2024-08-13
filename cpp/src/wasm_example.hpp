#ifndef wasm_example_hpp
#define wasm_example_hpp

#include <emscripten.h>
#include <iostream>

extern "C" {
    EMSCRIPTEN_KEEPALIVE int arrayIntSum(int * inputArray, int inputArrayLength);
    EMSCRIPTEN_KEEPALIVE float arrayFloatSum(float * inputArray, int inputArrayLength);
}

#endif /* wasm_example_hpp */
