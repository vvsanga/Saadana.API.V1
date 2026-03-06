import * as path from 'path';
import * as fs from 'fs';

export const getLogDestination = () => {
  const now = new Date();
  
  // yyyyMMdd (e.g., 20260305)
  const folderName = now.toISOString().slice(0, 10).replace(/-/g, '');
  
  // MMddHH (e.g., 030523)
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const fileName = `${month}${day}${hour}.log`;

  const dir = path.join(process.cwd(), 'logs', folderName);
  
  // Ensure folder exists before Pino tries to write
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return path.join(dir, fileName);
};

export const formatLogLine = (logObj: any): string => {
  const { time, uid, type, msg, stack, ...meta } = logObj;
  
  // Convert Pino numeric time to ISO string if needed
  const timestamp = new Date(time).toISOString();
  
  const parts = [
    timestamp,
    uid || 'NA',
    type || 'INFO',
    msg,
    Object.keys(meta).length > 0 ? JSON.stringify(meta) : '',
    stack ? `\nSTACK: ${stack}` : '' // Exceptions get their own line for readability
  ];

  return parts.filter(Boolean).join('|');
};