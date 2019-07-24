
import LinearGradient,{ LinearGradientProps } from 'react-native-linear-gradient'

const React = require('react')
const { Animated } = require('react-native')
const { interpolateRgb, interpolate } = require('d3-interpolate')

interface AnimatedGradientProps extends LinearGradientProps {
    duration?: Number;
}

class GradientView extends React.Component<AnimatedGradientProps>{
    render () {
        let colors = []
        let locations = []
        for (let prop of Object.keys(this.props)) {
            let colorIdx = prop.match(/^__animatedValue_colorInterpolate__(\d+)$/)
            if (colorIdx) {
                colors[colorIdx[1]] = this.props[prop]
                delete this.props[prop]
            }
            
            let location = prop.match(/^__animatedValue_locationInterpolate__(\d+)$/)
            if (location) {
                locations[location[1]] = this.props[prop]
                delete this.props[prop]
            }
        }

        return (<LinearGradient
            {...this.props}
            colors={colors}
            locations={locations}
        />)
    }
}
const AnimatedGradientView = Animated.createAnimatedComponent(GradientView)

export default class Lingradient extends React.Component<AnimatedGradientProps>{
    state = {
        animatedValue: null,
        startColors: null,
        endColors: null,

        startLocations: null,
        endLocations: null,
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
        let startLocations = []
        let endLocations = []

        if (this.state.startColors) {
            for (let idx in this.state.startColors) {
                startColors.push(
                    interpolateRgb(this.state.startColors[idx], this.state.endColors[idx])(this.currentAnimatedValue)
                )
                startLocations.push(
                    interpolate(this.state.startLocations[idx], this.state.endLocations[idx])(this.currentAnimatedValue)
                )

                endColors.push(nextProps.colors[idx])
                endLocations.push(nextProps.locations[idx])
            }
        } else {
            for (let idx in props.colors) {
                startColors.push(props.colors[idx])
                endColors.push(props.colors[idx])

                startLocations.push(props.locations[idx])
                endLocations.push(props.locations[idx])
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

            startLocations,
            endLocations,
        }
    }

    preventUpdate = false
    componentDidUpdate(prevProps){
        if (this.preventUpdate) {
            this.preventUpdate = false
        }else{
            this.preventUpdate = true
            this.setState(
                this.newState(prevProps, this.props)
            )
        }
    }

    render(){
        let { startColors, endColors, animatedValue, startLocations, endLocations } = this.state
        let animatedColors = {}

        for (let idx in startColors) {
            let colorInterpolate = animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [startColors[idx], endColors[idx]]
            })
            animatedColors['__animatedValue_colorInterpolate__'+idx] = colorInterpolate

            let locationInterpolate = animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [startLocations[idx], endLocations[idx]]
            })
            animatedColors['__animatedValue_locationInterpolate__'+idx] = locationInterpolate
        }
  
        return (<AnimatedGradientView {...this.props} {...animatedColors} />)
    }
}