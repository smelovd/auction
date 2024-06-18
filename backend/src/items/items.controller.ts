import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { Item } from './entities/item.entity';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiBadRequestResponse({
    type: "Bad request!"
  })
  @ApiNotFoundResponse({
    type: "Entity/ies not found!"
  })
  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<number> {
    return this.itemsService.create(createItemDto);
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
