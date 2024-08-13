#include "wasm_cimg.hpp"

using namespace emscripten;

wasm_cimg::wasm_cimg(std::string filename) {
    std::cout << "Input file: " << filename << std::endl;
    this->image = new cimg_library::CImg<unsigned char>(filename.c_str());
    this->image->height();
}
wasm_cimg::~wasm_cimg() {}

int wasm_cimg::width() const {
    return this->image->width();
}
int wasm_cimg::height() const {
    return this->image->height();
}
int wasm_cimg::depth() const {
    return this->image->depth();
}
int wasm_cimg::spectrum() const {
    return this->image->spectrum();
}
int wasm_cimg::size() const {
    return this->image->size();
}

wasm_cimg * wasm_cimg::resize(const int size_x, const int size_y) {
    this->image->resize(size_x, size_y);
    return this;
}
wasm_cimg * wasm_cimg::rotate(const float angle) {
    this->image->rotate(angle);
    return this;
}
wasm_cimg * wasm_cimg::mirror(const char axis) {
    this->image->mirror(axis);
    return this;
}

void wasm_cimg::save(std::string fileName) {
    std::cout << "Output file: " << fileName << std::endl;
    this->image->save(fileName.c_str());
}