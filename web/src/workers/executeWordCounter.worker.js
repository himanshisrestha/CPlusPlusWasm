import WordCounter from '../wasm/classes/WordCounter';
import createWasmModule from '../wasm/module/wasm';

/**
 * This worker accepts file on which WordCounter is executed and result is posted back to the worker executor.
 */
addEventListener('message', async ({ data }) => {
  const {
    fileContent,
    isAlphaNumericalOnly,
    isCaseSensitive,
  } = data;
  const fileName = 'wordCounterFata.txt';

  // Create WasmModule and make it accessible globally
  self.WasmModule = await createWasmModule();

  // Create file in WASM file system with specified content
  WasmModule.FS.writeFile(fileName, fileContent);

  // Create instance of WordCounter
  const wordCounter = WordCounter(isCaseSensitive, isAlphaNumericalOnly);

  let isFailed = false;
  try {
    // Process uploaded file
    wordCounter.process_file(fileName);
  } catch (e) {
    // Stop processing if failed
    isFailed = true;
  } finally {
    // Remove file from WASM file system
    WasmModule.FS.unlink(fileName);
  }

  if (isFailed) {
    postMessage({
      characterOccurrences: [],
      isEmpty: false,
      isFailed: true,
      totalWords: 0,
      wordOccurrences: [],
    });
    return;
  }

  // Get total words count
  const totalWords = wordCounter.get_total_word_count();

  if (totalWords === 0) {
    postMessage({
      characterOccurrences: [],
      isEmpty: true,
      isFailed: false,
      totalWords: 0,
      wordOccurrences: [],
    });
    return;
  }

  // Get word occurrences
  const wordOccurrencesRaw = wordCounter.get_word_occurrences();
  const wordOccurrences = [];
  for (let i = 0; i < wordOccurrencesRaw.keys().size(); i += 1) {
    const key = wordOccurrencesRaw.keys().get(i);
    wordOccurrences.push({
      id: key,
      value: wordOccurrencesRaw.get(key),
    });
  }

  const characterOccurrencesRaw = wordCounter.get_character_occurrences();
  const characterOccurrences = [];
  for (let i = 0; i < characterOccurrencesRaw.keys().size(); i += 1) {
    const key = characterOccurrencesRaw.keys().get(i);
    characterOccurrences.push({
      id: String.fromCharCode(key),
      value: characterOccurrencesRaw.get(key),
    });
  }

  // Clear data
  wordCounter.clear();
  wordCounter.delete();

  postMessage({
    characterOccurrences,
    isEmpty: false,
    isFailed: false,
    totalWords,
    wordOccurrences,
  });
});
