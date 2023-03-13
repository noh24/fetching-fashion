import React from "react";
import { nanoid } from "nanoid";

const Rating = (props) => {
  const { rating, reviews } = props;
  const star = Math.floor(rating);

  let filledStars = [];
  let emptyStars = [];
  for (let i = 0; i < star; i++) {
    filledStars.push(
      <span aria-hidden='true' key={nanoid()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-5 h-5'
        >
          <path
            fillRule='evenodd'
            d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
            clipRule='evenodd'
          />
        </svg>
      </span>
    );
  }
  for (let i = 0; i < 5 - star; i++) {
    emptyStars.push(
      <span aria-hidden='true' key={nanoid()}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
          />
        </svg>
      </span>
    );
  }
  return (
    <div className='flex flex-col items-center lg:items-start gap-2 text-amber-400'>
      <span className='flex items-center gap-2 text-sm rounded text-slate-500'>
        <span
          className='flex gap-1 text-yellow-400'
          role='img'
          aria-label={`Rating: ${rating} out of 5 stars`}
        >
          {filledStars.map((item) => item)}
          {emptyStars.map((stars) => stars)}
        </span>
        {/* <span>{rating} out 5.0</span> */}
        <span className='text-xs leading-6 text-slate-400'>({reviews})</span>
      </span>
    </div>
  );
};

export default Rating;
