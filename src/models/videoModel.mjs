import db from './index.mjs';

const getAllVideosFromChannel = async (id) =>
    {
        try
        {
            const sql =
                `SELECT v.id AS id, v.title AS title, v.description AS description, src, views, published
                FROM videos v
                JOIN users u ON u.id = user_id
                WHERE u.id = ?
                ORDER BY uploaded DESC`,
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
                `SELECT v.id AS id, v.title AS title, v.description AS description, user_id AS userId, src, channel AS channelId, u.title AS channelTitle, views, published
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
    add = async (title, description, id, langId, status, src) =>
    {
        try
        {
            const isPublished = status >> 1,
                sql =
                    isPublished ?
                        `INSERT INTO videos (lang_id, user_id, src, title, description, uploaded, status, published)
                        VALUES(?, ?, ?, ?, ?, UNIX_TIMESTAMP(), ?, UNIX_TIMESTAMP());`
                    :
                        `INSERT INTO videos (lang_id, user_id, src, title, description, uploaded, status)
                        VALUES(?, ?, ?, ?, ?, UNIX_TIMESTAMP(), ?);`,
                [result] = await db.query(sql, [langId, id, src, title, description, status]);
            return result;
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
    add,
    increment
};
