// import React from 'react'

// function AttendencePopUpFooter({close, pending}) {
//   return (
//             <div className="flex justify-end gap-3">
//           <button
//             onClick={close}
//             className="px-4 py-2 text-sm rounded-md
//                        border border-[var(--border)]
//                        text-[var(--text)]"
//           >
//             Close
//           </button>

//           <button
//             className={`px-4 py-2 text-sm rounded-md text-white
//               ${
//                 pending
//                   ? "bg-[var(--primary)]"
//                   : "bg-gray-600 cursor-default"
//               }`}
//           >
//             {pending ? "Submit" : "Completed"}
//           </button>
//         </div>
//   )
// }

// export default AttendencePopUpFooter

function AttendencePopUpFooter({ pending }) {
  return (
    <div className="flex justify-end gap-3">
       <button
         data-modal-close
            className="px-4 py-2 text-sm rounded-md
                       border border-[var(--border)]
                       text-[var(--text)]"
          >
            Close
          </button>

      <button className={`px-4 py-2 text-sm rounded-md text-white
              ${
                pending
                  ? "bg-[var(--primary)]"
                  : "bg-gray-600 cursor-default"
              }`}>
        {pending ? "Submit" : "Completed"}
      </button>
    </div>
  );
}

export default AttendencePopUpFooter;
