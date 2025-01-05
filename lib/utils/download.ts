export function downloadCSV(headers: string[], rows: (string | number | boolean)[][], filename: string) {
  try {
    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        row.map(cell => {
          if (cell === null || cell === undefined) return '""';
          return `"${cell.toString().replace(/"/g, '""')}"`;
        }).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href); // Clean up
  } catch (error) {
    console.error('Error downloading CSV:', error);
    throw new Error('Failed to download CSV file');
  }
} 