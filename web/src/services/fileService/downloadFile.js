/**
 * It downloads file with specific content.
 *
 * @param filename
 * @param dataString
 */
export const downloadFile = (filename, dataString) => {
  const element = document.createElement('a');
  element.setAttribute('href', dataString);
  element.setAttribute('download', filename);

  // Element must be appended to document to be working in FF
  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
