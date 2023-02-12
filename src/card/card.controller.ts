import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CardDto } from './card.dto';

@Controller('card')
export class CardController {
    @Post()
    create(@Body() cardDto: CardDto, @Res() res: Response) {
        res.status(HttpStatus.CREATED).json([]);
    }
}
