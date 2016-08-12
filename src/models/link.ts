import * as Sequelize from 'sequelize';

interface LinkObject {
    id?: string,
    token: string,
    url: string
}

interface LinkInstance extends Sequelize.Instance<LinkInstance, LinkObject>, LinkObject {}

export default function(sequelize: Sequelize.Connection, DataTypes: Sequelize.DataTypes = Sequelize) : Sequelize.Model<LinkInstance, LinkObject> {
    return sequelize.define('Link', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        token: {
            type: DataTypes.STRING,
            unique: true
        },
        url: {
            type: DataTypes.STRING(4096)
        }
    }, {
        classMethods: {},
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }) as any;
}