import fetch from 'node-fetch';

const handleImage = (req, res) => {
  const { imageUrl } = req.body;
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": process.env.USER_ID,
      "app_id": process.env.APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": imageUrl
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + process.env.PAT
    },
    body: raw
  };

  fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => console.log(err));
};

export default {handleImage};
