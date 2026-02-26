import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { healthCheck: boolean } {
    return {
      healthCheck: true,
    };
  }
}
