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
    return (<Lingradient
        colors={[ this.state.color1, this.state.color2 ]}
        locations={[0, 1]}
        style={{ width: 300, height: 300 }}
        useAngle={true}
        angle={0}
    />)
}
```