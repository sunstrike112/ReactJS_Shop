import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller()
export class SystemController {
  constructor(private readonly systemService: SystemService) {}
}
