import React from 'react'

function TableCoins({children}:{children:React.ReactNode}) {
  return (
    <table className="min-w-full text-sm text-gray-700   rounded-xl overflow-hidden ">
                        <thead className="bg-slate-950">
                            <tr className="text-white text-sm">
                                <th className="px-4 py-3 border border-gray-800">#</th>
                                <th className="px-4 py-3 border border-gray-800">Name</th>
                                <th className="px-4 py-3 border border-gray-800">Symbol</th>
                                <th className="px-4 py-3 border border-gray-800">Price</th>
                                <th className="px-4 py-3 border border-gray-800">1h %</th>
                                <th className="px-4 py-3 border border-gray-800">24h %</th>
                                <th className="px-4 py-3 border border-gray-800">7d %</th>
                                <th className="px-4 py-3 border border-gray-800">Market Cap</th>
                                <th className="px-4 py-3 border border-gray-800">Date Added</th>
                                <th className="px-4 py-3 border border-gray-800"> Favorite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {children}
                        </tbody>
                    </table>
  )
}

export default TableCoins