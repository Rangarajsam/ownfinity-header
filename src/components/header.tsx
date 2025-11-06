'use client'

import React,{ useState, useEffect, use } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    CloseButton
} from '@headlessui/react'
import {
    Bars3Icon,
    ArrowRightEndOnRectangleIcon,
    ShoppingCartIcon,
    UserCircleIcon,
    XMarkIcon,
    HeartIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store';
import ProductSearch from './productSearch'
import { Toaster } from 'react-hot-toast'
import { eventBus } from 'container/eventBus';


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = {name: "Rangaraj"}; // For testing purpose hardcoded user details
    const [cartLength, setCartLength] = useState(0);
    const [isClient, setIsClient] = useState(false);

    
    const handleLogout = async () => {
        try {
            let resultAction = await dispatch(logoutUser()).unwrap();
            if (resultAction) {
                navigate("/login");
            }
        }
        catch (error) {
            console.log("Failed to logout", error);
        }
    }

    const goToWishlist = () => {
        navigate("/wishlist");
    }

    const goToCart = () => {
        navigate("/cart");
    }
    const goToProfile = () => {
        navigate("/profile");
    }

    const userDetails: Array<{ name: string; description?: string; icon: React.ElementType; onClick?: () => void }> = [
        { name: 'My Profile', description: 'Check the details', icon: UserCircleIcon, onClick: goToProfile },
        { name: 'My Wishlist', description: 'Check the products in wishlist', icon: HeartIcon, onClick: goToWishlist },
        { name: 'Logout', description: 'Logout to see the new world', icon: ArrowRightEndOnRectangleIcon, onClick: handleLogout },
    ]

    const goToProductPage = () => {
        navigate("/product/list");
    }


    eventBus.on('cart:updated', (data:{ quantity: number; }) => {
        console.log("Cart updated event received in header", data);
        setCartLength(data.quantity);
    })

    useEffect(() => {
        console.log("Header component mounted");
        setIsClient(true);
    }, []);

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <header className="bg-white border-b border-gray-200 w-full fixed top-0 left-0 h-[93px] z-[999]">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="w-1/5">
                        <a className="cursor-pointer" onClick={goToProductPage}>Ownfinity</a>
                    </div>

                    <div className="w-1/2">
                        <ProductSearch />
                    </div>
                    <div className="w-1/6 flex justify-end mr-10 items-center relative cursor-pointer" onClick={goToCart}>
                        {cartLength > 0 && <div className="size-5 leading-5 absolute rounded-full -top-2 right-[48px] bg-red-500 
                    text-white inline-block align-middle text-center text-xs">{cartLength}</div>}
                        <ShoppingCartIcon className="size-7" />
                        <a className="inline-block ml-1"> Cart</a>
                    </div>
                    <PopoverGroup className="lg:flex lg:gap-x-12">
                        <Popover className="relative">
                            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                                {isClient && user?.name}
                                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                            </PopoverButton>

                            <PopoverPanel
                                transition
                                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                            >
                                <div className="p-4">
                                    {userDetails.map((item) => (
                                        <CloseButton
                                            key={item.name}
                                            as='div'
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                            {...('onClick' in item && { onClick: item.onClick })}
                                        >
                                            <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                            </div>
                                            <div className="flex-auto">
                                                <a className="block font-semibold text-gray-900">
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </CloseButton>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Popover>
                    </PopoverGroup>

                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-10" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Disclosure as="div" className="-mx-3 mt-10">
                                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                            {user?.name}
                                            <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                                        </DisclosureButton>
                                        <DisclosurePanel className="mt-2 space-y-2">
                                            {[...userDetails].map((item) => (
                                                <DisclosureButton
                                                    key={item.name}
                                                    as="a"
                                                    {...('onClick' in item && { onClick: item.onClick })}
                                                    className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                                >
                                                    {item.name}
                                                </DisclosureButton>
                                            ))}
                                        </DisclosurePanel>
                                    </Disclosure>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </>
    )
}
