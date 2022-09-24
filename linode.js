require('dotenv').config();

const linodeToken = process.env.LINODE_TOKEN;

const axios = require('axios');

const linodeGet = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        let request = {
            url,
            params,
            method: 'get',
            headers: {
                Authorization: `Bearer ${linodeToken}`
            }
        };
        axios(request)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
}

const linodeAccountView = async () => {
    return await linodeGet('https://api.linode.com/v4/account');
}

const linodeRegionsList = async () => {
    return await linodeGet(' https://api.linode.com/v4/regions');
}

const linodeList = async (page = 1, page_size = 100) => {
    return await linodeGet('https://api.linode.com/v4/linode/instances', {
        page,
        page_size
    })
}

const test = async () => {
    let list = await linodeRegionsList();
    console.log(list);
}

test();