import { IsNumberString, Length } from "class-validator";

export class CardDto {
    @Length(1, 100)
    name: string;

    @Length(16, 16)
    @IsNumberString()
    card_number: number;

    @Length(5, 5)
    expire_date: string;

    @Length(3)
    cvv: number;
}
