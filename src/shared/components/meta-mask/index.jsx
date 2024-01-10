/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from 'react-query'
import { loginApi } from "../../../query/auth/auth.mutation"
import { setLoggedInUser } from "../../utils"
import { TOAST_OPTIONS } from "../../constants"
import { GlobalEventsContext } from "../../context/global-event"
import { getTokenUser } from "../../../query/auth/auth.query"
import useOutsideAlerter from "../../hooks/useOutsideAlerter"
import useWindowSize from "../../hooks/useWindowSize"

function MetaMask() {
	const navigate = useNavigate()
	const [width] = useWindowSize()
	const [isOpen, setIsOpen] = useState(false)
	const wrapperRef = useRef(null);
	const { dispatch } = useContext(GlobalEventsContext)
	const { state: { user, client } } = useContext(GlobalEventsContext)
	useOutsideAlerter(wrapperRef, () => {
		setIsOpen(false)
	})

	const { mutate: userMutation } = useMutation(getTokenUser, {
		onSuccess: ({ data }) => {
			dispatch({ type: 'USER_PROFILE', payload: data.data })
			setLoggedInUser(data.data)
		}
	})

	const { mutate } = useMutation(loginApi, {
		onSuccess: ({ data }) => {
			const address = data?.data?.sWalletAddress?.toLowerCase()
			localStorage.setItem("wallet", address)
			localStorage.setItem("token", data?.data?.token)
			getLoggedUser(address)
		},
	})

	// const { mutate: clientProfile } = useMutation(getTokenUser, {
	// 	onSuccess: ({ data }) => {
	// 		dispatch({ type: 'CLIENT_PROFILE', payload: data })
	// 		console.log(data)
	// 	}
	// 	// onError: ({ response }) => {
	// 	// 	toast.error(response?.data?.message, TOAST_OPTIONS)
	// 	// }
	// })

	async function onConnect() {
		if (window.ethereum) {
			try {
				const res = await window.ethereum.request({
					method: "eth_requestAccounts",
				})
				handleLogin(res[0])
			} catch (err) {
				console.error(err)
			}
		} else {
			toast.error("MetaMask is not installed", TOAST_OPTIONS)
		}
	}

	function onDisconnect() {
		dispatch({ type: 'USER_PROFILE', payload: undefined })
		localStorage.clear()
		setIsOpen(false)
		navigate("/")
	}

	function handleLogin(address) {
		mutate(address?.toLowerCase())
		//mutate(address)
	}

	function getLoggedUser() {
		userMutation()
		//clientProfile(address)
	}

	useEffect(() => {
		const wallet = localStorage.getItem("wallet")
		if (wallet) getLoggedUser(wallet)
	}, [])

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", (account) => {
				console.log({ account })
				if (account?.length > 0) handleLogin(account[0])
				else if (account?.length === 0) onDisconnect()
			})

			window.ethereum.on("networkChanged", (networkId) => {
				if (networkId !== "1") {
					toast.error("You can only use the ethereum network", TOAST_OPTIONS)
				}
			})
		}
	}, [])

	const MetaMastButton = () => {
		if (width > 767) {
			return <button
				className="m-0 d-block dropdown-toggle"
				type="button"
				id="dropdownMenuButton"
				data-toggle="dropdown"
				onClick={() => {
					if (width > 767) setIsOpen(!isOpen)
				}}
			>
				{user?.balance || 0} $BOBA
			</button>
		} else {
			return <h4 className="mobile-bal">{user?.balance || 0} $BOBA</h4>
		}
	}

	return (
		<div
			className={
				isOpen
					? "active-btn-box dropdown-btn-box show-dropdown"
					: `active-btn-box dropdown-btn-box ${user && width <= 767 && "mobile-user-blance"}`
			}
		>
			{
				<div
					className={
						isOpen ? "dropdown active-btn show p-0" : `dropdown active-btn p-0`
					}
				>
					{user ? (
						<MetaMastButton />
					) : (
						<button
							className={"m-0 d-block dropdown-toggle-before"}
							type="button"
							id="dropdownMenuButton"
							data-toggle="dropdown"
							onClick={onConnect}
						>
							Connect
						</button>
					)}

					{isOpen && (
						<div
							ref={wrapperRef}
							className={"dropdown-menu show"}
							aria-labelledby="dropdownMenuButton"
						>
							<Link className="dropdown-item" to="/your-everyday-goddesses" onClick={() => setIsOpen(false)}>
								My NFTs
							</Link>
							<Link className="dropdown-item" to="/your-transactions" onClick={() => setIsOpen(false)}>
								Transactions
							</Link>
							<Link className="dropdown-item" to="/" onClick={onDisconnect}>
								Disconnect
							</Link>
						</div>
					)}
				</div>
			}
		</div>
	)
}
export default React.memo(MetaMask)
