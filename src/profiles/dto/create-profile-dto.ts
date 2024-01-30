import { PartialType } from "@nestjs/mapped-types";

export class CreateProfileDto {
    gender: string;
    photo: string;
}

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}