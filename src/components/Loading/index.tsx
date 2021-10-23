import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import * as S from './styles';

export const Loading: React.FC = () => {
	const theme = useTheme();
	return (
		<S.Container>
			<ActivityIndicator color={theme.colors.primary} size="large"/>
		</S.Container>
	);
}