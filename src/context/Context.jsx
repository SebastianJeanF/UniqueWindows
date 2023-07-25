import { createContext, useState, useRef, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { json } from 'react-router-dom';
export const PriceContext = createContext();
export const TypeContext = createContext();
export const QuoteSwiperContext = createContext();
export const QuoteRoomsContext = createContext();
export const QuoteWindowContext = createContext();

function Context({ children }) {
	const [swiper, setSwiper] = useState(null);

	let windowTemplate = {
		img: null,
		type: null,
		custom: false,
		frame: null,
		interior: null,
		exterior: 'Plain',
		trim: null,
		width: null,
		height: null,
		photo: null,
		customTypePhotoReference: null,
		quantity: 1,
		price: 0,
	};
	let roomTemplate = {
		name: 'Blank',
		windows: [windowTemplate],
		selectedWindowId: 0,
		price: 0,
	};
	const initialState = {
		rooms: [roomTemplate],
		selectedRoomId: 0,
	};

	const getSelectedRoom = (state) => {
		return state.rooms[state.selectedRoomId];
	};
	function getSelectedWindow(state) {
		let selectedRoom = getSelectedRoom(state);
		if (!selectedRoom) {
			return;
		}
		return selectedRoom.windows[selectedRoom.selectedWindowId];
	}

	function reducer(draft, action) {
		const NULL_ID = -1;

		switch (action.type) {
			case 'selectRoom':
				draft.selectedRoomId = action.id;
				return;
			case 'editRoom':
				const selectedRoom = getSelectedRoom(draft);
				selectedRoom.name = action.name;
				console.log('editRoom reducer triggered');
				return;
			case 'addWindow': {
				const selectedRoom = getSelectedRoom(draft);

				if (selectedRoom.selectedWindowId == NULL_ID) {
					selectedRoom.selectedWindowId = 0;
					return;
				}
				selectedRoom.windows.push(windowTemplate);
				selectedRoom.selectedWindowId = selectedRoom.windows.length - 1;
				console.log('addWindow reducer triggered');
				return;
			}
			case 'removeRoom': {
				draft.rooms.splice(draft.selectedRoomId, 1);
				if (draft.selectedRoomId == 0 && draft.rooms.length == 0) {
					draft.selectedRoomId = NULL_ID;
				} else draft.selectedRoomId--;
				return;
			}
			case 'addRoom': {
				const newRoom = {
					name: action.name,
					windows: [windowTemplate],
					selectedWindowId: -1,
				};
				draft.rooms.push(newRoom);
				draft.selectedRoomId++;
				console.log('addRoom reducer triggered');
				return;
			}
			case 'windowAttributes': {
				const selectedWindow = getSelectedWindow(draft);
				const EMPTYINPUT = -1;
				if (action.frame) {
					selectedWindow.frame = action.frame;
				} else if (action.exterior) {
					selectedWindow.exterior = action.exterior;
				} else if (action.interior) {
					selectedWindow.interior = action.interior;
				} else if (action.windowType) {
					selectedWindow.type = action.windowType;
				} else if (action.img) {
					selectedWindow.img = action.img;
				} else if (action.photo) {
					selectedWindow.photo = true;
				} else if (action.height) {
					if (action.height == EMPTYINPUT) {
						selectedWindow.height = null;
						return;
					}
					selectedWindow.height = action.height;
				} else if (action.width) {
					if (action.width == EMPTYINPUT) {
						selectedWindow.width = null;
						return;
					}
					selectedWindow.width = action.width;
				} else if (action.decrease) {
					if (selectedWindow.quantity > 1) selectedWindow.quantity--;
				} else if (action.increase) {
					selectedWindow.quantity++;
				} else if (action.price < 0 || action.price > 0) {
					selectedWindow.price = action.price;
				} else if (action.trim) {
					selectedWindow.trim = action.trim;
				} else console.log('ERROR in windowAttributes reducer');

				return;
			}
			case 'shiftWindowLeft': {
				const selectedRoom = getSelectedRoom(draft);
				if (selectedRoom.selectedWindowId > 0) {
					selectedRoom.selectedWindowId--;
				}
				return;
			}

			case 'shiftWindowRight': {
				const selectedRoom = getSelectedRoom(draft);
				if (selectedRoom.selectedWindowId < selectedRoom.windows.length - 1) {
					selectedRoom.selectedWindowId++;
				}
				return;
			}
			case 'removeWindow': {
				const selectedRoom = getSelectedRoom(draft);
				console.log('selectedRoom.selectedWindowId: ', selectedRoom.selectedWindowId);
				selectedRoom.windows.splice(selectedRoom.selectedWindowId, 1);
				console.log(JSON.stringify(selectedRoom.windows));

				if (selectedRoom.selectedWindowId == 0 && selectedRoom.windows.length == 0) {
					selectedRoom.selectedWindowId = NULL_ID;
					selectedRoom.windows.push(windowTemplate);
				} else if (selectedRoom.selectedWindowId == selectedRoom.windows.length) {
					selectedRoom.selectedWindowId--;
				}
				console.log('removeWindow reducer triggered');
				return;
			}
			case 'changeRoomPrice': {
				const selectedRoom = getSelectedRoom(draft);
				selectedRoom.price = action.price;

				return;
			}
			case 'changeCustom': {
				const selectedWindow = getSelectedWindow(draft);
				selectedWindow.custom = action.custom;
				return;
			}
			case 'changeCustomPhotoReference': {
				const selectedWindow = getSelectedWindow(draft);
				selectedWindow.customTypePhotoReference = action.files;
				console.log(
					'selectedWindow.customTypePhotoReference: ',
					selectedWindow.customTypePhotoReference
				);
				return;
			}
			case 'changePhoto': {
				const selectedWindow = getSelectedWindow(draft);
				selectedWindow.photo = action.files;
				return;
			}
			default: {
				throw Error('Unknown action: ' + action.type);
			}
			// console.log('Action.dummy variable in reducer: ', action.dummy);
			// return;
			// draft.rooms[draft.selectedRoomId].windows[draft.rooms[draft.selectedRoomId].selectedWindowId].type = action.windowType;
		}
	}

	const [roomsState, roomsDispatch] = useImmerReducer(reducer, initialState);
	const selectedRoom = getSelectedRoom(roomsState);
	const selectedWindow = getSelectedWindow(roomsState);
	const selectedRoomId = roomsState.selectedRoomId;

	const rooms = roomsState.rooms;

	const reinitialized = useRef(false);

	return (
		<QuoteSwiperContext.Provider value={{ swiper, setSwiper, reinitialized }}>
			<QuoteRoomsContext.Provider
				value={{
					rooms,
					roomsDispatch,
					selectedRoom,
					selectedRoomId,
					selectedWindow,
				}}>
				{/* <QuoteWindowContext.Provider value={{ contextWindow, setContextWindow }}> */}
				{children}
				{/* </QuoteWindowContext.Provider> */}
			</QuoteRoomsContext.Provider>
		</QuoteSwiperContext.Provider>
	);
	// return <PriceContext.Provider value={{ price, changePrice }}>{children}</PriceContext.Provider>;
}

export default Context;
