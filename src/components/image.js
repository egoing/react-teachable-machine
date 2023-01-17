import React, {useEffect, useState} from 'react';
import * as tmImage from '@teachablemachine/image';
const Image = ({model_url, onPredict, preview=true, size=200}) => {
    const [prediction, setPrediction] = useState(null);
    const previewRef = React.useRef();
    const requestRef = React.useRef()
    async function init() {
        const modelURL = model_url + "model.json";
        const metadataURL = model_url + "metadata.json";
        const model = await tmImage.load(modelURL, metadataURL);
        const flip = true; // whether to flip the webcam
        const webcam = new tmImage.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        requestRef.current = window.requestAnimationFrame(loop); 
        if(preview){
            previewRef.current.replaceChildren(webcam.canvas);
        } 
        async function loop() {
            if(webcam === null) {
            }else {
                webcam.update(); // update the webcam frame
                await predict();
            }
            requestRef.current = window.requestAnimationFrame(loop);
        }
        async function predict() {
            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(webcam.canvas);
            setPrediction(prediction);
            onPredict(prediction);
        }
    }
    useEffect(()=>{
        init();
        return ()=>cancelAnimationFrame(requestRef.current);
    }, [model_url])
    let label = [];
    if(preview && prediction){
        label = prediction.map((p,i)=><tr key={i}><td>{p.className}</td><td>{p.probability.toFixed(2)}</td></tr>);
    }
return(
    <div>
        <table id="label-container">
            <thead>
                <tr>
                    <td>class name</td><td>probability</td>
                </tr>
            </thead>
            <tbody>
                {label}
            </tbody>
        </table>
        <div id="webcam-container" ref={previewRef} />
    </div>
  );
};
export default Image;
