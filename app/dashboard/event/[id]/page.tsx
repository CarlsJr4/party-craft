import React from 'react';

const page = ({ params }: { params: { id: string } }) => {
  return <div>Special event page for {params.id}</div>;
};

export default page;
