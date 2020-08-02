const orderEventsByDate = list => {
  return list.sort((a, b) => {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateA - dateB;
  });
}

exports.orderEventsByDate = orderEventsByDate;
