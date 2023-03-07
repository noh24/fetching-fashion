import React from 'react'
import sizingData from '../data/sizingData';

const SizeGuide
 = () => {
  return (
    <section>
        <h1>Size by Measurements</h1>
        <table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest</th>
              <th>Neck</th>
              <th>Back</th>
            </tr>
          </thead>
          <tbody>
            {sizingData.map(size => (
              <tr key={size.size}>
                <td>{size.size}</td>
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

export default SizeGuide
