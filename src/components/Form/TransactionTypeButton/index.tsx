import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

interface Props  extends TouchableOpacityProps {
	type: 'up' | 'down'
	title: string
	isActive: boolean
}

export const TransactionTypeButton: React.FC<Props> = ({title, type, ...rest}) => {
	const name = `arrow-${type}-circle`;

	return (
		<S.Container {...rest} type={type} >
			<S.Icon {...{name, type}}/>
			<S.Title>
				{title}
			</S.Title>
		</S.Container>
	);
}
