import { useDeferredValue, useMemo } from "react"
import { useFilterStore } from "./useFilterStore"

const gameProvider = {
    id: 1,
    name: "Best Games Inc.",
    logo: "best-games-logo.png",
}

const games = [
    {
        id: 101,
        displayName: "Mega Spin Deluxe",
        imageFileName: "mega-spin-deluxe.jpg",
        gameProvider,
        internalGameCategories: [1, 2, 3], // e.g., Slots and Popular
        identifier: "mega-spin-deluxe",
    },
    {
        id: 102,
        displayName: "Adventure Quest",
        imageFileName: "adventure-quest.jpg",
        gameProvider,
        internalGameCategories: [2, 3], // e.g., Popular and Adventure
        identifier: "adventure-quest",
    },
    {
        id: 103,
        displayName: "Lucky Sevens",
        imageFileName: "lucky-sevens.jpg",
        gameProvider,
        internalGameCategories: [1, 3], // e.g., Slots
        identifier: "lucky-sevens",
    },
]

const processGamesData = (games) => {
	const processedData = games.reduce(
		(acc, curr, index) => {
			if (Array.isArray(curr.internalGameCategories)) {
				curr.internalGameCategories.forEach((cat) => {
					if (cat) {
						acc[cat] = {
							games: acc[cat]?.games
								? [
										...acc[cat].games,
										{ ...curr, reactKey: index },
								  ]
								: [{ ...curr, reactKey: index }],
						}
					}
				})
			}
			return acc
		},
		{},
	)

	// All Games category (with id === 0) will have all the games
	processedData["0"] = { games }

	return processedData
}

const filterGames = (
	processedGames,
	search,
	providers,
) => {
	if (!processedGames) return undefined

	const filtered = Object.entries(processedGames).reduce(
		(acc, curr) => {
			const gamesWithFilter = curr[1].games.filter(
				({ displayName, gameProvider }) => {
					if (providers.length)
						return (
							displayName
								.toLowerCase()
								.includes(search.toLowerCase()) &&
							providers.includes(gameProvider.id)
						)

					return displayName
						.toLowerCase()
						.includes(search.toLowerCase())
				},
			)

			if (gamesWithFilter.length) {
				acc[curr[0]] = {
					...curr[1],
					games: gamesWithFilter,
				}
			}
			return acc
		},
		{},
	)

	return filtered
}

export const useGames = () => {
	const { filter, globalFilter } = useFilterStore()
	// const { isLoggedIn } = usePlayerStore()
	// const { data: loggedInData, isLoading: loggedInLoading } =
	// 	useGetGames(isLoggedIn)
	// const { data: loggedOutData, isLoading: loggedOutLoading } =
	// 	useGetDefaultGames(!isLoggedIn)
    const isLoggedIn = true
    const loggedInData = games
    const loggedInLoading = false
    const loggedOutData = games
    const loggedOutLoading = false

	const deferredSearch = useDeferredValue(filter.search)
	const deferredGlobalSearch = useDeferredValue(globalFilter.search)

	const data = isLoggedIn ? loggedInData : loggedOutData

	const filteredGames = useMemo(() => {
		if (!data) {
			return undefined
		}
		return filterGames(
			processGamesData(data),
			deferredSearch,
			filter.providers,
		)
	}, [data, deferredSearch, filter.providers])

	const filteredAllGames = useMemo(() => {
		if (!data) return undefined
		if (!deferredGlobalSearch) return undefined

		return filterGames(
			processGamesData(data),
			deferredGlobalSearch,
			globalFilter.providers,
		)
	}, [data, deferredGlobalSearch, globalFilter.providers])

	return {
		allGames: data,
		areGamesLoading: isLoggedIn ? loggedInLoading : loggedOutLoading,
		filteredGames,
		filteredAllGames,
		providers: [gameProvider],
		processedAllGames: processGamesData(data),
	}
}
