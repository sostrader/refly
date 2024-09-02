import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';
import { UpdateUserSettingsRequest, User } from '@refly/openapi-schema';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) {}

  async updateSettings(user: User, data: UpdateUserSettingsRequest) {
    return this.prisma.user.update({
      where: { uid: user.uid },
      data: { ...data },
    });
  }

  async checkUsername(name: string) {
    return this.prisma.user.findUnique({ where: { name } });
  }
}
