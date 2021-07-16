import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1 ;
	align-items: center; 
	justify-content: center;
	padding: 16px;
	background: ${({theme}) => theme.colors.background};
`;
export const Title = styled.Text`
	font-size: 40px;
	color: ${({theme}) => theme.colors.title};
	font-weight: bold;
`;