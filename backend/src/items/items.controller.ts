import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { Item } from './entities/item.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(AuthGuard)
  @ApiBadRequestResponse({
    type: "Bad request!"
  })
  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @Post()
  create(@Body() createItemDto: CreateItemDto, @Req() req): Promise<number> {
    return this.itemsService.create(createItemDto, req.sub);
  }

  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(+id);
  }
}
