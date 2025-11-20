import React, { useState, useEffect, useRef } from 'react'
import Button from '../../../components/button/Button';
import { LuUpload, LuDownload } from "react-icons/lu";
import { IoBanOutline, IoEllipsisVertical } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { SlTarget } from "react-icons/sl";
import { meterData } from './meterData'; // Import the local data

export default function MeterManagement() {
    const [metersData, setMetersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenu, setActiveMenu] = useState(null);
    const menuRef = useRef(null);
    const rowsPerPage = 5;

    useEffect(() => {
        // Simulate API call with setTimeout to show loading state
        const fetchMeters = async () => {
            try {
                setLoading(true);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Use the local data instead of API call
                setMetersData(meterData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load meter data');
                setLoading(false);
            }
        };

        fetchMeters();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Calculate pagination values
    const totalPages = Math.ceil(metersData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = metersData.slice(startIndex, startIndex + rowsPerPage);

    const handleView = (rowData) => {
        console.log('View meter:', rowData);
        alert(`Viewing Meter Details:\n\nMeter ID: ${rowData.MeterId}\nZone: ${rowData.Zone}\nOwner: ${rowData.Owner}\nStatus: ${rowData.Status}\nLast Reading: ${rowData.LastReading}`);
        setActiveMenu(null);
    };

    const handleEdit = (rowData) => {
        console.log('Edit meter:', rowData);
        alert(`Editing Meter: ${rowData.MeterId}\n\nThis would open an edit form in a real application.`);
        setActiveMenu(null);
    };

    const handleActivate = (rowData) => {
        console.log('Activate meter:', rowData);
        if (rowData.Status === 'Active') {
            alert(`Meter ${rowData.MeterId} is already active.`);
        } else {
            alert(`Activating Meter: ${rowData.MeterId}\n\nStatus will be changed to Active.`);
            // In a real app, you would update the state here
        }
        setActiveMenu(null);
    };

    const handleMenuToggle = (index, event) => {
        event.stopPropagation();
        setActiveMenu(activeMenu === index ? null : index);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate page numbers with ellipsis - current page + 2 neighbors
    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            // Show all pages if total pages is 5 or less
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            // Calculate the range around current page
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Add ellipsis after first page if there's a gap
            if (startPage > 2) {
                pageNumbers.push('...');
            }

            // Add pages around current page (current page + 1 before + 1 after)
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis before last page if there's a gap
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }

            // Always show last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    // Define columns explicitly since we know the structure
    const columns = ['MeterId', 'Zone', 'Owner', 'Status', 'LastReading'];

    // Status badge styling
    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        
        switch (status) {
            case 'Active':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
            case 'Inactive':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
            case 'Maintenance':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
        }
    };

    if (loading) return <div className="text-gray-900 dark:text-white">Loading meter data...</div>;
    if (error) return <div className="text-red-600 dark:text-red-400">Error: {error}</div>;

    return (
        <div className="bg-white dark:bg-gray-700 min-h-screen">
            <div className="p-4">
                <div className='text-2xl font-bold mb-4 flex justify-start text-gray-900 dark:text-white'>
                    Meter Management
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-900 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                {columns.map((column) => (
                                    <th key={column} className="py-3 px-4 border-b border-r border-gray-900 dark:border-gray-600 text-left font-semibold last:border-r-0 text-gray-900 dark:text-white">
                                        {column}
                                    </th>
                                ))}
                                <th className="py-3 px-4 border-b border-gray-900 dark:border-gray-600 text-left font-semibold text-gray-900 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((row, index) => (
                                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    {columns.map((column) => (
                                        <td key={column} className="py-3 px-4 border-b border-r border-gray-900 dark:border-gray-600 last:border-r-0 text-gray-900 dark:text-white">
                                            {column === 'Status' ? (
                                                <span className={getStatusBadge(row[column])}>
                                                    {row[column]}
                                                </span>
                                            ) : (
                                                row[column]
                                            )}
                                        </td>
                                    ))}
                                    <td className="py-3 px-4 border-b border-gray-900 dark:border-gray-600 relative">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={(e) => handleMenuToggle(index, e)}
                                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                <IoEllipsisVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                            </button>
                                        </div>

                                        {/* Dropdown Menu */}
                                        {activeMenu === index && (
                                            <div
                                                ref={menuRef}
                                                className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10"
                                            >
                                                <button
                                                    onClick={() => handleView(row)}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors first:rounded-t-md last:rounded-b-md flex items-center gap-3"
                                                >
                                                    <IoEye className="w-4 h-4 text-blue-500" />
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(row)}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors flex items-center gap-3"
                                                >
                                                    <MdEdit className="w-4 h-4 text-blue-500" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleActivate(row)}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors flex items-center gap-3"
                                                >
                                                    <SlTarget className="w-4 h-4 text-blue-500" />
                                                    {row.Status === 'Active' ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1
                            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
                            : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-white'
                            }`}
                    >
                        Previous
                    </button>

                    {/* Page Number Buttons */}
                    <div className="flex space-x-2">
                        {getPageNumbers().map((page, index) => (
                            page === '...' ? (
                                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500 dark:text-gray-400">
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    className={`px-3 py-2 rounded text-sm ${currentPage === page
                                        ? 'bg-gray-800 dark:bg-gray-600 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages
                            ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
                            : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-white'
                            }`}
                    >
                        Next
                    </button>
                </div>

                {/* Page Info */}
                <div className="text-center mt-2 text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages} | Showing {currentRows.length} of {metersData.length} meters
                </div>

                <div className='text-xl font-bold mb-4 text-left dark:text-white mt-10'> Bulk Operations </div>
                <div className='flex justify-left gap-6'>
                    <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2'>
                        <LuDownload className="w-5 h-5 text-blue-500" /> Import CSV
                    </Button>
                    <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2'>
                        <LuUpload className="w-5 h-5 text-blue-500" /> Export CSV
                    </Button>
                    <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2'>
                        <IoBanOutline className="w-5 h-5 text-blue-500" /> Deactivate Meters
                    </Button>
                </div>
            </div>
        </div>
    )
}
















// import React, { useState, useEffect, useRef } from 'react'
// import Button from '../../../components/button/Button';
// import { LuUpload, LuDownload } from "react-icons/lu";
// import { IoBanOutline, IoEllipsisVertical } from "react-icons/io5";
// import { IoEye } from "react-icons/io5";
// import { MdEdit } from "react-icons/md";
// import { SlTarget } from "react-icons/sl";

// export default function MeterManagement() {
//     const [billsData, setBillsData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [activeMenu, setActiveMenu] = useState(null);
//     const menuRef = useRef(null);
//     const rowsPerPage = 5;

//     useEffect(() => {
//         const fetchBills = async () => {
//             try {
//                 const response = await fetch('http://localhost:5042/api/CollageApp/students/all');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch bills');
//                 }
//                 const result = await response.json();
//                 setBillsData(result);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchBills();
//     }, []);

//     // Close menu when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (menuRef.current && !menuRef.current.contains(event.target)) {
//                 setActiveMenu(null);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Calculate pagination values
//     const totalPages = Math.ceil(billsData.length / rowsPerPage);
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const currentRows = billsData.slice(startIndex, startIndex + rowsPerPage);

//     const handleView = (rowData) => {
//         console.log('View bill:', rowData);
//         setActiveMenu(null);
//     };

//     const handleEdit = (rowData) => {
//         console.log('Edit bill:', rowData);
//         setActiveMenu(null);
//     };

//     const handleActivate = (rowData) => {
//         console.log('Activate bill:', rowData);
//         setActiveMenu(null);
//     };

//     const handleMenuToggle = (index, event) => {
//         event.stopPropagation();
//         setActiveMenu(activeMenu === index ? null : index);
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrev = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handlePageClick = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     // Generate page numbers with ellipsis - current page + 2 neighbors
//     const getPageNumbers = () => {
//         const pageNumbers = [];

//         if (totalPages <= 5) {
//             // Show all pages if total pages is 5 or less
//             for (let i = 1; i <= totalPages; i++) {
//                 pageNumbers.push(i);
//             }
//         } else {
//             // Always show first page
//             pageNumbers.push(1);

//             // Calculate the range around current page
//             let startPage = Math.max(2, currentPage - 1);
//             let endPage = Math.min(totalPages - 1, currentPage + 1);

//             // Add ellipsis after first page if there's a gap
//             if (startPage > 2) {
//                 pageNumbers.push('...');
//             }

//             // Add pages around current page (current page + 1 before + 1 after)
//             for (let i = startPage; i <= endPage; i++) {
//                 pageNumbers.push(i);
//             }

//             // Add ellipsis before last page if there's a gap
//             if (endPage < totalPages - 1) {
//                 pageNumbers.push('...');
//             }

//             // Always show last page
//             pageNumbers.push(totalPages);
//         }

//         return pageNumbers;
//     };

//     // Get column names from the first data item
//     const columns = billsData.length > 0 ? Object.keys(billsData[0]) : [];

//     if (loading) return <div className="text-gray-900 dark:text-white">Loading...</div>;
//     if (error) return <div className="text-red-600 dark:text-red-400">Error: {error}</div>;

//     return (
//         <div className="bg-white dark:bg-gray-700 min-h-screen">
//             <div className="p-4">
//                 <div className='text-2xl font-bold mb-4 flex justify-start text-gray-900 dark:text-white'>
//                     Meter Management
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-900 dark:border-gray-700">
//                         <thead>
//                             <tr className="bg-gray-100 dark:bg-gray-800">
//                                 {columns.map((column) => (
//                                     <th key={column} className="py-3 px-4 border-b border-r border-gray-900 dark:border-gray-600 text-left font-semibold last:border-r-0 text-gray-900 dark:text-white">
//                                         {column.charAt(0).toUpperCase() + column.slice(1)}
//                                     </th>
//                                 ))}
//                                 <th className="py-3 px-4 border-b border-gray-900 dark:border-gray-600 text-left font-semibold text-gray-900 dark:text-white">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentRows.map((row, index) => (
//                                 <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                                     {columns.map((column) => (
//                                         <td key={column} className="py-3 px-4 border-b  border-r border-gray-900 dark:border-gray-600 last:border-r-0 text-gray-900 dark:text-white">
//                                             {row[column]}
//                                         </td>
//                                     ))}
//                                     <td className="py-3 px-4 border-b border-gray-900 dark:border-gray-600 relative">
//                                         <div className="flex space-x-2">
//                                             <button
//                                                 onClick={(e) => handleMenuToggle(index, e)}
//                                                 className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                                             >
//                                                 <IoEllipsisVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//                                             </button>
//                                         </div>

//                                         {/* Dropdown Menu */}
//                                         {activeMenu === index && (
//                                             <div
//                                                 ref={menuRef}
//                                                 className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10"
//                                             >
//                                                 <button
//                                                     onClick={() => handleView(row)}
//                                                     className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors first:rounded-t-md last:rounded-b-md flex items-center gap-3"
//                                                 >
//                                                     <IoEye className="w-4 h-4 text-blue-500" />
//                                                     View
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleEdit(row)}
//                                                     className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors flex items-center gap-3"
//                                                 >
//                                                     <MdEdit className="w-4 h-4 text-blue-500" />
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleActivate(row)}
//                                                     className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors flex items-center gap-3"
//                                                 >
//                                                     <SlTarget className="w-4 h-4 text-blue-500" />
//                                                     Activate
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination Controls */}
//                 <div className="flex justify-between items-center mt-4">
//                     <button
//                         onClick={handlePrev}
//                         disabled={currentPage === 1}
//                         className={`px-4 py-2 rounded ${currentPage === 1
//                             ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
//                             : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-white'
//                             }`}
//                     >
//                         Previous
//                     </button>

//                     {/* Page Number Buttons */}
//                     <div className="flex space-x-2">
//                         {getPageNumbers().map((page, index) => (
//                             page === '...' ? (
//                                 <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500 dark:text-gray-400">
//                                     ...
//                                 </span>
//                             ) : (
//                                 <button
//                                     key={page}
//                                     onClick={() => handlePageClick(page)}
//                                     className={`px-3 py-2 rounded text-sm ${currentPage === page
//                                         ? 'bg-gray-800 dark:bg-gray-600 text-white'
//                                         : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
//                                         }`}
//                                 >
//                                     {page}
//                                 </button>
//                             )
//                         ))}
//                     </div>

//                     <button
//                         onClick={handleNext}
//                         disabled={currentPage === totalPages}
//                         className={`px-4 py-2 rounded ${currentPage === totalPages
//                             ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
//                             : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-white'
//                             }`}
//                     >
//                         Next
//                     </button>
//                 </div>

//                 <div className='text-xl font-bold mb-4 text-left dark:text-white mt-10'> Bulk Operations </div>
//                 <div className='flex justify-left gap-6'>
//                     <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2'>
//                         <LuDownload className="w-5 h-5 text-blue-500" /> Import CSV
//                     </Button>
//                     <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2'>
//                         <LuUpload className="w-5 h-5 text-blue-500" /> Export CSV
//                     </Button>
//                     <Button className='border-2 border-black dark:border-gray-400 rounded-2xl px-3 py-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center gap-2'>
//                         <IoBanOutline className="w-5 h-5 text-blue-500" /> Deactivate Meters
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }