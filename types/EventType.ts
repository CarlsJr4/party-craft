import { Key } from 'react';

type EventType = {
  id: Key;
  title: string;
  date: Date;
  body: string;
  key: Key;
};

export default EventType;
