import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

interface Props  extends RectButtonProps {
	type: 'up' | 'down'
	title: string
	isActive: boolean
}

export const TransactionTypeButton: React.FC<Props> = ({title, type, ...rest}) => {
	const name = `arrow-${type}-circle`;

	return (
		<S.Wrapper>
			<S.Container {...rest} type={type} >
				<S.Icon {...{name, type}}/>
				<S.Title>
					{title}
				</S.Title>
			</S.Container>
		</S.Wrapper>
	);
}
