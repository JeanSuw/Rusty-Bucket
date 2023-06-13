export const formatUnixTime = (unixTime) => {
    const date = new Date(parseInt(unixTime));
  
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
  
    return date.toLocaleString('en-US', options);
  };
  