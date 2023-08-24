import { describe, expect, it } from 'vitest';
import { sum } from './sum.jsx';

describe('sum', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(4, 6)).toBe(10);
  });
});
