# WebAssembly Project

> This project demonstrates a web application stack utilizing WebAssembly to bridge C++ code with a JavaScript frontend.

## Requirements

To run this project, ensure you have the following tools installed:

* [Node.js](https://nodejs.org/en/download/)
* [Emscripten](https://emscripten.org/docs/getting_started/downloads.html)
* [Surge](https://surge.sh/help/getting-started-with-surge) _(for deployment)_

## Running the Project

Build and run the project by executing the following command:

```bash
bash ./run.sh

## Deployment

Deploy the web application to [http://webassembly-project.bedrich-schindler.surge.sh/](http://webassembly-project.bedrich-schindler.surge.sh/) using:

```bash
bash ./deploy.sh


* [cpp/src/wasm_example.hpp](cpp/src/wasm_example.hpp): Contains basic example implementation of C functions
* [cpp/src/wasm_word_counter.hpp](cpp/src/wasm_word_counter.hpp): Contains mapping of external C++ library Word Counter using Emscripten Bind
* [cpp/src/wasm_audio_file.hpp](cpp/src/wasm_audio_file.hpp): Contains mapping of external C++ library AudioFile using Emscripten Bind
* [cpp/src/wasm_cimg.hpp](cpp/src/wasm_cimg.hpp): Contains facade-style mapping of external C++ library CImg using Emscripten Bind

