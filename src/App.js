import React, { Component } from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Ragister/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';



    const returnClarifaiRequestOptions = (imageUrl)=>{
    
    // PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '3b3f0c88b8654208a58eff2fb7cdba82';
   
    // Since you're making inferences outside your app's scope
    const USER_ID = 'ronmoyal';       
    const APP_ID = 'FaceDetection';
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    return requestOptions;
  }
 

class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl: '',
      box:{},
      route:'signIn',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox=(box)=>
  {
    this.setState({box: box})
  }

    onInputChange = (event) =>{
      this.setState({input: event.target.value})
    }

    onButtonSubmit = () => {
      this.setState({ imageUrl: this.state.input });
    
      fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, 
      returnClarifaiRequestOptions(this.state.input))
      .then(response => response.json())
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
    }

    onRouteChange = (route) =>{
      if(route==='signout'){
        this.setState({isSignedIn: false})
      }
      else if(route==='home'){
        this.setState({isSignedIn: true})
      }
      
      this.setState({route: route});
    }

    render() {
     const { isSignedIn,imageUrl,route,box } = this.state;
      return (
      <div className="App">
        <ParticlesBg type="cobweb" bg={true} color="#ffffff" />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route==='home'
        ? <div>
            <Logo/>
            <Rank/>
            <ImageLinkForm 
            onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        :(
          route==="signIn"
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        )
      }

      </div>
    );
  }
}

export default App;
