import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function TransactionList({ transaction }) {
	const date = moment(transaction?.createdAt).format('DD/MM/yyyy');
	const time = moment(transaction?.createdAt).format('hh:mm:ss');

	return (
		<tr>
			<td className='date'>{date}</td>
			<td className='time'>{time}</td>
			<td className='type'>{transaction?.Nft?.eSaleType}</td>
			<td className='item'>{transaction?.Nft?.sTitle}</td>
			<td className='item'>{transaction?.eTransactionStatus || '-'}</td>
			<td className='price'>
				{transaction?.nAmount} $BOBA
			</td>
		</tr>
	);
}

TransactionList.propTypes = {
	transaction: PropTypes.object,
};
