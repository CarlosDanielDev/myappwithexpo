import React from 'react';
import { SpotlightCard } from '../../components/SpotlightCard';

import * as S from './styles';

export const Dashboard: React.FC = () => {
	return (
		<S.Container>
			<S.Header>
				<S.UserWrapper>
					<S.UserInfo>
						<S.Photo source={{uri: 'https://avatars.githubusercontent.com/u/32473182?v=4'}}/>
						<S.User>
							<S.UserGreeting>
								Olá,
							</S.UserGreeting>
							<S.UserName>
								Carlos Daniel
							</S.UserName>
						</S.User>
					</S.UserInfo>
					<S.Icon name="power"/>
				</S.UserWrapper>
			</S.Header>
			
			<S.SpotlightCards>
				<SpotlightCard type="up" title="Entradas" amount="R$ 17.000,00" lastTransaction="Última transação em 16 de julho" />
				<SpotlightCard type="down" title="Saídas" amount="R$ 53,00" lastTransaction="Última saída dia 03 de junho" />
				<SpotlightCard type="total" title="Total" amount="R$ 16.947,00" lastTransaction="01 à 16 de junho" />
			</S.SpotlightCards>
		</S.Container>
	)
}