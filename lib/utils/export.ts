import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { downloadCSV } from './download';
import { ExportFormat } from '@/types';

export async function exportAnalytics(format: ExportFormat, elementId: string, filename: string) {
  try {
    switch (format) {
      case 'pdf':
        await exportToPDF(elementId, filename);
        break;
      case 'image':
        await exportToImage(elementId, filename);
        break;
      case 'csv':
        await exportToCSV(elementId, filename);
        break;
      default:
        throw new Error('Unsupported format');
    }
  } catch (error) {
    console.error('Export error:', error);
    throw error;
  }
}

async function exportToPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found for PDF export');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    onclone: (doc: Document) => {
      const clonedElement = doc.getElementById(elementId);
      if (clonedElement) {
        clonedElement.style.padding = '32px';
        clonedElement.style.background = '#ffffff';
      }
    }
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });
  
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(`${filename}.pdf`);
}

async function exportToImage(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found for image export');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  });

  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

async function exportToCSV(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found for CSV export');

  // Get all metrics from the dashboard
  const metrics = {
    totalVisitors: element.querySelector('[data-metric="totalvisitors"]')?.textContent,
    pageViews: element.querySelector('[data-metric="pageviews"]')?.textContent,
    avgDuration: element.querySelector('[data-metric="avgsessionduration"]')?.textContent,
    bounceRate: element.querySelector('[data-metric="bouncerate"]')?.textContent,
  };

  // Get chart data
  const chartData = element.querySelectorAll('[data-chart-point]');
  const dailyData = Array.from(chartData).map(point => ({
    date: point.getAttribute('data-date'),
    visits: point.getAttribute('data-visits'),
  }));

  // Create CSV content with sections
  const csvRows = [
    // Header
    ['Analytics Export'],
    ['Generated at', new Date().toLocaleString()],
    [''],  // Empty row for spacing
    
    // Summary Section
    ['Summary Metrics'],
    ['Metric', 'Value'],
    ['Total Visitors', metrics.totalVisitors || 'N/A'],
    ['Page Views', metrics.pageViews || 'N/A'],
    ['Average Session Duration', metrics.avgDuration || 'N/A'],
    ['Bounce Rate', metrics.bounceRate || 'N/A'],
    [''],  // Empty row for spacing
    
    // Daily Data Section
    ['Daily Visits'],
    ['Date', 'Total Visits'],
    ...dailyData.map(day => [
      day.date || 'N/A',
      day.visits || '0'
    ])
  ];

  // Convert to CSV string
  const csvContent = csvRows
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}

export { downloadCSV }; 