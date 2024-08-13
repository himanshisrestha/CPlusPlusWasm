#include <emscripten.h>
#include <emscripten/bind.h>
#include <iostream>
#include "../external/word-counter/word_counter.hpp"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(word_counter_library) {
    class_<word_counter>("word_counter")
        .constructor<const bool, const bool>()
        .function("get_flag_is_case_sensitive", &word_counter::get_flag_is_case_sensitive)
        .function("get_flag_use_alfanumeric_characters_only", &word_counter::get_flag_use_alfanumeric_characters_only)
        .function("set_flag_is_case_sensitive", &word_counter::set_flag_is_case_sensitive)
        .function("set_flag_use_alfanumeric_characters_only", &word_counter::set_flag_use_alfanumeric_characters_only)
        .function("get_min_word_length", &word_counter::get_min_word_length)
        .function("get_max_word_length", &word_counter::get_max_word_length)
        .function("set_min_word_length", &word_counter::set_min_word_length)
        .function("set_max_word_length", &word_counter::set_max_word_length)
        .function("get_total_word_count", &word_counter::get_total_word_count)
        .function("get_character_occurrences", &word_counter::get_character_occurrences)
        .function("get_word_occurrences", &word_counter::get_word_occurrences)
        .function("merge_into", &word_counter::merge_into, allow_raw_pointer<word_counter>())
        .function("process_file", &word_counter::process_file)
        .function("clear", &word_counter::clear)
    ;
    register_map<std::string, unsigned int>("map<string, int>");
    register_map<char, unsigned int>("map<char, unsigned int>");
    register_vector<std::string>("vector<string>");
    register_vector<char>("vector<char>");
}
