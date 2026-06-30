// function FilterBar({applyFilter, activeFilter}){
//     return(
//         <div>
//             <button className="" onClick={()=>{applyFilter('All')}}>
//                 All
//             </button>

//             <button onClick={()=>{applyFilter('Applied')}}>
//                 Applied
//             </button>

//             <button onClick={()=>{applyFilter('Interview')}}>
//                 Interviewd
//             </button>

//             <button onClick={()=>{applyFilter('Offer')}}>
//                 Offer
//             </button>

//             <button onClick={()=>{applyFilter('Rejected')}}>
//                 Rejected
//             </button>
//         </div>
//     );
// }

// export default FilterBar;


function FilterBar({ activeFilter, applyFilter }) {
  const filters = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

  return (
    <div className="filter-bar">
      {filters.map(filter => (
        <button
          key={filter}
          className={`filter-btn ${activeFilter === filter ? 'filter-btn-active' : ''}`}
          onClick={() => applyFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;