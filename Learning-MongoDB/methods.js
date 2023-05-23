async function listColls(db) {
    const colls = db.listCollections();
    return (await colls.toArray()).map(coll => coll.name);
}

async function groupUsersByCommentsCount(db, coll, name, limit=10) {
    const cur = db.collection(coll).aggregate([
        { $match: { name: {$regex: name}}},
        { $group: { _id: "$name", comments: { $sum: 1}}},
        { $limit: limit},
        { $sort: { name: 1}}
    ])

    return await cur.toArray();
}

async function getCommentsByUsername(db, coll, name, limit=10) {
    const cur = db.collection(coll).aggregate([
        { $match: { name: {$regex: name}}},
        { $group: { _id: "$name", comments: { $addToSet: "$text"}}},
        { $limit: limit},
        { $sort: { _id: 1}}
    ]);

    return await cur.toArray();
}

module.exports = {
    listColls,
    groupUsersByCommentsCount,
    getCommentsByUsername,
}