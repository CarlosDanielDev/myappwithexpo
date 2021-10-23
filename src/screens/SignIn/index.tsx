import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SocialButton } from '../../components/SocialButton';
import { useAuth } from '../../hooks/auth';

import * as S from './styles';

export const SignIn: React.FC = () => {
  const { signInGoogle, signInApple } = useAuth();


  const handleSignInGoogle = async () => {
    try {
      await signInGoogle();
    } catch (error) {
      Alert.alert('Erro');
      console.log('ERROR', error);
    }
  }

  const handleSignInApple = async () => {
    try {
      await signInApple();
    } catch (error) {
      Alert.alert('Erro');
      console.log('ERROR', error);
    }
  }

	return (
		<S.Container>
			<S.Header>
				<S.TitleWrapper>
					<LogoSvg
						width={RFValue(160)}
						height={RFValue(80)}
					/>
					<S.Title>
						Controle suas {`\n`}
						finanças de forma{`\n`}
						muito simples
					</S.Title>
					<S.Caption>
						Faça seu login com{`\n`}
						uma das contas abaixo
					</S.Caption>
				</S.TitleWrapper>
			</S.Header>
			<S.Footer>
				<S.FooterWrapper>
					<SocialButton 
            title="Entrar com Google" 
            svg={GoogleSvg} 
            onPress={handleSignInGoogle} 
          />
					<SocialButton 
            title="Entrar com Apple" 
            svg={AppleSvg} 
            onPress={handleSignInApple} 
          />
				</S.FooterWrapper>
			</S.Footer>
		</S.Container>
	);
}
