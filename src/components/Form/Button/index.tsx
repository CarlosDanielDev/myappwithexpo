import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';

import * as S from './styles';

interface Props extends TouchableOpacityProps {
	title: string
}

export const Button: React.FC<Props> = ({title, ...rest}) => {
	return (
		<S.Container {...rest}>
			<S.Title>
				{title}
			</S.Title>
		</S.Container>
	);
}
