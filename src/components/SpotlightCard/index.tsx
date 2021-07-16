import React from 'react';
import * as S from './styles';

interface SpotlightProps {
	title: string
	amount: string
	lastTransaction: string
	type: 'up' | 'down' | 'total'
}

// Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)

export const SpotlightCard: React.FC<SpotlightProps> = ({
	amount, 
	title, 
	lastTransaction,
	type
}) => {
	const name = type !== 'total' ? `arrow-${type}-circle` : 'dollar-sign';

	return (
		<S.Container {...{type}} >
				<S.Header>
					<S.Title {...{type}}>
						{title}
					</S.Title>
					<S.Icon {...{type, name}}/>
				</S.Header>

				<S.Footer>
					<S.Amount {...{type}}>
						{amount}
					</S.Amount>
					<S.LastTransaction {...{type}}>
						{lastTransaction}
					</S.LastTransaction>
				</S.Footer>
		</S.Container>
	)
}