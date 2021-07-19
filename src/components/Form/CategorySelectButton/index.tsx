import React from 'react';

import * as S from './styles';

interface Props {
	title: string;
	onPress: Function
}

export const CategorySelectButton: React.FC<Props> = ({title, onPress}) => {
	return (
		<S.Container onPress={() => onPress()}>
			<S.Category>
				{title}
			</S.Category>
			<S.Icon name="chevron-down"/>
		</S.Container>
	);
}