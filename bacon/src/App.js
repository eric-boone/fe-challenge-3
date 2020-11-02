import { useEffect, useState } from "react";

import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
      headers: {
        Authorization: "Api-Key q3MNxtfep8Gt",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRestaurants(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <p>working</p>
        {console.log(restaurants)}
      </div>
    );
  }
}

export default App;
