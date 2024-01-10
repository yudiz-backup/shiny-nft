import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { countDownCalculations, dateCheck } from '../../utils';
import Timer from './timer';

export default function Upcoming({ nft,captureClick }) {

	// const [disableTime, setDisableTime] = useState(false)
	const [timer, setTimer] = useState({
		days: '00',
		hours: '00',
		min: '00',
		sec: '00',
	});

	useEffect(() => {
		setInterval(
			() => {
				const startDate = countDownCalculations(dateCheck(nft?.dExpireAt));
				startDate && setTimer(startDate);
			},
			0,
			1000
		);
	}, []);

	return (
		<>

			<Timer timer={timer} captureClick={captureClick} />
		</>
	);
}

Upcoming.propTypes = {
	nft: PropTypes.object,
	handleTime: PropTypes.func,
	captureClick:PropTypes.bool
};
