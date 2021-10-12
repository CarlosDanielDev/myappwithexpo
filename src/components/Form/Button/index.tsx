import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

interface Props extends RectButtonProps {
	title: string
	onPress: () => void;
}

export const Button: React.FC<Props> = ({
	title,
	onPress,
	...rest
}) => {
	return (
		<S.Container onPress={onPress} {...rest}>
			<S.Title>
				{title}
			</S.Title>
		</S.Container>
	);
}
