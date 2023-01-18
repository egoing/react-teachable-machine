import React, {useEffect, useState} from 'react';
import * as tmImage from '@teachablemachine/image';
const Image = ({model_url, onPredict, preview=true, size=200, info=true, interval=null}) => {
    const [prediction, setPrediction] = useState(null);
    const previewRef = React.useRef();
    const requestRef = React.useRef();
    const intervalRef = React.useRef();
    async function init() {
        const modelURL = model_url + "model.json";
        const metadataURL = model_url + "metadata.json";
        const model = await tmImage.load(modelURL, metadataURL);
        const flip = true; // whether to flip the webcam
        const webcam = new tmImage.Webcam(size, size, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        if(interval===null){
            requestRef.current = window.requestAnimationFrame(loop); 
        } else {
            intervalRef.current = setTimeout(loop, interval);
        }
        if(preview){
            previewRef.current.replaceChildren(webcam.canvas);
        }     
        async function loop() {
            if(webcam === null) {
            }else {
                webcam.update(); // update the webcam frame
                await predict();
            }
            if(interval === null){
                requestRef.current = window.requestAnimationFrame(loop);
            } else {
                intervalRef.current = setTimeout(loop, interval);
            }
        }
        async function predict() {
            // predict can take in an image, video or canvas html element
            const prediction = await model.predict(webcam.canvas);
            setPrediction(prediction);
            if(onPredict){  
                onPredict(prediction);
            }
        }
    }
    useEffect(()=>{
        init();
        return ()=>{
            if(interval === null){
                cancelAnimationFrame(requestRef.current);
            } else {
                clearTimeout(intervalRef.current);
            }
            document.querySelector('#webcam-container').firstChild?.remove();
        }
    }, [model_url])
    let label = [];
    if(info && prediction){
        label = <table id="label-container">
            <thead>
                <tr>
                    <td>class name</td><td>probability</td>
                </tr>
            </thead>
            <tbody>
                {prediction.map((p,i)=><tr key={i}><td>{p.className}</td><td>{p.probability.toFixed(2)}</td></tr>)}
            </tbody>
        </table>
    }
return(
    <div>
        {label}
        <div id="webcam-container" ref={previewRef} />
    </div>
  );
};
export default Image;
