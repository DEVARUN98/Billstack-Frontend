// export default function SearchTypeDropdown({
//   types = [
//     { key: "all", label: "All" },
//     { key: "title", label: "Title" },
//     { key: "author", label: "Author" },
//     { key: "tag", label: "Tag" },
//   ],
//   onSearch = (query, typeKey) => {
//     // Default: just log. In your app replace with real handler.
//     console.log("Search ->", { query, typeKey });
//   },
//   placeholder = "Search...",
// }) {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [selected, setSelected] = useState(types[0]);
//   const [highlightIndex, setHighlightIndex] = useState(-1);

//   const dropdownRef = useRef(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     function onDocClick(e) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//         setHighlightIndex(-1);
//       }
//     }
//     document.addEventListener("click", onDocClick);
//     return () => document.removeEventListener("click", onDocClick);
//   }, []);

//   // keyboard handling for accessibility
//   useEffect(() => {
//     function onKeyDown(e) {
//       if (!open) return;
//       if (e.key === "ArrowDown") {
//         e.preventDefault();
//         setHighlightIndex((i) => Math.min(i + 1, types.length - 1));
//       } else if (e.key === "ArrowUp") {
//         e.preventDefault();
//         setHighlightIndex((i) => Math.max(i - 1, 0));
//       } else if (e.key === "Enter") {
//         e.preventDefault();
//         if (highlightIndex >= 0 && highlightIndex < types.length) {
//           selectType(types[highlightIndex]);
//         }
//       } else if (e.key === "Escape") {
//         setOpen(false);
//         setHighlightIndex(-1);
//       }
//     }
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [open, highlightIndex, types]);

//   function toggle() {
//     setOpen((v) => !v);
//     setHighlightIndex(-1);
//   }

//   function selectType(type) {
//     setSelected(type);
//     setOpen(false);
//     setHighlightIndex(-1);
//     inputRef.current?.focus();
//   }

//   function submitSearch(e) {
//     e?.preventDefault();
//     onSearch(query.trim(), selected.key);
//   }

//   function clear() {
//     setQuery("");
//     inputRef.current?.focus();
//   }

//   return (
//     <div className="w-full max-w-lg">
//       <form onSubmit={submitSearch} className="flex items-center gap-2">
//         <div className="relative" ref={dropdownRef}>
//           <button
//             type="button"
//             aria-haspopup="listbox"
//             aria-expanded={open}
//             onClick={toggle}
//             className="inline-flex items-center gap-2 px-3 py-2 border rounded-l-lg shadow-sm bg-white text-sm"
//           >
//             <span className="font-medium">{selected.label}</span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.977a.75.75 0 111.08 1.04l-4.25 4.56a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>

//           {open && (
//             <ul
//               role="listbox"
//               aria-label="Search type"
//               tabIndex={-1}
//               className="absolute z-20 mt-1 w-40 bg-white border rounded-md shadow-lg py-1 max-h-52 overflow-auto"
//             >
//               {types.map((t, idx) => (
//                 <li
//                   key={t.key}
//                   role="option"
//                   aria-selected={selected.key === t.key}
//                   onMouseEnter={() => setHighlightIndex(idx)}
//                   onMouseLeave={() => setHighlightIndex(-1)}
//                   onClick={() => selectType(t)}
//                   className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 flex justify-between items-center ${
//                     highlightIndex === idx ? "bg-gray-100" : ""
//                   } ${selected.key === t.key ? "font-semibold" : ""}`}
//                 >
//                   <span>{t.label}</span>
//                   {selected.key === t.key && (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.704 5.29a1 1 0 010 1.414l-7.07 7.07a1 1 0 01-1.415 0L3.296 8.85a1 1 0 111.414-1.415l4.12 4.12 6.37-6.37a1 1 0 011.415 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div className="flex-1 relative">
//           <input
//             ref={inputRef}
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder='hhehhhe'
//             className="w-full px-4 py-2 border-t border-b border-r rounded-r-lg focus:outline-none"
//             aria-label={Search ${selected.label}}
//           />

//           {query && (
//             <button
//               type="button"
//               onClick={clear}
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-60"
//               aria-label="Clear search"
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:opacity-95"
//           aria-label="Perform search"
//         >
//           Search
//         </button>
//       </form>

//       {/* Small helper/footer */}
//       <div className="mt-2 text-xs text-gray-500">
//         Searching for <span className="font-medium">{query || '...'}</span> in
//         <span className="font-medium"> {selected.label}</span>
//       </div>
//     </div>
//   );
// }

