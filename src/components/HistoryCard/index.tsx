import React from 'react';

import * as S from './styles';

interface HistoryProps {
	title: string
	amount: string
	color: string
}

export const HistoryCard: React.FC<HistoryProps> = (props) => {
	return (
		<S.Container color={props.color}>
			<S.Title>
				{props.title}
			</S.Title>
			<S.Amount>
				{props.amount}
			</S.Amount>
		</S.Container>
	);
}