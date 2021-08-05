const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        date_joined: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password= await bcrypt.hash(newUserData.password, 15);
                return newUserData;
            },
            async beforeCreate(updateUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 15);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName:true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;