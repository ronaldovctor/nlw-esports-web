import './styles/main.css'
import logo from './assets/logo.svg'
import GameBanner from './components/GameBanner'
import CreateAdBanner from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { DiscordLogo, GameController } from 'phosphor-react'
import Input from './components/form/Input'
import CreateAdModal from './components/CreateAdModal'

type Game = {
	id: string
	title: string
	bannerUrl: string
	_count: {
		ads: number
	}
}

function App() {
	const [games, setGames] = useState<Game[]>([])

	useEffect(() => {
		fetch('http://localhost:3333/games')
			.then((response) => response.json())
			.then((json) => setGames(json))
	}, [])

	return (
		<div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
			<img src={logo} alt='' />
			<h1 className='text-6xl text-white font-black mt-20'>
				Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span>{' '}
				está aqui.
			</h1>
			<div className='grid grid-cols-6 gap-6 mt-16'>
				{games &&
					games.map((game) => (
						<GameBanner
							key={game.id}
							title={game.title}
							bannerUrl={game.bannerUrl}
							adsCount={game._count.ads}
						/>
					))}
			</div>
			<Dialog.Root>
				<CreateAdBanner />
				<CreateAdModal />
			</Dialog.Root>
		</div>
	)
}

export default App
