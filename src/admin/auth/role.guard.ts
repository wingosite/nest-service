// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

// canActivate(context: ExecutionContext): boolean {
// const request = context.switchToHttp().getRequest();
// const url = request.url.split('?')[0];
// console.log(url);
// const roles = this.reflector.get('roles', context.getHandler());
// if (!roles) {
//   return true;
// }

// const req = context.switchToHttp().getRequest();
// const user = req.user;
// if (!user) {
//   return false;
// }
// const hasRoles = roles.some((role) => user.roles.indexOf(role) !== -1);
// if (!hasRoles) {
//   throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
// }
// return hasRoles;
//     return true;
//   }
// }
