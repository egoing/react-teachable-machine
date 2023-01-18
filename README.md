# Introduce
This is a React component that helps you make predictions using the Google [teachable machine](https://teachablemachine.withgoogle.com/) model. 
# Tutorial
For instructions on how to use the teachable machine, please refer to the introductory machine learning class below. https://opentutorials.org/module/4916/28897

# Installation
`npm install react-teachable-machine`

# Example
```jsx
import React from "react";
import {ImageModel} from 'react-teachable-machine';
export default function App() {
  const [isDay, setIsDay] = React.useState(true);
  const [isNear, setIsNear] = React.useState(false);
  return (
    <div style={{
        backgroundColor:isDay ? 'white' : 'black',
        color:isDay ? 'black' : 'white',
        fontSize: isNear ? '1rem' : '4rem'
      }}>
        <h1>Hello React teachable machine</h1>
      <ImageModel 
        preview={false}
        size={200}
        interval={500}
        onPredict={(prediction)=>{
          setIsDay(prediction[0].probability > 0.5);
        }} 
        model_url="https://teachablemachine.withgoogle.com/models/qNic7uOOY/"></ImageModel>
      
      <ImageModel 
        preview={false}
        size={200}
        onPredict={(prediction)=>{
          setIsNear(prediction[0].probability > 0.5);
        }} 
        model_url="https://teachablemachine.withgoogle.com/models/jUuTCb6YD/"></ImageModel>
    </div>
  );
}

```

# Props
|name|type|description|
|--|--|--|
|model_url|string|URL of the model|
|preview|boolean|Choose whether to show preview.|
|size|int|Set preview width, height|
|info|boolean|Choose whether to show class name and probability information|
|interval|int|1000 : 1s, null : requestAnimationFrame|
|onPredct|function|As an event for prediction, the event is triggered by interval|