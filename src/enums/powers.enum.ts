export enum Powers {
  NONE = 1,
  THOU = Math.pow(10, 3),
  MLN = Math.pow(10, 6),
  BN = Math.pow(10, 9),
  TRLN = Math.pow(10, 12),
}

export enum PowersString {
  NONE = '',
  THOU = 'тыс.',
  MLN = 'млн.',
  BN = 'млрд.',
  TRLN = 'трлн.',
}
