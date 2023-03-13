import React from "react";

const SizeGuide = () => {
  return (
    <section className='px-2 space-y-4 mb-24'>
      <div className='flex justify-between space-y-4 space-x-4'>
        <div className='flex flex-col text-sm text-justify space-y-4'>
          <p className='uppercase font-medium text-gray-500'>
            Back Length
          </p>
          <p className='text-gray-800'>
            Measure from the base of your dogs neck{" "}
            <span className='text-gray-500 italic font-light'>
              right below where their collar would sit
            </span>{" "}
            all the way to just above the top of their tail.
          </p>
        </div>
        <img
          src='/images/back-length.png'
          alt='back-length-guide'
          className='w-28 '
        />
      </div>
      <div className='flex justify-between space-y-4 space-x-4 w-full'>
        <div className='flex flex-col text-sm text-justify space-y-4'>
          <p className='uppercase font-medium text-gray-500'>
            CHEST GIRTH
          </p>
          <p className='text-gray-800'>
            Measure around the largest part of your dogs chest, just behind
            their front legs.
          </p>
        </div>
        <img
          src='/images/chest-girth.png'
          alt='/images/chest-girth.png'
          className='w-28'
        />
      </div>
    </section>
  );
};

export default SizeGuide;
