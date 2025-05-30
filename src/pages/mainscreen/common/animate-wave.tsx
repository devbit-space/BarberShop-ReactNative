import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { h, w } from '../../../theme/services';

const NUM_BARS = 30;

const AnimatedWave = ({ isPlaying }: { isPlaying: boolean }) => {
  const animatedValues = useRef(Array(NUM_BARS).fill(0).map(() => new Animated.Value(0))).current;

  const animations = animatedValues.map(value => {
    return Animated.sequence([
      Animated.timing(value, {
        toValue: Math.random(),
        duration: 100 + Math.random() * 200,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: Math.random(),
        duration: 100 + Math.random() * 200,
        useNativeDriver: false,
      })
    ])
  })

  const animationLoop = Animated.loop(Animated.parallel(animations));

  useEffect(() => {
    animationLoop.start();
    return () => animationLoop.stop();
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      animationLoop.stop();
    } else {
      animationLoop.start();
    }
  }, [isPlaying]);

  return (
    <View style={styles.waveform}>
      {animatedValues.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            styles.waveBar,
            {
              height: value.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 40],
              })
            }
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    height: h(1),
    marginBottom: h(2),
  },
  waveBar: {
    width: w(1.3),
    backgroundColor: '#D0D0D0',
    marginHorizontal: w(0.6),
  }
})

export { AnimatedWave }
