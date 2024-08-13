#include <emscripten.h>
#include <emscripten/bind.h>
#include <iostream>
#include "../external/audio-file/AudioFile.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(audio_file_library) {
    emscripten::register_vector<float>("VectorFloat");
    emscripten::register_vector<std::vector<float>>("VectorVectorFloat");

    enum_<AudioFileFormat>("AudioFileFormat")
        .value("Error", AudioFileFormat::Error)
        .value("NotLoaded", AudioFileFormat::NotLoaded)
        .value("Wave", AudioFileFormat::Wave)
        .value("Aiff", AudioFileFormat::Aiff)
    ;

    class_<AudioFile<float>>("AudioFile")
        .constructor<>()
        .constructor<std::string>()
        .function("load", &AudioFile<float>::load)
        .function("save", &AudioFile<float>::save)
        .function("getSampleRate", &AudioFile<float>::getSampleRate)
        .function("getNumChannels", &AudioFile<float>::getNumChannels)
        .function("isMono", &AudioFile<float>::isMono)
        .function("isStereo", &AudioFile<float>::isStereo)
        .function("getBitDepth", &AudioFile<float>::getBitDepth)
        .function("getNumSamplesPerChannel", &AudioFile<float>::getNumSamplesPerChannel)
        .function("getLengthInSeconds", &AudioFile<float>::getLengthInSeconds)
        .function("printSummary", &AudioFile<float>::printSummary)
        .function("setAudioBuffer", &AudioFile<float>::setAudioBuffer)
        .function("setAudioBufferSize", &AudioFile<float>::setAudioBufferSize)
        .function("setNumSamplesPerChannel", &AudioFile<float>::setNumSamplesPerChannel)
        .function("setNumChannels", &AudioFile<float>::setNumChannels)
        .function("setBitDepth", &AudioFile<float>::setBitDepth)
        .function("setSampleRate", &AudioFile<float>::setSampleRate)
        .function("shouldLogErrorsToConsole", &AudioFile<float>::shouldLogErrorsToConsole)
        .property("samples", &AudioFile<float>::samples)
    ;
}
