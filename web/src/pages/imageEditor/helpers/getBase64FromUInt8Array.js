export default (fileExtension, fileData) => {
  const fileDataBase64 = btoa(fileData.reduce((data, byte) => data + String.fromCharCode(byte), ''));
  return `data:image/${fileExtension};base64,${fileDataBase64}`;
};
