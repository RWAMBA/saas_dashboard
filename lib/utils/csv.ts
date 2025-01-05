import { CSV_HEADERS, type AnalyticsImportRow } from "@/types";

// Helper function to parse various date formats
function parseDateTime(dateStr: string): Date {
  // Remove any extra whitespace
  dateStr = dateStr.trim();
  
  // Try different formats
  let date: Date;
  
  if (dateStr.includes(':')) {
    // Has time component
    date = new Date(dateStr);
  } else {
    // Only date provided - set time to start of day
    date = new Date(`${dateStr} 00:00`);
  }

  // Validate the parsed date
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateStr}. Please use YYYY-MM-DD or YYYY-MM-DD HH:mm`);
  }

  return date;
}

export function generateCSVTemplate(): string {
  const headers = CSV_HEADERS.join(',');
  
  // Simple example rows with different date formats
  const exampleRows = [
    // With time
    [
      'page_view',           // event_name
      '/home',              // path
      '2024-01-05 13:25',  // timestamp with time
      'session_1',          // session_id
      'google'              // referrer
    ].join(','),
    // Without time (just date)
    [
      'button_click',
      '/products',
      '2024-01-05',        // timestamp without time
      'session_1',
      'direct'
    ].join(',')
  ];

  return `${headers}\n${exampleRows.join('\n')}`;
}

export function parseCSV(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(header => 
          header.trim().replace(/["']/g, '')
        );
        
        const data = lines.slice(1)
          .filter(line => line.trim())
          .map((line, index) => {
            try {
              const values = line.split(',').map(value => 
                value.trim().replace(/["']/g, '')
              );
              
              // Parse date with more flexibility
              const timestamp = parseDateTime(values[2]);

              // Convert simple referrer to properties object
              const referrer = values[4];
              const properties = JSON.stringify({ referrer });

              return {
                event_name: values[0],
                path: values[1],
                timestamp: timestamp.toISOString(),
                session_id: values[3],
                properties
              };
            } catch (error) {
              throw new Error(`Error in row ${index + 2}: ${error.message}`);
            }
          });

        resolve(data);
      } catch (error) {
        reject(new Error(error.message || 'Failed to parse CSV file. Please check the format matches the template.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read CSV file'));
    };

    reader.readAsText(file);
  });
}

export function validateCSVData(data: any[]): data is AnalyticsImportRow[] {
  return data.every(row => 
    typeof row.event_name === 'string' &&
    typeof row.path === 'string' &&
    // Validate timestamp format
    !isNaN(Date.parse(row.timestamp)) &&
    // Optional fields
    (row.session_id === undefined || typeof row.session_id === 'string') &&
    (row.properties === undefined || typeof row.properties === 'string')
  );
} 