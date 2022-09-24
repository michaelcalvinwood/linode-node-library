require('dotenv').config();
const linodeToken = process.env.LINODE_TOKEN;
const publicKey = process.env.PUBLIC_KEY;
console.log(publicKey);

const axios = require('axios');

const prettyJSON = obj => {
    return JSON.stringify(obj, null, 4);
}

const show = obj => {
    console.log(prettyJSON(obj));
}

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

// returns linode types sorted cheapest to most expensive
const linodeTypes = async () => {
    let types = await linodeGet('https://api.linode.com/v4/linode/types');

    let { data } = types;

    return data.sort((a, b) => a.price.monthly = b.price.monthly);
}

// const linodeCreateInstance = async params => {
    
// }

const test = async () => {
    // let list = await linodeCreateInstance({
    //     authorized_keys: [publicKey],
    //     backups_enabled: false,
    //     label: 'test-linode',
    //     private_ip: false,
    //     region: 'us-east',
    //     root_pass: 'simpleTest123'

    // });
    
    let types = await linodeTypes();
    show(types);

}

test();