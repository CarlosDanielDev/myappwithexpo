import React from 'react';
import * as S from './styles';



export const SpotlightCard: React.FC = () => {
	return (
		<S.Container>
				<S.Header>
					<S.Title>
						Entrada
					</S.Title>
					<S.Icon name="arrow-up-circle"/>
				</S.Header>

				<S.Footer>
					<S.Amount>
						R$ 17.000,00
					</S.Amount>
					<S.LastTransaction>
						Última transação dia 16 de julho
					</S.LastTransaction>
				</S.Footer>
		</S.Container>
	)
}