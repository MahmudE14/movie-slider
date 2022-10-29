import { IMG_BASE_URL } from "../../config";
import Item from "../item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import "./styles/slider.scss";
import { useRef } from "react";

const getReleaseYear = (first_air_date = "") => {
    if (!first_air_date) {
        return "";
    }

    const date_arr = first_air_date.split("-");
    return date_arr[0];
};

export default function Slider({
    title = "",
    more_items_text = "",
    more_items_url = "#0",
    movies = [],
    isLoading,
    handleEndReached,
}) {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <div className="slider">
            <div className="heading">
                <h4 className="title">{title}</h4>
                <a href={more_items_url} className="more-items">
                    {more_items_text}
                </a>
            </div>

            <div className="movie-continer">
                <Swiper
                    spaceBetween={0}
                    slidesPerView="auto"
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl =
                            navigationPrevRef.current;
                        swiper.params.navigation.nextEl =
                            navigationNextRef.current;
                    }}
                    mousewheel={{
                        releaseOnEdges: true,
                    }}
                    modules={[Navigation, Mousewheel]}
                    onReachEnd={() => handleEndReached()}
                >
                    {typeof movies?.map === "function" &&
                        movies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <Item
                                    title={
                                        movie.name ||
                                        movie.original_name ||
                                        movie.title ||
                                        movie.original_title
                                    }
                                    release_year={getReleaseYear(
                                        movie.release_date ||
                                            movie.first_air_date
                                    )}
                                    thumbnail={
                                        movie.poster_path &&
                                        `${IMG_BASE_URL}/${movie.poster_path}`
                                    }
                                    genres={movie.genre_ids}
                                />
                            </SwiperSlide>
                        ))}

                    {typeof movies?.map === "function" && (
                        <div id="swiper-button-prev" className="prev-arrow" ref={navigationPrevRef} />
                    )}

                    {typeof movies?.map === "function" && (
                        <div id="swiper-button-next" className="next-arrow" ref={navigationNextRef} />
                    )}

                    {!!isLoading && (
                        <SwiperSlide>
                            <Item
                                isSpinner
                                style={{
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
}
