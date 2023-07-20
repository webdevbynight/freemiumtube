import db from './index.mjs';

const getAllLanguages = async () =>
    {
        try
        {
            const [result] = await db.query('SELECT lang, description FROM languages ORDER BY lang');
            return result;
        }
        catch(err)
        {
            console.error(err);
        }
    };

export default { getAllLanguages };
