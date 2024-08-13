#include "word_counter.hpp"
#include "ctype.h"
#include <fstream>
#include <utility>

// Constructor
word_counter::word_counter(const bool is_case_sensitive, const bool use_alfanumeric_characters_only) {
    this->is_case_sensitive = is_case_sensitive;
    this->use_alfanumeric_characters_only = use_alfanumeric_characters_only;
    this->total_word_count = 0;
}
// Destructor
word_counter::~word_counter() {}

// If true is returned then upper and lower character is counted as one character
const bool word_counter::get_flag_is_case_sensitive() {
    return this->is_case_sensitive;
}
// If true is returned then alfanumeric characters are only used
const bool word_counter::get_flag_use_alfanumeric_characters_only() {
    return this->use_alfanumeric_characters_only;
}

// If true is set then upper and lower character is counted as one character
void word_counter::set_flag_is_case_sensitive(const bool is_case_sensitive) {
    this->is_case_sensitive = is_case_sensitive;
}
// If true is set then alfanumeric characters are only used
void word_counter::set_flag_use_alfanumeric_characters_only(const bool use_alfanumeric_characters_only) {
    this->use_alfanumeric_characters_only = use_alfanumeric_characters_only;
}

// Gets minimum length of a word
const unsigned int word_counter::get_min_word_length() {
    return this->min_word_length;
}
// Gets maximum length of a word
const unsigned int word_counter::get_max_word_length() {
    return this->max_word_length;
}

// Sets minimum length of a word
void word_counter::set_min_word_length(const unsigned int min_word_length) {
    this->min_word_length = min_word_length;
}
// Sets maximum length of a word
void word_counter::set_max_word_length(const unsigned int max_word_length) {
    this->max_word_length = max_word_length;
}

// Get number of occurrences of a speficic character
const std::map<char, unsigned int>& word_counter::get_character_occurrences() {
    return this->character_occurrences;
}
// Get number of ocurrances of a speficic word
const std::map<std::string, unsigned int>& word_counter::get_word_occurrences() {
    return this->word_occurrences;
}
// Get total number of words
const unsigned int word_counter::get_total_word_count() {
    return this->total_word_count;
}

// Processes entered filename, counts character and word occurances and counts total number of words
void word_counter::process_file(const std::string& filename) {
    std::ifstream file (filename);

    if (!file.is_open()) {
        throw std::runtime_error("File `" + filename + "` not found.");
    }

    std::string word;
    while (file >> word)
    {
        for (int character : word) {
            if (character < 0 || character > 127) {
                throw std::runtime_error("File `" + filename + "` contains non-ASCII characters.");
            }
        }

        if (word.size() < this->min_word_length || word.size() > this->max_word_length) {
            continue;
        }

        if (!this->is_case_sensitive && !this->use_alfanumeric_characters_only) {
            this->process_word_ci_ascii(word);
        } else if (this->is_case_sensitive && !this->use_alfanumeric_characters_only) {
            this->process_word_cs_ascii(word);
        } else if (!this->is_case_sensitive && this->use_alfanumeric_characters_only) {
            this->process_word_ci_alphanumeric(word);
        } else {
            this->process_word_cs_alphanumeric(word);
        }
    }

    file.close();
}
// Clears all data
void word_counter::clear() {
    this->character_occurrences.clear();
    this->word_occurrences.clear();
    this->total_word_count = 0;
}

// Merges entered word_counter into this one
void word_counter::merge_into(word_counter* word_counter) {
    for (auto character_occurrence : word_counter->get_character_occurrences()) {
        if (this->character_occurrences.find(character_occurrence.first) != this->character_occurrences.end()) {
            this->character_occurrences[character_occurrence.first] += character_occurrence.second;
        } else {
            this->character_occurrences.insert(std::make_pair(character_occurrence.first, character_occurrence.second));
        }
    }

    for (auto word_occurrence : word_counter->get_word_occurrences()) {
        if (this->word_occurrences.find(word_occurrence.first) != this->word_occurrences.end()) {
            this->word_occurrences[word_occurrence.first] += word_occurrence.second;
        } else {
            this->word_occurrences.insert(std::make_pair(word_occurrence.first, word_occurrence.second));
        }
    }

    this->total_word_count += word_counter->get_total_word_count();
}

// Processes entered word - case insensitive, ascii characters
void word_counter::process_word_ci_ascii(const std::string& word) {
    std::string word_to_insert = "";

    for (char character : word) {
        // Transform upercase character to lowercase
        if (character >= 'A' && character <= 'Z') {
            character += 32;
        }

        // Stores a number of occurrences of a speficic character
        this->insert_or_update_character_occurrence(character);

        word_to_insert += character;
    }

    // Stores a number of occurrences of a speficic word
    this->insert_or_update_word_occurrence(word_to_insert);
}
// Processes entered word - case sensitive, ascii characters
void word_counter::process_word_cs_ascii(const std::string& word) {
    std::string word_to_insert = "";

    for (char character : word) {
        // Stores a number of occurrences of a speficic character
        this->insert_or_update_character_occurrence(character); this->character_occurrences.insert(std::make_pair(character, 1));

        word_to_insert += character;
    }

    // Stores a number of occurrences of a speficic word
    this->insert_or_update_word_occurrence(word_to_insert);
}
// Processes entered word - case insensitive, alphanumeric characters
void word_counter::process_word_ci_alphanumeric(const std::string& word) {
    std::string word_to_insert = "";

    for (char character : word) {
        // Uses alphanumeric characters only
        if ((character >= '0' && character <= '9') || (character >= 'A' && character <= 'Z') || (character >= 'a' && character <= 'z')) {
            // Transform upercase character to lowercase
            if (character >= 'A' && character <= 'Z') {
                character += 32;
            }

            // Stores a number of occurrences of a speficic character
            this->insert_or_update_character_occurrence(character);

            word_to_insert += character;
        }
    }

    // Stores a number of occurrences of a speficic word
    this->insert_or_update_word_occurrence(word_to_insert);
}
// Processes entered word - case sensitive, alphanumeric characters
void word_counter::process_word_cs_alphanumeric(const std::string& word) {
    std::string word_to_insert = "";

    for (char character : word) {
        // Uses alphanumeric characters only
        if ((character >= '0' && character <= '9') || (character >= 'A' && character <= 'Z') || (character >= 'a' && character <= 'z')) {
            // Stores a number of occurrences of a speficic character
            this->insert_or_update_character_occurrence(character);

            word_to_insert += character;
        }
    }

    // Stores a number of occurrences of a speficic word
    this->insert_or_update_word_occurrence(word_to_insert);
}

// Inserts or updates character occurance
void word_counter::insert_or_update_character_occurrence(const char& character) {
    if (this->character_occurrences.find(character) != this->character_occurrences.end()) {
        this->character_occurrences[character]++;
    } else {
        this->character_occurrences.insert(std::make_pair(character, 1));
    }
}
// Inserts or updates word occurance
void word_counter::insert_or_update_word_occurrence(const std::string& word) {
    if (word.size() > 0) {
        if (this->word_occurrences.find(word) != this->word_occurrences.end()) {
            this->word_occurrences[word]++;
        } else {
            this->word_occurrences.insert(std::make_pair(word, 1));
        }

        this->total_word_count++;
    }
}
