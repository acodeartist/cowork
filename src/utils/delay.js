export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const randomDelay = (min = 1000, max = 3000) =>
  delay(min + Math.random() * (max - min));
