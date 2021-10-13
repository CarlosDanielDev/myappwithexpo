import React, { useState, useEffect, useCallback } from 'react';
import { SpotlightCard } from '../../components/SpotlightCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TransactionPropsCard, TransactionCard} from '../../components/TransactionCard';

import * as S from './styles';
import { transactionKey } from '../../constants';
import { useFocusEffect } from '@react-navigation/core';
import { formatCurrency, formatDate, formatDateFriendly } from '../../utils/formatting';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionPropsCard {
	id: string;
}

type DefaultData = {
	amount: string
	lastTransaction: string
}

type HighLightDataProps = {
	entries: DefaultData
	expensive: DefaultData
	total: string
	interval: string
}

export const Dashboard: React.FC = () => {
	const [data, setData] = useState<DataListProps[]>([]);
	const [highLightData, setHighLightData] = useState<HighLightDataProps>({} as HighLightDataProps);
	const [isLoading, setIsLoading] = useState(true);
	const theme = useTheme()


	const getFormattedTimesStamp = (collection: DataListProps[], type: 'up' | 'down') => {
		return formatDateFriendly(new Date(Math.max.apply(Math, collection
		.filter((transaction) => transaction.transactionType === type)
		.map((transaction) => new Date(transaction.date).getTime()))))
	}

	const loadData = async (key: string) => {
		try {
			const data = await AsyncStorage.getItem(key);
			let entriesTotal: number = 0;
			let expensiveTotal: number = 0;
			
			const currentTransactions: DataListProps[] = data ? JSON.parse(data) : [] as DataListProps[];

			const transactionsFormatted: DataListProps[] = currentTransactions.map(
				(transaction: DataListProps) => {
					if(transaction.transactionType === 'up') {
						entriesTotal += Number(transaction.amount);
					} else {
						expensiveTotal += Number(transaction.amount);
					}

					const amount = formatCurrency(Number(transaction.amount));
					const dateFormatted = formatDate(new Date(transaction.date));
					return {
						...transaction,
						amount,
						date: dateFormatted,
						category: transaction.category,
					}

			});
			const lastTransactionEntries =  getFormattedTimesStamp(currentTransactions, 'up');
			const lastTransactionExpensive =  getFormattedTimesStamp(currentTransactions, 'down');
			const totalInterval = `01 à ${lastTransactionExpensive}`;

			setData(transactionsFormatted);
			setHighLightData({
				expensive: {
					amount: formatCurrency(expensiveTotal),
					lastTransaction: `Última saída dia ${lastTransactionExpensive}`
				},
				entries: {
					amount: formatCurrency(entriesTotal),
					lastTransaction: `Última transação em ${lastTransactionEntries}`
				},
				total: formatCurrency(Number(entriesTotal - expensiveTotal)),
				interval: totalInterval
			});
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadData(transactionKey);
		// Clean List
		// AsyncStorage.removeItem(transactionKey);
	}, []);

	useFocusEffect(useCallback(() => {
		loadData(transactionKey);
	}, []));

	if(isLoading) {
		return (
			<S.ContainerLoading>
				<ActivityIndicator color={theme.colors.primary} size="large"/>
			</S.ContainerLoading>
		)
	}
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
					<S.LogoutButton onPress={() => {}}>
						<S.Icon name="power"/>
					</S.LogoutButton>
				</S.UserWrapper>
			</S.Header>
			
			<S.SpotlightCards>
				<SpotlightCard 
					type="up" 
					title="Entradas" 
					amount={highLightData?.entries?.amount} 
					lastTransaction={highLightData?.entries?.lastTransaction}
				/>
				<SpotlightCard 
					type="down" 
					title="Saídas" 
					amount={highLightData?.expensive?.amount} 
					lastTransaction={highLightData?.expensive?.lastTransaction}
				/>
				<SpotlightCard 
					type="total" 
					title="Total" 
					amount={highLightData?.total} 
					lastTransaction={highLightData.interval}
				/>
			</S.SpotlightCards>

			<S.Transactions>
				<S.Title>
					Listagem
				</S.Title>
				<S.TransactionList
					data={data.reverse()}
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