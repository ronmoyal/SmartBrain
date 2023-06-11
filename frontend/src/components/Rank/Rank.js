import React from 'react';

const Rank = ({user})=> {
  return (
    <div>
      
      <div className='white f2'>
{/*         {`${user.name}, your current entry count is...`}
 */}        {`Welcome ${user.name} ...`}
      </div>

      <div className='white f2'>
{/*         {user.entries}
 */}      </div>

    </div>
  );
  }

export default Rank;