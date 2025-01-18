export function anonymizeIP(ip: string): string {
  // For IPv4, remove last octet
  if (ip.includes('.')) {
    return ip.split('.').slice(0, 3).join('.') + '.0';
  }
  // For IPv6, remove last 3 segments
  return ip.split(':').slice(0, 5).join(':') + ':0000';
} 