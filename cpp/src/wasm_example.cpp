#include "./wasm_example.hpp"

using namespace emscripten;

int arrayIntSum(int * inputArray, int inputArrayLength) {
    int sum = 0;
    for (int i = 0; i < inputArrayLength; i++) {
        sum += inputArray[i];
    }
    return sum;
}

float arrayFloatSum(float * inputArray, int inputArrayLength) {
    float sum = 0;
    for (int i = 0; i < inputArrayLength; i++) {
        sum += inputArray[i];
    }
    return sum;
}
