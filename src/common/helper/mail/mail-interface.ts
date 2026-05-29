export interface IMail {
    to: string;
    cc?: string;
    url?: string;
    subject?: string;
    data?: {};
    text?:string;
    otherdata?:string[];
    attachmentFilePath?: string[];
    attachments?: { 
      filename?: string; 
      content?: Buffer | string; 
      contentType?: string; 
      path?:string;
    }[];
  }