import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useFilterStore } from '../../stores/useFilterStore';
import { useGames } from '../../stores/useGames';
import styles from "./styles.module.css"
import GamesSwiper from '../GamesSwiper/GamesSwiper';

const MINIMUM_SEARCH_LENGTH = 1

const TestSwiper = () => {
    const [ input, setInput ] = useState("")
    const { globalFilter, setGlobalFilter } = useFilterStore()
    const { filteredAllGames, processedAllGames } = useGames()


    console.log("rerender")

    useEffect(()=>{
		globalFilter.search && setGlobalFilter({
			...globalFilter,
			search: ""
		})
	},[])

    const onInputChange = (e)=>{
		const inputValue = e.currentTarget.value
		setInput(inputValue)
		if (inputValue.length >= MINIMUM_SEARCH_LENGTH || inputValue.length === 0) {
			setGlobalFilter({
				...globalFilter,
				search: inputValue,
			})
		}	
	}

    return (
        <div className={styles.container}>
			<div className={styles.searchForm}>
				<div className={styles.searchHeader}>
					<h3 className={styles.title}>
						Search
					</h3>
				</div>
				<div className={styles.searchRow}>
					<input
						type="search"
						className={styles.searchInput}
						id="searchInput"
						value={input}
						placeholder="Search games"
						onChange={onInputChange}
					/>
				</div>
			</div>
            {/* <Swiper navigation={true} modules={[Navigation]} className={styles.mySwiper}>
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper> */}

            {input && filteredAllGames ? (
				<GamesSwiper
					games = {filteredAllGames?.[0]?.games ?? []}
					title={<div>search result title</div>}
					showAllItems
                    className={styles.mySwiper}
				/>
			) : (
				<p className={styles.discription}>
					Start entering the game’s name
				</p>
			)}
            <GamesSwiper
                games = {processedAllGames?.[3]?.games ?? []}
                title={<div>test title</div>}
                className={styles.mySwiper}
            />
        </div>
    );
};

export default TestSwiper;