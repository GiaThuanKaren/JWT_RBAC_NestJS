import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreatePrismaDto } from './dto/create-prisma.dto';
import { UpdatePrismaDto } from './dto/update-prisma.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super(
      {
        datasources: {
          db: {
            url: "mysql://root:@localhost:3306/nestjwt"
          }
        }
      }
    )
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
  create(createPrismaDto: CreatePrismaDto) {
    return 'This action adds a new prisma';
  }

  findAll() {
    return `This action returns all prisma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prisma`;
  }

  update(id: number, updatePrismaDto: UpdatePrismaDto) {
    return `This action updates a #${id} prisma`;
  }

  remove(id: number) {
    return `This action removes a #${id} prisma`;
  }
}
