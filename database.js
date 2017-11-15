const Sequelize = require('sequelize');
const sequelize = new Sequelize('museum', process.env.POSTGRES_USER, null, {
    host: 'localhost',
    dialect: 'postgres'
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
// sequelize.sync()
sequelize.sync({ force: true }).then(() => {
    Museums.create({ name: 'Musée du Louvre', location: 'Paris' })
    .then(output => {
        output.createArtwork({ name: 'Mona Lisa', artist: 'Leonardo da Vinci' })
        output.createArtwork({ name: 'Venus de Milo', artist: 'Alexandros of Antioch' })
        output.createArtwork({ name: 'The Coronation of Napoleon', artist: 'Jaques-Louis David' })
    })
    Museums.create({ name: 'Stedelijk Museum', location: 'Amsterdam' })
    .then(output => output.createArtwork({ name: 'Composition XII', artist: 'Theo van Doesburg' }))
});

// Functions
function makeMap(obj) {
    return obj.map(i => i.dataValues);
}
function queryAdmin() {
    return Promise.all([
        Museums.findAll().then(makeMap),
        Artworks.findAll().then(makeMap)
    ])
}

module.exports = {
    makeMap: makeMap,
    queryAdmin: queryAdmin,
    Museums: Museums,
    Artworks: Artworks
}
