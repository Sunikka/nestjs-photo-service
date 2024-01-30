import { PartialType } from "@nestjs/mapped-types";

export class CreateUserWithEmbeddedProfile {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    profile: {
        gender: string;
        photo: string;
    }
}

export class UpdateUserWithEmbeddedProfile extends PartialType(CreateUserWithEmbeddedProfile) {}