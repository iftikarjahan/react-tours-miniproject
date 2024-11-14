const url = "https://www.course-api.com/react-tours-project";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Tours from "./components/Tours";

const App = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Errow!! status: ${response.status}`);
      }
      const data = await response.json();

      setTours(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  const removeTour = (id) => {
    const removedData = tours.filter((tour) => tour.id !== id);
    setTours(removedData);
  };

  // Note that hooks must be called before any return statements in the component
  useEffect(() => {
    fetchData(url);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={()=>fetchData(url)}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  // Now the tours state needs to be passed to other components
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
