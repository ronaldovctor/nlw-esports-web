import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios'
import { Check, GameController } from 'phosphor-react'
import React, { FormEvent, useEffect, useState } from 'react'
import Input from './form/Input'

type Game = {
	id: string
	title: string
}

function CreateAdModal() {
	const [games, setGames] = useState<Game[]>([])
	const [weekDays, setWeekDays] = useState<string[]>(['0'])
	const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>()

	function handleSubmit(event: FormEvent) {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement)
		const data = Object.fromEntries(formData)
		console.log(useVoiceChannel)
	}

	useEffect(() => {
		axios('http://localhost:3333/games').then((response) => setGames(response.data))
	}, [])

	return (
		<Dialog.Portal>
			<Dialog.Overlay className='bg-black/60 inset-0 fixed' />
			<Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] shadow-lg shadow-black/25'>
				<Dialog.Title className='text-3xl text-white font-black'>
					Publique um anúncio
				</Dialog.Title>
				<form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-2'>
						<label htmlFor='game' className='font-semibold'>
							Qual o game?
						</label>
						<select
							id='game'
							name='game'
							placeholder='Selecione o game que deseja jogar'
							className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
							defaultValue={''}
						>
							<option disabled value='' className='text-zinc-500'>
								Selecione o game que deseja jogar
							</option>
							{games.map((game) => (
								<option key={game.id} value={game.id}>
									{game.title}
								</option>
							))}
						</select>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='name' className='font-semibold'>
							Seu nome (ou nickname)
						</label>
						<Input
							id='name'
							name='name'
							placeholder='Como te chamam dentro do game?'
						/>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='yearsPlaying' className='font-semibold'>
								Joga a quantos anos?
							</label>
							<Input
								type='number'
								id='yearsPlaying'
								name='yearsPlaying'
								placeholder='Tudo bem ser ZERO :)'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='discord' className='font-semibold'>
								Qual seu Discord?
							</label>
							<Input
								type='text'
								id='discord'
								name='discord'
								placeholder='usuario#0000'
							/>
						</div>
					</div>
					<div className='flex gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='weekDays' className='font-semibold'>
								Quando costuma jogar?
							</label>
							<ToggleGroup.Root
								type='multiple'
								className='grid grid-cols-4 gap-2'
								onValueChange={setWeekDays}
								value={weekDays}
							>
								<ToggleGroup.Item
									value='0'
									title='Domingo'
									className={`w-8 h-8 rounded ${
										weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
									}`}
								>
									D
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='1'
									title='Segunda'
									className={`w-8 h-8 rounded ${
										weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
									} `}
								>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='2'
									title='Terça'
									className={`w-8 h-8 rounded ${
										weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
									} `}
								>
									T
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='3'
									title='Quarta'
									className={`w-8 h-8 rounded ${
										weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
									} `}
								>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='4'
									title='Quinta'
									className={`w-8 h-8 rounded ${
										weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
									} `}
								>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='5'
									title='Sexta'
									className={`w-8 h-8 rounded ${
										weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
									} `}
								>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='6'
									title='Sábado'
									className={`w-8 h-8 rounded ${
										weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
									} `}
								>
									S
								</ToggleGroup.Item>
							</ToggleGroup.Root>
						</div>
						<div className='flex flex-col gap-2 flex-1'>
							<label htmlFor='hoursStart' className='font-semibold'>
								Qual horário do dia?
							</label>
							<div className='flex flex-row gap-2'>
								<Input
									type='time'
									id='hoursStart'
									name='hoursStart'
									placeholder='De'
								/>
								<Input
									type='time'
									id='hoursEnd'
									name='hoursEnd'
									placeholder='Até'
								/>
							</div>
						</div>
					</div>
					<label className='mt-2 flex gap-2 text-sm items-center'>
						<Checkbox.Root
							className='w-6 h-6 p-1 rounded bg-zinc-900'
							checked={useVoiceChannel}
							onCheckedChange={(checked) => {
								checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false)
							}}
						>
							<Checkbox.Indicator>
								<Check className='w-4 h-4 text-emerald-400' />
							</Checkbox.Indicator>
						</Checkbox.Root>
						<span>Costumo me conectar ao chat de voz</span>
					</label>
					<footer className='mt-4 flex justify-end gap-4'>
						<Dialog.Close
							type='button'
							className='bg-zinc-500 px-5 h-12 rounded-md
               font-semibold hover:bg-zinc-600'
						>
							{' '}
							Cancelar
						</Dialog.Close>
						<button
							type='submit'
							className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
						>
							<GameController className='w-6 h-6' />
							Encontrar duo
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	)
}

export default CreateAdModal
