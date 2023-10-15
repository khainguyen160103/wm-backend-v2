import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common'
import { PermissionService } from './permission.service'

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
}
