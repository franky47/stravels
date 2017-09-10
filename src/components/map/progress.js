// Structure
import React from 'react'
import { View } from 'react-native'

// Styles
import { getColorForIndex } from '@stravels/engine/map'
import styles from './progress.styles'

const Segment = ({ color, length, border }) => {
  const style = {
    backgroundColor: color,
    flex: length,
    borderRadius: border ? 4 : 0,
    marginHorizontal: border ? 1 : 0
  }
  return <View style={style} />
}

export default function ProgressIndicator ({ lengths, index }) {
  const sections = lengths.map((length, i) => {
    const color = (i === index || index === undefined) ? getColorForIndex(i) : '#CFD8DC'
    const border = index !== undefined
    return <Segment color={color} key={`progress-${i}`} length={length} border={border} />
  })
  return (
    <View style={styles.mainContainer}>
      { sections }
    </View>
  )
}
