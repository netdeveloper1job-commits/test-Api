import { v4 as uuidv4 } from 'uuid';

if (typeof (globalThis as any).crypto === 'undefined') {
  (globalThis as any).crypto = {
    randomUUID: uuidv4,
  };
}
