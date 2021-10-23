import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	background: ${({theme}) => theme.colors.background};
	flex: 1;
`;

export const Form = styled.View`
	flex: 1;
	width: 100%;
	padding: ${RFValue(24)}px;
	justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionsType = styled.View`
	margin: 8px 0 16px 0;
	flex-direction: row;
	justify-content: space-between;
`;
