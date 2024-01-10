import PropTypes from 'prop-types';
import '../../../assets/styles/styles.css';
import SoldItemList from '../soldItemList/SoldItemList';

export default function SoldItemNftData({ item }) {
	//console.log('nfttttt', item);

	return (
		<>
			<>
				{item?.map((item, _id) => (
					<SoldItemList item={item} key={_id} />
				))}
			</>
		</>
	);
}

SoldItemNftData.propTypes = {
	item: PropTypes.object,
};
