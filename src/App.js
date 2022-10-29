import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Slider from "./components/slider";
import { MOVIE_API } from "./config";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(!movies.length);
    const [page, setPage] = useState(1);

    /*
      [ ] Fetch next page
      [ ] Fix control keys
    */

    const handleEndReached = () => {
        setIsLoading(true);
        if (page < 20) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        const loadMovies = () => {
            axios.get(MOVIE_API + page).then(({ data }) => {
                setMovies([...movies, ...data.results]);
                setIsLoading(false);
            });
        };

        if (!movies.length) {
            loadMovies();
        } else {
            if (isLoading) {
                loadMovies();
            }
        }
    }, [page]);

    return (
        <Slider
            title={"POPULAR MOVIES"}
            more_items_text={"See All"}
            more_items_url={"#see-all"}
            movies={movies}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            handleEndReached={handleEndReached}
        />
    );
}

export default App;
