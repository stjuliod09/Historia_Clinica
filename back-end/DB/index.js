const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('emr-is', 'emr-is', 'zY@u4Wpy', {
  host: '200.7.102.150',
  port: 3306,
  dialect: 'mysql'
});

// Prueba de conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });


const city = sequelize.define("city",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    code:{
        type : DataTypes.STRING,
        allowNull: false,
    },
    state_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    tableName: 'city', 
  })

const state = sequelize.define("state", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    code:{
        type : DataTypes.STRING,
        allowNull: false,
    },
    country_id:{
        type: DataTypes.INTEGER,
        allowNull:false
    }
}, {
    tableName: 'state',
  })

const person = sequelize.define('person', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  second_name: {
    type: DataTypes.STRING
  },
  first_last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  second_last_name: {
    type: DataTypes.STRING
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false
  },
  sex_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  city_of_birth: {
    type: DataTypes.INTEGER,  
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'person',
  underscored: true, 
});

const patient = sequelize.define('patient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_active: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
 created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'patient',
  underscored: true, 
});

const previous_history = sequelize.define('previous_history', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  personal: {
    type: DataTypes.INTEGER
  },
  relative: {
    type: DataTypes.STRING,
    allowNull: false
  },
  antecedent_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  approximated_date_of_ocurrence: {
    type: DataTypes.DATE,
    allowNull: false
  },
  value:{
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'previous_history',
  underscored: true, 
});

const antecedent_type = sequelize.define("antecedent_type",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    code:{
        type : DataTypes.STRING,
        allowNull: false,
    },
})

const previous_history_follow_up = sequelize.define('previous_history_follow_up', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  previous_history_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status_id: {
    type: DataTypes.INTEGER
  },
  obs: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'previous_history_follow_up',
  underscored: true, // Mueve underscored aquí, dentro del mismo objeto
});

const person_identifier = sequelize.define('person_identifier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  identifier_type_id: {
    type: DataTypes.INTEGER
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'person_identifier',
  underscored: true, 
});

const identifier_type = sequelize.define("identifier_type",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    code:{
        type : DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'identifier_type',
    underscored: true, 
  })

const contact = sequelize.define('contact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contact_type_id: {
    type: DataTypes.INTEGER
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  obs: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'contact',
  underscored: true, // Mueve underscored aquí, dentro del mismo objeto
});

const address = sequelize.define('address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'address',
  underscored: true, // Mueve underscored aquí, dentro del mismo objeto
});

const users = sequelize.define("users",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type : DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    tableName: 'users', 
  })


// ---------------- RELACIONES ENTRE TABLAS ----------------
person.belongsTo(city, {
    foreignKey: 'city_of_birth', // Esta es la clave externa en la tabla Person
    targetKey: 'id', // La clave a la que se hace referencia en la tabla City
  });

city.hasMany(person,{
    foreignKey:'city_of_birth',
    sourceKey:"id",
});

state.hasMany(city,{
    foreignKey: "state_id",
});

city.belongsTo(state,{
    foreignKey:'state_id',
});

previous_history.belongsTo(patient,{
        foreignKey:'patient_id',

});


previous_history.belongsTo(antecedent_type,{
    foreignKey:'antecedent_type',

});



module.exports = {
    person,
    city,
    state,
    patient,
    previous_history,
    antecedent_type,
    previous_history_follow_up,
    person_identifier,
    identifier_type,
    contact,
    address,
    users
};