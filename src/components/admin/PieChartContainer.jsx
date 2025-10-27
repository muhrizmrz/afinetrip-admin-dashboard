import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function PieChartContainer() {
  return ( 
    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center bg-white rounded-lg">
      {sections.map((section, index) => {
        const COLORS = ['#39F908','#9A9AFF', '#F6E228'];
        const bgCOLORS = ['#DFFFD8','#EDEDFF','#FFFBD7'];
        return (
        <div key={index} className="flex flex-col items-center justify-center py-5" >
          
          <div className="relative w-[250px] h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feOffset dx="0" dy="0" />
                    <feGaussianBlur stdDeviation="3" result="offset-blur" />
                    <feComposite
                      operator="out"
                      in="SourceGraphic"
                      in2="offset-blur"
                      result="inverse"
                    />
                    <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color" />
                    <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                    <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                  </filter>
                </defs>
                {/* Background Circle */}
                <Pie
                  data={[{ value: 100 }]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="80%"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  fill={bgCOLORS[index % bgCOLORS.length]}
              
                
                />
                <Pie
                  data={[
                    { value: section.percent },
                    { value: 100 - section.percent },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="80%"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  <Cell fill={COLORS[index % COLORS.length]} />
                  <Cell fill="transparent" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#0C004C]">
                {section.percent}%
              </span>  
            </div>
          </div>

          <div className="text-md text-[#7C7C7D]  text-center">
            <p className='font-normal'>
                {section.label}
              </p>
              <p className='font-bold'>
                {section.value}
              </p>
            </div>
        </div>
      );
    })}
    </div>
  )
}

export default PieChartContainer
