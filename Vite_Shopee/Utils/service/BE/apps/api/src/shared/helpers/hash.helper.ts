import { HttpException, HttpStatus } from '@nestjs/common';
import { MSG_WRONG_CREDENTIALS } from '@constants/messages.constant';
import * as bcrypt from 'bcrypt';

export const HASH_ROUNDS = 10;

export async function hashValue(value: string, rounds: number = HASH_ROUNDS) {
  const salt = await bcrypt.genSalt(rounds);
  return await bcrypt.hash(value, salt);
}

export async function isMatchHash(value: string, hashedValue: string) {
  return await bcrypt.compare(value, hashedValue);
}

export async function verifyPassword(plainTextPassword: string, hashedPassword: string, customErrorMessage: string = null) {
  const isPasswordMatching = await isMatchHash(plainTextPassword, hashedPassword);
  if (!isPasswordMatching) {
    if (customErrorMessage == null) customErrorMessage = MSG_WRONG_CREDENTIALS;
    throw new HttpException(customErrorMessage, HttpStatus.BAD_REQUEST);
  }
  return isPasswordMatching;
}