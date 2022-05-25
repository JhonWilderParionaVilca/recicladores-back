export const parseStringAsArray = (arrayString: string) =>
  arrayString.split(",").map((str) => str.trim().toLowerCase());
