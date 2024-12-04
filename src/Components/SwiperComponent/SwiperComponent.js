import { useMemo, useEffect, useRef, useState } from "react"
import { Swiper as SwiperContainer, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules"
import styles from "./styles.module.css"

const SwiperComponent = ({
	slides,
	spaceBetween = 10,
	slideClassName,
	className,
	showNavigation,
	showControlPanel = false,
	title,
	slidesPerView = "auto",
	enableAutoplay = false,
	autoplayDelay = 3000,
	showPagination = false,
	enableFade = false,
	bannerIndex,
}) => {
	const swiperRef = useRef()
	const [isAtStart, setIsAtStart] = useState(true)
	const [isAtEnd, setIsAtEnd] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [initialized, setInitialized] = useState(false)
	const onSlideChange = (swiper) => {
		setIsAtStart(swiper.isBeginning)
		setIsAtEnd(swiper.isEnd)
		bannerIndex && bannerIndex.setBannerIndex(swiper.realIndex)
	}

	useEffect(() => {
		bannerIndex && setCurrentIndex(bannerIndex.initialIndex)
		setInitialized(true)
	}, [bannerIndex])

	const controlPanel = useMemo(() => {
		if (!showControlPanel) return null
		return (
			<div className={styles.controlPanel}>
				<button
					className={`${styles.button} ${styles.prev}`}
					onClick={() => swiperRef.current?.slidePrev()}
					disabled={isAtStart}
				>
					prev
				</button>
				<button
					className={`${styles.button} ${styles.next}`}
					onClick={() => swiperRef.current?.slideNext()}
					disabled={isAtEnd}
				>
					next
				</button>
			</div>
		)
	}, [isAtStart, isAtEnd, showControlPanel])

	if (!initialized) {
		return null
	}

	return (
		<>
			{(title || showControlPanel) && (
				<div className={styles.swiperHeader}>
					<div className={styles.titleContianer}>{title}</div>
					{controlPanel}
				</div>
			)}

			<div className={`${styles.wrapper} ${className}`}>
				<SwiperContainer
					slidesPerView={slidesPerView}
					spaceBetween={spaceBetween}
					slidesOffsetAfter={0}
					className={styles.swiperContainer}
					navigation={showNavigation}
					modules={[Autoplay, Navigation, Pagination, EffectFade]}
					effect={enableFade ? "fade" : undefined}
					autoplay={
						enableAutoplay
							? {
									delay: autoplayDelay,
									disableOnInteraction: true,
							  }
							: false
					}
					pagination={
						showPagination
							? {
									clickable: true,
							  }
							: false
					}
					loop={showPagination}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper
					}}
					onSlideChange={onSlideChange}
					onReachBeginning={() => setIsAtStart(true)}
					onReachEnd={() => setIsAtEnd(true)}
					onFromEdge={() => {
						setIsAtStart(false)
						setIsAtEnd(false)
					}}
					initialSlide={currentIndex}
				>
					{slides.map((slide, index) => {
						return (
							<SwiperSlide
								className={`
									${styles.swiperSlide}
									${slideClassName},
								`}
								key={index}
							>
								{slide}
							</SwiperSlide>
						)
					})}
				</SwiperContainer>
			</div>
		</>
	)
}

export default SwiperComponent
