export interface CSVParseResult {
  event_name: string;
  path: string;
  timestamp: string;
  session_id?: string;
  properties?: Record<string, string>;
}

export function parseCSV(file: File): Promise<CSVParseResult[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const rows = text.split('\n').map(row => {
          const [event_name, path, timestamp, session_id, properties] = row.split(',');
          return {
            event_name,
            path,
            timestamp,
            session_id,
            properties: properties ? JSON.parse(properties) : undefined
          };
        });
        
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

export function generateCSVTemplate(): string {
  const headers = ['event_name', 'path', 'timestamp', 'session_id', 'properties'];
  const example = ['page_view', '/home', '2024-01-01 12:00:00', 'session123', '{"referrer":"google"}'];
  
  return [
    headers.join(','),
    example.join(',')
  ].join('\n');
}

export function validateCSVData(rows: CSVParseResult[]): boolean {
  return rows.every(row => {
    return (
      row.event_name &&
      row.path &&
      row.timestamp &&
      new Date(row.timestamp).toString() !== 'Invalid Date'
    );
  });
} 