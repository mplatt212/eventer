const ms_per_day = 1000 * 60 * 60 * 24;

export const getDayDiff = (a: Date, b: Date) => {
  const UTC_1 = Date.UTC(a?.getFullYear(), a?.getMonth(), a?.getDate());
  const UTC_2 = Date.UTC(b?.getFullYear(), b?.getMonth(), b?.getDate());
  return Math.floor((UTC_1 - UTC_2) / ms_per_day);
};
