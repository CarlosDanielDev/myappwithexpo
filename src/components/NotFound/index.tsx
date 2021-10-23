import React from 'react';
import { useTheme } from 'styled-components';

import * as S from './styles';

export const NotFound: React.FC = () => {
	const theme = useTheme();
	return (
		<S.Container>
			<S.Icon name="info" color={theme.colors.secondary}/>
			<S.Text>
				Ops! Parece que não há nenhum lançamento nesse mês.
			</S.Text>
		</S.Container>
	);
}