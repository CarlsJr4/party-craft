import { Key } from 'react';

type EventType = {
  id: string;
  owned_by: string;
  title: string;
  date: Date;
  body: string;
  key?: Key;
};

export default EventType;
