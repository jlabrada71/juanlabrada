/** @returns {Promise<import('jest').Config>} */
export default async () => {
  return {
    verbose: true,
    "moduleNameMapper": {
      "^@/lib(.*)$": "<rootDir>/lib$1",
    } 
  }
}