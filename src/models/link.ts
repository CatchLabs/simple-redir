import * as Sequelize from 'sequelize';

interface LinkObject {
    linkId: string,
    linkToken: string,
    linkUrl: string
}

export default function(sequelize: Sequelize.Connection, DataTypes: Sequelize.DataTypes) {
    return sequelize.define('Link', {
        linkId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        linkToken: {
            type: DataTypes.STRING,
            unique: true
        },
        linkUrl: {
            type: DataTypes.STRING(4096)
        }
    }, {
        classMethods: {},
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
}