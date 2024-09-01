'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import ThemeSwitch from './ThemeSwitch';

export default function Navbar() {
	const [isActive, setIsActive] = useState(false);

	const handleHamburgerClick = () => {
		setIsActive(!isActive);
	};

	const menuItems = [
		{ title: 'Home', href: "/", },
		{ title: 'Projects', href: "/projects", },
		{ title: 'Blog', href: "/blog", },
		{ title: 'About', href: "/about", },
	];

	return (
		<nav className="fixed z-50 left-0 top-0 w-screen h-auto">
			<div className="min-h-[8vh] bg-white dark:bg-dark transition-colors duration-300 ease-in-out">
				<div className="flex items-center justify-between w-full h-full max-w-[1300px] px-2.5 mx-auto">
					<div>
						<a>
							<h1 className="text-black dark:text-white"><span>A</span>ndrei <span>H</span>arbachov</h1>
						</a>
					</div>
					<div className="flex items-center">
						<ul className={`${isActive ? 'left-0' : 'left-full'} list-none absolute md:bg-transparent dark:md:bg-transparent bg-white dark:bg-dark w-screen h-screen top-0 flex flex-col justify-center items-center z-10 overflow-x-hidden transition-[left] duration-500 ease-in-out md:static md:block md:h-auto md:w-auto`}>
							{menuItems.map((item, index) => (
								<li key={index} className="md:inline-block">
									<Link href={item.href} data-after={item.title} className="md:text-base font-medium tracking-widest no-underline text-black dark:text-white uppercase p-5 block after:content-[attr(data-after)] after:absolute after:top-1/2 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:scale-0 after:text-[13rem] after:tracking-[50px] after:text-gray-100 dark:after:text-gray-900 after:z-[-1] after:transition-all after:duration-300 hover:after:scale-50 hover:after:tracking-normal hover:text-crimson text-[1.8rem] md:after:hidden md:inline-block">
										{item.title}
									</Link>
								</li>
							))}
						</ul>
						<ThemeSwitch />
						<button onClick={handleHamburgerClick} className="z-50 text-gray-500 w-10 h-10 relative focus:outline-none bg-transparent md:hidden">
							<div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
								<span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isActive ? 'rotate-45' : '-translate-y-1.5'}`} />
								<span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isActive ? 'opacity-0' : ''}`} />
								<span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isActive ? '-rotate-45' : 'translate-y-1.5'}`} />
							</div>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}