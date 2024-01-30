import { PartialType } from "@nestjs/mapped-types";

export class CreateCategoryDto {
    name : string;
    description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}