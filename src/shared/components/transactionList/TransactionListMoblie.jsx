import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function TransactionListMoblie({ transaction }) {
	//console.log(transaction?._id);
	const date = moment(transaction.createdAt).format('DD/MM/yyyy');
	const time = moment(transaction.createdAt).format('hh:mm:ss');
	return (
		<>
			{transaction?._id && (
				<li>
					<div className='item-mb'>
						<div className='date-time'>
							<p>{date}</p>
							<p>{time}</p>
						</div>
						<p>{transaction?.Nft?.eSaleType}</p>
						<p>{transaction?.eTransactionStatus || '-'}</p>
					</div>
					<div className='item-mb'>
						<p>
							<b>{transaction?.Nft?.sTitle}</b>
						</p>
						<p className='text-end'>
							<b>
								{transaction?.nAmount} $BOBA
							</b>
						</p>
					</div>
				</li>
			)}
		</>
	);
}

TransactionListMoblie.propTypes = {
	transaction: PropTypes.object,
};
