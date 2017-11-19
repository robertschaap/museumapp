const Sequelize = require('sequelize');
const sequelize = new Sequelize('museum', process.env.POSTGRES_USER, null, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
});

// Model Definitions
const Museums = sequelize.define('museums', {
    name: { type: Sequelize.TEXT, unique: true},
    location: Sequelize.TEXT
});
const Artworks = sequelize.define('artworks', {
    name: { type: Sequelize.TEXT, unique: true},
    artist: Sequelize.TEXT
});

// Relation Definitions
Museums.hasMany(Artworks, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Artworks.belongsTo(Museums, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

// Sync
sequelize.sync({ force: true }).then(() => {
    Museums.create({ name: 'Musée du Louvre', location: 'Paris' })
    .then(output => {
        output.createArtwork({ name: 'Mona Lisa', artist: 'Leonardo da Vinci' });
        output.createArtwork({ name: 'Venus de Milo', artist: 'Alexandros of Antioch' });
        output.createArtwork({ name: 'The Coronation of Napoleon', artist: 'Jaques-Louis David' });
    })
    Museums.create({ name: 'Stedelijk Museum', location: 'Amsterdam' })
    .then(output => output.createArtwork({ name: 'Composition XII', artist: 'Theo van Doesburg' }))
});

// Functions
function makeMap(obj) {
    return obj.map(i => i.dataValues);
}

// Exports
exports.sequelize = sequelize;

exports.addArtwork = (name, artist, museumId) => {
    return Artworks.create({ name: name, artist: artist, museumId: museumId });
}
exports.allMuseums = () => {
    return Museums.findAll().then(makeMap);
}
exports.oneMuseum = (id) => {
    return Museums.findAll({
        include: [{ model: Artworks, where: { museumId: id } }]
    }).then(makeMap);
}
exports.allArtworks = () => {
    return Artworks.findAll().then(makeMap);
}
exports.oneArtwork = (id) => {
    return Artworks.findById(id);
}
exports.queryAdmin = () => {
    return Promise.all([
        Museums.findAll().then(makeMap),
        Artworks.findAll().then(makeMap)
    ])
}
