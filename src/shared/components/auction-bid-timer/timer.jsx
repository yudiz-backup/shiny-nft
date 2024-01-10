import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { addLeadingZeros } from '../../utils'

const Timer = ({ timer,captureClick }) => {
	const [minTime,setMinTime] = useState(0)

	useEffect(() => {
		if(+timer?.min <= 15 && captureClick){
			setMinTime(timer?.min + 15)
		}
	},[timer?.min,captureClick])

  return (
		<>
			<div>
				<span>{addLeadingZeros(timer?.days)}</span>:
				<span>{addLeadingZeros(timer?.hours)}</span>:
				{/* <span>{addLeadingZeros(timer?.days * 24 + timer?.hours)}</span>: */}
				<span>{captureClick ? minTime : timer?.min}</span>:
				<span>
					{addLeadingZeros(timer?.sec) }
				</span>
			</div>
		</>
	);
}

Timer.propTypes = {
  timer: PropTypes.object,
  captureClick:PropTypes.bool,
  //nft: PropTypes.object
}

export default Timer


