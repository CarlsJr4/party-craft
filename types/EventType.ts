import { Key } from 'react';

type EventType = {
  id: string;
  title: string;
  date: Date;
  body: string;
  key?: Key;
};

export default EventType;
