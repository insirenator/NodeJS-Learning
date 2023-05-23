const { 
    listColls,
    groupUsersByCommentsCount, 
    getCommentsByUsername,
} = require('./methods');

const { MongoClient } = require('mongodb');
const MONGO_URL = 'mongodb+srv://shakeeb:1491012@nodeexpressprojects.zgxc1fz.mongodb.net/sample_mflix?retryWrites=true&w=majority';
const client = new MongoClient(MONGO_URL);

client.connect()
    .then(async () => {
        // console.log('Connection Successful!');
        await main();
    })
    .catch((err) => {
        console.log('Connection Failed. Error: ', err);
    })
    .finally(() => {
        // console.log('Connection Closed!');
        client.close()
    });

async function main() {
    const db = client.db();
    // const result = await groupUsersByCommentsCount(db, 'comments', /^a/i)
    // console.log(result);

    // const result = await getCommentsByUsername(db, 'comments', /^am/i, 3);
    // console.log(result);
    
    // const cur = db.collection('comments').aggregate([ 
    //     { $group: { _id: "$name", comments: { $addToSet: "$text"} } },
    //     { $sort : { _id: 1}},
    //     { $merge: { into: 'userComments', on: "_id"}}
    // ]);

    // const cur = db.collection('movies').aggregate([
    //     { $match: { num_mflix_comments: { $eq: 3}}},
    //     { $lookup: { 
    //         from: "comments", 
    //         localField: "_id",
    //         foreignField: "movie_id",
    //         as: "comments",
    //     }},
    //     { $project: { title: 1, num_mflix_comments: 1, comments: 1}},
    // ]).limit(10);

    // const result = await db.collection('movies').distinct('imdb.rating');

    // const cur = db.collection('movies').aggregate([
    //     { $unwind: "$genres"},
    //     { $group: { _id: "$genres", number: {$sum: 1}}},
    //     { $project: { genres: 1, number: 1}},
    //     { $sort: { number: -1}},
    //     // { $limit: 10}
    // ]);

    // const res = await db.collection('movies').updateMany(
    //     {"imdb.rating": ""},
    //     {$set: {"imdb.rating": 10}}
    // );
    // console.log(res);

    const cur = db.collection('movies').aggregate([
        {$group: {_id: "$imdb.rating", total: {$sum: 1}}},
        { $sort: { _id: -1}}
    ]);

    const result = await cur.toArray();
    console.log(result);
    
}