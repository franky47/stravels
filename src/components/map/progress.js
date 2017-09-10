// Structure
import React from 'react'
import { View } from 'react-native'

// Styles
import { getColorForIndex } from '@stravels/engine/map'
import styles from './progress.styles'

const Segment = ({ color }) => {
  const style = {
    backgroundColor: color
  }
  return <View style={[ styles.segment, style ]} />
}

export default function ProgressIndicator ({ length, index }) {
  const sections = []
  for (let i = 0; i < length; i++) {
    const color = i === index ? getColorForIndex(i) : '#CFD8DC'
    sections.push(<Segment color={color} key={`progress-${i}`} />)
  }
  return (
    <View style={styles.mainContainer}>
      { sections }
    </View>
  )
}
