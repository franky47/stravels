import * as stats from '@stravels/engine/stats'

describe('Stats', () => {
  test('it should work with an empty list', () => {
    const actual = stats.computeStats()
    const expected = {
      distance: 0.0,
      total_elevation_gain: 0.0,
      moving_time: 0.0,
      kilojoules: 0.0,
      achievement_count: 0.0,
      max_speed: 0.0,
      elev_high: 0.0,
      elev_low: 0.0,
      average_watts: 0.0,
      average_speed: 0.0,
      average_distance: 0.0,
      average_moving_time: 0.0
    }
    expect(actual).toEqual(expected)
  })
  test('it should work with a single entry', () => {
    const activity = {
      distance: 42.0,
      total_elevation_gain: 200.0,
      moving_time: 12.0,
      kilojoules: 120.0,
      achievement_count: 1,
      max_speed: 42.0,
      elev_high: 300.0,
      elev_low: 100.0,
      average_watts: 100.0,
      average_speed: 12.0
    }
    const actual = stats.computeStats([activity])
    const expected = {
      distance: 42.0,
      total_elevation_gain: 200.0,
      moving_time: 12.0,
      kilojoules: 120.0,
      achievement_count: 1,
      max_speed: 42.0,
      elev_high: 300.0,
      elev_low: 100.0,
      average_watts: 100.0,
      average_speed: 12.0,
      average_distance: 42.0,
      average_moving_time: 12.0
    }
    expect(actual).toEqual(expected)
  })
  test('it should ignore missing keys', () => {
    const actual = stats.computeStats([{ foo: 'bar' }])
    const expected = {
      distance: 0.0,
      total_elevation_gain: 0.0,
      moving_time: 0.0,
      kilojoules: 0.0,
      achievement_count: 0.0,
      max_speed: 0.0,
      elev_high: 0.0,
      elev_low: 0.0,
      average_watts: 0.0,
      average_speed: 0.0,
      average_distance: 0.0,
      average_moving_time: 0.0
    }
    expect(actual).toEqual(expected)
  })
  test('sum with complete elements', () => {
    const input = [
      { distance: 1.0 },
      { distance: 1.0 },
      { distance: 1.0 }
    ]
    const actual = stats.computeStats(input).distance
    const expected = 3.0
    expect(actual).toEqual(expected)
  })
  test('sum with incomplete elements', () => {
    const input = [
      { distance: 1.0 },
      { foo: 1.0 },
      { distance: 1.0 }
    ]
    const actual = stats.computeStats(input).distance
    const expected = 2.0
    expect(actual).toEqual(expected)
  })
  test('max with complete elements', () => {
    const input = [
      { max_speed: 1.0 },
      { max_speed: 3.0 },
      { max_speed: 2.0 }
    ]
    const actual = stats.computeStats(input).max_speed
    const expected = 3.0
    expect(actual).toEqual(expected)
  })
  test('max with incomplete elements', () => {
    const input = [
      { max_speed: 1.0 },
      { foo: 3.0 },
      { max_speed: 2.0 }
    ]
    const actual = stats.computeStats(input).max_speed
    const expected = 2.0
    expect(actual).toEqual(expected)
  })
  test('min with complete elements', () => {
    const input = [
      { elev_low: 1.0 },
      { elev_low: 3.0 },
      { elev_low: 2.0 }
    ]
    const actual = stats.computeStats(input).elev_low
    const expected = 1.0
    expect(actual).toEqual(expected)
  })
  test('min with incomplete elements', () => {
    const input = [
      { elev_low: 1.0 },
      { foo: 3.0 },
      { elev_low: 2.0 }
    ]
    const actual = stats.computeStats(input).elev_low
    const expected = 1.0
    expect(actual).toEqual(expected)
  })
  test('avg with complete elements', () => {
    const input = [
      { average_speed: 1.0 },
      { average_speed: 3.0 },
      { average_speed: 2.0 }
    ]
    const actual = stats.computeStats(input).average_speed
    const expected = 2.0
    expect(actual).toEqual(expected)
  })
  test('avg with incomplete elements should not skip missing items', () => {
    const input = [
      { average_speed: 1.0 },
      { foo: 3.0 },
      { average_speed: 2.0 }
    ]
    const actual = stats.computeStats(input).average_speed
    const expected = 1.0
    expect(actual).toEqual(expected)
  })
})

describe('Carbon Score', () => {
  test('should be null with default stats', () => {
    const score = stats.computeCarbonScore(stats.computeStats())
    expect(score).toEqual(0.0)
  })
})
