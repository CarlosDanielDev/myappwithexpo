import React from 'react';

import * as S from './styles';

interface HeaderProps {
	children: string
}

export const Header: React.FC<HeaderProps> = (props) => {
	return (
		<S.Container>
			<S.Title>
				{props.children}
			</S.Title>
		</S.Container>
	);
}