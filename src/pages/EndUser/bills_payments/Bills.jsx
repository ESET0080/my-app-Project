
import React, { useState, useEffect } from 'react'
import { billsData } from './billsData' // Import the local data

export default function Bills() {
  const [billsDataState, setBillsDataState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    // Simulate API call with setTimeout to show loading state
    const fetchBills = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use the local data instead of API call
        setBillsDataState(billsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bills data');
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(billsDataState.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = billsDataState.slice(startIndex, startIndex + rowsPerPage);

  const handleView = (rowData) => {
    console.log('View bill:', rowData);
    // You can add modal or detailed view logic here
    alert(`Viewing bill for ${rowData.Month}\nAmount: ${rowData.Amount}\nDue Date: ${rowData.DueDate}\nStatus: ${rowData.Status}`);
  };

  const handlePay = (rowData) => {
    console.log('Pay bill:', rowData);
    // You can add payment processing logic here
    if (rowData.Status === 'Paid') {
      alert(`Bill for ${rowData.Month} is already paid.`);
    } else {
      alert(`Proceeding to payment for ${rowData.Month}\nAmount: ${rowData.Amount}`);
      // Here you would typically redirect to payment gateway or show payment form
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
  const columns = ['Month', 'Amount', 'DueDate', 'Status'];

  if (loading) return <div className="text-gray-900 dark:text-white">Loading bills...</div>;
  if (error) return <div className="text-red-600 dark:text-red-400">Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-700 min-h-screen">
      <div className="p-4">
        <div className='text-2xl font-bold mb-4 flex justify-start text-gray-900 dark:text-white'> 
          My Bills 
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
                      {row[column]}
                    </td>
                  ))}
                  <td className="py-3 px-4 border-b border-gray-900 dark:border-gray-600">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(row)}
                        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handlePay(row)}
                        className={`px-3 py-1 rounded text-sm ${
                          row.Status === 'Paid' 
                            ? 'bg-gray-400 dark:bg-gray-500 cursor-not-allowed text-white' 
                            : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white'
                        }`}
                        disabled={row.Status === 'Paid'}
                      >
                        {row.Status === 'Paid' ? 'Paid' : 'Pay'}
                      </button>
                    </div>
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
            className={`px-4 py-2 rounded ${
              currentPage === 1 
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
                  className={`px-3 py-2 rounded text-sm ${
                    currentPage === page
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
            className={`px-4 py-2 rounded ${
              currentPage === totalPages 
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' 
                : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-white'
            }`}
          >
            Next
          </button>
        </div>

        {/* Page Info */}
        <div className="text-center mt-2 text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages} | Showing {currentRows.length} of {billsDataState.length} bills
        </div>

        {/* Note Section - Left aligned at the bottom */}
        <div className="mt-4 font-bold text-gray-600 dark:text-gray-400 italic text-left">
          Note: All Bills are generated on the first of each month
        </div>
      </div>
    </div>
  );
}














// import React, { useState, useEffect } from 'react'

// export default function Bills() {
//   const [billsData, setBillsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   useEffect(() => {
//     const fetchBills = async () => {
//       try {
//         const response = await fetch('http://localhost:5042/api/CollageApp/students/all');
//         if (!response.ok) {
//           throw new Error('Failed to fetch bills');
//         }
//         const result = await response.json();
//         setBillsData(result);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchBills();
//   }, []);

//   // Calculate pagination values
//   const totalPages = Math.ceil(billsData.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const currentRows = billsData.slice(startIndex, startIndex + rowsPerPage);

//   const handleView = (rowData) => {
//     console.log('View bill:', rowData);
//   };

//   const handlePay = (rowData) => {
//     console.log('Pay bill:', rowData);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Generate page numbers with ellipsis - current page + 2 neighbors
//   const getPageNumbers = () => {
//     const pageNumbers = [];
    
//     if (totalPages <= 5) {
//       // Show all pages if total pages is 5 or less
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       // Always show first page
//       pageNumbers.push(1);
      
//       // Calculate the range around current page
//       let startPage = Math.max(2, currentPage - 1);
//       let endPage = Math.min(totalPages - 1, currentPage + 1);
      
//       // Add ellipsis after first page if there's a gap
//       if (startPage > 2) {
//         pageNumbers.push('...');
//       }
      
//       // Add pages around current page (current page + 1 before + 1 after)
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }
      
//       // Add ellipsis before last page if there's a gap
//       if (endPage < totalPages - 1) {
//         pageNumbers.push('...');
//       }
      
//       // Always show last page
//       pageNumbers.push(totalPages);
//     }
    
//     return pageNumbers;
//   };

//   // Get column names from the first data item
//   const columns = billsData.length > 0 ? Object.keys(billsData[0]) : [];

//   if (loading) return <div className="text-gray-900 dark:text-white">Loading...</div>;
//   if (error) return <div className="text-red-600 dark:text-red-400">Error: {error}</div>;

//   return (
//     <div className="bg-white dark:bg-gray-700 min-h-screen">
//       <div className="p-4">
//         <div className='text-2xl font-bold mb-4 flex justify-start text-gray-900 dark:text-white'> 
//           My Bills 
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-900 dark:border-gray-700">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-800">
//                 {columns.map((column) => (
//                   <th key={column} className="py-3 px-4 border-b border-r border-gray-900 dark:border-gray-600 text-left font-semibold last:border-r-0 text-gray-900 dark:text-white">
//                     {column.charAt(0).toUpperCase() + column.slice(1)}
//                   </th>
//                 ))}
//                 <th className="py-3 px-4 border-b border-gray-900 dark:border-gray-600 text-left font-semibold text-gray-900 dark:text-white">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((row, index) => (
//                 <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                   {columns.map((column) => (
//                     <td key={column} className="py-3 px-4 border-b  border-r border-gray-900 dark:border-gray-600 last:border-r-0 text-gray-900 dark:text-white">
//                       {row[column]}
//                     </td>
//                   ))}
//                   <td className="py-3 px-4 border-b border-gray-900 dark:border-gray-600">
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleView(row)}
//                         className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => handlePay(row)}
//                         className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
//                       >
//                         Pay
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={handlePrev}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded ${
//               currentPage === 1 
//                 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' 
//                 : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-white'
//             }`}
//           >
//             Previous
//           </button>
          
//           {/* Page Number Buttons */}
//           <div className="flex space-x-2">
//             {getPageNumbers().map((page, index) => (
//               page === '...' ? (
//                 <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500 dark:text-gray-400">
//                   ...
//                 </span>
//               ) : (
//                 <button
//                   key={page}
//                   onClick={() => handlePageClick(page)}
//                   className={`px-3 py-2 rounded text-sm ${
//                     currentPage === page
//                       ? 'bg-gray-800 dark:bg-gray-600 text-white'
//                       : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               )
//             ))}
//           </div>
          
//           <button
//             onClick={handleNext}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded ${
//               currentPage === totalPages 
//                 ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400' 
//                 : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500 text-white'
//             }`}
//           >
//             Next
//           </button>
//         </div>

//         {/* Note Section - Left aligned at the bottom */}
//         <div className="mt-4 font-bold text-gray-600 dark:text-gray-400 italic text-left">
//           Note: All Bills are generated on the first of each month
//         </div>
//       </div>
//     </div>
//   )
// }





