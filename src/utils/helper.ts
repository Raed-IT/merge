import { FieldDto } from "@/lib/data/axios-client";
import { FieldType } from "./enums/filtd-type-enum";
import { FieldComponentValue } from "@/types";

export function getPropertyFromObjectSafe<T extends Record<string, any>>(obj: T, key: string): any {
    return obj[key];
}

export function isValidateDynamicFormFiled(field: FieldComponentValue[]): boolean {
    return field.length > 0 && field.every((item) => item.error === undefined || item.error === null || item.error === '');
}

export function getFirstErrorFromFrom(field: FieldComponentValue[]): string {
    return field.find((item) => item.error !== undefined && item.error !== null && item.error !== '')?.error ?? '';
}

export function convertStringToEnum<T extends { [key: string]: string }>(enumObj: T, value: string): T[keyof T] | undefined {
    const enumValues = Object.values(enumObj) as string[];
    return enumValues.includes(value) ? (value as T[keyof T]) : undefined;
}

