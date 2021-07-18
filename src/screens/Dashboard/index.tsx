import React from 'react';
import { SpotlightCard } from '../../components/SpotlightCard';
import {TransactionPropsCard, TransactionCard} from '../../components/TransactionCard';

import * as S from './styles';

export interface DataListProps extends TransactionPropsCard {
	id: string;
}

export const Dashboard: React.FC = () => {
	const data: DataListProps[] = [
		{
			id: '1',
			title: "Desenvolvimento de site" ,
			type: 'income',
			category: { 
				name: 'Vendas', 
				icon: 'dollar-sign' 
			},
			amount: "R$ 11.000,00",
			date: "15/07/2021"
		},
		{
			id: '2',
			title: "Almoço" ,
			type: 'outcome',
			category: { 
				name: 'Alimentação', 
				icon: 'coffee'
			},
			amount: "R$ 35,50",
			date: "14/07/2021"
		},
		{
			id: '3',
			title: "Aluguel" ,
			type: 'outcome',
			category: { 
				name: 'Casa', 
				icon: 'shopping-bag'
			},
			amount: "R$ 1.388,00",
			date: "15/07/2021"
		},
	]
	return (
		<S.Container>
			<S.Header>
				<S.UserWrapper>
					<S.UserInfo>
						<S.Photo source={{uri: 'https://avatars.githubusercontent.com/u/32473182?v=4'}}/>
						<S.User>
							<S.UserGreeting>
								Olá,
							</S.UserGreeting>
							<S.UserName>
								Carlos Daniel
							</S.UserName>
						</S.User>
					</S.UserInfo>
					<S.Icon name="power"/>
				</S.UserWrapper>
			</S.Header>
			
			<S.SpotlightCards>
				<SpotlightCard type="up" title="Entradas" amount="R$ 17.000,00" lastTransaction="Última transação em 16 de julho" />
				<SpotlightCard type="down" title="Saídas" amount="R$ 53,00" lastTransaction="Última saída dia 03 de junho" />
				<SpotlightCard type="total" title="Total" amount="R$ 16.947,00" lastTransaction="01 à 16 de junho" />
			</S.SpotlightCards>

			<S.Transactions>
				<S.Title>
					Listagem
				</S.Title>
				<S.TransactionList
					data={data}
					keyExtractor={(_item, index) => String(index)}
					renderItem={({item}) => (
						<TransactionCard 
							data={item}
						/>
					)}
				/>
			</S.Transactions>
		</S.Container>
	)
}