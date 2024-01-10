import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/styles.css';
import FixedNFT from '../fixed-nft';
import RaffleNFT from '../raffle-nft';
import AuctionNFT from '../auction-nft';

export default function CatogeryItems({ nft, tickets }) {
	//console.log("nft",nft)
	return (
		<>
			{/* fixed Items */}
			{nft.eSaleType === 'fixed' ? (
				<li>
					<FixedNFT nft={nft} tickets={tickets}/>
				</li>
			) : // Bid Items
				nft.eSaleType === 'auction' && new Date() < new Date(nft?.dExpireAt) ? (
					<li>
						<AuctionNFT nft={nft} />
					</li>
				) : (
					//Raffle Items
					nft.eSaleType === 'raffle' && (
						<li>
							<RaffleNFT
								tickets={tickets}
								nft={nft}
							/>
						</li>
					)
				)}
		</>
	);
}

CatogeryItems.propTypes = {
	nft: PropTypes.object,
	tickets: PropTypes.array,
};
