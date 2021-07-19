import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import * as S from './styles';

type Category = {
	key: string
	name: string
}

interface Props {
	category: string
	setCategory: (category: Category) => void
	closeSelectCategory: Function
}

export const CategorySelect: React.FC<Props> = ({
	category,
	setCategory,
	closeSelectCategory
}) => {
	return (
		<S.Container>
			<S.Header>
				<S.Title>
					Categoria
				</S.Title>
			</S.Header>
			<FlatList
				data={categories}
				style={{flex: 1, width: '100%'}}
				keyExtractor={(item) => item.key}
				ItemSeparatorComponent={() => <S.Separator/>}
				renderItem={({item}) => (
					<S.Category>
						<S.Icon name={item.icon}/>
						<S.Name>
							{item.name}
						</S.Name>
					</S.Category>
				)}
			/>
			<S.Footer>
				<Button title="Selecionar"/>
			</S.Footer>
		</S.Container>
	);
}
