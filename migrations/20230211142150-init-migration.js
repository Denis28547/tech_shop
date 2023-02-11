"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "USER",
      },
      activationLink: {
        type: DataTypes.STRING,
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
      },
      email_verified: {
        type: DataTypes.DATE,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      // rating_id: {
      //   type: DataTypes.UUID,
      // },
    });
    await queryInterface.createTable("accounts", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.TEXT,
      },
      user_id: {
        type: DataTypes.TEXT,
      },
      provider: {
        type: DataTypes.TEXT,
      },
      provider_account_id: {
        type: DataTypes.TEXT,
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
      access_token: {
        type: DataTypes.TEXT,
      },
      expires_at: {
        type: DataTypes.INTEGER,
      },
      token_type: {
        type: DataTypes.TEXT,
      },
      scope: {
        type: DataTypes.TEXT,
      },
      id_token: {
        type: DataTypes.TEXT,
      },
      session_state: {
        type: DataTypes.TEXT,
      },
      oauth_token_secret: {
        type: DataTypes.TEXT,
      },
      oauth_token: {
        type: DataTypes.TEXT,
      },
    });
    await queryInterface.createTable("ratings", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    });
    await queryInterface.createTable("categories", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      backgroundColor: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
    });
    await queryInterface.createTable("items", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(90),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(12),
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      category_id: {
        type: DataTypes.UUID,
      },
    });
    await queryInterface.createTable("favorites", {
      user_id: {
        type: DataTypes.UUID,
      },
      item_id: {
        type: DataTypes.UUID,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropAllTables();
  },
};
