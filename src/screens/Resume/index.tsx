import React, {useEffect, useState, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie as Pie } from 'victory-native';
import { DataListProps } from '../Dashboard';

import { Header } from '../../components/Header';
import { HistoryCard } from '../../components/HistoryCard';
import { transactionKey } from '../../constants';

import * as S from './styles';
import { categories } from '../../utils/categories';
import { formatCurrency, formatMonthAndYear } from '../../utils/formatting';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths } from 'date-fns';
import { Loading } from '../../components/Loading';
import { NotFound } from '../../components/NotFound';

interface CategoryDataProps {
	name: string
	amount: string
	color: string
	total: number
	percent: string
}

interface SelectedDate {
	formattedDate: string
	currentDate: Date
}

export const Resume: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState<SelectedDate>({
		currentDate: new Date(),
		formattedDate: formatMonthAndYear(new Date()),
	});
	const [totalByCategories, setTotalByCategories] = useState<CategoryDataProps[]>([] as CategoryDataProps[])
	const theme = useTheme();


	const handleChangeDate = (action: 'next' | 'previous') => {
		if(action === 'next') {
			const newDate = addMonths(selectedDate.currentDate, 1);
			const state = {
				currentDate: newDate,
				formattedDate: formatMonthAndYear(newDate)
			}
			setSelectedDate(state);
		} else {
			const newDate = subMonths(selectedDate.currentDate, 1);
			const state = {
				currentDate: newDate,
				formattedDate: formatMonthAndYear(newDate)
			}
			setSelectedDate(state);
		}
	}

	const loadData = async (key: string) => {
		setIsLoading(true);
		const data = await AsyncStorage.getItem(key);
		const currentTransactions: DataListProps[] = data ? JSON.parse(data) : [];

		const expensive = currentTransactions
			.filter(transaction => 
				transaction.transactionType === 'down' 
				&& new Date(transaction.date).getMonth() === selectedDate.currentDate.getMonth() 
				&& new Date(transaction.date).getFullYear() === selectedDate.currentDate.getFullYear())

		const expensiveSum = expensive.reduce((acc: number, item: DataListProps) => {
			return acc  + Number(item.amount)
		}, 0);

		const totalByCategory: CategoryDataProps[] = [];

		categories.forEach(category => {
			let categorySum: number = 0;
			expensive.forEach(element => {
				if(element.category === category.key) {
					categorySum += Number(element.amount);
				}
			});

			if(categorySum > 0) {
				const amount = formatCurrency(categorySum);
				const percent =`${((categorySum / expensiveSum) * 100).toFixed(0)}%`;

				totalByCategory.push({
					name: category.name,
					total: categorySum,
					amount,
					color: category.color,
					percent
				})
			}
		});
		setTotalByCategories(totalByCategory);
		setIsLoading(false);
	}

	useFocusEffect(useCallback(() => {
		loadData(transactionKey);
	}, [selectedDate]));

	if(isLoading) {
		return (
			<>
				<Header>
					Resumo por categoria
				</Header>
				<Loading/>
			</>
		);
	}

	return (
		<S.Container>
			<Header>
				Resumo por categoria
			</Header>
			<S.Content
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 24,
					paddingBottom: useBottomTabBarHeight()
				}}
			>
				<S.MonthSelect>
					<S.SelectButton onPress={() => handleChangeDate('previous')}>
						<S.Icon name="chevron-left"/>
					</S.SelectButton>

					<S.Month>
						{selectedDate.formattedDate}
					</S.Month>
					
					<S.SelectButton onPress={() => handleChangeDate('next')}>
						<S.Icon name="chevron-right"/>
					</S.SelectButton>
				</S.MonthSelect>
				
				<S.ChartContainer>
					{totalByCategories.length > 0 && (<Pie
						data={totalByCategories}
						colorScale={totalByCategories.map(category => category.color)}
						style={{
							labels: {
								fontSize: RFValue(18),
								fontWeight: 'bold',
								fill: theme.colors.shape
							}
						}}
						labelRadius={100}
						x="percent"
						y="total"
					/>)}
				</S.ChartContainer>
				{totalByCategories.length > 0 ? totalByCategories.map((item, index) => (
					<HistoryCard title={item.name} amount={item.amount} color={item.color} key={String(index)}/>
				)) : (
					<NotFound/>
				)}
			</S.Content>
		</S.Container>
	);
}