import {ImageModel} from './components/index';

function App() {
  return (
    <div className="App">
      <ImageModel 
        preview={true}
        size={200}
        onPredict={(prediction)=>{
          console.log(prediction);
        }} 
        model_url="https://teachablemachine.withgoogle.com/models/C4AwVVXHM/"></ImageModel>
    </div>
  );
}
export default App;
