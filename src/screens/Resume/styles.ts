import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
	background: ${({theme}) => theme.colors.background};
	flex: 1;
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export const MonthSelect = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	margin-top: 24px;
`;

export const SelectButton = styled.TouchableOpacity``;

export const Month = styled.Text`
	font-family: ${({theme}) => theme.fonts.regular};
	font-size: ${RFValue(20)}px;
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(24)}px;
`;