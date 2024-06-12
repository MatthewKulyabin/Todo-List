import { ReactElement } from 'react';

export const getDateFromString = (str: string): ReactElement => {
  let result = (
    <h3>
      {new Date(str).toLocaleDateString()}
      <br />
      {new Date(str).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}
    </h3>
  );
  return result;
};
