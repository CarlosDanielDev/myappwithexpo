import styled, { css } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

type Props = {
	isActive: boolean
}

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
	background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
	width: 100%;
	height: ${RFValue(113)}px;

	background-color: ${({theme}) => theme.colors.primary};
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 19px;
`;

export const Title = styled.Text`
	font-family: ${({theme}) => theme.fonts.regular};
	font-size: ${RFValue(18)}px;
	color: ${({theme}) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<Props>`
	width: 100%;
	padding: ${RFValue(15)}px;
	flex-direction: row;
	align-items: center;
	${({isActive, theme}) => isActive && css`
		background-color: ${theme.colors.secondary_light};
	`}
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	margin-right: 16px;
`;

export const Name = styled.Text`
	font-family: ${({theme}) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
	width: 100%;
	height: 1px;
	background-color:  ${({theme}) => theme.colors.text};
`;

export const Footer = styled.View`
	width: 100%;
	padding: 24px;
`;
