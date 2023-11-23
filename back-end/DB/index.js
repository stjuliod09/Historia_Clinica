const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('emr-is', 'emr-is', 'zY@u4Wpy', {
  host: '200.7.102.150',
  port: 3306,
  dialect: 'mysql'
});

// Prueba de conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

const city = sequelize.define(
  'city',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'city',
    timestamps: false
  }
);

const state = sequelize.define(
  'state',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING
    },
    country_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'state',
    timestamps: false
  }
);

const person = sequelize.define(
  'person',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    second_name: {
      type: DataTypes.STRING
    },
    first_last_name: {
      type: DataTypes.STRING
    },
    second_last_name: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sex_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city_of_birth: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'person',
    underscored: true
  }
);

const patient = sequelize.define(
  'patient',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    person_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'patient',
    underscored: true
  }
);

const previous_history = sequelize.define(
  'previous_history',
  {
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
    approximated_date_of_occurrence: {
      type: DataTypes.DATE,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'previous_history',
    underscored: true
  }
);

const antecedent_type = sequelize.define(
  'antecedent_type',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'antecedent_type',
    timestamps: false
  }
);

const previous_history_follow_up = sequelize.define(
  'previous_history_follow_up',
  {
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
    created_by: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
  {
    tableName: 'previous_history_follow_up',
    underscored: true // Mueve underscored aquí, dentro del mismo objeto
  }
);

const person_identifier = sequelize.define(
  'person_identifier',
  {
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
    created_by: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
  {
    tableName: 'person_identifier',
    underscored: true
  }
);

const identifier_type = sequelize.define(
  'identifier_type',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'identifier_type',
    timestamps: false
  }
);

const contact = sequelize.define(
  'contact',
  {
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
    created_by: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
  {
    tableName: 'contact',
    underscored: true // Mueve underscored aquí, dentro del mismo objeto
  }
);

const address = sequelize.define(
  'address',
  {
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
      allowNull: false
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'address',
    underscored: true // Mueve underscored aquí, dentro del mismo objeto
  }
);

const users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'users',
    timestamps: false
  }
);

// ---------------- RELACIONES ENTRE TABLAS ----------------

person.belongsTo(city, {
  foreignKey: 'city_of_birth', // Esta es la clave externa en la tabla Person
  targetKey: 'id' // La clave a la que se hace referencia en la tabla City
});

city.hasMany(person, {
  foreignKey: 'city_of_birth',
  sourceKey: 'id'
});

state.hasMany(city, {
  foreignKey: 'state_id'
});

city.belongsTo(state, {
  foreignKey: 'state_id'
});

patient.belongsTo(person, {
  foreignKey: 'person_id'
});

person.hasOne(patient, {
  foreignKey: 'person_id'
});

previous_history.belongsTo(patient, {
  foreignKey: 'patient_id' // Esta es la columna de `previous_history`
});

// Definición en el modelo `patient`
patient.hasOne(previous_history, {
  foreignKey: 'patient_id' // Esta es la columna de `previous_history`
});

previous_history.belongsTo(antecedent_type, {
  foreignKey: 'antecedent_type',
  as: 'AntecedentTypeInfo'
});

antecedent_type.hasOne(previous_history, {
  foreignKey: 'antecedent_type'
});

previous_history_follow_up.belongsTo(previous_history, {
  foreignKey: 'previous_history_id'
});

previous_history.hasOne(previous_history_follow_up, {
  foreignKey: 'previous_history_id'
});

address.belongsTo(person, {
  foreignKey: 'person_id',
  targetKey: 'id'
});

person.hasOne(address, {
  foreignKey: 'person_id',
  sourceKey: 'id'
});

address.belongsTo(city, {
  foreignKey: 'city_id'
});

city.hasOne(address, {
  foreignKey: 'city_id'
});

contact.belongsTo(person, {
  foreignKey: 'person_id'
});

person.hasOne(contact, {
  foreignKey: 'person_id'
});

person_identifier.belongsTo(person, {
  foreignKey: 'person_id'
});

person.hasOne(person_identifier, {
  foreignKey: 'person_id'
});

person_identifier.belongsTo(identifier_type, {
  foreignKey: 'identifier_type_id'
});

identifier_type.hasOne(person_identifier, {
  foreignKey: 'identifier_type_id'
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
