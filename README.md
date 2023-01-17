This is a React component that helps you make predictions using the Google [teachable machine](https://teachablemachine.withgoogle.com/) model. For instructions on how to use the teachable machine, please refer to the introductory machine learning class below. https://opentutorials.org/module/4916/28897

# Installation

`npm install react-teachable-machine`

# Example

```jsx
import {ImageModel} from 'react-teachable-machine';

function App() {
  return (
    <div className="App">
      Hello React Teachable machine
      <ImageModel 
        preview={false}
        size={200}
        onPredict={(prediction)=>{
          console.log(prediction);
        }} 
        model_url="https://teachablemachine.withgoogle.com/models/C4AwVVXHM/">hi</ImageModel>
    </div>
  );
}
export default App;
```

# Props

|name|type|description|
|--|--|--|
|model_url|string|URL of the model|
|preview|boolean|Choose whether to show preview.|
|size|int|Set preview width, height|
|onPredct|function|As an event for prediction, the event is triggered by requestAnimationFrame|