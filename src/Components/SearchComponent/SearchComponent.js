import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useFilterStore } from '../../stores/useFilterStore';
import { useGames } from '../../stores/useGames';
import styles from "./styles.module.css"
import GamesSwiper from '../GamesSwiper/GamesSwiper';

const SearchComponent = () => {
    const [ input, setInput ] = useState("")

    return (
        <div className={styles.container}>
			<input
				type="search"
				className={styles.searchInput}
				id="searchInput"
				value={input}
				placeholder="Search games"
				onChange={(e)=>setInput(e.currentTarget.value)}
			/>
            <Swiper navigation={true} modules={[Navigation]} className={styles.mySwiper}>
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SearchComponent;