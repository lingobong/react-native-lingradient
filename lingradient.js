
import LinearGradient,{ LinearGradientProps } from 'react-native-linear-gradient'

const React = require('react')
const { Animated } = require('react-native')
const { interpolateRgb } = require('d3-interpolate')

interface AnimatedGradientProps extends LinearGradientProps {
    duration?: Number;
}

class GradientView extends React.Component<AnimatedGradientProps>{
    render () {
        let colors = []
        for (let prop of Object.keys(this.props)) {
            let colorIdx = prop.match(/^__animatedValue_interpolate__(\d+)$/)
            if (colorIdx) {
                colors[colorIdx[1]] = this.props[prop]
            }
            delete this.props[prop]
        }

        return (<LinearGradient
            {...this.props}
            colors={colors}
        />)
    }
}
const AnimatedGradientView = Animated.createAnimatedComponent(GradientView)

export default class Lingradient extends React.Component<AnimatedGradientProps>{
    state = {
        animatedValue: null,
        startColors: null,
        endColors: null,
    }
    currentAnimatedValue = 0
    constructor(p){
        super(p)
        this.state = this.newState(this.props, this.props)
    }
    newState = (props, nextProps) => {
        let animatedValue = new Animated.Value(0)
        let startColors = []
        let endColors = []

        if (this.state.startColors) {
            for (let colorIdx in this.state.startColors) {
                startColors.push(
                    interpolateRgb(this.state.startColors[colorIdx], this.state.endColors[colorIdx])(this.currentAnimatedValue)
                )
                endColors.push(nextProps.colors[colorIdx])
            }
        } else {
            for (let colorIdx in props.colors) {
                startColors.push(props.colors[colorIdx])
                endColors.push(nextProps.colors[colorIdx])
            }
        }

        this.currentAnimatedValue = 0
        animatedValue.addListener(({value})=>this.currentAnimatedValue = value)
        
        Animated.timing(animatedValue, {
            duration: this.props.duration || 300,
            toValue: 1,
        }).start()
        return {
            animatedValue,
            startColors,
            endColors,
        }
    }

    preventUpdate = false
    componentDidUpdate(prevProps){
        if (this.preventUpdate) {
            this.preventUpdate = true
        }else{
            this.preventUpdate = true
            this.setState(
                this.newState(prevProps, this.props)
            )
        }
    }

    render(){
        let { startColors, endColors, animatedValue } = this.state
        let animatedColors = {}

        for (let colorIdx in startColors) {
            let interpolate = animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [startColors[colorIdx], endColors[colorIdx]]
            })
            animatedColors['__animatedValue_interpolate__'+colorIdx] = interpolate
        }
  
        return (<AnimatedGradientView {...this.props} {...animatedColors} />)
    }
}