import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(uid: string) {
    try {
      const data = await this.prisma.users.findUnique({
        where: { id: uid },
      });

      if (!data) {
        throw new HttpException('user not found', 404);
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async create(data: any) {
    try {
      const user = await this.prisma.users.create({
        data,
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async update(data: any, userUid: string) {
    try {
      const user = await this.prisma.users.update({
        where: { id: userUid },
        data,
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
