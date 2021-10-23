import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
	align-items: center;
	justify-content: center;
	background: ${({theme}) => theme.colors.background};
	margin-top: 100px;
`;

export const Text = styled.Text`
	font-family: ${({theme}) => theme.fonts.medium};
	font-size: ${RFValue(18)}px;
	text-align: center;
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(104)}px;
`;
