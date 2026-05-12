// Logic for the backend
export interface SystemStatus {
  status: string;
  uptime: number;
  timestamp: string;
}

export class StatusService {
  async getStatus(): Promise<SystemStatus> {
    return {
      status: 'online',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}

export const statusService = new StatusService();
