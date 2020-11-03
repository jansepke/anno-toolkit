/// <reference types="next" />
/// <reference types="next/types/global" />

// typescript definition currently missing in package
// https://github.com/vinissimus/next-translate/issues/88
declare module "next-translate/useTranslation" {
  export default function useTranslation(): {
    t: (key: string, query?: { [name: string]: string | number }) => string;
    lang: string;
  };
}
