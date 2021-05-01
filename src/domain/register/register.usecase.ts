import {Gender} from "../user/gender";

export interface RegisterUseCase {
  isUserIdValid(value: string): boolean;
  isDisplayNameValid(value: string): boolean;
  isEmailValid(value: string): boolean;
  isBirthdayValid(value: Date): boolean;
  isGenderValid(value: Gender): boolean;
}
