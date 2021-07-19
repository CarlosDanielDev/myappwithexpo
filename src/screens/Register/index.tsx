import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
	Modal, 
	TouchableWithoutFeedback, 
	Keyboard,
	Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import * as S from './styles';

interface FormData {
	name: string
	amount: string
}

const schema = Yup.object().shape({
	name: Yup
	.string()
	.min(3,'No minimo 3 caracteres')
	.required('Nome é obrigatório'),
	amount: Yup
	.number()
	.typeError('Informe um valor numérico')
	.positive('O valor não pode ser negativo')
	.required('Preço é obrigatório')
});

export const Register: React.FC = () => {
	const [category, setCategory] = useState({
		key: 'category',
		name: 'Category'
	});
	const [transactionType, setTransactionType] = useState('');
	const [categoryModalOpen, setModalOpen] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema),
	});


	const handleTransactionsTypeSelect = (type: 'up' | 'down') => {
		setTransactionType(type);
	}

	const handleCloseModal = () => {
		setModalOpen(false);
	}

	const handleOpenModal = () => {
		setModalOpen(true);
	}

	const handleRegister = (form: FormData) => {
		if(!transactionType) return Alert.alert('Selecione um tipo de transação');
		if(category.key === 'category') return Alert.alert('Selecione um tipo de transação');
		const data = {
			name: form.name,
			amount: form.amount,
			transactionType,
			category: category.key
		};

		console.log(data);
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<S.Container>
				<S.Header>
					<S.Title>
						Cadastro
					</S.Title>
				</S.Header>

				<S.Form>
					<S.Fields>
						<InputForm
							control={control}
							name="name"
							placeholder="Nome"
							autoCapitalize="sentences"
							autoCorrect={false}
							error={errors.name && errors.name.message}
						/>
						<InputForm
							control={control}
							name="amount"
							placeholder="Preço"
							keyboardType="numeric"
							error={errors.amount && errors.amount.message}
						/>
						<S.TransactionsType>
							<TransactionTypeButton
								isActive={transactionType === 'up'}
								title="Income" 
								type="up"
								onPress={() => handleTransactionsTypeSelect('up')}
							/>
							<TransactionTypeButton
								isActive={transactionType === 'down'}
								title="Outcome" 
								type="down"
								onPress={() => handleTransactionsTypeSelect('down')}
							/>
						</S.TransactionsType>
						<CategorySelectButton title={category.name} onPress={() => handleOpenModal()}/>
					</S.Fields>

					<Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
				</S.Form>
				<Modal 
					visible={categoryModalOpen}
					animationType="fade"
				>
					<CategorySelect
						category={category}
						setCategory={setCategory}
						closeSelectCategory={handleCloseModal}
					/>
				</Modal>
			</S.Container>
		</TouchableWithoutFeedback>
	);
}
