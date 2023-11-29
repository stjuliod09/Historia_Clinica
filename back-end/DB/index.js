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
    return sequelize.sync({ alter: true }); // Esta línea realiza la sincronización
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
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'city',
    timestamps: false
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
      defaultValue: new Date('2000-01-01')
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city_of_birth: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    etnia: {
      type: DataTypes.STRING
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
    approximated_date_of_occurrence: {
      type: DataTypes.DATE,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER
    },
    obs: {
      type: DataTypes.STRING,
      allowNull: false
    },
    antecedent_type_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'previous_history',
    underscored: true
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
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parentesco: {
      type: DataTypes.STRING
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
    }
  },
  {
    tableName: 'contact',
    underscored: true // Mueve underscored aquí, dentro del mismo objeto
  }
);

const user = sequelize.define(
  'user',
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
    tableName: 'user',
    timestamps: false
  }
);

// ---------------- RELACIONES ENTRE TABLAS ----------------

patient.belongsTo(city, {
  foreignKey: 'city_of_birth', // Esta es la clave externa en la tabla Person
  targetKey: 'id' // La clave a la que se hace referencia en la tabla City
});

city.hasMany(patient, {
  foreignKey: 'city_of_birth',
  sourceKey: 'id'
});

previous_history.belongsTo(patient, {
  foreignKey: 'patient_id' // Esta es la columna de `previous_history`
});

// Definición en el modelo `patient`
patient.hasOne(previous_history, {
  foreignKey: 'patient_id' // Esta es la columna de `previous_history`
});

contact.belongsTo(patient, {
  foreignKey: 'patient_id'
});

patient.hasOne(contact, {
  foreignKey: 'patient_id'
});

patient.belongsTo(user, {
  foreignKey: 'id'
});

module.exports = {
  city,
  patient,
  previous_history,
  contact,
  user
};
