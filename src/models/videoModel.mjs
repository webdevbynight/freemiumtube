import db from './index.mjs';

const getVideoById = async (id) =>
    {
        try
        {
            const sql =
                `SELECT v.id AS id, v.title AS title, channel AS channelId, u.title AS channelTitle, views
                FROM videos v
                JOIN users u ON u.id = user_id
                WHERE v.id = ?`,
                [result] = await db.query(sql, [id]);
            return result;
        }
        catch(err)
        {
            console.error(err);
        }
    };

export default { getVideoById };
