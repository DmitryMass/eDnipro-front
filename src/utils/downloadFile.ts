export const downloadFile = async (fileName: string, filePath: string) => {
  // const publicId = 'uploadedFiles/pgo6bl8qg2svwojssp0j'; as file path
  const cloudinaryUrl = `${process.env.NEXT_PUBLIC_CLOUDINARY}${filePath}`;
  try {
    const response = await fetch(cloudinaryUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onload = function () {
      const dataUrl = reader.result;
      const a = document.createElement('a');
      a.href = dataUrl as string;
      a.download = 'nextech.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    reader.readAsDataURL(blob);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

// <a id='downloadButton' onClick={downloadFile}>
// Download File
// </a>
// <img src={cloudinaryUrl} alt='' />
