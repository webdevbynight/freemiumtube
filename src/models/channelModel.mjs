import db from './index.mjs';

const getChannelByName = async (channel) =>
    {
        try
        {
            const sql =
                `SELECT id, description, channel AS channelId, title, url
                FROM users
                WHERE channel = ?`,
                [result] = await db.query(sql, [channel]);
            return result.length ? result[0] : {};
        }
        catch(err)
        {
            console.error(err);
        }
    };

export default { getChannelByName };
