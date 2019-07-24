# Installation

```js
npm install react-native-linear-gradient --save
react-native link react-native-linear-gradient

npm install react-native-lingradient
```

# Usage
```js 
import Lingradient from 'react-native-lingradient'

...
render(){
    // if state.color1 or state.color2 changed, Lingradient will change with animation
    return (<Lingradient
        colors={[ this.state.color1, this.state.color2 ]}
        locations={[0, 1]}
        style={{ width: 300, height: 300 }}
        
        start={{x: 0.0, y: 0}}
        end={{x: 1, y: 0}}

        duration={1000}
    />)
}
```
