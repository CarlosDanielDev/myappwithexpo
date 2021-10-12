export const formatCurrency = (value: number) => {
	return Number(value).toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	});
};


export const formatDate = (value: Date) => {
	return Intl.DateTimeFormat('pr-BR', {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	}).format(value);
}

export const formatDateFriendly = (value: Date) => {
	return `${value.getDate()} de ${value.toLocaleString('pt-BR', { month: 'long' })}`;
}