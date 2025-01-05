import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { downloadCSV } from './download';
import type { ExportFormat } from '@/types';

export async function exportAnalytics(format: ExportFormat, elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');

  try {
    switch (format) {
      case 'pdf':
        await exportToPDF(element, filename);
        break;
      case 'image':
        await exportToImage(element, filename);
        break;
      case 'csv':
        // existing CSV logic
        break;
      default:
        throw new Error('Unsupported format');
    }
  } catch (error) {
    console.error('Export error:', error);
    throw error;
  }
}

async function exportToPDF(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, {
    scale: 2, // Higher quality
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    onclone: (document: Document) => {
      const clonedElement = document.getElementById(element.id) as HTMLElement;
      if (clonedElement) {
        // Apply styles for better visual output
        clonedElement.style.padding = '32px';
        clonedElement.style.background = '#ffffff';
        clonedElement.style.borderRadius = '0';
        clonedElement.style.width = '100%';
        
        // Ensure charts and graphs are properly sized
        const charts = clonedElement.querySelectorAll('[data-export-chart]');
        charts.forEach((chart: Element) => {
          (chart as HTMLElement).style.height = '400px';
          (chart as HTMLElement).style.width = '100%';
        });
      }
    }
  });
  
  const imgData = canvas.toDataURL('image/png', 1.0);
  const pdfWidth = canvas.width * 0.75;
  const pdfHeight = canvas.height * 0.75;
  
  const pdf = new jsPDF({
    orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
    unit: 'px',
    format: [pdfWidth, pdfHeight],
    hotfixes: ['px_scaling']
  });
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${filename}.pdf`);
}

async function exportToImage(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, {
    scale: 2, // Higher quality
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    onclone: (document: Document) => {
      const clonedElement = document.getElementById(element.id) as HTMLElement;
      if (clonedElement) {
        // Apply styles for better visual output
        clonedElement.style.padding = '32px';
        clonedElement.style.background = '#ffffff';
        clonedElement.style.borderRadius = '0';
        clonedElement.style.width = '100%';
        
        // Ensure charts and graphs are properly sized
        const charts = clonedElement.querySelectorAll('[data-export-chart]');
        charts.forEach((chart: Element) => {
          (chart as HTMLElement).style.height = '400px';
          (chart as HTMLElement).style.width = '100%';
        });
      }
    }
  });

  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
} 