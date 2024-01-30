import { PartialType } from "@nestjs/mapped-types";
import { Category } from "src/categories/entities/category.entity";

export class CreatePhotoDto {
    name: string;
    description: string;
    url: string;
    username: string;
    // TODO:
    categories: Category[];
}

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {}