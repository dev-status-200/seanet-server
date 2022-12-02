const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-south-1',
    accessKeyId: 'AKIAZYMQOHYD4RKMME6E',
    secretAccessKey: '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',
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'routes';

const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const characters = await dynamoClient.scan(params).promise();
    console.log(characters.Items.map((x)=>{return x.routes}))
    return characters;
};

const addOrUpdateCharacter = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character,
    };
    return await dynamoClient.put(params).promise();
};

const updateRoute = async () => {

    const params = {
        TableName: TABLE_NAME,
        Key: {
            "id": "12345"
        },
        UpdateExpression: "SET #attrName = list_append(#attrName, :attrValue)",
        ExpressionAttributeNames: {
            "#attrName": "routes"
        },
        ExpressionAttributeValues: {
            ":attrValue": [[24.5347,67.194]],
        }
    };
    dynamoClient.update(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
};

// const getCharacterById = async (id) => {
//     const params = {
//         TableName: TABLE_NAME,
//         Key: {
//             id,
//         },
//     };
//     return await dynamoClient.get(params).promise();
// };
// const deleteCharacter = async (id) => {
//     const params = {
//         TableName: TABLE_NAME,
//         Key: {
//             id,
//         },
//     };
//     return await dynamoClient.delete(params).promise();
// };

const data = {
    id:'12345',
    routes:[
        [123,456]
    ]
}

//addOrUpdateCharacter(data);
//getCharacters()
//updateRoute()
module.exports = { dynamoClient };