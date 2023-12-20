import { TranslationMap } from "./TranslationMap.model";

type TValuesIntersection<T> = {
  [K in keyof T]: (x: T[K]) => void;
}[keyof T] extends (x: infer I) => void
  ? I
  : never;

type TDecr = [never, 0, 1, 2, 3, 4, 5];

type TFlattenObject<T extends object, TPreKey extends string = "", TDepth extends number = 3> = {
  [key in keyof T & string as T[key] extends object
    ? never
    : `${TPreKey}${TPreKey extends "" ? key : `.${key}`}`]: T[key];
} & (TDepth extends 0
  ? {}
  : TValuesIntersection<{
      [key in keyof T & string as T[key] extends object ? key : never]: T[key] extends object
        ? TFlattenObject<T[key], `${TPreKey}${TPreKey extends "" ? key : `.${key}`}`, TDecr[TDepth]>
        : {};
    }>);

export type TranslationKeys = keyof TFlattenObject<TranslationMap>;