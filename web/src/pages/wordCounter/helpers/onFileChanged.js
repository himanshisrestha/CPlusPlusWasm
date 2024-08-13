export default (setFileContent) => (e) => {
  const reader = new FileReader();

  reader.onload = (ie) => {
    const arrayBuffer = ie.target.result;
    const uint8Array = new Uint8Array(arrayBuffer);
    setFileContent(uint8Array);
  };

  reader.readAsArrayBuffer(e.target.files[0]);
};
