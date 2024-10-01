module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/src/tests/**/*.ts", // Ajusta para incluir qualquer arquivo .ts na pasta src/tests
    "**/?(*.)+(spec|test).ts", // Inclui todos arquivos terminando com .spec.ts ou .test.ts
  ],
  moduleFileExtensions: ["ts", "js"],
  verbose: true,
};
