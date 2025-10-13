import React from 'react'

function PriceRangeFilter() {
  return (
    <>
        <div className="mb-6">
            <h4 className="font-semibold mb-3 text-md">Price Range</h4>
            <input type="range" className="w-full h-1 accent-[#15144E] rounded-lg cursor-pointer bg-[#E5E7EB] range-slider" min="7566" max="93066" />
            <div className="flex justify-between text-base font-semibold">
            <span>₹7,566</span>
            <span>₹9,3066</span>
            </div>
        </div>     
    </>
  )
}

export default PriceRangeFilter
