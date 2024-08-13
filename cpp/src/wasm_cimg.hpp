#ifndef wasm_cimg_hpp
#define wasm_cimg_hpp

#include <emscripten.h>
#include <emscripten/bind.h>
#include <iostream>

#define cimg_use_jpeg 1
#define cimg_use_png 1
#define cimg_display 0
#include "../external/cimg/CImg.h"

using namespace emscripten;

class wasm_cimg {
    private:
        cimg_library::CImg<unsigned char> *image;
    public:
        wasm_cimg(std::string fileName);
        ~wasm_cimg();

        int width() const;
        int height() const;
        int depth() const;
        int spectrum() const;
        int size() const;

        wasm_cimg * resize(const int size_x, const int size_y);
        wasm_cimg * rotate(const float angle);
        wasm_cimg * mirror(const char axis);

        void save(std::string fileName);
};

EMSCRIPTEN_BINDINGS(wasm_cimg) {
    class_<wasm_cimg>("wasm_cimg")
        .constructor<std::string>()
        .function("width", &wasm_cimg::width)
        .function("height", &wasm_cimg::height)
        .function("depth", &wasm_cimg::depth)
        .function("spectrum", &wasm_cimg::spectrum)
        .function("size", &wasm_cimg::size)
        .function("resize", &wasm_cimg::resize, allow_raw_pointer<wasm_cimg>())
        .function("rotate", &wasm_cimg::rotate, allow_raw_pointer<wasm_cimg>())
        .function("mirror", &wasm_cimg::mirror, allow_raw_pointer<wasm_cimg>())
        .function("save", &wasm_cimg::save)
    ;
}

#endif /* wasm_cimg_hpp */
