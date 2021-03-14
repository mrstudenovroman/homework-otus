import React, { FC, memo } from 'react';

const Courses: FC = () => {
  console.log('hello')
  return <div>Тут будут курсы</div>;
};

export default memo(Courses);
