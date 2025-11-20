import React, { useState, useEffect, useRef } from 'react'
import Button from '../../../components/button/Button';
import { LuUpload, LuDownload } from "react-icons/lu";
import { IoBanOutline, IoEllipsisVertical, IoChevronDown, IoSearch, IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { SlTarget } from "react-icons/sl";
import { IoEye } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import Input2 from '../../../components/input_form/Input2';
import { userData } from './userData'; // Import the local data

export default function UserManagement() {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMenu, setActiveMenu] = useState(null);
    const [showInvitePopup, setShowInvitePopup] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Name');
    const [searchValue, setSearchValue] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        role: '',
        zone: ''
    });
    const menuRef = useRef(null);
    const inviteButtonRef = useRef(null);
    const filterDropdownRef = useRef(null);
    const rowsPerPage = 5;

    useEffect(() => {
        // Simulate API call with setTimeout to show loading state
        const fetchUsers = async () => {
            try {
                setLoading(true);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Use the local data instead of API call
                setUsersData(userData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load user data');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
            // Close popup when clicking outside
            if (showInvitePopup && inviteButtonRef.current && !inviteButtonRef.current.contains(event.target)) {
                setShowInvitePopup(false);
            }
            // Close filter dropdown when clicking outside
            if (showFilterDropdown && filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setShowFilterDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showInvitePopup, showFilterDropdown]);

    // Calculate pagination values
    const totalPages = Math.ceil(usersData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = usersData.slice(startIndex, startIndex + rowsPerPage);

    const handleEdit = (rowData) => {
        console.log('Edit user:', rowData);
        alert(`Editing User: ${rowData.Name}\n\nThis would open an edit form in a real application.`);
        setActiveMenu(null);
    };

    const handleActivate = (rowData) => {
        console.log('Activate user:', rowData);
        if (rowData.Status === 'Active') {
            alert(`User ${rowData.Name} is already active.`);
        } else {
            alert(`Activating User: ${rowData.Name}\n\nStatus will be changed to Active.`);
            // In a real app, you would update the state here
        }
        setActiveMenu(null);
    };

    const handleResetPassword = (rowData) => {
        console.log('Reset password for user:', rowData);
        alert(`Resetting Password for: ${rowData.Name}\n\nA password reset link will be sent to ${rowData.Email}`);
        setActiveMenu(null);
    };

    const handleMenuToggle = (index, event) => {
        event.stopPropagation();
        setActiveMenu(activeMenu === index ? null : index);
    };

    const handleInviteUser = () => {
        setShowInvitePopup(true);
    };

    const handleClosePopup = () => {
        setShowInvitePopup(false);
        // Reset form data when closing popup
        setFormData({
            email: '',
            role: '',
            zone: ''
        });
    };

    const handleFilterToggle = () => {
        setShowFilterDropdown(!showFilterDropdown);
    };

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        setShowFilterDropdown(false);
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        console.log('Search for:', searchValue, 'in', selectedFilter);
        // Implement search functionality here
        if (searchValue.trim()) {
            alert(`Searching for "${searchValue}" in ${selectedFilter}`);
        }
    };

    const handleReset = () => {
        setSelectedFilter('Name');
        setSearchValue('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInviteSubmit = () => {
        console.log('Invite user with data:', formData);
        if (formData.email && formData.role && formData.zone) {
            alert(`Invitation sent to: ${formData.email}\nRole: ${formData.role}\nZone: ${formData.zone}`);
            setShowInvitePopup(false);
            setFormData({
                email: '',
                role: '',
                zone: ''
            });
        } else {
            alert('Please fill all fields');
        }
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
    const columns = ['ID', 'Name', 'Email', 'Role', 'Zone', 'Status'];

    // Status badge styling
    const getStatusBadge = (status) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        
        switch (status) {
            case 'Active':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
            case 'Inactive':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
            case 'Pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
            case 'Suspended':
                return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
        }
    };

    // Role badge styling
    const getRoleBadge = (role) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        
        switch (role) {
            case 'Administrator':
                return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
            case 'Operator':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
            case 'Viewer':
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200`;
        }
    };

    if (loading) return <div className="text-gray-900 dark:text-white">Loading user data...</div>;
    if (error) return <div className="text-red-600 dark:text-red-400">Error: {error}</div>;

    return (
        <div className="bg-white dark:bg-gray-700 min-h-screen">
            <div className="p-4">
                {/* Header Section with Invite Button */}
                <div className="flex justify-between items-center mb-4 relative">
                    <div className='text-2xl font-bold text-gray-900 dark:text-white'>
                        User Management
                    </div>
                    <div className="relative" ref={inviteButtonRef}>
                        <button
                            onClick={handleInviteUser}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <FaUserPlus className="w-5 h-5" />
                            Invite User
                        </button>

                        {/* Invite User Popup */}
                        {showInvitePopup && (
                            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96 p-6 z-50 border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Invite User
                                    </h3>
                                    <button
                                        onClick={handleClosePopup}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <Input2
                                        label="Email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                    <Input2
                                        label="Role"
                                        type="text"
                                        name="role"
                                        placeholder="Enter role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                    <Input2
                                        label="Zone"
                                        type="text"
                                        name="zone"
                                        placeholder="Enter zone"
                                        value={formData.zone}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                {/* Invite Button inside Popup */}
                                <div className="mt-6">
                                    <button
                                        onClick={handleInviteSubmit}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full justify-center"
                                    >
                                        <FaUserPlus className="w-5 h-5" />
                                        Invite User
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Finder by Name Section */}
                <div className="flex mb-6 w-full max-w-2xl" ref={filterDropdownRef}>
                    {/* Dropdown Button */}
                    <div className="relative flex-shrink-0 w-32">
                        <button
                            onClick={handleFilterToggle}
                            className="bg-white dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 flex items-center justify-between w-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <span className="truncate">{selectedFilter}</span>
                            <IoChevronDown className="w-4 h-4 flex-shrink-0" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {showFilterDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                                {columns.map((column) => (
                                    <button
                                        key={column}
                                        onClick={() => handleFilterSelect(column)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors first:rounded-t-md last:rounded-b-md"
                                    >
                                        {column}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Search Input Container */}
                    <div className="flex flex-1">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder={`Search by ${selectedFilter.toLowerCase()}...`}
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="flex-1 bg-white dark:bg-gray-800 border border-l-0 border-r-0 border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        
                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="bg-white dark:bg-gray-800 border border-l-0 border-r-0 border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <IoSearch className="w-5 h-5" />
                        </button>
                        
                        {/* Reset Button */}
                        <button
                            onClick={handleReset}
                            className="bg-white dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <IoClose className="w-5 h-5" />
                        </button>
                    </div>
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
                                            ) : column === 'Role' ? (
                                                <span className={getRoleBadge(row[column])}>
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
                                                className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10"
                                            >
                                                <button
                                                    onClick={() => handleEdit(row)}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors first:rounded-t-md flex items-center gap-3"
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
                                                <button
                                                    onClick={() => handleResetPassword(row)}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors last:rounded-b-md flex items-center gap-3"
                                                >
                                                    <IoEye className="w-4 h-4 text-blue-500" />
                                                    Reset Password
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
                    Page {currentPage} of {totalPages} | Showing {currentRows.length} of {usersData.length} users
                </div>
            </div>
        </div>
    )
}















// import React, { useState, useEffect, useRef } from 'react'
// import Button from '../../../components/button/Button';
// import { LuUpload, LuDownload } from "react-icons/lu";
// import { IoBanOutline, IoEllipsisVertical, IoChevronDown, IoSearch, IoClose } from "react-icons/io5";
// import { MdEdit } from "react-icons/md";
// import { SlTarget } from "react-icons/sl";
// import { IoEye } from "react-icons/io5";
// import { FaUserPlus } from "react-icons/fa6";
// import Input2 from '../../../components/input_form/Input2';

// export default function UserManagement() {
//     const [billsData, setBillsData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [activeMenu, setActiveMenu] = useState(null);
//     const [showInvitePopup, setShowInvitePopup] = useState(false);
//     const [showFilterDropdown, setShowFilterDropdown] = useState(false);
//     const [selectedFilter, setSelectedFilter] = useState('Name');
//     const [searchValue, setSearchValue] = useState('');
//     const [formData, setFormData] = useState({
//         email: '',
//         role: '',
//         zone: ''
//     });
//     const menuRef = useRef(null);
//     const inviteButtonRef = useRef(null);
//     const filterDropdownRef = useRef(null);
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
//             // Close popup when clicking outside
//             if (showInvitePopup && inviteButtonRef.current && !inviteButtonRef.current.contains(event.target)) {
//                 setShowInvitePopup(false);
//             }
//             // Close filter dropdown when clicking outside
//             if (showFilterDropdown && filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
//                 setShowFilterDropdown(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [showInvitePopup, showFilterDropdown]);

//     // Calculate pagination values
//     const totalPages = Math.ceil(billsData.length / rowsPerPage);
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const currentRows = billsData.slice(startIndex, startIndex + rowsPerPage);

//     const handleEdit = (rowData) => {
//         console.log('Edit user:', rowData);
//         setActiveMenu(null);
//     };

//     const handleActivate = (rowData) => {
//         console.log('Activate user:', rowData);
//         setActiveMenu(null);
//     };

//     const handleResetPassword = (rowData) => {
//         console.log('Reset password for user:', rowData);
//         setActiveMenu(null);
//     };

//     const handleMenuToggle = (index, event) => {
//         event.stopPropagation();
//         setActiveMenu(activeMenu === index ? null : index);
//     };

//     const handleInviteUser = () => {
//         setShowInvitePopup(true);
//     };

//     const handleClosePopup = () => {
//         setShowInvitePopup(false);
//     };

//     const handleFilterToggle = () => {
//         setShowFilterDropdown(!showFilterDropdown);
//     };

//     const handleFilterSelect = (filter) => {
//         setSelectedFilter(filter);
//         setShowFilterDropdown(false);
//     };

//     const handleSearchChange = (e) => {
//         setSearchValue(e.target.value);
//     };

//     const handleSearch = () => {
//         console.log('Search for:', searchValue, 'in', selectedFilter);
//         // Implement search functionality here
//     };

//     const handleReset = () => {
//         setSelectedFilter('Name');
//         setSearchValue('');
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
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
//                 {/* Header Section with Invite Button */}
//                 <div className="flex justify-between items-center mb-4 relative">
//                     <div className='text-2xl font-bold text-gray-900 dark:text-white'>
//                         User Management
//                     </div>
//                     <div className="relative" ref={inviteButtonRef}>
//                         <button
//                             onClick={handleInviteUser}
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//                         >
//                             <FaUserPlus className="w-5 h-5" />
//                             Invite User
//                         </button>

//                         {/* Invite User Popup */}
//                         {showInvitePopup && (
//                             <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96 p-6 z-50 border border-gray-200 dark:border-gray-700">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                                         Invite User
//                                     </h3>
//                                     <button
//                                         onClick={handleClosePopup}
//                                         className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//                                     >
//                                         ✕
//                                     </button>
//                                 </div>
//                                 <div className="space-y-4">
//                                     <Input2
//                                         label="Email"
//                                         type="email"
//                                         name="email"
//                                         placeholder=""
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         className="w-full"
//                                     />
//                                     <Input2
//                                         label="Role"
//                                         type="text"
//                                         name="role"
//                                         placeholder=""
//                                         value={formData.role}
//                                         onChange={handleChange}
//                                         className="w-full"
//                                     />
//                                     <Input2
//                                         label="Zone"
//                                         type="text"
//                                         name="zone"
//                                         placeholder=""
//                                         value={formData.zone}
//                                         onChange={handleChange}
//                                         className="w-full"
//                                     />
//                                 </div>
//                                 {/* Invite Button inside Popup */}
//                                 <div className="mt-6">
//                                     <button
//                                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors w-full justify-center"
//                                     >
//                                         <FaUserPlus className="w-5 h-5" />
//                                         Invite User
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Finder by Name Section */}
//                 <div className="flex mb-6 w-full max-w-2xl" ref={filterDropdownRef}>
//                     {/* Dropdown Button */}
//                     <div className="relative flex-shrink-0 w-32">
//                         <button
//                             onClick={handleFilterToggle}
//                             className="bg-white dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 flex items-center justify-between w-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                         >
//                             <span className="truncate">{selectedFilter}</span>
//                             <IoChevronDown className="w-4 h-4 flex-shrink-0" />
//                         </button>
                        
//                         {/* Dropdown Menu */}
//                         {showFilterDropdown && (
//                             <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
//                                 {columns.map((column) => (
//                                     <button
//                                         key={column}
//                                         onClick={() => handleFilterSelect(column)}
//                                         className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors first:rounded-t-md last:rounded-b-md"
//                                     >
//                                         {column.charAt(0).toUpperCase() + column.slice(1)}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
                    
//                     {/* Search Input Container */}
//                     <div className="flex flex-1">
//                         {/* Search Input */}
//                         <input
//                             type="text"
//                             placeholder={`Search by ${selectedFilter.toLowerCase()}...`}
//                             value={searchValue}
//                             onChange={handleSearchChange}
//                             className="flex-1 bg-white dark:bg-gray-800 border border-l-0 border-r-0 border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
                        
//                         {/* Search Button */}
//                         <button
//                             onClick={handleSearch}
//                             className="bg-white dark:bg-gray-800 border border-l-0 border-r-0 border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                         >
//                             <IoSearch className="w-5 h-5" />
//                         </button>
                        
//                         {/* Reset Button */}
//                         <button
//                             onClick={handleReset}
//                             className="bg-white dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                         >
//                             <IoClose className="w-5 h-5" />
//                         </button>
//                     </div>
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
//                                                 className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10"
//                                             >
//                                                 <button
//                                                     onClick={() => handleEdit(row)}
//                                                     className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors first:rounded-t-md flex items-center gap-3"
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
//                                                 <button
//                                                     onClick={() => handleResetPassword(row)}
//                                                     className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors last:rounded-b-md flex items-center gap-3"
//                                                 >
//                                                     <IoEye className="w-4 h-4 text-blue-500" />
//                                                     Reset Password
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
//             </div>
//         </div>
//     )
// }