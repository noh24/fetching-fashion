import React from 'react'
import sizingData from '../data/sizingData';

const SizeTable
 = () => {
  return (
    <section className='my-24 flex flex-col items-center max-w-2xl w-full font-light'>
        <h1 className='text-2xl mb-12'>Size by Measurements</h1>
        <table className='table-fixed text-center w-full'>
          <thead>
            <tr className='uppercase text-sm border-b'>
              <th className='py-4 px-2'>Size: Inches</th>
              <th className='py-4 px-2'>Chest</th>
              <th className='py-4 px-2'>Neck</th>
              <th className='py-4 px-2'>Back</th>
            </tr>
          </thead>
          <tbody>
            {sizingData.map(size => (
              <tr key={size.size} className='hover:bg-gray-200'>
                <td className='py-2 px-2 font-medium'>{size.size}</td>
                <td>{size.chest}</td>
                <td>{size.neck}</td>
                <td>{size.back}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
  )
}

export default SizeTable
