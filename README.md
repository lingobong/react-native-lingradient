# Installation

```js
npm install react-native-linear-gradient --save
react-native link react-native-linear-gradient

npm install react-native-lingradient
```

# Usage
```js 
import Lingradient from 'react-native-lingradient'

export default class Index extends React.Component {
    constructor(p) {
        super(p)
        this.state = {
            title:'1단계',
            locations: [ 0, 0.33, 0.33, 1 ],
            colors: ['#FE608B','#DB9BE8','#F4F4F4','#F4F4F4'],
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
            title:'2단계',
            locations: [ 0, 0.66, 0.66, 1 ],
            colors: ['rgb(254,185,143)','rgb(240,97,95)','#F4F4F4','#F4F4F4'],
            })
        },2000)
        setTimeout(()=>{
            this.setState({
            title:'3단계',
            locations: [ 0, 1, 1, 1 ],
            colors: ['rgb(109,96,210)','rgb(213,144,233)','#F4F4F4','#F4F4F4'],
            })
        },4000)
    }
    render() {
        return (<SafeAreaView style={{ flex: 1, justifyContent:'center', }}>
            <View style={{ alignItems:'center', }}>
                <Text>{this.state.title}</Text>
            </View>
            <View style={{ height: 10 }}>
                <Lingradient
                colors={this.state.colors}
                locations={this.state.locations}
                style={{
                flex: 1
                }}
                start={{x: 0.0, y: 0}}
                end={{x: 1, y: 0}}
                />
            </View>
        </SafeAreaView>)
    }
}
```

<img src="https://github.com/lingobong/react-native-lingradient/blob/master/animation.gif" />
