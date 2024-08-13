#ifndef word_counter_hpp
#define word_counter_hpp

#include <map>
#include <iostream>
#include <limits>
#include <string>
#include <stdio.h>

class word_counter {
private:
    // Stores a number of occurrences of a speficic character
    std::map<char, unsigned int> character_occurrences;
    // Stores a number of ocurrances of a speficic word
    std::map<std::string, unsigned int> word_occurrences;
    // Stores a total number of words
    unsigned int total_word_count;

    // If it is true then
    bool is_case_sensitive;
    // If it is true then alfanumeric characters are only used
    bool use_alfanumeric_characters_only;

    // Minimum length of a word
    unsigned int min_word_length = 0;
    // Maximum length of a word
    unsigned int max_word_length = std::numeric_limits<unsigned int>::max();

    // Processes entered word - case insensitive, ascii characters
    void process_word_ci_ascii(const std::string& word);
    // Processes entered word - case sensitive, ascii characters
    void process_word_cs_ascii(const std::string& word);
    // Processes entered word - case insensitive, alphanumeric characters
    void process_word_ci_alphanumeric(const std::string& word);
    // Processes entered word - case sensitive, alphanumeric characters
    void process_word_cs_alphanumeric(const std::string& word);

    // Inserts or updates character occurance
    void insert_or_update_character_occurrence(const char& character);
    // Inserts or updates word occurance
    void insert_or_update_word_occurrence(const std::string& word);

public:
    // Constructor
    word_counter(const bool is_case_sensitive, const bool use_alfanumeric_characters_only);
    // Desctructor
    ~word_counter();

    // If true is returned then upper and lower character is counted as one character
    const bool get_flag_is_case_sensitive();
    // If true is returned then alfanumeric characters are only used
    const bool get_flag_use_alfanumeric_characters_only();

    // If true is set then upper and lower character is counted as one character
    void set_flag_is_case_sensitive(const bool is_case_sensitive);
    // If true is set then alfanumeric characters are only used
    void set_flag_use_alfanumeric_characters_only(const bool use_alfanumeric_characters_only);

    // Gets minimum length of a word
    const unsigned int get_min_word_length();
    // Gets maximum length of a word
    const unsigned int get_max_word_length();

    // Sets minimum length of a word
    void set_min_word_length(const unsigned int min_word_length);
    // Sets maximum length of a word
    void set_max_word_length(const unsigned int max_word_length);

    // Get number of occurrences of a speficic character
    const std::map<char, unsigned int>& get_character_occurrences();
    // Get number of ocurrances of a speficic word
    const std::map<std::string, unsigned int>& get_word_occurrences();
    // Get total number of words
    const unsigned int get_total_word_count();

    // Processes entered filename, counts character and word occurances and counts total number of words
    void process_file(const std::string& filename);
    // Clears all data
    void clear();

    // Merges entered word counter into this one
    void merge_into(word_counter* word_counter);
};

#endif /* word_counter_hpp */
