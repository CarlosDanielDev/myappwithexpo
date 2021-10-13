import React from 'react';
import { categories } from '../../utils/categories';

import * as S from './styles';


export type TransactionPropsCard = {
	transactionType: 'up' | 'down'
	name: string
	amount: string
	category: string
	date: string
}

interface TransactionCardProps {
	data: TransactionPropsCard
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ data }) => {
	const category = categories.find(item => item.key === data.category);
	return (
		<S.Container>
			<S.Title>
				{data?.name}
			</S.Title>
			<S.Amount type={data.transactionType}>
				{data?.transactionType === 'down' && '- '}
				{data?.amount}
			</S.Amount>
			<S.Footer>
				<S.Category>
					<S.Icon name={category?.icon}/>
					<S.CategoryName>
						{category?.name}
					</S.CategoryName>
				</S.Category>
				<S.Date>
					{data?.date}
				</S.Date>
			</S.Footer>
		</S.Container>
	);
}
