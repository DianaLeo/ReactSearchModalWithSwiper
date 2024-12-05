import { useMemo } from "react"
import {useGames} from "../../stores/useGames"
// import GameThumbnail from "../GameThumbnail"
import SwiperComponent from "../SwiperComponent/SwiperComponent"
import styles from "./styles.module.css"

const GamesSwiper = ({ games, title, offset, showAllItems = false }) => {
	const { areGamesLoading } = useGames()

	const noReturnComponent = useMemo(() => (
		<div className={styles.noReturnWrapper}>
			<p className={styles.noReturnDiscription}>
				Oops... Nothing was found for your request
			</p>
		</div>
	), [])

	if (areGamesLoading) {
		return (
			<div
				className={styles.swiperWrapper}
			>
				<div>loading</div>
			</div>
		)
	}

	if (games.length===0 || !games) {
		return noReturnComponent
	}

	let gamesStart = 0
	let gamesEnd = 20

	if (offset) {
		gamesStart = offset.amount
		gamesEnd += offset.amount
	}

	return (
		<section className={styles.wrapper}>
			<SwiperComponent
				slides={(showAllItems ? games : games.slice(gamesStart, gamesEnd))
					.map((game) => {
						return (
							// <GameThumbnail
							// 	key={`${game.displayName}-${game.imageFileName}-${game.reactKey}`}
							// 	game={game}
							// 	objectFitCover
							// />
                            <div className={styles.mySwiper}>
                                {game.displayName}
                            </div>
						)
					})}
				title={title}
				className={styles.swiperWrapper}
				slideClassName={styles.swiperSlide}
				showControlPanel
			/>
		</section>
	)
}

export default GamesSwiper
