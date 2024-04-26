import { randomBytes, randomUUID } from 'crypto';

export const generateUniqueIdFromHex = (): string => {
  return randomBytes(16).toString('hex');
};

export const randomUuid = (): `${string}-${string}-${string}-${string}-${string}` => {
  return randomUUID();
};


