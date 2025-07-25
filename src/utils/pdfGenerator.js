import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOMServer from 'react-dom/server';

export const generatePDF = async (component) => {
  // Create and style wrapper
  const wrapper = document.createElement('div');
  wrapper.style.width = '794px'; // A4 width in px at 72 DPI
  wrapper.style.padding = '20px';
  wrapper.style.boxSizing = 'border-box';
  wrapper.style.backgroundColor = '#fff';
  wrapper.innerHTML = ReactDOMServer.renderToStaticMarkup(component);
  document.body.appendChild(wrapper);

  // Generate canvas with higher resolution
  const canvas = await html2canvas(wrapper, {
    scale: 2, // high quality
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');
  const imgWidth = 595.28; // A4 width in points
  const pageHeight = 841.89; // A4 height in points
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF('p', 'pt', 'a4');
  let position = 0;

  // If content exceeds one page
  if (imgHeight < pageHeight) {
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  } else {
    while (position < imgHeight) {
      pdf.addImage(imgData, 'PNG', 0, position - (position === 0 ? 0 : pageHeight), imgWidth, imgHeight);
      position += pageHeight;
      if (position < imgHeight) pdf.addPage();
    }
  }

  pdf.save('resume.pdf');
  document.body.removeChild(wrapper);
};
