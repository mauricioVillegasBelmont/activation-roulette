import React, { } from 'react';

import { ButtonSpin } from './gui';


interface HoldProps{
  toggleHold:()=>void
}

const Hold: React.FC<HoldProps> = ({
  toggleHold
}) => {
  return(
    <>
    <div className="main-wrapper flex justify-center items-center mx-auto my-auto relative">
      <ButtonSpin
        onClick={toggleHold}
        size={200}
        />
    </div>
    </>
  );

}
export default Hold