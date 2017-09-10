import * as transforms from '@stravels/transforms/activities'

describe('filterActivities', () => {
})

describe('groupByMonth', () => {
})

describe('getOldestUnixDate', () => {
})

describe('getNewestUnixDate', () => {
})

describe('getNormalizedDistances', () => {
  test('no args = empty array', () => {
    const actual = transforms.normalizeDistances()
    const expected = []
    expect(actual).toEqual(expected)
  })
  test('it should return the same number of entries', () => {
    const mock = [
      { distance: 1.0 },
      { distance: 2.0 },
      { distance: 3.0 }
    ]
    const normalized = transforms.normalizeDistances(mock)
    expect(normalized).toHaveLength(3)
  })
  test('all normalized distances are within [0;1]', () => {
    const mock = [
      { distance: 1.0 },
      { distance: 2.0 },
      { distance: 3.0 }
    ]
    const normalized = transforms.normalizeDistances(mock)
    for (const n of normalized) {
      expect(n).toBeGreaterThanOrEqual(0.0)
      expect(n).toBeLessThanOrEqual(1.0)
    }
  })
  test('sum of entries should be 1.0', () => {
    const mock = [
      { distance: 1.0 },
      { distance: 2.0 },
      { distance: 3.0 }
    ]
    const normalized = transforms.normalizeDistances(mock)
    const actual = normalized.reduce((sum, d) => sum + d, 0.0)
    const expected = 1.0
    expect(actual).toEqual(expected)
  })
})
