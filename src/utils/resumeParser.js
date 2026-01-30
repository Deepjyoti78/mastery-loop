import * as pdfjsLib from 'pdfjs-dist';

// Vite-specific: Import worker as a URL
// This bundles the worker and provides a local path, avoiding CORS issues from CDNs.
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();

        // Load the document
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        let fullText = '';

        // Iterate pages
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            // Extract text items
            const pageText = textContent.items
                .map(item => item.str)
                .join(' ');

            fullText += pageText + '\n\n';
        }

        return fullText;
    } catch (error) {
        console.error("PDF Parsing Failed:", error);
        throw new Error("Could not parse PDF. Please try pasting text manually.");
    }
};
