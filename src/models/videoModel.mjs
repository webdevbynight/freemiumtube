import db from './index.mjs';

const getAllVideosFromChannel = async (id) =>
    {
        try
        {
            const sql =
                `SELECT v.id AS id, v.title AS title, v.description AS description, src, views, published
                FROM videos v
                JOIN users u ON u.id = user_id
                WHERE u.id = ?`,
                [result] = await db.query(sql, [id]);
            return result;
        }
        catch(err)
        {
            console.error(err);
        }
    },
    getVideoById = async (id) =>
    {
        try
        {
            const sql =
                `SELECT v.id AS id, v.title AS title, v.description AS description, src, channel AS channelId, u.title AS channelTitle, views, published
                FROM videos v
                JOIN users u ON u.id = user_id
                WHERE v.id = ?`,
                [result] = await db.query(sql, [id]);
            return result.length ? result[0] : {};
        }
        catch(err)
        {
            console.error(err);
        }
    },
    increment = async (id) =>
    {
        try
        {
            const sql = `UPDATE videos SET views = views + 1 WHERE id = ?`,
                [result] = await db.query(sql, [id]);
            return result;
        }
        catch(err)
        {
            console.error(err);
        }
    };

export default
{
    getAllVideosFromChannel,
    getVideoById,
    increment
};
