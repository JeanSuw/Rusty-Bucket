export function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString('en-US');
  }
  