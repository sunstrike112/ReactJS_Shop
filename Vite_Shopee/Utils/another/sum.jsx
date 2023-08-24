export const sum = (...args) => args.reduce((a, b) => a + b, 0);

// Test inline scope
// if(import.meta.vitest) {
//   const { describe , expect, it} = import.meta.vitest;
//   describe('sum', () => {
//     it('should sum two numbers', () => {
//       expect(sum(1, 2)).toBe(3);
//     });
//   });
// }
