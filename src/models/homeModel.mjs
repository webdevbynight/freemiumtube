import db from './index.mjs';

const getTopPopularVideos = async () =>
    {
        try
        {
            const sql =
                `SELECT v.id AS id, v.title AS title, channel AS channelId, u.title AS channelTitle, views
                FROM videos v
                JOIN users u ON u.id = user_id
                WHERE status >> 2 = 1
                ORDER BY views DESC, published DESC`,
                [result] = await db.query(sql);
            return result;
        }
        catch(err)
        {
            console.error(err);
        }
    };

export default { getTopPopularVideos };
