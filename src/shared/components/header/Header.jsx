import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import twitter from '../../../assets/images/twitter-mobile.svg';
import twitter1 from '../../../assets/images/twitter.svg';
import discord from '../../../assets/images/discord.svg';
import mobile from '../../../assets/images/discord-mobile.svg';
import mobile1 from '../../../assets/images/Subtract-mobile.svg';
import subtract from '../../../assets/images/Subtract.svg';

import '../../../assets/styles/styles.css';
import MetaMask from '../meta-mask';
import useWindowSize from '../../hooks/useWindowSize';
import { GlobalEventsContext } from '../../context/global-event';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';

export default function Header() {
	const [sidebar, setSidebar] = useState(null);
	const { dispatch } = useContext(GlobalEventsContext)
	const navigate = useNavigate()
	const [width] = useWindowSize();
	const wrapperRef = useRef(null)
	const { state: { user } } = useContext(GlobalEventsContext)
	const outSideClick = useOutsideAlerter(wrapperRef)

	function onDisconnect() {
		dispatch({ type: 'USER_PROFILE', payload: undefined })
		localStorage.clear()
		navigate("/")
	}

	return (
		<div>
			<header
				className={sidebar && outSideClick ? 'header-section active-menu ' : 'header-section'}>
				<div className='container-fluid pr-0 pl-0'>
					<nav className='navbar navbar-expand-md  align-items-center justify-content-between'>
						<Link
							className='navbar-brand '
							to='/'
							data-attribute='header-style'>
							<img src={logo} alt='logo' className='img-fluid' />
						</Link>
							{/* <button
									type="button"
									className="active-btn d-md-none d-block "
								// onClick={connectHandler}
								>
								connect
								</button> */}
							{width <= 767 && <MetaMask />}
						<button
							className='navbar-toggler nav-btn'
							type='button'
							onClick={() => setSidebar(!sidebar)}>
							<span className= 'navbar-toggler-icon '>
								<div
									className={sidebar && outSideClick ? 'hamburger is-active' : 'hamburger '}
									id='hamburger-1'>
									<span className='line'></span>
									<span className='line'></span>
									<span className='line'></span>
								</div>
							</span>
						</button>
						<div
							className='collapse navbar-collapse justify-content-end position-relative align-items-center show'
							id='navbarNav'>
							<div className='d-md-flex d-none justify-content-end position-relative align-items-center'>
								<ul className='navbar-nav'>
									<li className='nav-item'>
										<Link to='/about-everyday-goddesses' className='nav-link active'>
											About
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/everyday-goddesses-boba-Shop' className='nav-link'>
											Shop
										</Link>
									</li>
									<li className='nav-item'>
										<Link to='/everyday-goddesses-terms-and-conditions' className='nav-link active'>
											Terms
										</Link>
									</li>
								</ul>
								<ul className='social-media'>
									<li>
										<a href='https://twitter.com/EverydayGdss' target="_blank" rel="noreferrer noopener">
											<img src={twitter1} alt='twitter' />
										</a>
									</li>
									<li>
										<a href='https://discord.gg/shinynft' target="_blank" rel="noreferrer noopener">
											<img src={discord} alt='discord' />
										</a>
									</li>
									<li>
										<a href='https://opensea.io/collection/everyday-goddesses' target="_blank" rel="noreferrer noopener">
											<img src={subtract} alt='Subtract' />
										</a>
									</li>
								</ul>
								{width > 767 && <MetaMask/>}
								{/* <div
								className={
									account && click
									? "active-btn-box dropdown-btn-box show-dropdown d-md-block d-none"
									: "active-btn-box dropdown-btn-box  d-md-block d-none"
								}
								>
								{
									<div
									className={
										account && click
										? "dropdown active-btn show"
										: "dropdown active-btn "
									}
									>
									<button
										className={
										tokenBalance === undefined
											? "dropdown-toggle-before"
											: "dropdown-toggle"
										}
										type="button"
										id="dropdownMenuButton"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
										onClick={connectHandler}
									>
										{tokenBalance === undefined
										? "Connect"
										: tokenBalance?.data?.nTokenBalance}
									</button>

									{click && account && (
										<div
										className={"dropdown-menu show"}
										aria-labelledby="dropdownMenuButton"
										>
										<Link className="dropdown-item" to="/nftpage">
											My NFTs
										</Link>
										<Link className="dropdown-item" to="/transaction">
											Transactions
										</Link>
										<Link
											className="dropdown-item"
											to="/"
											onClick={disConnectHandler}
										>
											Disconnect
										</Link>
										</div>
									)}
									</div>
								}
								</div> */}
							</div>
							{sidebar && outSideClick && (
								<div ref={wrapperRef} className='mobile-menu text-center d-md-none d-block'>
									<ul>
										<li>
											<Link onClick={() => setSidebar(false)} to='/about-everyday-goddesses' className='active'>
												About
											</Link>
										</li>

										<li>
											<Link onClick={() => setSidebar(false)} to='/everyday-goddesses-boba-shop'>Shop</Link>
										</li>
										<li>
											<Link onClick={() => setSidebar(false)} to='/everyday-goddesses-terms-and-conditions' className='active'>
												Terms
											</Link>
										</li>
									</ul>
									{user && (
										<>
											<ul>
												<li>
													<Link onClick={() => setSidebar(false)} to='/your-everyday-goddesses'>My NFT</Link>
												</li>
												<li>
													<Link onClick={() => setSidebar(false)} to='/your-transactions'>Transactions</Link>
												</li>
											</ul>
											<ul>
												<li>
													<Link
														to='/'
														onClick={onDisconnect}
													>
														Disconnect
													</Link>
												</li>
											</ul>
										</>
									)}

									<ul className='social-media'>
										<li>
											<a href='https://twitter.com/EverydayGdss' target="_blank" rel="noreferrer noopener">
												<img src={twitter} target='_blank' alt='twitter' />
											</a>
										</li>
										<li>
											<a href='https://discord.gg/shinynft' target="_blank" rel="noreferrer noopener">
												<img src={mobile} target='_blank' alt='discord' />
											</a>
										</li>
										<li>
											<a href='https://opensea.io/collection/everyday-goddesses' target="_blank" rel="noreferrer noopener">
												<img src={mobile1} target='_blank' alt='Subtract' />
											</a>
										</li>
									</ul>
								</div>
							)}
						</div>
					</nav>
				</div>
				<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>
				<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js'></script>
			</header>
		</div>
	);
}

Header.propTypes = {
	balance: PropTypes.object,
};
