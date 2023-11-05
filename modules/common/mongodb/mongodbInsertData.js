const processDocument  = (doc) => ({
      poster: doc.poster || null,
      title: doc.title || null,
      venue: doc.venue || null,
      location: doc.location || null,
      tel: doc.tel || null, 
      explanation: doc.explanation || null,
      level: doc.level || null,
      timeLimit: doc.duration || null,
      price: doc.price || null,
      minHeadcount: doc.minHeadcount || null,
      maxHeadcount: doc.maxHeadcount || null,
      genre: doc.themeGenre || null,
      activity: doc.activityLevel || null,
      horror: doc.fearLevel || null,
      lockRatio: doc.deviceRatio || null,
      reservationNotice: doc.reservationNotice || null
  });

const mongodbInsertData = async (bid, data, collection) => {
  const processedData = data.map(doc => processDocument(doc));

  const existingDataCount = await collection.countDocuments({ bid: bid });

  if (isDataExist(existingDataCount)) {
    await collection.updateMany({ bid: bid }, { $set: processedData[0] });
  } else {
    await collection.insertMany(processedData);
  }
};

const isDataExist = (existingDataCount) => existingDataCount > 0;

export default mongodbInsertData;