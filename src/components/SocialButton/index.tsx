import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import * as S from './styles';

export interface Props extends RectButtonProps {
	title: string;
	svg: React.FC<SvgProps>
}

export const SocialButton: React.FC<Props> = ({
	title,
	svg: Svg,
	...rest
}) => {

	return (
		<S.Container {...rest}>
			<S.ImageContainer>
				<Svg/>
			</S.ImageContainer>

			<S.Title>
				{title}
			</S.Title>
		</S.Container>
	)
}
