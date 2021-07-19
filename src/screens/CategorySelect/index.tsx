import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import * as S from './styles';

type Category = {
	key: string
	name: string
}

interface Props {
	category: Category
	setCategory: (category: Category) => void
	closeSelectCategory: Function
}

export const CategorySelect: React.FC<Props> = ({
	category,
	setCategory,
	closeSelectCategory
}) => {

	const handleCategorySelect = (item: Category) => {
		setCategory(item);
	}

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
					<S.Category 
						onPress={() => handleCategorySelect(item)}
						isActive={category.key === item.key}
					>
						<S.Icon name={item.icon}/>
						<S.Name>
							{item.name}
						</S.Name>
					</S.Category>
				)}
			/>
			<S.Footer>
				<Button title="Selecionar"
					onPress={() => closeSelectCategory()}
				/>
			</S.Footer>
		</S.Container>
	);
}
