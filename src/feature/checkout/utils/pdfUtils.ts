import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generatePdf = async (element: HTMLElement, fileName: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
    backgroundColor: "#ffffff",
    ignoreElements: (el) => el.hasAttribute("data-html2canvas-ignore"),
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save(fileName);
};
