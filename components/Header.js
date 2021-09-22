import Image from 'next/image';
import {useState} from 'react';
import {
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
    SearchIcon} from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';
    

function Header({placeholder}) {

    const [searchInput, setSearchInput] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);
    const router = useRouter()

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests
            }
        });
    }

    const selectionRange = {
        startDate,
        endDate,
        key: 'selection',
    }

    const resetInput = () => {
        setSearchInput('');
    }

    return (
        <div className="sticky top-0 shadow-md z-50 grid grid-cols-3 bg-white p-5 md:px-10">
            {/* left */}
            <div onClick={() => router.push('/')} className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image src="https://links.papareact.com/qd3"
                 layout="fill" 
                 objectFit="contain"
                 objectPosition="left"/>
            </div>

            {/* Middle */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
                <input 
                   className="flex-grow text-sm text-gray-600 placeholder-gray-400 pl-5 bg-transparent outline-none"  
                   type="text" 
                   value={searchInput}
                   onChange={(e) => setSearchInput(e.target.value)}
                   placeholder={placeholder || "Start your search"}/>
                <SearchIcon className="hidden md:inline-flex h-8 bg-red-500 text-white rounded-full p-2 cursor-pointer mx-2" />
            </div>

            {/* Right */}
            <div className="flex items-center space-x-4 justify-end text-gray-500">
                <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer" />
                <div className="flex items-center p-2 space-x-2 border-2 rounded-full">
                    <MenuIcon className="h-6" />
                    <UserCircleIcon className="h-6" />
                </div>
            </div>

            {searchInput && (
            <div className="flex flex-col col-span-3 mx-auto">
                <DateRangePicker 
                 ranges={[selectionRange]}
                 minDate={new Date()} 
                 rangeColors={["#FD5B61"]}
                 onChange={handleSelect}/>
                 <div className="flex border-b mb-4">
                     <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
                     <UsersIcon className="h-5" />
                     <input  
                         type="number" 
                         value={noOfGuests} 
                         min={1}
                         onChange={(e) => setNoOfGuests(e.target.value)}
                         className="w-12 pl-2 text-lg outline-none text-red-400 -mt-4"/>
                 </div>
                 <div className="flex">
                     <buttton  
                        onClick={resetInput}
                        className="flex-grow pl-16 cursor-pointer text-gray-500">Cancel</buttton>
                     <buttton 
                        onClick={search}
                        className="flex-grow pl-20 cursor-pointer text-red-400">Search</buttton>
                 </div>
            </div>
            )}
        </div>
    )
}

export default Header
