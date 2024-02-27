'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'tranduythong.117@gmail.com',
      password: '123456',
      firstName: 'Duy',
      lastName: 'Thong',
      address: 'Van Phuc City',
      phoneNumber: '0906594117',
      gender: '1',
      roleId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};