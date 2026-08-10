declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

// Cообщаeт компилятору: «Считай любой файл, заканчивающийся на .svg или .png,
// валидным модулем, из которого по умолчанию импортируется содержимое с типом any».
