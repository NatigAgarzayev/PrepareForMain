import React from 'react'
function SidebarRight({ popularPosts }) {
    return (
        <div>
            <div className="pt-20 flex flex-col h-screen bg-white shadow w-[300px]">
                <div className="space-y-3">
                    <div className="flex items-center">
                        <h2 className="ml-10 text-xl font-light uppercase">Popular Questions</h2>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            {
                                popularPosts.length > 0
                                    ? (popularPosts.map(item => (
                                        <li key={item._id} className="rounded-sm hover:bg-blue-600/20 border-r-4 border-white hover:border-r-4 hover:border-indigo-500">
                                            <div
                                                to="/"
                                                className="flex items-center p-2 pl-10 space-x-3 rounded-md"
                                            >
                                                <span className='font-bold text-gray-700 text-xl overflow-hidden text-ellipsis whitespace-nowrap w-44'>{item.title}</span>
                                            </div>
                                        </li>

                                    )))
                                    : (<div>No popular posts!</div>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SidebarRight