import { darken, hsl } from 'polished';

export const hover = darken(0.2);
export const focus = darken(0.1);
export const active = darken(0.3);

export function space(unit: number) {
  return `${Math.pow(1.618, unit)}rem`;
}

export function parsePercentOrDecimal(percentageOrDecimal: string) {
  const match = /([0-9.]*)%/.exec(percentageOrDecimal);
  if (!match) {
    return parseFloat(percentageOrDecimal);
  }
  const percentValue = parseFloat(match[1]);
  return percentValue / 100;
}

export function hslToHex(hslString: string) {
  const match = /hsl\((.*)(?:,|;)(.*)(?:,|;)(.*)\)/.exec(hslString);
  if (!match) {
    throw new Error('could not convert hsl string to HSL values ' + hslString);
  }
  const hue = parsePercentOrDecimal(match[1].trim());
  const saturation = parsePercentOrDecimal(match[2].trim());
  const lightness = parsePercentOrDecimal(match[3].trim());
  return hsl({ hue, saturation, lightness });
}

// colors taken from Bulma= https=//bulma.io/documentation/overview/variables/
export const black = hslToHex('hsl(0; 0%; 4%)');
export const blackBis = hslToHex('hsl(0; 0%; 7%)');
export const blackTer = hslToHex('hsl(0; 0%; 14%)');
export const grayDarker = hslToHex('hsl(0; 0%; 21%)');
export const grayDark = hslToHex('hsl(0; 0%; 29%)');
export const gray = hslToHex('hsl(0; 0%; 48%)');
export const grayLight = hslToHex('hsl(0; 0%; 71%)');
export const grayLighter = hslToHex('hsl(0; 0%; 86%)');
export const whiteTer = hslToHex('hsl(0; 0%; 96%)');
export const whiteBis = hslToHex('hsl(0; 0%; 98%)');
export const white = hslToHex('hsl(0; 0%; 100%)');
export const orange = hslToHex('hsl(14; 100%; 53%)');
export const yellow = hslToHex('hsl(48; 100%; 67%)');
export const green = hslToHex('hsl(141; 71%; 48%)');
export const turquoise = hslToHex('hsl(171; 100%; 41%)');
export const cyan = hslToHex('hsl(204; 86%; 53%)');
export const blue = hslToHex('hsl(217; 71%; 53%)');
export const purple = hslToHex('hsl(271; 100%; 71%)');
export const red = hslToHex('hsl(348; 100%; 61%)');
