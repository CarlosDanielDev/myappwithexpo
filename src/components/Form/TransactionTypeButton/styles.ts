import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

type TypeProps = {
	type: 'up' | 'down'
}

interface  ButtonProps extends TypeProps {
	isActive: boolean
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
	width: 48%;
	flex-direction: row;
	align-items: center;
	border: 1.5px solid ${({ theme }) => theme.colors.text};
	border-radius: 5px;
	padding: 16px;
	justify-content: center;

	${({isActive, type, theme: {colors}}) => isActive && css`
		background-color: ${type === 'down' ? colors.attention_light : colors.success_light};
		border: 0;
	`}
`;

export const Icon = styled(Feather)<TypeProps>`
	font-size: ${RFValue(24)}px;
	margin-right: 12px;
	color: ${({theme:{colors}, type}) => type === 'up' ? colors.success : colors.attention};
`;

export const Title = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: ${({theme}) => theme.fonts.regular};
`;