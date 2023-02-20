import React from 'react'

function Settings() {

    const handleTheme = () => {
        if (window.localStorage.getItem('theme') === null) {
            window.localStorage.setItem('theme', 'dark')
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
            return;
        }
        if (window.localStorage.getItem('theme') === 'light') {
            window.localStorage.setItem('theme', 'dark')
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
        }
        else if (window.localStorage.getItem('theme') === 'dark') {
            window.localStorage.setItem('theme', 'light')
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
        }
    }

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[350px] mx-auto">
            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl mx-auto font-bold leading-none text-gray-900 dark:text-white">Settings</h3>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-3 sm:py-4">
                            <label className="relative flex items-center justify-between cursor-pointer">
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark mode</span>
                                {/* <div>
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-[45px] h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[22px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </div> */}
                                <div onClick={handleTheme} className='w-5 h-5 bg-slate-400 cursor-pointer rounded-full'></div>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Settings