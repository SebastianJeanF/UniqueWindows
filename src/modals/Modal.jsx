import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function Test() {
	return (
		<p>
			<form className='hidden m-5'>
				<div class='grid gap-6 mb-6 md:grid-cols-2 '>
					<div>
						<label
							for='first_name'
							class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							First name
						</label>
						<input
							type='text'
							id='first_name'
							class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='John'
							required
						/>
					</div>
					<div>
						<label
							for='last_name'
							class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Last name
						</label>
						<input
							type='text'
							id='last_name'
							class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Doe'
							required
						/>
					</div>
					<div>
						<label
							for='company'
							class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Company
						</label>
						<input
							type='text'
							id='company'
							class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Flowbite'
							required
						/>
					</div>
					<div>
						<label for='phone' class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Phone number
						</label>
						<input
							type='tel'
							id='phone'
							class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='123-45-678'
							pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
							required
						/>
					</div>
				</div>
				<div class='mb-6'>
					<label for='email' class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
						Email address
					</label>
					<input
						type='email'
						id='email'
						class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='john.doe@company.com'
						required
					/>
				</div>

				{/* <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
            <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
        </div> */}
				<button
					type='submit'
					class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
					Submit
				</button>
			</form>
			<div className='bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6'>
				<div className='grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3'>
					<div className='text-gray-600'>
						<p className='font-medium text-lg'>Personal Details</p>
						<p>Please fill out all the fields.</p>
					</div>

					<div className='lg:col-span-2'>
						<form
							action='
  '
							className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
							<div className='md:col-span-5'>
								<label for='full_name'>Full Name</label>
								<input
									type='text'
									name='full_name'
									id='full_name'
									className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
								/>
							</div>

							<div className='md:col-span-5'>
								<label for='email'>Email Address</label>
								<input
									type='text'
									name='email'
									id='email'
									className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
									placeholder='email@domain.com'
								/>
							</div>

							<div className='md:col-span-3'>
								<label for='address'>Address / Street</label>
								<input
									type='text'
									name='address'
									id='address'
									className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
									placeholder=''
								/>
							</div>

							<div className='md:col-span-2'>
								<label for='city'>City</label>
								<input
									type='text'
									name='city'
									id='city'
									className='h-10 border mt-1 rounded px-4 w-full bg-gray-50'
									placeholder=''
								/>
							</div>

							{/* <div className='md:col-span-2'>
            <label for='country'>Country / region</label>
            <div className='h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
              <input
                name='country'
                id='country'
                placeholder='Country'
                className='px-4 appearance-none outline-none text-gray-800 w-full bg-transparent'
              />
              <button
                tabindex='-1'
                className='cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600'>
                <svg
                  className='w-4 h-4 mx-2 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'>
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </button>
              <button
                tabindex='-1'
                for='show_more'
                className='cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600'>
                <svg
                  className='w-4 h-4 mx-2 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'>
                  <polyline points='18 15 12 9 6 15'></polyline>
                </svg>
              </button>
            </div>
          </div> */}

							{/* <div className='md:col-span-2'>
            <label for='state'>State / province</label>
            <div className='h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
              <input
                name='state'
                id='state'
                placeholder='State'
                className='px-4 appearance-none outline-none text-gray-800 w-full bg-transparent'
              />
              <button
                tabindex='-1'
                className='cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600'>
                <svg
                  className='w-4 h-4 mx-2 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'>
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </button>
              <button
                tabindex='-1'
                for='show_more'
                className='cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600'>
                <svg
                  className='w-4 h-4 mx-2 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'>
                  <polyline points='18 15 12 9 6 15'></polyline>
                </svg>
              </button>
            </div>
          </div> */}

							<div className='md:col-span-1'>
								<label for='zipcode'>Zip Code</label>
								<input
									type='text'
									name='zipcode'
									id='zipcode'
									className='transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50'
									placeholder=''
								/>
							</div>

							<div className='md:col-span-5'>
								<label for='formFile' className='form-label inline-block mb-2 text-gray-700'>
									Pictures related to Project
								</label>
								<input
									className='form-control block w-ful px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
									type='file'
									id='formFile'
								/>
							</div>
							<div className='md:col-span-5'>
								<label for='comment'>Comments about Project</label>
								<input
									type='text'
									name='comment'
									id='comment'
									className='transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50'
									placeholder=''
								/>
							</div>

							{/* <div className='md:col-span-5'>
            <div className='inline-flex items-center'>
              <input
                type='checkbox'
                name='billing_same'
                id='billing_same'
                className='form-checkbox'
              />
              <label for='billing_same' className='ml-2'>
                My billing address is different than above.
              </label>
            </div>
          </div> */}

							{/* <div className='md:col-span-2'>
            <label for='soda'>How many soda pops?</label>
            <div className='h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1'>
              <button
                tabindex='-1'
                for='show_more'
                className='cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mx-2'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fill-rule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  />
                </svg>
              </button>
              <input
                name='soda'
                id='soda'
                placeholder='0'
                className='px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent'
                value='0'
              />
              <button
                tabindex='-1'
                for='show_more'
                className='cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mx-2 fill-current'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fill-rule='evenodd'
                    d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
                    clip-rule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </div> */}

							<div className='md:col-span-5 mt-2 text-right'>
								<div className='inline-flex items-end'>
									<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</p>
	);
}

export default function Example({ open, setOpen }) {
	// const [open, setOpen] = useState(true)
	console.log(status);
	const cancelButtonRef = useRef(null);

	// const handleSubmit = (evt) => {
	//   evt.preventDefault();

	//   // To close the popup in <ModalPopup/>
	//   setOpen(false);
	// }

	return (
		<Transition.Root className='z-30' show={open} as={Fragment}>
			<Dialog as='div' className='relative ' initialFocus={cancelButtonRef} onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='w-screen h-screen fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed mt-10 inset-0 z-10 overflow-y-auto '>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
							<Dialog.Panel className='z-40 relative transform overflow-hidden rounded-lg bg-gray-100 text-left shadow-xl transition-all sm:my-8 sm:w-4/5'>
								<Dialog.Title
									as='h3'
									className='mt-3 text-center text-lg font-medium leading-6 text-gray-900'></Dialog.Title>
								<Test></Test>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

// export function openModal() {
//   setOpen(true)
// }
